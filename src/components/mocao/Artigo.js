import React, { Fragment } from "react";
import PropTypes from "prop-types";

import StaticInput from "../StaticInput";

import { Input, Field, Control, Label, Help, Column } from "rbx";

class Artigo extends React.Component {
  static propsTypes = {
    key: PropTypes.number,
    artigo: PropTypes.shape({
      phantom: PropTypes.bool,
      number: PropTypes.number,
      text: PropTypes.string,
      paragrafos: PropTypes.array,
      items: PropTypes.array
    })
  };

  getCalling() {
    if (this.props.artigo.phantom) {
      return " ";
    }
    if (this.props.artigo.number > 9) {
      return "Art. " + this.props.artigo.number;
    } else {
      return "Art. " + this.props.artigo.number + "°";
    }
  }

  handleClick(e) {
    if (this.props.phantom && this.props.new) {
      this.props.new();
    }
  }

  handleTextChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.artigo,
        text: e.target.value
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Column.Group>
          <Column size={1}>
            <strong>{this.getCalling()}</strong>
          </Column>
          <Column>
            <Field>
              <StaticInput
                child={Input}
                value={this.props.artigo ? this.props.artigo.text : ""}
                onChange={e => this.handleTextChange(e)}
                onClick={() => this.handleClick()}
                placeholder="Clique aqui para adicionar um novo artigo."
              />
            </Field>
          </Column>
        </Column.Group>
      </Fragment>
    );
  }
}

export default Artigo;
