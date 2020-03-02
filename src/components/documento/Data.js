import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Field, Control, Column } from 'rbx';
import StaticInput from '../StaticInput';
import {convertMes} from '../mocao/utils'

class Data extends React.Component {
    static propsTypes = {
      data: PropTypes.Object,
    };

    handleClick(e) {

    }

    handleDataChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                ...this.props.assinatura,
                nome: e.target.value,
            });
        }
    }

    render() {
        return (
            <Fragment>
              <Column offset="half" size="half" style={{textAlign: 'center'}}>
                <Control>
                <StaticInput
                child={Input}
                onChange={e => this.handleDataChange(e)}
                onClick={() => this.handleClick()}
                value={this.props.data || ""}
                placeholder={"Data(ex. \"Carlos Barbosa, 18 de fevereiro de 2020.\")"}
                style={{textAlign: 'center'}}
                />.
                </Control>
              </Column>
            </Fragment>
        );
    }
}

export default Data;

export const getDataDefault = () => {
  const date = new Date(),
        dia = date.getDate(),
        mes_num = date.getMonth() + 1,
        ano = date.getFullYear(),
        mes = convertMes(mes_num);
  return `Carlos Barbosa, ${dia} de ${mes} de ${ano}.`
}

export const renderDataPDF = (data, extra) => {
    return [
      {
        stack:
        [
          {text: data, bold: true},
        ],
        alignment: 'right',
      }
    ];
};
