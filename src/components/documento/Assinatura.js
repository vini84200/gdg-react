import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Field, Control, Column } from 'rbx';
import StaticInput from '../StaticInput';

class Assinatura extends React.Component {
    static propsTypes = {
      assinatura: PropTypes.Object,
      extra: PropTypes.String
    };
    handleClick(e) {

    }

    handleNomeChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                ...this.props.assinatura,
                nome: e.target.value,
            });
        }
    }
    handleCargoChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                ...this.props.assinatura,
                cargo: e.target.value,
            });
        }
    }

    render() {
        return (
            <Fragment>
              <Column offset="one-quarter" size="half" style={{textAlign: 'center'}}>
                <Control>
                <StaticInput
                child={Input}
                onChange={e => this.handleNomeChange(e)}
                onClick={() => this.handleClick()}
                value={this.props.assinatura.nome || ""}
                placeholder="Nome"
                style={{textAlign: 'center'}}
                />
                <StaticInput child={Input}
                onChange={e => this.handleCargoChange(e)}
                onClick={() => this.handleClick()}
                value={this.props.assinatura.cargo || ""}
                placeholder="Outros Cargos"
                style={{textAlign: 'center'}}/>
                </Control >
                {this.props.extra}.
              </Column>
            </Fragment>
        );
    }
}

export default Assinatura;


export const renderAssinaturaPDF = (assinatura, extra) => {
    return [
      {
        stack:
        [
          {text: assinatura.nome + ', ', bold: true},
          {text: assinatura.cargo + ', '},
          {text: extra + '. '},
        ],
        alignment: 'center',
        marginTop: 70
      }
    ];
};
