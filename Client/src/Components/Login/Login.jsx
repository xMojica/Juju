import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Utils/Modal';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://https://juju-2ygz.onrender.com/api/login', {
                email,
                clave: password
            });
            console.log('Inicio de sesion exitoso:', response.data);
            Cookies.set('token', response.data.token, { expires: 1 });
            navigate('/');
        } catch (error) {
            setModalMessage('Usuario o contraseña incorrectos');
            setIsModalOpen(true);
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-secondary to-primary">
            <main className="p-10 text-center rounded-lg shadow-lg bg-primary bg-opacity-80">
                <h1 className='mb-6 text-4xl font-bold text-secondary'>Iniciar Sesion</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-secondary float-start">Correo</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded border-secondary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-secondary float-start">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded border-secondary"
                            required
                        />
                    </div>
                    <button type="submit" className='w-full p-2 transition duration-300 rounded bg-secondary text-primary hover:bg-secondary-dark'>Iniciar</button>
                    <button className='w-full p-2 transition duration-300 bg-red-600 rounded text-primary hover:bg-secondary-dark' onClick={(() => { navigate(-1) })}>Volver</button>
                </form>
            </main>
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
        </div>
    );
}

export default Login;