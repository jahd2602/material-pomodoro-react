/**
 * Copyright © 2017 Jairo Honorio. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import TomatoPage from '../TomatoPage';
import {
  Grid,
  Cell,
  Layout,
  Navigation,
  Header,
  Content,
  Icon,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  Radio,
} from 'react-mdl';
import { version } from './../../../package.json';

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

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      tickSoundConfig: '2',
    };
  }

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

  onTickSoundConfigChange = (e) => {
    this.setState({ tickSoundConfig: e.target.value });
  };

  onGetConfig = () => ({
    tickSoundConfig: this.state.tickSoundConfig,
  });

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    return !this.props.error ? (
      <div>
        <Layout fixedDrawer>
          <Header transparent />
          <Drawer className={s.drawer}>
            <Grid
              shadow={1}
              style={{ margin: '0' }}
            >
              <Cell col={12}>
                <h1>Zen Pomodoro</h1>
                <div>
                  by Jairo Honorio
                </div>
                <div className="mdl-color-text--grey">
                  version {version}
                </div>
              </Cell>
            </Grid>
            <Navigation>
              <a
                href="#"
                onClick={this.handleOpenDialog}
              >
                <Icon name="settings" /> Options
              </a>
              <a
                href="https://github.com/jahd2602/material-pomodoro-react"
                target="blank"
              >
                <Icon name="code" /> Github
              </a>
              <a
                href="https://pe.linkedin.com/in/jairohonorio"
                target="blank"
              >
                <Icon name="portrait" /> LinkedIn
              </a>
              <a
                href="mailto:jairo@jahdsoft.com"
                target="blank"
              >
                <Icon name="email" /> Email
              </a>
            </Navigation>
          </Drawer>
          <Content>
            <TomatoPage getConfig={this.onGetConfig} />
          </Content>
        </Layout>
        <Dialog
          open={this.state.openDialog}
          onCancel={this.handleCloseDialog}
        >
          <DialogTitle>Options</DialogTitle>
          <DialogContent>
            <Grid>
              <Cell col={6}>
                Tick sound
              </Cell>
              <Cell col={6}>
                <RadioGroup
                  name="tickSoundConfig"
                  value={this.state.tickSoundConfig}
                  childContainer="div"
                  onChange={this.onTickSoundConfigChange}
                >
                  <Radio
                    value="2"
                    ripple
                  >
                    Starting
                  </Radio>
                  <Radio
                    value="1"
                    ripple
                  >
                    On
                  </Radio>
                  <Radio
                    value="0"
                    ripple
                  >
                    Off
                  </Radio>
                </RadioGroup>
              </Cell>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={this.handleCloseDialog}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : this.props.children;
  }

}

export default App;
