import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../../hooks/UseAuth';

export const Logaut = () => {

    const {setAuth, setCounters} = UseAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        // Vaciar el localStorage
        localStorage.clear();

        // Setear estados globales a vacio
        setAuth({});
        setCounters({});

        // Navigate (redireccion) al login
        navigate("/login");
    })
  return (
    <h1>Cerrando sesion..</h1>
  )
}
