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
import Feedback from '../Feedback';
import Footer from '../Footer';
import { Layout, Navigation, Header, IconButton, Menu, MenuItem, Content, Icon, Button  } from 'react-mdl';

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
                <Menu target="demo-menu-lower-right" align="right">
                    <MenuItem>Some Action</MenuItem>
                    <MenuItem>Another Action</MenuItem>
                    <MenuItem disabled>Disabled Action</MenuItem>
                    <MenuItem>Yet Another Action</MenuItem>
                </Menu>
                <Layout fixedHeader>
                    <Header title={<span><Icon name="timer" style={{verticalAlign:'middle'}}/> Zen Pomodoro</span>} style={{color: 'brown',background: 'white'}}>
                        <Navigation ripple>
                            <IconButton name="volume_up" style={{color: 'brown'}}/>
                            <IconButton name="more_vert" id="demo-menu-lower-right" style={{color: 'brown'}}/>
                        </Navigation>
                    </Header>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </div>
        ) : this.props.children;
    }

}

export default App;
