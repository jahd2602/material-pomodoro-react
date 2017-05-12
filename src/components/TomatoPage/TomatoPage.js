/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TomatoPage.scss';
import {Howl} from 'howler'
import {FABButton, Icon, Button, Grid, Cell} from 'react-mdl';

const title = 'Zen Pomodoro';

class TomatoPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    MODE_POMODORO = 0;
    MODE_SHORT_BREAK = 1;
    MODE_LONG_BREAK = 2;
    MODE_CUSTOM = 3;

    isDragging = false;
    oldPosX = 0;
    pixelWidth = 630;
    minutesWidth = 25;
    timeMultiplier = 1000 * 60;
    pixelPos = this.pixelWidth;
    timePos = this.minutesWidth * this.timeMultiplier;
    tickSound;
    turnSound;
    isTickPlaying = false;
    turnSoundDist = 25 / 2;
    ringSound;
    paused = true;
    mode = this.MODE_POMODORO;

    loadSounds() {
        this.tickSound = new Howl({ // TODO remote to local sounds
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
        this.forceUpdate();
        //this.refs.timeline.css('transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-ms-transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-moz-transform', 'translateX(-' + this.pixelPos + 'px)');
        //this.refs.timeline.css('-webkit-transform', 'translateX(-' + this.pixelPos + 'px)');
    };

    lastTurnPos = 0;

    onMouseMove = (e) => {
        e.preventDefault();
        if (this.isDragging) {
            let moveX = e.pageX - this.oldPosX;
            this.pixelPos -= moveX;
            this.pixelPos = Math.max(0, Math.min(this.pixelPos, this.pixelWidth));
            this.timePos = Math.ceil(this.pixelPos * this.minutesWidth / this.pixelWidth * this.timeMultiplier);
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
    }

    onMouseUp = () => {
        this.isDragging = false;
    };

    lastTick = Date.now();

    doTick = () => {
        //requestAnimationFrame(doTick);
        setTimeout(this.doTick, 10); //setTimeout so the timer will continue running even if in the background
        let tickDuration = Date.now() - this.lastTick;
        this.lastTick = Date.now();
        if (this.isDragging || this.timePos <= 0 || this.paused) {
            if (this.isTickPlaying) {
                this.tickSound.stop();
                this.isTickPlaying = false;
            }
            return;
        }
        if (!this.isTickPlaying) {
            if (this.tickSound) {
                this.tickSound.volume(0.5);
                this.tickSound.play();
            }
            this.isTickPlaying = true;
        } else if (this.tickSound.volume() > 0) {
            this.tickSound.volume(this.tickSound.volume() - 0.001);
        }
        if (!this.paused) {
            this.timePos -= tickDuration;
        }
        this.timePos = Math.max(0, Math.min(this.timePos, this.minutesWidth * this.timeMultiplier));
        this.pixelPos = this.timePos / this.minutesWidth * this.pixelWidth / this.timeMultiplier;
        this.renderTime();
        if (this.timePos === 0) {
            this.ringSound.stop().play();
            this.paused = true;
            this.forceUpdate();
        }
    };

    jumpToMode = () => {
        if (this.mode === this.MODE_SHORT_BREAK) {
            this.pixelPos = this.pixelWidth * .2;
            this.timePos = this.minutesWidth * this.timeMultiplier * .2;
        } else if (this.mode === this.MODE_LONG_BREAK) {
            this.pixelPos = this.pixelWidth * .6;
            this.timePos = this.minutesWidth * this.timeMultiplier * .6;
        } else {
            this.pixelPos = this.pixelWidth;
            this.timePos = this.minutesWidth * this.timeMultiplier;
            this.mode = this.MODE_POMODORO;
        }
    };

    onPlayPauseClick = () => {
        if (this.timePos === 0) {
            this.ringSound.stop();
            this.onStopClick();
        }
        this.paused = !this.paused;
        this.forceUpdate();
    };

    onStopClick = () => {
        this.jumpToMode();
        this.paused = true;
        this.ringSound.stop();
        this.forceUpdate();
    };

    selectMode = (mode) => {
        this.mode = mode;
        this.onStopClick();
    };

    render() {
        return (
            <Grid className={s.root}>
                <Cell col={12} className={s.main} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} ref="main">
                    <svg style={{display: 'none'}}>
                        <defs>
                            <path id="stempath"
                                  d="M45.263 56.325c-4.153 2.877-8.688 3.997-13.684 2.947-6.75-1.42-12.658-.133-17.343 5.274-.444.513-1.154.795-1.945.841 8.279-12.713 19.369-20.347 35.181-19.185-1.142-4.912-2.697-9.386-8.229-10.989 8.393-2.329 14.908.648 20.39 6.482 4.967-3.077 7.65-6.526 12.7-16.222 2.45 6.292 1.399 11.899-3.969 20.682 3.378 1.556 6.882 2.05 10.168.448 3.099-1.51 5.857-3.72 9.176-5.891-1.793 6.643-5.919 10.74-11.471 13.709-5.747 3.074-11.571 1.879-16.764.42l-9.355 19.685c-4.165-4.978-4.672-11.17-4.276-17.6l.219-.991-.798.39z"/>
                        </defs>
                    </svg>
                    <svg className={s.stem} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <use xlinkHref="#stempath"/>
                    </svg>
                    <div className={s.tomato} ref="tomato"
                         onMouseDown={(e) => {
                             e.preventDefault();
                             this.isDragging = true
                         }}>
                        <div className={s.timeline} ref="timeline"
                             style={{transform: 'translateX(-' + this.pixelPos + 'px)'}}></div>
                    </div>
                </Cell>
                <Cell col={12}>
                    <div className={s.controls}>
                        <FABButton ripple className="mdl-color--white" onClick={this.onStopClick}>
                            <Icon name="stop"/>
                        </FABButton>
                        <FABButton ripple className="mdl-color--white" style={{float: 'right'}}
                                   onClick={this.onPlayPauseClick}>
                            <Icon name={this.paused ? "play_arrow" : "pause"}/>
                        </FABButton>
                    </div>
                </Cell>
                <Cell col={12} className="mdl-typography--text-center">
                    <Button className={this.mode === this.MODE_POMODORO ? "mdl-color-text--white" : null}
                            onClick={() => this.selectMode(this.MODE_POMODORO)} ripple>
                        Pomodoro
                    </Button>
                    <Button className={this.mode === this.MODE_SHORT_BREAK ? "mdl-color-text--white" : null}
                            onClick={() => this.selectMode(this.MODE_SHORT_BREAK)} ripple>
                        Short Break
                    </Button>
                    <Button className={this.mode === this.MODE_LONG_BREAK ? "mdl-color-text--white" : null}
                            onClick={() => this.selectMode(this.MODE_LONG_BREAK)} ripple>
                        Long Break
                    </Button>
                </Cell>
            </Grid>
        );
    }

}

export default withStyles(TomatoPage, s);
