import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import StaticInput from '../StaticInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Field, Control, Label, Help, Column, Button, Icon } from 'rbx';

class Artigo extends React.Component {
    static propsTypes = {
        key: PropTypes.number,
        artigo: PropTypes.shape({
            phantom: PropTypes.bool,
            number: PropTypes.number,
            text: PropTypes.string,
            paragrafos: PropTypes.array,
            items: PropTypes.array,
        }),
    };

    getCalling() {
        if (this.props.artigo.phantom) {
            return ' ';
        }
        if (this.props.artigo.number > 9) {
            return 'Art. ' + this.props.artigo.number;
        } else {
            return 'Art. ' + this.props.artigo.number + '°';
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
                text: e.target.value,
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
                anterior = this.props.artigo.items[
                    this.props.artigo.items.length - 1
                ].number;
            }

            items[id].number = anterior + 1;
        }

        this.props.onChange({
            ...this.props.artigo,
            items: items,
        });
    }

    add_item() {
        const id = 0;
        const items = [];
        items[id] = { text: '', phantom: 'true' };
        if (items[id].phantom) {
            items[id].phantom = false;
            let anterior = 0;
            if (this.props.artigo.items) {
                anterior = this.props.artigo.items[
                    this.props.artigo.items.length - 1
                ].number;
            }

            items[id].number = anterior + 1;
        }

        this.props.onChange({
            ...this.props.artigo,
            items: items,
        });
    }

    render() {
        const items =
            this.props.artigo.items && !this.props.artigo.phantom
                ? [...this.props.artigo.items]
                : [];
        if (items.length) items.push({ phantom: true });
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
                                value={
                                    this.props.artigo
                                        ? this.props.artigo.text
                                        : ''
                                }
                                onChange={e => this.handleTextChange(e)}
                                onClick={() => this.handleClick()}
                                placeholder="Clique aqui para adicionar um novo artigo."
                            />
                        </Field>

                        {items.map((item, id) => (
                            <Item
                                key={id}
                                item={item}
                                onChange={item => this.change_item(item, id)}
                            />
                        ))}
                    </Column>
                    {!this.props.artigo.items && !this.props.artigo.phantom && (
                        <Column size={1}>
                            <Button
                                color="info"
                                onClick={() => {
                                    this.add_item();
                                }}
                            >
                                <Icon size="small">
                                    <FontAwesomeIcon icon="plus" />
                                </Icon>
                                <span>Item</span>
                            </Button>
                        </Column>
                    )}
                    {!this.props.artigo.items && <Column size={1}></Column>}
                </Column.Group>
            </Fragment>
        );
    }
}

export default Artigo;
