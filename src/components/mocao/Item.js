import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Input, Field, Control, Label, Help, Column } from "rbx";
import StaticInput from "../StaticInput";

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX"
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

class Item extends React.Component {
  static propsTypes = {
    key: PropTypes.number,
    item: PropTypes.shape({
      phantom: PropTypes.bool,
      number: PropTypes.number,
      text: PropTypes.string
    })
  };

  getCalling() {
    if (this.props.item.phantom) {
      return " ";
    }
    return romanize(this.props.item.number) + ". ";
  }

  handleClick(e) {
    if (this.props.phantom && this.props.new) {
      this.props.new();
    }
  }

  handleTextChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        ...this.props.item,
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
                value={this.props.item ? this.props.item.text : ""}
                onChange={e => this.handleTextChange(e)}
                onClick={() => this.handleClick()}
                placeholder="Clique aqui para adicionar um item."
              />
            </Field>
          </Column>
        </Column.Group>
      </Fragment>
    );
  }
}

export default Item;
