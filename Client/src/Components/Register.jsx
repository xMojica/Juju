import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/register', {
                nombre,
                email,
                telefono,
                clave: password
            });
            console.log('Registro exitoso:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary">
            <main className="p-10 text-center rounded-lg shadow-lg bg-primary bg-opacity-80">
                <h1 className='mb-6 text-4xl font-bold text-secondary'>Registrar</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-secondary float-start">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 border rounded border-secondary"
                            required
                        />
                    </div>
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
                        <label className="block mb-2 text-secondary float-start">Teléfono</label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
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
                    <button type="submit" className='w-full p-2 transition duration-300 rounded bg-secondary text-primary hover:bg-secondary-dark'>Registrar</button>
                    <button className='w-full p-2 transition duration-300 bg-red-600 rounded text-primary hover:bg-secondary-dark' onClick={(() => { navigate(-1) })}>Volver</button>

                </form>
            </main>
        </div>
    );
}

export default Register;