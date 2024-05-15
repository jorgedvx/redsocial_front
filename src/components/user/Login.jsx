import React, { useState } from 'react'
import { userForm } from '../../hooks/userForm'
import { Global } from '../../helpers/Global';
import UseAuth from '../../hooks/UseAuth';
import { useForm } from 'react-hook-form'


export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { form, changed } = userForm({});
    const [saved, setSaved] = useState("not_sended")

    const { setAuth } = UseAuth();


    const loginUser = async () => {

        // e.preventDefault();

        // Datos del formulario
        let userToLogin = form;

        // Peticion del backen
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        // Persistir los datos en el navegador

        if (data.status == "success") {

            // Persistir los datos en el navegador

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setSaved("login")

            // Setear datos en el auth
            setAuth(data.user);

            // Redireccion
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } else {
            setSaved("error")
        }




    }

    return (
        <>

            <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>

            <div className="content__posts">

                {saved == "login" ?
                    <strong className='alert alert-success'> Usuario identificado correctamente !! </strong>
                    : ""}

                {saved == "error" ?
                    <strong className='alert alert-danger'> Usuario no se ha identificado !! </strong>
                    : ""}

                <form className='form-login' onSubmit={handleSubmit(loginUser)} >

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input {...register('email', { required: true })} type="email" name="email" onChange={changed} />
                        <p className='text-danger'>{errors.email?.type === 'required' && "Este campo es obligatorio!"}</p>
                    </div>


                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input {...register('password', { required: true })} type="password" name="password" onChange={changed} />
                        <p className='text-danger' >{errors.password?.type === 'required' && "Este campo es obligatorio!"}</p>
                    </div>

                    <input type="submit" value="Identificate" className="btn btn-succeess" />

                </form>

            </div>

        </>
    )
}
