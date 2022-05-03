/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import useAuth from '../../hooks/userAuth';
import { firebase, auth } from '../../services/firebase';
import './Login.css';

export default function Login(){

    const {user, setUser} = useAuth();   

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                const { uid, displayName, photoURL } = user;

                if(!displayName || !photoURL) throw new Error('O usuário não tem displayName ou photoUrl');
    
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                });
            }
        });
    }, []);

    const handleClickButtonLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if(result.user){
            const { uid, displayName, photoURL } = result.user;

            if(!displayName || !photoURL) throw new Error('O usuário não tem displayName ou photoUrl');

            setUser({
                id: uid,
                avatar: photoURL,
                name: displayName
            });
        }
    }

    return(
        <div className="container">
            <form class="form-signin">
                <img class="mb-4" src="https://lh3.googleusercontent.com/57dJoj4gbG3wfsIJKRRpz55tgSH1TFQPpF3YtE6f14DctPCM__T_ft3QMVvc9RCw57iv5LzVddkySPonGiWX=w1024" alt="" width="96" height="96" />
                <h1 class="h3 mb-3 font-weight-normal">Sistema de Consultas</h1>
                <label for="inputEmail" class="sr-only">Usuário</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Usuário" required autofocus />
                <label for="inputPassword" class="sr-only">Senha</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Senha" required />
                <div class="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me" /> Lembra-me
                </label>
        </div>
        <a href='/home' class="btn btn-lg btn-primary btn-block" type="submit">Login</a>
        <button onClick={handleClickButtonLogin} class="btn btn-lg btn-primary btn-block" type="submit">Login com google</button>
    </form>
    <a href='#'>Não tem uma conta? <strong>Cadastre-se</strong></a>
    </div>
    
    );
} 




