import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom';
import { GetProfile } from '../../helpers/GetProfile';


export const Followers = () => {


  const [users, setUser] = useState([]);
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState({})

  // Obtenido el NextPage
  const nextPage = UserList.nextPage

  // Conseguir params
  const params = useParams();

  useEffect(() => {

    getUser(1);
    GetProfile(params.userId, setUserProfile);

  }, [])



  const getUser = async (nextPage = 1) => {
    // Efecto de carga
    setLoading(true)

    //Sacar userId de la url
    const userId = params.userId;

    //Peticion para sacar usuarios
    const request = await fetch(Global.url + "follow/followers/" + userId + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();



    // Recorrer y limpiar follows para quedarme con followed

    let clearUsers = []
    data.follows.forEach(follow =>{
        clearUsers = [...clearUsers, follow.user]
    })


    data.users = clearUsers

    // console.log(data.users)


    //Crear un estado para poder Listarlo
    if (data.users && data.status == "success") {

      let newUsers = data.users

      if (users.length >= 1) {
        newUsers = [...users, ...data.users]
      }

      setUser(newUsers)
      setFollowing(data.user_following);
      setLoading(false)

      // console.log(users)

    }

    //Pagination
    if (users.length >= (data.totalDocs - data.users.length)) {
      setMore(false);
    }

  }



  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Seguidores de {userProfile.name} {userProfile.surname}</h1>
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
