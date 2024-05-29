import React from 'react'
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import UseAuth from '../../hooks/UseAuth';
import avatar from '../../assets/img/user.png';
import ReactTimeAgo from 'react-time-ago';





export const PublicationList = ({ publications, getPublications, page, setPage, more, setMore }) => {


    const { auth } = UseAuth();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);

    }

    const deletePublication = async (publicationId) => {

        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = request.json()

        setPage(1);
        setMore(true);
        getPublications(1, true)

    }

    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {


                    return (
                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">



                                <div className="post__body">

                                    <div className='post__superior'>
                                        <div className="post__image-user">
                                            <Link to={"/social/perfil/" + publication.user._id} className="post__user-image">
                                                {publication.user.image != "default.png" && <img src={publication.user.secure_url} className="post__user-image" alt="Foto de perfil Publication" />}
                                                {publication.user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                            </Link>
                                        </div>

                                        <div className="post__user-info">
                                            <a href="#" className="user-info__name">{publication.user.name} {publication.user.surname}</a>
                                            <span className="user-info__divider"> | </span>
                                            <a href="#" className="user-info__create-date"><ReactTimeAgo date={Date.parse(publication.created_at)} locale='es-ES' /></a>
                                        </div>

                                        {auth._id == publication.user._id &&
                                            <div className="post__buttons post__button_right">

                                                <button onClick={() => deletePublication(publication._id)} className="post__button">
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>

                                            </div>
                                        }

                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>
                                    {publication.file && <img src={publication.secure_url} />}
                                </div>

                            </div>

                            {/* DELETE */}

                        </article>
                    )

                })}
            </div>

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
