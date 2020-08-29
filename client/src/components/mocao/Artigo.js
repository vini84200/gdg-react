import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import StaticInput from "../StaticInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Input,
  Field,
  Column,
  Button,
  Control,
  Icon,
  Level,
  Dropdown
} from "rbx";

import { renderItemPDF } from "./Item";

const getCalling = num => {
  if (num) {
    return "Art. " + num;
  } else {
    return "Art. " + num + "°";
  }
};

class Artigo extends React.Component {
  static propsTypes = {
    key: PropTypes.number,
    artigo: PropTypes.shape({
      phantom: PropTypes.bool,
      number: PropTypes.number,
      text: PropTypes.string,
      paragrafos: PropTypes.array,
      items: PropTypes.array,
      calling: PropTypes.string
    })
  };

  getCalling() {
    if (this.props.artigo.phantom) {
      return " ";
    }
    if (this.props.artigo.calling) {
      return this.props.artigo.calling;
    }
    return getCalling(this.props.artigo.number);
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

  change_item(item, id) {
    const items = [...this.props.artigo.items];
    items[id] = item;
    if (items[id].phantom) {
      items[id].phantom = false;
      let anterior = 0;
      if (this.props.artigo.items) {
        anterior = this.props.artigo.items[this.props.artigo.items.length - 1]
          .number;
      }

      items[id].number = anterior + 1;
    }

    this.props.onChange({
      ...this.props.artigo,
      items: items
    });
  }

  add_item() {
    const id = 0;
    const items = [];
    items[id] = { text: "", phantom: "true" };
    if (items[id].phantom) {
      items[id].phantom = false;
      let anterior = 0;
      if (this.props.artigo.items) {
        anterior = this.props.artigo.items[this.props.artigo.items.length - 1]
          .number;
      }

      items[id].number = anterior + 1;
    }

    this.props.onChange({
      ...this.props.artigo,
      items: items
    });
  }

  delete() {
    this.props.delete_artigo(this.props.index);
  }

  render() {
    const items =
      this.props.artigo.items && !this.props.artigo.phantom
        ? [...this.props.artigo.items]
        : [];
    if (items.length) items.push({ phantom: true });
    return (
      <div style={{ style: "inline" }}>
        <Column.Group>
          <Column size={1}>
            <strong>{this.getCalling()}</strong>
          </Column>
          <Column>
            <Field kind="addons">
              <StaticInput
                child={Input}
                value={this.props.artigo ? this.props.artigo.text : ""}
                onChange={e => this.handleTextChange(e)}
                onClick={() => this.handleClick()}
                placeholder="Clique aqui para adicionar um novo artigo."
              />
              {!this.props.artigo.phantom && (
                <Control>
                  <Dropdown align="right">
                    <Dropdown.Trigger>
                      <Button color="info">
                        <Icon size="small">
                          <FontAwesomeIcon icon="plus" />
                        </Icon>
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu>
                      <Dropdown.Content>
                        <Dropdown.Item onClick={() => this.add_item()}>
                          <Icon size="small">
                            <FontAwesomeIcon icon="plus" />
                          </Icon>
                          <span>Inciso</span>
                        </Dropdown.Item>
                      </Dropdown.Content>
                    </Dropdown.Menu>
                  </Dropdown>
                </Control>
              )}
              {!this.props.artigo.phantom && (
                <Control>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.delete();
                    }}
                  >
                    <Icon size="small">
                      <FontAwesomeIcon icon="trash-alt" />
                    </Icon>
                  </Button>
                </Control>
              )}
            </Field>

            {items.map((item, id) => (
              <Item
                key={id}
                item={item}
                onChange={item => this.change_item(item, id)}
              />
            ))}
          </Column>
        </Column.Group>
      </div>
    );
  }
}

export default Artigo;

export const renderArtigoPDF = artigo => {
  return [
    { text: artigo.calling || getCalling(artigo.number), bold: true },
    [artigo.text, renderItems(artigo.items)]
  ];
};

const renderItems = items => {
  if (items) {
    return {
      layout: "noBorders",
      table: {
        widths: [35, "*"],
        margins: [0, 50],
        body: items.map(item => renderItemPDF(item))
      }
    };
  }
  return;
};
