// Importamos React y dos hooks importantes: useState (para estados) y useEffect (para efectos secundarios)
import React, { useState, useEffect } from "react";

// Obtenemos la URL base de la API desde una variable de entorno
const API = process.env.REACT_APP_API;

// Definimos el componente funcional Users
export const Users = () => {

    // Estados para los campos del formulario
    const [name, setName] = useState('')         // Guarda el nombre del usuario
    const [email, setEmail] = useState('')       // Guarda el email del usuario
    const [password, setPassword] = useState('') // Guarda la contraseña del usuario

    // Estados para controlar si estamos editando un usuario y su ID
    const [editing, setEditing] = useState(false) // true si estamos editando
    const [id, setId] = useState('')              // ID del usuario a editar

    // Estado que contiene la lista de usuarios desde la API
    const [users, setUsers] = useState([])

    // Función que maneja el envío del formulario (crear o actualizar usuario)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página

        if (!editing) {
            // Si NO estamos editando, creamos un nuevo usuario con POST
            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicamos que el cuerpo será JSON
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })

            const data = await res.json(); // Convertimos la respuesta a JSON
            console.log(data);             // Mostramos la respuesta en consola

        } else {
            // Si estamos editando, actualizamos un usuario existente con PUT
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            const data = await res.json(); // Convertimos la respuesta a JSON
            console.log(data);

            // Reiniciamos el estado de edición
            setEditing(false);
            setId('');
        }

        await getUsers(); // Actualizamos la lista de usuarios

        // Limpiamos los campos del formulario
        setName('');
        setEmail('');
        setPassword('');
    }

    // Función que obtiene la lista de usuarios desde la API
    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data); // Guardamos los usuarios en el estado
    }

    // useEffect se ejecuta una sola vez cuando se monta el componente
    useEffect(() => {
        getUsers(); // Cargamos la lista de usuarios al inicio
    }, [])

    // Función para editar un usuario: rellena el formulario con sus datos
    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`); // Obtenemos los datos del usuario por su ID
        const data = await res.json();

        // Activamos el modo edición
        setEditing(true);
        setId(id);

        // Rellenamos los campos del formulario con los datos del usuario
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
    }

    // Función para eliminar un usuario
    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?'); // Preguntamos al usuario
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });

            const data = await res.json();
            console.log(data);

            await getUsers(); // Recargamos la lista de usuarios
        }
    }

    // Lo que se renderiza en pantalla
    return (
        <div className="row container">
            {/* Columna del formulario */}
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)} // Actualiza el estado 'name'
                            value={name}                            // Valor del input
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            onChange={e => setEmail(e.target.value)} // Actualiza el estado 'email'
                            value={email}
                            className="form-control"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            onChange={e => setPassword(e.target.value)} // Actualiza 'password'
                            value={password}
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button className="btn btn-primary w-100">
                        {editing ? 'Update' : 'Create'} {/* Cambia el texto según si editamos o no */}
                    </button>
                </form>
            </div>

            {/* Columna de la tabla de usuarios */}
            <div className="col-md-8 border shadow-sm bg-white">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iteramos sobre cada usuario y lo mostramos en una fila */}
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td className="d-flex gap-2">
                                    {/* Botón para editar */}
                                    <button
                                        className="btn btn-warning btn-sm w-100"
                                        onClick={() => editUser(user._id)}
                                    >
                                        Edit
                                    </button>
                                    {/* Botón para eliminar */}
                                    <button
                                        className="btn btn-danger btn-sm w-100"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
