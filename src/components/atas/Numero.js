import React, { Fragment } from "react";
import { Input, Field, Control } from "rbx";
import StaticInput from "../StaticInput";

class Numero extends React.Component {
  onChange(event) {
    this.props.change_num(event.target.value);
  }

  render() {
    return (
      <Fragment>
        <Field kind="addons">
          <strong
            style={{ marginLeft: "10px", height: "24px", padding: "5px" }}
          >
            ATA Nº
          </strong>
          <Control>
            <StaticInput
              child={Input}
              textAlign="right"
              style={{
                width: "60px"
              }}
              value={this.props.num}
              onChange={e => this.onChange(e)}
            ></StaticInput>
          </Control>
          <span style={{ height: "24px", padding: "5px" }}> / </span>
          <Control>
            <StaticInput
              child={Input}
              style={{
                width: "60px"
              }}
              value={this.props.year}
              onChange={e => this.props.change_year(e.target.value)}
            ></StaticInput>
          </Control>
          <span style={{ height: "24px", padding: "5px" }}> - </span>
          <Control>
            <StaticInput
              child={Input}
              value={this.props.title}
              onChange={e => this.props.change_title(e.target.value)}
            ></StaticInput>
          </Control>
        </Field>
      </Fragment>
    );
  }
}

export default Numero;
