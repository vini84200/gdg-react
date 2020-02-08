import React from "react";
import PropTypes from "prop-types";
import { Input, Field, Label, Control, Button } from "rbx";

class Numero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: true
    };
  }
  onChange(event) {
    this.props.change_num(event.target.value);
  }
  onClick() {
    this.setState({
      selected: true
    });
  }
  onBlur() {
    this.setState({
      selected: false
    });
  }
  render() {
    return (
      <Field kind="addons">
        <Label>Projeto de Resolução nº </Label>
        <Control>
          <Input
            textAlign="right"
            onClick={() => this.onClick()}
            onBlur={() => this.onBlur()}
            static={!this.state.selected}
            value={this.props.num}
            onChange={(e) =>this.onChange(e)}
          />
        </Control>
        <Control>
          <Input static value={" / " + this.props.year}></Input>
        </Control>
      </Field>
    );
  }
}

export default Numero;
