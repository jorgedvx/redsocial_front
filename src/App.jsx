import { useState } from 'react'
import { Header } from './components/layout/public/Header'
import { Routing } from './router/Routing'


function App() {


  return (

    <div className='layout'>

      {/* Cargando toda la configuracion de ruta */}

      <Routing/>


    </div>

  )
}

export default App
