/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RegisterPage.scss';
import { FABButton, Icon, Card, CardText, Grid, Cell} from 'react-mdl';
import { getColorClass, getTextColorClass } from 'react-mdl/lib/utils/palette';
import classNames from 'classnames';

const title = 'New User Registration';

class RegisterPage extends Component {

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.context.onSetTitle(title);
    }

    render() {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <Grid className="demo-container">
                        <Cell col={2} hidePhone hideTablet/>
                        <Cell col={8}
                              className={classNames('demo-content', getColorClass('white'), getTextColorClass('grey', 800))}>
                            <div className={classNames('demo-crumbs', getTextColorClass('grey', 500))}>
                                Google &gt; Material Design Lite &gt; How to install MDL
                            </div>
                            <h3>How to install MDL</h3>
                            <p>Cillum dolor esse sit incididunt velit eiusmod magna ad nostrud officia aute dolor dolor.
                                Magna esse ullamco pariatur adipisicing consectetur eu commodo officia. Ex cillum
                                consequat mollit minim elit est deserunt occaecat nisi amet. Quis aliqua nostrud Lorem
                                occaecat sunt. Eiusmod quis amet ullamco aliquip dolore ut incididunt duis adipisicing.
                                Elit consequat nisi eiusmod aute ipsum sunt veniam do est. Occaecat mollit aliquip ut
                                proident consectetur amet ex dolore consectetur aliqua elit.</p>
                            <p>Commodo nisi non consectetur voluptate incididunt mollit duis dolore amet amet tempor
                                exercitation. Qui amet aute ea aute id ad aliquip proident. Irure duis qui labore
                                deserunt enim in quis nisi sint consequat aliqua. Ex proident labore et laborum tempor
                                fugiat sint magna veniam minim. Nulla dolor labore adipisicing in enim mollit laboris
                                fugiat eu. Aliquip minim cillum ullamco voluptate non dolore non ex duis fugiat duis ad.
                                Deserunt cillum ad et nisi amet non voluptate culpa qui do. Labore ullamco et minim
                                proident est laborum mollit ad labore deserunt ut irure dolore. Reprehenderit ad ad
                                irure ut irure qui est eu velit eu excepteur adipisicing culpa. Laborum cupidatat
                                ullamco eu duis anim reprehenderit proident aute ad consectetur eiusmod.</p>
                            <p>Tempor tempor aliqua in commodo cillum Lorem magna dolore proident Lorem. Esse ad
                                consequat est excepteur irure eu irure quis aliqua qui. Do mollit esse veniam excepteur
                                ut veniam anim minim dolore sit commodo consequat duis commodo. Sunt dolor reprehenderit
                                ipsum minim eiusmod eu consectetur anim excepteur eiusmod. Duis excepteur anim dolor sit
                                enim veniam deserunt anim adipisicing Lorem elit. Cillum sunt do consequat elit laboris
                                nisi consectetur.</p>
                            <h3>Basic MDL Usage</h3>
                            <p>Cillum dolor esse sit incididunt velit eiusmod magna ad nostrud officia aute dolor dolor.
                                Magna esse ullamco pariatur adipisicing consectetur eu commodo officia. Ex cillum
                                consequat mollit minim elit est deserunt occaecat nisi amet. Quis aliqua nostrud Lorem
                                occaecat sunt. Eiusmod quis amet ullamco aliquip dolore ut incididunt duis adipisicing.
                                Elit consequat nisi eiusmod aute ipsum sunt veniam do est. Occaecat mollit aliquip ut
                                proident consectetur amet ex dolore consectetur aliqua elit.</p>
                            <p>Commodo nisi non consectetur voluptate incididunt mollit duis dolore amet amet tempor
                                exercitation. Qui amet aute ea aute id ad aliquip proident. Irure duis qui labore
                                deserunt enim in quis nisi sint consequat aliqua. Ex proident labore et laborum tempor
                                fugiat sint magna veniam minim. Nulla dolor labore adipisicing in enim mollit laboris
                                fugiat eu. Aliquip minim cillum ullamco voluptate non dolore non ex duis fugiat duis ad.
                                Deserunt cillum ad et nisi amet non voluptate culpa qui do. Labore ullamco et minim
                                proident est laborum mollit ad labore deserunt ut irure dolore. Reprehenderit ad ad
                                irure ut irure qui est eu velit eu excepteur adipisicing culpa. Laborum cupidatat
                                ullamco eu duis anim reprehenderit proident aute ad consectetur eiusmod.</p>
                            <p>Cillum dolor esse sit incididunt velit eiusmod magna ad nostrud officia aute dolor dolor.
                                Magna esse ullamco pariatur adipisicing consectetur eu commodo officia. Ex cillum
                                consequat mollit minim elit est deserunt occaecat nisi amet. Quis aliqua nostrud Lorem
                                occaecat sunt. Eiusmod quis amet ullamco aliquip dolore ut incididunt duis adipisicing.
                                Elit consequat nisi eiusmod aute ipsum sunt veniam do est. Occaecat mollit aliquip ut
                                proident consectetur amet ex dolore consectetur aliqua elit.</p>
                            <p>Commodo nisi non consectetur voluptate incididunt mollit duis dolore amet amet tempor
                                exercitation. Qui amet aute ea aute id ad aliquip proident. Irure duis qui labore
                                deserunt enim in quis nisi sint consequat aliqua. Ex proident labore et laborum tempor
                                fugiat sint magna veniam minim. Nulla dolor labore adipisicing in enim mollit laboris
                                fugiat eu. Aliquip minim cillum ullamco voluptate non dolore non ex duis fugiat duis ad.
                                Deserunt cillum ad et nisi amet non voluptate culpa qui do. Labore ullamco et minim
                                proident est laborum mollit ad labore deserunt ut irure dolore. Reprehenderit ad ad
                                irure ut irure qui est eu velit eu excepteur adipisicing culpa. Laborum cupidatat
                                ullamco eu duis anim reprehenderit proident aute ad consectetur eiusmod.</p>
                            <p>Cillum dolor esse sit incididunt velit eiusmod magna ad nostrud officia aute dolor dolor.
                                Magna esse ullamco pariatur adipisicing consectetur eu commodo officia. Ex cillum
                                consequat mollit minim elit est deserunt occaecat nisi amet. Quis aliqua nostrud Lorem
                                occaecat sunt. Eiusmod quis amet ullamco aliquip dolore ut incididunt duis adipisicing.
                                Elit consequat nisi eiusmod aute ipsum sunt veniam do est. Occaecat mollit aliquip ut
                                proident consectetur amet ex dolore consectetur aliqua elit.</p>
                            <p>Commodo nisi non consectetur voluptate incididunt mollit duis dolore amet amet tempor
                                exercitation. Qui amet aute ea aute id ad aliquip proident. Irure duis qui labore
                                deserunt enim in quis nisi sint consequat aliqua. Ex proident labore et laborum tempor
                                fugiat sint magna veniam minim. Nulla dolor labore adipisicing in enim mollit laboris
                                fugiat eu. Aliquip minim cillum ullamco voluptate non dolore non ex duis fugiat duis ad.
                                Deserunt cillum ad et nisi amet non voluptate culpa qui do. Labore ullamco et minim
                                proident est laborum mollit ad labore deserunt ut irure dolore. Reprehenderit ad ad
                                irure ut irure qui est eu velit eu excepteur adipisicing culpa. Laborum cupidatat
                                ullamco eu duis anim reprehenderit proident aute ad consectetur eiusmod.</p>
                            <p>Cillum dolor esse sit incididunt velit eiusmod magna ad nostrud officia aute dolor dolor.
                                Magna esse ullamco pariatur adipisicing consectetur eu commodo officia. Ex cillum
                                consequat mollit minim elit est deserunt occaecat nisi amet. Quis aliqua nostrud Lorem
                                occaecat sunt. Eiusmod quis amet ullamco aliquip dolore ut incididunt duis adipisicing.
                                Elit consequat nisi eiusmod aute ipsum sunt veniam do est. Occaecat mollit aliquip ut
                                proident consectetur amet ex dolore consectetur aliqua elit.</p>
                            <p>Commodo nisi non consectetur voluptate incididunt mollit duis dolore amet amet tempor
                                exercitation. Qui amet aute ea aute id ad aliquip proident. Irure duis qui labore
                                deserunt enim in quis nisi sint consequat aliqua. Ex proident labore et laborum tempor
                                fugiat sint magna veniam minim. Nulla dolor labore adipisicing in enim mollit laboris
                                fugiat eu. Aliquip minim cillum ullamco voluptate non dolore non ex duis fugiat duis ad.
                                Deserunt cillum ad et nisi amet non voluptate culpa qui do. Labore ullamco et minim
                                proident est laborum mollit ad labore deserunt ut irure dolore. Reprehenderit ad ad
                                irure ut irure qui est eu velit eu excepteur adipisicing culpa. Laborum cupidatat
                                ullamco eu duis anim reprehenderit proident aute ad consectetur eiusmod.</p>
                        </Cell>
                    </Grid>
                </div>
            </div>
        );
    }

}

export default withStyles(RegisterPage, s);
