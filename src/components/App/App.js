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
  Button,
  RadioGroup,
  Radio,
} from 'react-mdl';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const RedditIcon = generateShareIcon('reddit');

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

  handleToggleDialog = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const shareUrl = 'http://zen.jahdsoft.com/';

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
              </Cell>
              <Cell col={8}>
                <div>
                  by Jairo Honorio
                </div>
                <div className="mdl-color-text--grey">
                  version {version}
                </div>
              </Cell>
              <Cell col={4}>
                <Button
                  ripple
                  onClick={this.handleToggleDialog}
                >
                  <Icon name="settings" />
                </Button>
              </Cell>
              { this.state.openDialog ?
                <Cell col={12}>
                  <Grid
                    shadow={1}
                    style={{ margin: '0' }}
                  >
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
                </Cell>
                : null}
            </Grid>

            <Navigation>
              <a
                href="https://github.com/jahd2602/material-pomodoro-react"
                target="blank"
              >
                <Icon name="code" /> Code on Github
              </a>
              <a
                href="https://pe.linkedin.com/in/jairohonorio"
                target="blank"
              >
                <Icon name="portrait" /> My LinkedIn
              </a>
              <a
                href="mailto:jairo@jahdsoft.com"
                target="blank"
              >
                <Icon name="email" /> Email me
              </a>
            </Navigation>

            <Grid
              className={s.socialContainer}
            >
              <Cell col={6}>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon round />
                </FacebookShareButton>
              </Cell>

              <Cell col={6}>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon round />
                </TwitterShareButton>
              </Cell>

              <Cell col={6}>
                <GooglePlusShareButton url={shareUrl}>
                  <GooglePlusIcon round />
                </GooglePlusShareButton>
              </Cell>

              <Cell col={6}>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon round />
                </LinkedinShareButton>
              </Cell>

              <Cell col={6}>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon round />
                </WhatsappShareButton>
              </Cell>

              <Cell col={6}>
                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon round />
                </TelegramShareButton>
              </Cell>

              <Cell col={6}>
                <RedditShareButton url={shareUrl}>
                  <RedditIcon round />
                </RedditShareButton>
              </Cell>

              <Cell col={6}>
                <PinterestShareButton
                  url={shareUrl}
                  media="http://zen.jahdsoft.com/images/screenshot.png"
                >
                  <PinterestIcon round />
                </PinterestShareButton>
              </Cell>
            </Grid>
          </Drawer>
          <Content>
            <TomatoPage getConfig={this.onGetConfig} />
          </Content>
        </Layout>
      </div>
    ) : this.props.children;
  }

}

export default App;
