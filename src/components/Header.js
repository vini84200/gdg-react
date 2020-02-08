import React, {Fragment} from 'react';
import {Navbar} from 'rbx'
import "rbx/index.css";


function Header() {
  return (
      <Fragment>
        <Navbar>
            <Navbar.Item>
                <Navbar.Brand>
                    <h2>GDG</h2>
                </Navbar.Brand>
            </Navbar.Item>
            <Navbar.Item>
            Home
            </Navbar.Item>
        </ Navbar>
      </Fragment>
  );
}

export default Header;
