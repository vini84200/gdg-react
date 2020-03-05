import React, { Fragment } from "react";
import { Field, Select } from "rbx";
import { livrosAta } from "../../config";
class Livro extends React.Component {
  render() {
    return (
      <Fragment>
        <Field kind="addons">
          <strong
            style={{ marginLeft: "10px", height: "24px", padding: "5px" }}
          >
            Livro:{"  "}
          </strong>
          <Select.Container>
            <Select
              value={this.props.livro}
              onChange={e => {
                this.props.onChange(e.target.value);
              }}
            >
              {livrosAta.map(livro => (
                <Select.Option value={livro.cod}>{livro.title}</Select.Option>
              ))}
            </Select>
          </Select.Container>
        </Field>
      </Fragment>
    );
  }
}

export default Livro;
