import React, { Component, Fragment } from 'react';
import { Container, Content, Message, Button, Icon, File } from 'rbx';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MakePDF from './MakePDF';
import {downloadJSON} from './utils'

import Numero from './Numero';
import Ementa from './Ementa';
import Corpo from './Corpo';
import Assinatura from '../documento/Assinatura';

const APP = 'gdg-gremio';
const API_VERSION = '0.2';

class MocaoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: undefined,
            year: 2020,
            ementa: '',
            corpo: [
                {
                    number: 1,
                    text: 'São coisas possiveis:',
                    items: [
                        {
                            number: 1,
                            text: 'Que as pessoas gostem desse site.',
                        },
                        { number: 2, text: 'Que as pessoas odeiem esse site.' },
                    ],
                },
            ],
            data: {},
            assinatura: {
              nome: "",
              cargo: ""
            },
            saved: true,

        };
    }

    change_num(num) {
        this.setState({
            num: num,
            saved: false,
        });
    }

    change_ementa(text) {
        this.setState({
            ementa: text,
            saved: false,
        });
    }

    add_artigo(artigo) {
        const artigos = [...this.state.corpo];
        artigos.push({
            number: this.state.corpo[this.state.corpo.length - 1].number + 1,
        });
        this.setState({
            corpo: artigos,
            saved: false,
        });

        console.log('Added artigo');
    }

    change_artigo(artigo, id) {
        const artigos = [...this.state.corpo];
        artigos[id] = artigo;
        if (artigos[id].phantom) {
            artigos[id].phantom = false;
            let anterior = 0;
            if (this.state.corpo.length) {
                anterior = this.state.corpo[this.state.corpo.length - 1].number;
            }

            artigos[id].number = anterior + 1;
        }
        this.setState({
            corpo: artigos,
            saved: false,
        });
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
      if (data.type !== 'resulucao')
      {
        alert("Erro! Esse arquivo não é uma proposta de Resolução ou uma Resolução. Ele é um(a) " + data.type);
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
        type: 'resulucao',
        api_version: API_VERSION,
        saved: undefined,
      }

    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Content>
                        <h1>Criar uma 'Proposta de Resolução'</h1>

                        <Button.Group>
                            <Button
                                color="info"
                                onClick={() => {
                                    this.exportar_pdf();
                                }}
                            >
                                <Icon size="small">
                                    <FontAwesomeIcon icon="file-pdf" />
                                </Icon>
                                <span>Exportar PDF</span>
                            </Button>
                            <Button
                                color="info"
                                onClick={() => {
                                  downloadJSON(this.exportar_dados(), `proposta mocao ${this.state.num} de ${this.state.year}.json`)
                                }}
                            >
                                <Icon size="small">
                                    <FontAwesomeIcon icon="file-export" />
                                </Icon>
                                <span>Exportar JSON</span>
                            </Button>
                            <File >
                              <File.Label>
                                <File.Input
                                  ref={(ref) => {this.uploadJSONInput = ref;}}
                                  onChange={(e) => {this.onJsonUploadChange(e)}}
                                  accept=".json, application/json"
                                   />
                                <Button
                                    color="info"
                                    as="div"
                                >
                                    <Icon size="small">
                                        <FontAwesomeIcon icon="file-upload" />
                                    </Icon>
                                    <span>Importar JSON</span>
                                </Button>
                              </File.Label>
                            </File>

                        </Button.Group>

                        <Numero
                            num={this.state.num}
                            year={this.state.year}
                            change_num={num => this.change_num(num)}
                            change_year={year => this.setState({year:year, saved:false})}
                        />
                        <Ementa
                            ementa={this.state.ementa}
                            change_ementa={text => this.change_ementa(text)}
                        />

                        <Corpo
                            corpo={this.state.corpo}
                            change_artigo={(artigo, id) =>
                                this.change_artigo(artigo, id)
                            }
                            add_artigo={() => {
                                this.add_artigo();
                            }}
                        />
                        <h3> Assinaturas </h3>
                        <Assinatura assinatura={this.state.assinatura} extra="Proponente" onChange={(ass)=>{this.setState({assinatura: ass})}} />

                    </Content>
                    <Message>{JSON.stringify({ ...this.state })}</Message>
                </Container>
            </Fragment>
        );
    }
}
export default MocaoPage;
