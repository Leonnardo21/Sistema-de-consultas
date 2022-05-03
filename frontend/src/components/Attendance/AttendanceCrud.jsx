import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main';

import Logo from '../template/Logo';
import Nav from '../template/Nav';
import Footer from '../template/Footer';

const headerProps = {
    icon: 'users',
    title: 'Atendimentos',
    subtitle: 'Cadastro de atendimentos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/attendance';
const initialState = {
    attendance: { name: '', price: '' },
    list: []
}

export default class AttendanceCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ attendance: initialState.attendance })
    }

    save() {
        const attendance = this.state.attendance
        const method = attendance.id ? 'put' : 'post'
        const url = attendance.id ? `${baseUrl}/${attendance.id}` : baseUrl
        axios[method](url, attendance)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ attendance: initialState.attendance, list })
            })
    }

    getUpdatedList(attendance, add = true) {
        const list = this.state.list.filter(a => a.id !== attendance.id)
        if(add) list.unshift(attendance)
        return list
    }

    updateField(event) {
        const attendance = { ...this.state.attendance }
        attendance[event.target.name] = event.target.value
        this.setState({ attendance })
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
                                value={this.state.attendance.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="number" className="form-control"
                                name="price"
                                value={this.state.attendance.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o valor..." />
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

    load(attendance) {
        this.setState({ attendance })
    }

    remove(attendance) {
        axios.delete(`${baseUrl}/${attendance.id}`).then(resp => {
            const list = this.getUpdatedList(attendance, false)
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
                        <th>Valor</th>
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
        return this.state.list.map(attendance => {
            return (
                <tr key={attendance.id}>
                    <td>{attendance.id}</td>
                    <td>{attendance.name}</td>
                    <td>{attendance.price}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(attendance)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(attendance)}>
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