import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import UseAuth from '../../../hooks/UseAuth'

export const PrivateLayout = () => {

    const { auth, loading } = UseAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    } else {


        return (
            <>
                {/* LAYOUT */}
                <Header />

                {/* Contenido principal */}
                <section className='layout__content'>
                    {auth._id ?
                        <Outlet />
                        :
                        <Navigate to="/login" />
                    }
                </section>

                {/* Barra Letral */}

                <Sidebar />

            </>
        );
    }
}
