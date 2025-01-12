import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Editar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { libro } = location.state || {};

    const [titulo, setTitulo] = useState(libro.titulo);
    const [autor, setAutor] = useState(libro.autor);
    const [anoPublicacion, setAnoPublicacion] = useState(new Date(libro.ano_publicacion).getFullYear());
    const [estado, setEstado] = useState(libro.estado);

    const guardar = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            console.error('Token no encontrado');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/libros/${libro._id}`, {
                titulo,
                autor,
                ano_publicacion: new Date(anoPublicacion, 0, 1), // Convertir el año a una fecha completa
                estado
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Libro actualizado:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
    };

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-primary">Editar Libro</h1>
            <form onSubmit={guardar}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Título</label>
                    <input
                        type="text"
                        defaultValue={libro.titulo}
                        onChange={((e) => { setTitulo(e.target.value) })}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Autor</label>
                    <input
                        type="text"
                        defaultValue={libro.autor}
                        onChange={((e) => { setAutor(e.target.value) })}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Año de Publicación</label>
                    <input
                        type="text"
                        defaultValue={new Date(libro.ano_publicacion).getFullYear()}
                        onChange={((e) => { setAnoPublicacion(e.target.value) })}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Estado</label>
                    <input
                        type="text"
                        defaultValue={libro.estado}
                        onChange={((e) => { setEstado(e.target.value) })}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type='submit'
                    className="px-4 py-2 font-bold rounded text-secondary bg-primary hover:bg-slate-500 focus:outline-none focus:shadow-outline"
                >

                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}

export default Editar;