import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from './UserList'


export const People = () => {


  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)

  // Obtenido el NextPage
  const nextPage = UserList.nextPage

  useEffect(() => {

    getUser(1);

  }, [])



  const getUser = async (nextPage = 1) => {
    // Efecto de carga
    setLoading(true)

    //Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();


    //Crear un estado para poder Listarlo
    if (data.users && data.status == "success") {

      let newUsers = data.users.docs

      if (users.length >= 1) {
        newUsers = [...users, ...data.users.docs]
      }

      setUser(newUsers)
      setFollowing(data.user_following);
      setLoading(false)

      // console.log(users)

    }

    //Pagination
    if (users.length >= (data.totalDocs - data.users.docs.length)) {
      setMore(false);
    }

  }



  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Personas</h1>
      </header>

      <UserList users={users}
       getUser={getUser}
       following={following}
       setFollowing={setFollowing}
       page={page}
       setPage={setPage}
       more={more}
       loading={loading}
       nextPage={nextPage} 
      />


      <br />


    </>
  )
}
