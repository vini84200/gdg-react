import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Field, Column } from 'rbx';
import StaticInput from '../StaticInput';
import {romanize} from './utils'

const getCalling = (num) => {
  return romanize(num) + '. ';
}

class Item extends React.Component {
    static propsTypes = {
        key: PropTypes.number,
        item: PropTypes.shape({
            phantom: PropTypes.bool,
            number: PropTypes.number,
            text: PropTypes.string,
            calling: PropTypes.string,
        }),
    };

    getCalling() {
        if (this.props.item.phantom) {
            return ' ';
        }
        if (this.props.item.calling)
            return this.props.item.calling;
        return getCalling(this.props.item.number)
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
                text: e.target.value,
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
                                value={
                                    this.props.item ? this.props.item.text : ''
                                }
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


export const renderItemPDF = item => {
    return [
        {text: item.calling || getCalling(item.number), bold: true},
		[item.text, ]
    ];
};
