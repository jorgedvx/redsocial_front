import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import UseAuth from '../../../hooks/UseAuth'

export const PublicLayout = () => {

    const {auth} = UseAuth()

    return (
        <>
            {/* LAYOUT */}
            <Header/>

            {/* Contenido principal */}
            <section className='layout__content'>
               {!auth._id ? 
                <Outlet/>
                :
                <Navigate to="/social"/>
               }
            </section>

        </>
    )
}
