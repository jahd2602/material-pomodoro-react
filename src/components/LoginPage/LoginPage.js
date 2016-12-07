/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweenMax from 'gsap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';
import {Howl} from 'howler'

const title = 'Log In';

class LoginPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    isDragging = false;

    oldPosX = 0;
    pixelPos = 0;
    timePos = 0;
    pixelWidth = 630;
    secondsWidth = 25;
    timeMultiplier = 1000 * 60;
    tickSound;
    turnSound;
    isTickPlaying = false;
    turnSoundDist = 25 / 2;
    ringSound;

    loadSounds() {
        this.tickSound = new Howl({
            urls: ['http://reneroth.org/projects/codepen/pomodoro_tick.ogg', 'http://reneroth.org/projects/codepen/pomodoro_tick.mp3'],
            loop: true,
            volume: 0.5
        });

        this.turnSound = new Howl({
            urls: ['http://reneroth.org/projects/codepen/pomodoro_turn.ogg', 'http://reneroth.org/projects/codepen/pomodoro_turn.mp3']
        });
        this.ringSound = new Howl({
            urls: ['http://reneroth.org/projects/codepen/pomodoro_ring.ogg', 'http://reneroth.org/projects/codepen/pomodoro_ring.mp3'],
            volume: 1.0
        });
    }

    renderTime = () => {
        //this.forceUpdate();
        this.setState([{pixelPos: this.pixelPos}]);
        //this.refs.timeline.css('transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-ms-transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-moz-transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-webkit-transform', 'translateX(-' + this.pixelPos + 'px)');
    };

    lastTurnPos = 0;

    mousemove = (e) => {
        e.preventDefault();
        if (this.isDragging) {
            var moveX = e.pageX - this.oldPosX;
            this.pixelPos -= moveX;
            this.pixelPos = Math.max(0, Math.min(this.pixelPos, this.pixelWidth));
            this.timePos = Math.ceil(this.pixelPos * this.secondsWidth / this.pixelWidth * this.timeMultiplier);
            this.renderTime();
            if (moveX > 0) {
                this.lastTurnPos = e.pageX;
            }
            if (e.pageX - this.lastTurnPos < -this.turnSoundDist) {
                if (this.pixelPos < this.pixelWidth) {
                    this.turnSound.play();
                }
                this.lastTurnPos = e.pageX;
            }
        } else {
            this.lastTurnPos = e.pageX;
        }
        this.oldPosX = e.pageX;
    };

    componentWillMount() {
        this.context.onSetTitle(title);

    }

    componentDidMount() {
        this.loadSounds();
        this.doTick();

        // TODO implement sound enable / disable
        //$('.sound').click(function (e) {
        //    e.preventDefault();
        //    if ($(this).hasClass('mute')) {
        //        $(this).removeClass('mute');
        //        tickSound.volume(0.5);
        //    } else {
        //        $(this).addClass('mute');
        //        tickSound.volume(0.0);
        //    }
        //});
    }

    mouseup = () => {
        this.isDragging = false;
    };

    lastTick = Date.now();

    doTick = () => {
        //requestAnimationFrame(doTick);
        setTimeout(this.doTick, 10); //setTimeout so the timer will continue running even if in the background
        var tickDuration = Date.now() - this.lastTick;
        this.lastTick = Date.now();
        if (this.isDragging || this.timePos <= 0) {
            if (this.isTickPlaying) {
                this.tickSound.stop();
                this.isTickPlaying = false;
            }
            return;
        }
        if (!this.isTickPlaying) {
            if (this.tickSound) {
                this.tickSound.play();
            }
            this.isTickPlaying = true;
        }
        this.timePos -= tickDuration;
        this.timePos = Math.max(0, Math.min(this.timePos, this.secondsWidth * this.timeMultiplier));
        this.pixelPos = this.timePos / this.secondsWidth * this.pixelWidth / this.timeMultiplier;
        this.renderTime();
        if (this.timePos == 0) {
            this.wiggle();
            this.ringSound.stop().play();
        }
    };

    wiggle() {
        var element = ReactDOM.findDOMNode(this.refs.main).value;
        /**************
         Rotation
         **************/
        TweenMax.fromTo(element, .07, { // TODO can't load TweenMax
            x: -4
        }, {
            x: 4,
            ease: Power1.easeInOut,
            yoyo: true,
            repeat: 21,
            onCompleteParams: [element],
            onComplete: this.resetWiggle
        });
    }

    resetWiggle(element) {
        TweenMax.to(element, .05, {
            x: 0,
            ease: Power1.easeInOut
        });
    }

    render() {
        return (
            <div className={s.root}>
                <svg style={{display: 'none'}}>
                    <defs>
                        <path id="stempath"
                              d="M45.263 56.325c-4.153 2.877-8.688 3.997-13.684 2.947-6.75-1.42-12.658-.133-17.343 5.274-.444.513-1.154.795-1.945.841 8.279-12.713 19.369-20.347 35.181-19.185-1.142-4.912-2.697-9.386-8.229-10.989 8.393-2.329 14.908.648 20.39 6.482 4.967-3.077 7.65-6.526 12.7-16.222 2.45 6.292 1.399 11.899-3.969 20.682 3.378 1.556 6.882 2.05 10.168.448 3.099-1.51 5.857-3.72 9.176-5.891-1.793 6.643-5.919 10.74-11.471 13.709-5.747 3.074-11.571 1.879-16.764.42l-9.355 19.685c-4.165-4.978-4.672-11.17-4.276-17.6l.219-.991-.798.39z"/>
                    </defs>
                </svg>
                <div className={s.main} onMouseMove={this.mousemove} onMouseUp={this.mouseup} ref="main">
                    <svg className={s.stem} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <use xlinkHref="#stempath"/>
                    </svg>
                    <div className={s.tomato} ref="tomato"
                         onMouseDown={(e) => {e.preventDefault();this.isDragging = true}}>
                        <div className={s.timeline} ref="timeline"
                             style={{transform:'translateX(-' + this.pixelPos + 'px)'}}></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withStyles(LoginPage, s);
