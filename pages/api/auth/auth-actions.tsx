import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';
import Login from '../../index';
import { NextPage } from 'next';
import jwt_decode from "jwt-decode"
import { LOGIN_USER_URL } from '../services/ApiRouter';
import { AxiosResponse } from 'axios';


type Props = {
    children: React.ReactNode
}

type LoginTypePropsEmail = {
    email: string;
}

type LoginTypePropsPassword = {
    password: string;
}

interface IAppContextInterface {
    isAuthenticated: boolean;
    user?: any;
    login: Function;
    logout?: Function;
    loading: boolean
}

const defaultContext = {
    isAuthenticated: false,
    loading: false,
    login: () => { }
}

const AuthContext = createContext<IAppContextInterface>(defaultContext);


export const AuthProvider = ({ children }: Props) => {

    const [user, setUser] = useState<any>({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid");

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const user = jwt_decode(token)
                setUser(user)
                if (user) setUser(user);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, []);

    //  connexion de l'utiliszteur
    const login = async (email: LoginTypePropsEmail, pass: LoginTypePropsPassword) => {
        let httpResponse;

        try {
            const { data: res } = await api.post(`${LOGIN_USER_URL}`, { email, pass })
            const accessToken = res.access_token

            if (accessToken) {
                Cookies.set('token', accessToken, { expires: 60 })
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                setUser(jwt_decode(accessToken))
                httpResponse = { status: "succes", message: "Opération effectuée avec succès" }
            }
            else {
                httpResponse = { status: "error", message: "Invalid credentials" }
            }

            return httpResponse;
        } catch (error: any) {
            return { status: "error", error: error }
        }


    }

    // deconnexion de l'utilisateur
    const logout = (email: LoginTypePropsEmail, password: LoginTypePropsPassword) => {
        Cookies.remove('token')
        setUser({})
        delete api.defaults.headers.common['Authorization']
        window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login: login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

interface ProtectRouteType {
    children: React.ReactElement
}

export const ProtectRoute = ({ children }: ProtectRouteType) => {
    const { isAuthenticated, loading, user }: Partial<IAppContextInterface> = useAuth();

    if (Object.keys(user).length === 0) {
        if (!isAuthenticated) {
            return <Login />;
        }
    }

    return children;
};