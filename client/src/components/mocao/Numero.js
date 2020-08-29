import React from 'react';
import { Input, Field, Control } from 'rbx';
import StaticInput from '../StaticInput';

const getTitle = (type) => {
    if (type === 'proposta')
      return `PROJETO DE RESOLUÇÃO Nº`

    if (type === 'resolucao')
      return `RESOLUÇÃO Nº `

    if (type === 'proposta_emenda')
      return `PROJETO DE EMENDA EM RESOLUÇÃO Nº `

    if (type === 'emenda')
      return `EMENDA EM RESOLUÇÃO Nº `

    if (type === 'projeto_emenda_estatuto')
      return `PROJETO DE EMENDA AO ESTATUTO DO GRÊMIO Nº `

    if (type === 'emenda_estatuto')
      return `EMENDA AO ESTATUTO DO GRÊMIO Nº `
}

class Numero extends React.Component {
    onChange(event) {
        this.props.change_num(event.target.value);
    }



    render() {
        return (
            <Field kind="addons">
                <strong style={{marginLeft: "10px", height: "24px", padding:"5px" }}>{getTitle(this.props.type)}</strong>
                <Control>
                    <StaticInput
                        child={Input}
                        textAlign="right"
                        style={{
                            width: '60px',
                        }}
                        value={this.props.num}
                        onChange={e => this.onChange(e)}
                    />
                </Control>
                <span style={{marginLeft: "10px", height: "24px", padding:"5px" }}> / </span>
                <Control>
                    <StaticInput child={Input}
                     style={{
                        width: '60px',
                    }}
                    value={this.props.year} onChange={e => this.props.change_year(e.target.value)}></StaticInput>
                </Control>
            </Field>
        );
    }
}

export default Numero;
