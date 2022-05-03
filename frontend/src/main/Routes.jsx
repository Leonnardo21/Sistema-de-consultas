/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import Login from "../components/Login/Login";
import UserCrud from "../components/user/UserCrud";
import DoctorCrud from "../components/Doctor/DoctorCrud";
import SpecialtyCrud from '../components/Specialty/SpecialtyCrud';
import AttendanceCrud from '../components/Attendance/AttendanceCrud';

export default props => 
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/users' element={<UserCrud />}/>
        <Route path='/doctors' element={<DoctorCrud />}/>
        <Route path='/specialty' element={<SpecialtyCrud />}/>
        <Route path='/attendance' element={<AttendanceCrud />}/>
    </Routes>