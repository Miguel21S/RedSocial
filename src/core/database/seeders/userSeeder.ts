
import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import User from "../../../entities/users/UsersModel"
import Post from "../../../entities/posts/PostsModel"
import Like from "../../../entities/likes/LikesModel";
import Comentario from "../../../entities/comentarios/ComentariosModel";
import SeguidoresSeguidos from "../../../entities/seguidoreSeguidos/seguidoresSeguidosModel";
import "dotenv/config"
import { dbConnection } from "../db"
import bcrypt from "bcrypt"

dbConnection()

const createSeedData = async () => {
    try {
        // Eliminar datos existentes
        await User.deleteMany({});
        await Post.deleteMany({});
        await Like.deleteMany({});
        await Comentario.deleteMany({});
        await SeguidoresSeguidos.deleteMany({});

        // Crear un super_admin
        const superAdmin = new User({
            name: "super Admin",
            email: "superadmin@superadmin.com",
            password: bcrypt.hashSync("Super123456789.", 8),
            role: "superAdmin",
        });
        await superAdmin.save();

        // Crear 20 usuarios y recoger sus IDs
        let userIds = []; // Inicializar el arreglo de userIds
        for (let i = 0; i < 20; i++) {
            const user = new User({
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync("User123456789.", 8),
            });
            await user.save();
            userIds.push(user._id); // Añadir el ID del usuario recién creado al arreglo de userIds

            // Para cada usuario, crear 10 posts
            for (let j = 0; j < 10; j++) {
                const post = new Post({
                    userName: user.name,
                    title: faker.lorem.sentence(),
                    contenido: faker.lorem.paragraphs(),
                    userIdPost: user._id,
                });
                await post.save();

                // Crear likes para cada post
                for (let k = 0; k < Math.floor(Math.random() * 10); k++) {
                    const randomUserIndex = Math.floor(Math.random() * userIds.length);
                    const userDoc = await User.findById(userIds[randomUserIndex]).lean();
                    const userNameLike = userDoc ? userDoc.name as string : ''; // Asignación de tipo para userNameLike
                    const like = new Like({
                        idPost: post._id,
                        userIdPost: user._id,
                        userIdLike: userIds[randomUserIndex],
                        titlePost: post.title,
                        userNamePost: user.name,
                        userNameLike,
                        like: 1,
                    });
                    await like.save();
                }

                // Crear comentarios para cada post
                for (let l = 0; l < Math.floor(Math.random() * 5); l++) {
                    const randomUserIndex = Math.floor(Math.random() * userIds.length);
                    const userDoc = await User.findById(userIds[randomUserIndex]).lean();
                    const userNameComentario = userDoc ? userDoc.name as string : ''; // Asignación de tipo para userNameComentario
                    const comentario = new Comentario({
                        idPost: post._id,
                        userIdPost: user._id,
                        userIdComentario: userIds[randomUserIndex],
                        userNamePost: user.name,
                        userNameComentario,
                        comentario: faker.lorem.sentence(),
                    });
                    await comentario.save();
                }

                // Crear relaciones de seguimiento
                const randomFollowingUsers = userIds.slice(0, Math.floor(Math.random() * 10));
                for (const followingUserId of randomFollowingUsers) {
                    const userDoc = await User.findById(followingUserId).lean();
                    const NameUserSiguiendo = userDoc ? userDoc.name as string : ''; // Asignación de tipo para NameUserSiguiendo
                    const seguidorSeguido = new SeguidoresSeguidos({
                        idUserSiguiendo: followingUserId,
                        idUser: user._id,
                        NameUserSiguiendo,
                        NameUser: user.name,
                        estadoSeguiendo: 1,
                    });
                    await seguidorSeguido.save();
                }
            }
        }

        console.log("Seeder completado exitosamente");
    } catch (error) {
        console.error("Error al generar datos de prueba:", error);
    } finally {
        mongoose.connection.close();
    }
};

createSeedData();
