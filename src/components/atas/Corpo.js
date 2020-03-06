import React, { Fragment } from "react";
import { Input, Field, Control } from "rbx";
import StaticInput from "../StaticInput";

class Numero extends React.Component {
  onChange(corpo) {
    var corrigido = corpo.replace(/\r?\n|\r/g, "").replace("\t", "");
    this.props.change(corrigido);
  }

  render() {
    return (
      <Fragment>
        <Field kind="addons">
          <Control>
            <StaticInput
              child={Input}
              value={this.props.corpo}
              onChange={e => this.onChange(e.target.value)}
              as="Textarea"
              placeholder={"Escreva aqui sua ata."}
              style={{
                height: "500px",
                width: "95vw"
              }}
            ></StaticInput>
          </Control>
        </Field>
      </Fragment>
    );
  }
}

export default Numero;
