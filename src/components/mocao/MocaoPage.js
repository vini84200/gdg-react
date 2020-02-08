import React, { Component, Fragment } from 'react'
import {Container, Content} from 'rbx'
import PropTypes from 'prop-types'

import Numero from './Numero'

class MocaoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: undefined,
            year: 2020

        }
    }
    change_num(num) {
        this.setState({
            num: num,
        })
    }
  render() {
    return (
        <Fragment>
            <Container>
                <Content>
                    <h1>Criar uma 'Proposta de Resolução'</h1>
                    <Numero num={this.state.num} year={this.state.year} change_num={(num) => this.change_num(num)} />
                </Content>
            </Container>
        </Fragment>
    );
  }
}
export default MocaoPage
