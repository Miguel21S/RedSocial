
// import UserModel from "../users/UsersModel";
// import bcrypt from 'bcrypt';
// import {dbConnection} from '../../core/database/db';

// const seedUsers = async () => {
//         const usersData = [
//             { name: "John", email: "john@example.com", password: "joh112323", role_id: 1 },
//             { name: "Elena", email: "elena@example.com", password: "elena123", role_id: 1 },
//             { name: "Carlos", email: "carlos@example.com", password: "carlos456", role_id: 2 },
//             { name: "Laura", email: "laura@example.com", password: "laura789", role_id: 1 },
//             { name: "Juan", email: "juan@example.com", password: "juan987", role_id: 1 },
//             { name: "María", email: "maria@example.com", password: "maria654", role_id: 1 },
//             { name: "Pedro", email: "pedro@example.com", password: "pedro321", role_id: 1 },
//             { name: "Ana", email: "ana@example.com", password: "ana246", role_id: 1 },
//             { name: "David", email: "david@example.com", password: "david135", role_id: 1 },
//             { name: "Sara", email: "sara@example.com", password: "sara579", role_id: 1 },
//             { name: "Mario", email: "mario@example.com", password: "mario753", role_id: 1 },
//             { name: "Jane", email: "jane@example.com", password: "password2", role_id: 2 },
//             { name: "Helena", email: "helena@example.com", password: "password3", role_id: 3 }
//         ];

//         const hashedUsers = usersData.map(userData => ({
//             ...userData,
//             password: bcrypt.hashSync(userData.password, 10),
//             role: userData.role_id === 1 ? "user" : userData.role_id === 2 ? "admin" : "superAdmin"
//         }));
//         return hashedUsers;
//     };  
//     const userDatabase = async () => {   
//         try {
//             (await dbConnection()).Connection;
//             const users = seedUsers();
//             await UserModel.insertMany(users);
//         console.log('---------------------------');
//         console.log('Los usuarios se han guardado correctamente');
//         console.log('---------------------------');
//     } catch (error) {
//         console.error(error);
//     }
//     finally {
//         (await dbConnection()).disconnect;
//     }

//     };
//     userDatabase();