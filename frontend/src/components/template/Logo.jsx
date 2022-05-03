import './Logo.css';
import React from 'react';
import Logo from '../../assets/imgs/Logo.png';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={Logo} alt="Logo" />
        </Link>
    </aside>