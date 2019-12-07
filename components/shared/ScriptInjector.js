import React, { Component } from 'react';

class ScriptInjector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      script: '',
    };
  }

  componentDidMount() {
    const scriptElement = document.createElement('script');
    const { script } = this.props;
    scriptElement.src = script;
    scriptElement.async = true;

    document.body.appendChild(scriptElement);
  }

  render() {
    const { formClass } = this.props;
    return <div className={formClass} />;
  }
}

export default ScriptInjector;
