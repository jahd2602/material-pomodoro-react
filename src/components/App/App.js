/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import TomatoPage from '../TomatoPage';
import { Grid,Cell,Layout, Navigation, Header, IconButton, Menu, MenuItem, Content, Icon, Button, Drawer  } from 'react-mdl';

class App extends Component {

    static propTypes = {
        context: PropTypes.shape({
            insertCss: PropTypes.func,
            onSetTitle: PropTypes.func,
            onSetMeta: PropTypes.func,
            onPageNotFound: PropTypes.func,
        }),
        children: PropTypes.element.isRequired,
        error: PropTypes.object,
    };

    static childContextTypes = {
        insertCss: PropTypes.func.isRequired,
        onSetTitle: PropTypes.func.isRequired,
        onSetMeta: PropTypes.func.isRequired,
        onPageNotFound: PropTypes.func.isRequired,
    };

    getChildContext() {
        const context = this.props.context;
        return {
            insertCss: context.insertCss || emptyFunction,
            onSetTitle: context.onSetTitle || emptyFunction,
            onSetMeta: context.onSetMeta || emptyFunction,
            onPageNotFound: context.onPageNotFound || emptyFunction,
        };
    }

    componentWillMount() {
        const { insertCss } = this.props.context;
        this.removeCss = insertCss(s);
    }

    componentWillUnmount() {
        this.removeCss();
    }

    render() {
        return !this.props.error ? (
            <div>
                <Layout fixedHeader>
                    <Header transparent>
                    </Header>
                    <Drawer title="Zen Pomodoro">
                        <Grid shadow={1} style={{margin: '0'}}>
                            <Cell col={12}>
                                by Jairo Honorio
                            </Cell>
                        </Grid>
                        <Navigation>
                            <a href="https://github.com/jahd2602">Github</a>
                            <a href="https://pe.linkedin.com/in/jairohonorio">LinkedIn</a>
                            <a href="mailto:jairo@jahdsoft.com">Email</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <TomatoPage/>
                    </Content>
                </Layout>
            </div>
        ) : this.props.children;
    }

}

export default App;
