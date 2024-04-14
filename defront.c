import React, { useEffect, useState } from "react";
// import { userData } from "../../../app/slices/userSlice";
import { CInput } from "../../../common/CInput/CInput";
// import { CrearPost } from "../../../services/rootss";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export const CreatePost = () => {
    // const navigate = useNavigate();

    const [postear, setPostear] = useState({
        title: "",
        tests: ""
    });

    //Conectamos con Redux en modo lectura
    // const rdxUser = useSelector(userData);
    // const token = rdxUser.credentials.token;

    // useEffect(() => {
    //     if (!rdxUser.credentials.token) {
    //         navigate("/")
    //     }
    // }, [rdxUser])

    const inputHandler = (e) => {
        setPostear((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    // const crearNuevoPost = async () => {
    //     try {
    //         for (let elemento in postear) {
    //             if (postear[elemento] === "") {
    //                 throw new Error("Todos los campos tienen que estar rellenos");
    //             }
    //         }

    //         const fetched = await CrearPost(token);
    //         console.log("POST CREADO CON SUCCESO", fetched)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <div className="create-post">
            <h2>Crear un nuevo post</h2>

            <div className="rowl">
                <label htmlFor="title">Título:</label>
                <CInput
                    type="title"
                    name="title"
                    placeholder=" title..."
                    value={postear.title || ""}
                    changeEmit={inputHandler}
                />

                <label htmlFor="content">Contenido:</label>
                <textarea
                    id="content"
                    value={postear.tests}
                    placeholder=" test..."
                    onChange={(event) => setPostear(event.target.value)}
                    required
                ></textarea>
                <button type='button' className="btn btn-primary">Crear</button>

            </div>
        </div>
    );
};









