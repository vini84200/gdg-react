import React, { Component } from 'react';
import { Container, Content, Message, Button, Icon, File, Column } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {downloadJSON} from '../utils'

import Numero from './Numero'
import Assinatura from '../documento/Assinatura';

const APP = 'gdg-gremio';
const API_VERSION = '0.1';

class MocaoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: undefined,
            year: (new Date()).getFullYear(),
            title: "",
            assinatura: {
              nome: "",
              cargo: ""
            },
            saved: true,

        };
    }

    exportar_pdf() {
        MakePDF(this.state);
    }

    onJsonUploadChange(e){
      const file = this.uploadJSONInput.files[0];
      var reader = new FileReader();
      reader.onload = ((e) => {this.onJsonLoad(JSON.parse(e.target.result))});
      reader.readAsText(file);

    }

    onJsonLoad(data) {
      console.log(data);
      if (data.app !== APP)
      {
        alert("Erro! Esse arquivo não foi gerado por esse aplicativo. Verifique se selecionou o certo.");
        return;
      }
      if (data.api_version !== API_VERSION)
      {
        alert("Atenção! Esse arquivo é de uma versão diferente da API do app! Ele será aberto, mas podem haver problemas")
      }
      if (data.type !== 'ata')
      {
        alert("Erro! Esse arquivo não é uma Ata. Ele é um(a) " + data.type);
        return;
      }
      if (!this.state.saved){
        if(!window.confirm("Você ainda não salvou os dados atuais, deseja sobreescrevelos com o arquivo sendo carregado?")){
            return;
        }
      }
      this.setState({
        ...data,
        app: undefined,
        type: undefined,
        api_version: undefined,
        saved: true,

      })
    }

    exportar_dados() {
      this.setState({
          saved: true,
      });
      return {
        ...this.state,
        app: APP,
        type: 'ata',
        api_version: API_VERSION,
        saved: undefined,
      }

    }

    render() {
        return (
            <Column>
                <Container>
                    <Content>
                      <Numero
                      num={this.state.number}
                      year={this.state.year}
                      title={this.state.title}
                      change_num= {(num) => {
                        this.setState({
                        number: num,
                        saved: false
                        })
                      }}
                      change_year= {(year) => {
                        this.setState({
                        year: year,
                        saved: false
                        })
                      }}
                      change_title= {(title) => {
                        this.setState({
                          title: title,
                          saved: false
                        })
                      }}
                      />
                    </Content>
                    <Message>{JSON.stringify({ ...this.state })}</Message>
                </Container>
            </Column>
        );
    }
}
export default MocaoPage;

const MakePDF = () => {

}
