import React, { Component, Fragment } from 'react';
import { Container, Content, Column, Card, Title } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Link
} from "react-router-dom";


class MocaoPage extends Component {

    render() {
        return (
            <Fragment>
                <Container>
                    <Content>
                    <Column>
                      <Title>GDG - O seu gerador de documentos do grêmio.</Title>
                      <p>Esse projeto foi criado para facilitar a criação de
                       documentos formatados corretamente e de forma padronizada.
                       Tudo isso de forma simples e rápida.</p>

                       <h3><FontAwesomeIcon icon='list' /> Criar um documento:</h3>
                       <Column>

                       <Card>
                       <Card.Content>

                       <Link to="/resolucao">
                       <h5>Resolução (ou um projeto de resolucao)</h5>
                       <p>Uma resolucao é um decisão oficial do grêmio, que detalha alguma ação do grêmio.
                        Resoluções devem ser apresentadas nas reuniões do grêmio, e só poderão ser aprovadas em uma reunião.
                       </p>

                       </Link>
                       </Card.Content>
                       </Card>

                       </Column>
                       </Column>
                    </Content>
                </Container>
            </Fragment>
        );
    }
}
export default MocaoPage;
