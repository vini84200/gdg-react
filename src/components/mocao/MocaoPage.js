import React, { Component, Fragment } from "react";
import { Container, Content } from "rbx";
import PropTypes from "prop-types";

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
          id: 0,
          number: 1,
          text: "This is a article"
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
      artigos[id].number =
        this.state.corpo[this.state.corpo.length - 1].number + 1;
    }
    this.setState({
      corpo: artigos
    });
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Content>
            <h1>Criar uma 'Proposta de Resolução'</h1>
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
        </Container>
      </Fragment>
    );
  }
}
export default MocaoPage;
