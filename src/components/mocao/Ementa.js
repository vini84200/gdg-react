import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Column } from "rbx";
import StaticInput from "../StaticInput";

import { Input, Field, Control, Label, Help } from "rbx";

class Ementa extends React.Component {
  onChange(event) {
    this.props.change_ementa(event.target.value);
  }
  render() {
    return (
      <Column size={7} offset={4}>
        <Field>
          <StaticInput
            child={Input}
            value={this.props.ementa}
            onChange={e => this.onChange(e)}
            as="Textarea"
            placeholder="Clique aqui para digitar sua ementa. PS: Uma ementa é um resumo da resolução."
            style={{
              height: "100px"
            }}
          />
        </Field>
      </Column>
    );
  }
}

export default Ementa;
