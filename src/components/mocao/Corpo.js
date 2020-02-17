import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Artigo from './Artigo';

class Corpo extends React.Component {
  change_artigo(artigo, id) {
    this.props.change_artigo(artigo, id);
  }

  add_artigo() {
    this.props.add_artigo();
  }
  render() {
    const artigos = [...this.props.corpo, { phantom: true }];
    return (
      <Fragment>
        {artigos.map((artigo, id) => (
          <Artigo
            key={id}
            artigo={artigo}
            onChange={artigo => this.change_artigo(artigo, id)}
            new={() => {
              this.add_artigo();
            }}
          />
        ))}
      </Fragment>
    );
  }
}

export default Corpo;
