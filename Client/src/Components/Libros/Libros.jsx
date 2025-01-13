import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import editar from '../../assets/editar.svg';
import eliminar from '../../assets/eliminar.svg';
import agregar from '../../assets/agregar.svg'
import { useNavigate } from 'react-router-dom';

function Libros() {
    const navigate = useNavigate();
    const [libros, setLibros] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [login, setLogin] = useState(isAdmin ? 'Cerrar sesión' : 'Iniciar sesión');

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('https://juju-2ygz.onrender.com/api/libros');
                setLibros(response.data);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        fetchLibros();

        // Verificar si el usuario es administrador
        const token = Cookies.get('token');
        if (token) {
            setIsAdmin(true);
            setLogin('Cerrar sesión');
        }
    }, [isAdmin]);

    const validarLogin = () => {
        if (isAdmin) {
            Cookies.remove('token');
            setIsAdmin(false);
            setLogin('Iniciar sesión');
        }
        else {
            navigate('/login');
        }
    };

    const registrarse = () => {
        navigate('/register');
    }

    const editarLibro = (libro) => {
        navigate('/editar', { state: { libro } });
    }

    const eliminarLibro = (libro) => {
        const token = Cookies.get('token');
        axios.delete(`https://juju-2ygz.onrender.com/api/libros/${libro._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al eliminar el libro:', error);
            });

    }

    const agregarLibro = () => {
        const token = Cookies.get('token');
        if (token) {
            navigate("/agregar")
        }
    }

    return (
        <>
            <header>
                <nav className="flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold text-primary">Gestor de libros</h1>
                    <div className='flex items-center gap-4'>
                        {!isAdmin && (
                            <button className="p-2 transition duration-300 rounded-md bg-primary text-secondary hover:bg-secondary-dark" onClick={registrarse}>Registrarse</button>
                        )}
                        <button className="p-2 transition duration-300 rounded-md bg-primary text-secondary hover:bg-secondary-dark" onClick={validarLogin}>{login}</button>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container gap-4 p-4 mx-auto mt-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {libros.map(libro => (
                            <div key={libro._id} className="p-4 rounded-lg shadow-lg bg-primary">
                                <h2 className="mb-2 text-xl font-bold text-secondary">{libro.titulo}</h2>
                                <p className="text-sm text-gray-600"><strong>Autor:</strong> {libro.autor}</p>
                                <p className="text-sm text-gray-600"><strong>Año de publicación:</strong> {new Date(libro.ano_publicacion).getFullYear()}</p>
                                <p className="text-sm text-gray-600"><strong>Estado:</strong> {libro.estado}</p>
                                {isAdmin && (
                                    <span className='float-right m-2'>
                                        <button className='p-2 mr-2 rounded-full bg-secondary text-primary'
                                            onClick={(() => { editarLibro(libro) })}>
                                            <img src={editar} alt="editar" className='w-4' />
                                        </button>
                                        <button className='p-2 bg-red-500 rounded-full text-primary'
                                            onClick={(() => { eliminarLibro(libro) })}>
                                            <img src={eliminar} alt="eliminar" className='w-4' />
                                        </button>
                                    </span>
                                )}
                            </div>
                        ))}
                        {isAdmin && (<div className="flex items-center justify-center p-4 text-xl text-center rounded-lg shadow-lg bg-primary text-secondary hover:bg-primary/50 hover:cursor-pointer" onClick={agregarLibro}>
                            <img src={agregar} alt="agregar" className='mr-2' />
                            Agregar
                        </div>)}

                    </div>
                </div>
            </main>
        </>
    );
}

export default Libros;