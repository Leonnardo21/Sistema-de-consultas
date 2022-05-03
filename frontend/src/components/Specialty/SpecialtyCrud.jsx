import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main';

import Logo from '../template/Logo';
import Nav from '../template/Nav';
import Footer from '../template/Footer';

const headerProps = {
    icon: 'users',
    title: 'Especialidades',
    subtitle: 'Cadastro de especialidades: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/specialty';
const initialState = {
    specialty: { name: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ specialty: initialState.specialty })
    }

    save() {
        const specialty = this.state.specialty
        const method = specialty.id ? 'put' : 'post'
        const url = specialty.id ? `${baseUrl}/${specialty.id}` : baseUrl
        axios[method](url, specialty)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ specialty: initialState.specialty, list })
            })
    }

    getUpdatedList(specialty, add = true) {
        const list = this.state.list.filter(s => s.id !== specialty.id)
        if(add) list.unshift(specialty)
        return list
    }

    updateField(event) {
        const specialty = { ...this.state.specialty }
        specialty[event.target.name] = event.target.value
        this.setState({ specialty })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.specialty.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
                <hr />
            </div>
        )
    }

    load(specialty) {
        this.setState({ specialty })
    }

    remove(specialty) {
        axios.delete(`${baseUrl}/${specialty.id}`).then(resp => {
            const list = this.getUpdatedList(specialty, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <>
                <Logo />
                <Nav />
                <Main {...headerProps}>
                    {this.renderForm()}
                    {this.renderTable()}
                </Main>
                <Footer />
            </>
        )
    }
}