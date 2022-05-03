/* eslint-disable import/no-anonymous-default-export */
import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar */}
            <Link to='/home'>
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to='/users'>
                <i className="fa fa-users" /> Usuários
            </Link>
            <Link to='/doctors'>
                <i class="fa fa-user" /> Médicos
            </Link>
            <Link to='/specialty'>
                <i class="fa fa-user" /> Especialidades
            </Link>
            <Link to='/attendance'>
                <i class="fa fa-user" /> Atendimentos
            </Link>
        </nav>
    </aside>