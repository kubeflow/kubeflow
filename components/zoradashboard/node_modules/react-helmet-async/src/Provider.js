import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapStateOnServer from './server';

const defaultValue = {};

export const Context = React.createContext(defaultValue);

export const providerShape = PropTypes.shape({
  setHelmet: PropTypes.func,
  helmetInstances: PropTypes.shape({
    get: PropTypes.func,
    add: PropTypes.func,
    remove: PropTypes.func,
  }),
});

const canUseDOM = typeof document !== 'undefined';

export default class Provider extends Component {
  static canUseDOM = canUseDOM;

  static propTypes = {
    context: PropTypes.shape({
      helmet: PropTypes.shape(),
    }),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    context: {},
  };

  static displayName = 'HelmetProvider';

  instances = [];

  value = {
    setHelmet: serverState => {
      this.props.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.instances,
      add: instance => {
        this.instances.push(instance);
      },
      remove: instance => {
        const index = this.instances.indexOf(instance);
        this.instances.splice(index, 1);
      },
    },
  };

  constructor(props) {
    super(props);

    if (!Provider.canUseDOM) {
      props.context.helmet = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: '',
        titleAttributes: {},
      });
    }
  }

  render() {
    return <Context.Provider value={this.value}>{this.props.children}</Context.Provider>;
  }
}
