import React from 'react';
import { useNavigate } from 'react-router-dom';
import Libro from '../assets/Libro.png';

function Home() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="bg-gradient-to-r from-secondary to-primary min-h-screen flex items-center justify-center">
            <main className="bg-primary bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
                <img src={Libro} alt="logo" className='w-56 mx-auto mb-4' />
                <h1 className='text-4xl font-bold text-secondary mb-6'>Gestor de libros</h1>
                <button onClick={navigateToLogin} className='w-40 bg-secondary text-primary m-2 p-2 rounded hover:bg-secondary-dark transition duration-300'>Login</button>
                <button onClick={navigateToRegister} className='w-40 bg-secondary text-primary m-2 p-2 rounded hover:bg-secondary-dark transition duration-300'>Register</button>
            </main>
        </div>
    );
}

export default Home;