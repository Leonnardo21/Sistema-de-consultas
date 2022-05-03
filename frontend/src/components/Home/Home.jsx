/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Main from '../template/Main';
import Logo from '../template/Logo';
import Nav from '../template/Nav';
import Footer from '../template/Footer';

export default props => 
<>
    <Logo />
    <Nav />
    <Main icon="home" title="Início" subtitle="Projeto de Integração de Análise e Desenvolvimento de Sistemas">
        <div className="display-4">Bem-Vindo</div>
    </Main>
    <Footer />
</>