import React, { Fragment } from "react";
import PropTypes from "prop-types";

class StaticInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  onChange(event) {
    this.props.onChange(event);
  }
  onClick() {
    this.setState({
      selected: true
    });
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  onBlur() {
    this.setState({
      selected: false
    });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
  render() {
    return (
      <Fragment>
        <this.props.child
          onClick={() => this.onClick()}
          onBlur={() => this.onBlur()}
          static={!this.state.selected && this.props.value}
          value={this.props.value}
          onChange={e => this.onChange(e)}
          {...this.props}
        />
        {this.state.selected}
      </Fragment>
    );
  }
}

export default StaticInput;
