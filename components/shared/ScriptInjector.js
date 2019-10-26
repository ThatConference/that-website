import React, { Component } from 'react';

class ScriptInjector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      script: '',
    };
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = this.props.script;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return <div className={this.props.formClass} />;
  }
}

export default ScriptInjector;
