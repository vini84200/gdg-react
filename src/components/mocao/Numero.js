import React from "react";
import PropTypes from "prop-types";
import { Input, Field, Control, Help } from "rbx";
import StaticInput from '../StaticInput'
class Numero extends React.Component {
  onChange(event) {
    this.props.change_num(event.target.value);
  }

  render() {
    return (
      <Field kind="addons">
        <strong>Projeto de Resolução nº </strong>
        <Control>
          <StaticInput
            child={Input}
            textAlign="right"
            style={{
                width: "60px"
            }}
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
