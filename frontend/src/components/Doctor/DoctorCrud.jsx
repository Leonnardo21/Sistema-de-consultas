import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main';

import Logo from '../template/Logo';
import Nav from '../template/Nav';
import Footer from '../template/Footer';

const headerProps = {
    icon: 'user',
    title: 'Médicos',
    subtitle: 'Cadastro de médicos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/doctors';
const initialState = {
    doctor: { name: '', especiality: '', crm: '', turn: '', email: '', phone: '', birthday: '', cep: '', address: '' },
    list: []
}

export default class DoctorCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });
    }

    clear(){
        this.setState({ doctor: initialState.doctor});
    }

    save(){
        const doctor = this.state.doctor;
        const method = doctor.id ? 'put':'post';
        const url = doctor.id ? `${baseUrl}/${doctor.id}`: baseUrl;
        axios[method](url, doctor).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ doctor: initialState.doctor, list})
        });
    }

    getUpdatedList(doctor, add = true) {
        const list = this.state.list.filter(u => u.id !== doctor.id)
        if(add) list.unshift(doctor)
        return list
    }

    updateField(event) {
        const doctor = { ...this.state.doctor }
        doctor[event.target.name] = event.target.value
        this.setState({ doctor })
    }

    renderForm(){
        return(
            <div className="form">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.doctor.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome..." />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form-group">
                        <label>Especialidade</label>
                        <input type="text" className="form-control"
                            name="especiality"
                            value={this.state.doctor.especiality}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite sua especialidade..." />
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className="form-group">
                        <label>CRM</label>
                        <input type="number" className="form-control"
                            name="crm"
                            value={this.state.doctor.crm}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite seu CRM..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Turno</label>
                        <input type="text" className="form-control"
                            name="turn"
                            value={this.state.doctor.turn}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o turno..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" className="form-control"
                            name="email"
                            value={this.state.doctor.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o e-mail..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="text" className="form-control"
                            name="phone"
                            value={this.state.doctor.phone}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o telefone..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Data de Nascimento</label>
                        <input type="date" className="form-control"
                            name="birthday"
                            value={this.state.doctor.birthday}
                            onChange={e => this.updateField(e)}
                            placeholder="Data de Aniversáio" />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>CEP</label>
                        <input type="number" className="form-control"
                            name="cep"
                            value={this.state.doctor.cep}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite seu endereço..." />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>Endereço</label>
                        <input type="text" className="form-control"
                            name="address"
                            value={this.state.doctor.address}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite seu endereço..." />
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

    load(doctor) {
        this.setState({ doctor })
    }

    remove(doctor) {
        axios.delete(`${baseUrl}/${doctor.id}`).then(resp => {
            const list = this.getUpdatedList(doctor, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>CRM</th>
                        <th>Turno</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Data de Aniversário</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderRows(){
        return this.state.list.map(doctor => {
            return(
                <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.especiality}</td>
                    <td>{doctor.crm}</td>
                    <td>{doctor.turn}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.birthday}</td>
                    <td>{doctor.cep}</td>
                    <td>{doctor.address}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(doctor)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(doctor)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render(){
        return(
            <>
                <Logo />
                <Nav />
                <Main {...headerProps}>
                            {this.renderForm()}
                            {this.renderTable()}
                </Main>
                <Footer />
            </>
        );

    }
    
}
