import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => (
    <nav className = "side-drawer">
        <ul>
            <li><a>Convert to PDF</a></li>
            <li><a>Convert to Excel</a></li>
        </ul>
    </nav>
);

export default sideDrawer;