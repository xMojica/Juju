import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from '../Utils/Modal';

function Editar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { libro } = location.state || {};

    const [titulo, setTitulo] = useState(libro.titulo);
    const [autor, setAutor] = useState(libro.autor);
    const [anoPublicacion, setAnoPublicacion] = useState(new Date(libro.ano_publicacion).getFullYear());
    const [estado, setEstado] = useState(libro.estado);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const guardar = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            setModalMessage('Token no encontrado');
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await axios.put(`https://juju-2ygz.onrender.com/api/libros/${libro._id}`, {
                titulo,
                autor,
                ano_publicacion: new Date(anoPublicacion, 0, 1),
                estado
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Libro actualizado:', response.data);
            setModalMessage('Libro actualizado con éxito');
            setIsModalOpen(true);
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            setModalMessage('Error al actualizar el libro');
            setIsModalOpen(true);
        }
    };

    return (
        <div className="container flex flex-col p-4 mx-auto">
            <h1 className="mb-8 text-2xl font-bold text-center text-primary">Editar Libro</h1>
            <form onSubmit={guardar} className='mx-auto'>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Autor</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Año de Publicación</label>
                    <input
                        type="number"
                        value={anoPublicacion}
                        onChange={(e) => setAnoPublicacion(e.target.value)}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-slate-500">Estado</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text-secondary focus:outline-none focus:shadow-outline"
                    >
                        <option value="disponible">Disponible</option>
                        <option value="reservado">Reservado</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 font-bold rounded text-secondary bg-primary hover:bg-slate-500 focus:outline-none focus:shadow-outline"
                >
                    Guardar Cambios
                </button>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
        </div>
    );
}

export default Editar;