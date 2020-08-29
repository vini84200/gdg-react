import React, { Fragment } from 'react';
import { Navbar } from 'rbx';
import 'rbx/index.css';

import {
  Link
} from "react-router-dom";


function Header() {
    return (
        <Fragment>
            <Navbar>
                <Navbar.Item>
                    <Navbar.Brand>
                        <Link to="/">GDG</Link>
                    </Navbar.Brand>
                </Navbar.Item>
            </Navbar>
        </Fragment>
    );
}

export default Header;
