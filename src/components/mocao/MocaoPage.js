import React, { Component, Fragment } from "react";
import { Container, Content, Message, Button, Icon } from "rbx";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MakePDF from './MakePDF'

import Numero from "./Numero";
import Ementa from "./Ementa";
import Corpo from "./Corpo";

class MocaoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: undefined,
      year: 2020,
      ementa: "",
      corpo: [
        {
          number: 1,
          text: "São coisas possiveis:",
          items: [
            { number: 1, text: "Que as pessoas gostem desse site." },
            { number: 2, text: "Que as pessoas odeiem esse site." }
          ]
        }
      ]
    };
  }

  change_num(num) {
    this.setState({
      num: num
    });
  }

  change_ementa(text) {
    this.setState({
      ementa: text
    });
  }

  add_artigo(artigo) {
    const artigos = [...this.state.corpo];
    artigos.push({
      number: this.state.corpo[this.state.corpo.length - 1].number + 1
    });
    this.setState({
      corpo: artigos
    });

    console.log("Added artigo");
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
      corpo: artigos
    });
  }

  exportar_pdf(){
      MakePDF()
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
                      this.exportar_pdf()
                  }}
                >
                  <Icon size="small">
                    <FontAwesomeIcon icon="file-pdf" />
                  </Icon>
                  <span>Exportar PDF</span>
                </Button>
            </Button.Group>

            <Numero
              num={this.state.num}
              year={this.state.year}
              change_num={num => this.change_num(num)}
            />
            <Ementa
              ementa={this.state.ementa}
              change_ementa={text => this.change_ementa(text)}
            />

            <Corpo
              corpo={this.state.corpo}
              change_artigo={(artigo, id) => this.change_artigo(artigo, id)}
              add_artigo={() => {
                this.add_artigo();
              }}
            />
          </Content>
          <Message>{JSON.stringify({ ...this.state })}</Message>
        </Container>
      </Fragment>
    );
  }
}
export default MocaoPage;
