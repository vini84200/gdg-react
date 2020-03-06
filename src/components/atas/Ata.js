import React, { Component } from "react";
import { Container, Content, Message, Button, Icon, File, Column } from "rbx";
import { downloadJSON } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { livroAtaDefault, getLivroAta } from "../../config";
import { makeAndOpenDocument } from "../documento/MakePDF.js";

import Numero from "./Numero";
import Livro from "./Livro";
import Corpo from "./Corpo";
import Assinatura, { renderAssinaturaPDF } from "../documento/Assinatura";

const APP = "gdg-gremio";
const API_VERSION = "0.1";

class MocaoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: undefined,
      year: new Date().getFullYear(),
      title: "",
      livro: livroAtaDefault.cod,
      corpo: "",
      assinatura_secretario: {
        nome: "",
        cargo: ""
      },
      assinatura_presidente: {
        nome: "",
        cargo: ""
      },
      saved: true
    };
  }

  exportar_pdf() {
    generatePDF(this.state);
  }

  onJsonUploadChange(e) {
    const file = this.uploadJSONInput.files[0];
    var reader = new FileReader();
    reader.onload = e => {
      this.onJsonLoad(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  }

  onJsonLoad(data) {
    console.log(data);
    if (data.app !== APP) {
      alert(
        "Erro! Esse arquivo não foi gerado por esse aplicativo. Verifique se selecionou o certo."
      );
      return;
    }
    if (data.api_version !== API_VERSION) {
      alert(
        "Atenção! Esse arquivo é de uma versão diferente da API do app! Ele será aberto, mas podem haver problemas"
      );
    }
    if (data.type !== "ata") {
      alert("Erro! Esse arquivo não é uma Ata. Ele é um(a) " + data.type);
      return;
    }
    if (!this.state.saved) {
      if (
        !window.confirm(
          "Você ainda não salvou os dados atuais, deseja sobreescrevelos com o arquivo sendo carregado?"
        )
      ) {
        return;
      }
    }
    this.setState({
      ...data,
      app: undefined,
      type: undefined,
      api_version: undefined,
      saved: true
    });
  }

  exportar_dados() {
    this.setState({
      saved: true
    });
    return {
      ...this.state,
      app: APP,
      type: "ata",
      api_version: API_VERSION,
      saved: undefined
    };
  }

  render() {
    return (
      <Column>
        <Container>
          <Content>
            <h1>Criar uma Ata</h1>

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
                  downloadJSON(
                    this.exportar_dados(),
                    `proposta mocao ${this.state.num} de ${this.state.year}.json`
                  );
                }}
              >
                <Icon size="small">
                  <FontAwesomeIcon icon="file-export" />
                </Icon>
                <span>Exportar JSON</span>
              </Button>
              <File>
                <File.Label>
                  <File.Input
                    ref={ref => {
                      this.uploadJSONInput = ref;
                    }}
                    onChange={e => {
                      this.onJsonUploadChange(e);
                    }}
                    accept=".json, application/json"
                  />
                  <Button color="info" as="div">
                    <Icon size="small">
                      <FontAwesomeIcon icon="file-upload" />
                    </Icon>
                    <span>Importar JSON</span>
                  </Button>
                </File.Label>
              </File>
            </Button.Group>

            <Numero
              num={this.state.number}
              year={this.state.year}
              title={this.state.title}
              change_num={num => {
                this.setState({
                  number: num,
                  saved: false
                });
              }}
              change_year={year => {
                this.setState({
                  year: year,
                  saved: false
                });
              }}
              change_title={title => {
                this.setState({
                  title: title,
                  saved: false
                });
              }}
            />
            <Livro
              livro={this.state.livro}
              onChange={livro => {
                this.setState({
                  livro: livro,
                  saved: false
                });
              }}
            />
            <Corpo
              corpo={this.state.corpo}
              change={value => {
                this.setState({ corpo: value, saved: false });
              }}
            />
            <Assinatura
              assinatura={this.state.assinatura_secretario}
              extra={"Secretário"}
              onChange={ass => {
                this.setState({ assinatura_secretario: ass });
              }}
            />
            <Assinatura
              assinatura={this.state.assinatura_presidente}
              extra={"Presidente"}
              onChange={ass => {
                this.setState({ assinatura_presidente: ass });
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

const generatePDF = async ata => {
  const documentDefinition = {
    content: [
      {
        text: `ATA Nº ${ata.number}/${ata.year} - ${ata.title}`,
        bold: true
      },
      {
        text: `Registrada no livro ${getLivroAta(ata.livro).title}`,
        bold: true
      },
      {
        text: ata.corpo.replace(/\r?\n|\r/g, " "),
        alignment: "justify",
        margin: [10, 10, 0, 10],
        lineHeight: 1.5
      },
      renderAssinaturaPDF(ata.assinatura_secretario, "Secretário"),
      renderAssinaturaPDF(ata.assinatura_presidente, "Presidente")
    ]
  };
  makeAndOpenDocument(documentDefinition);
};
