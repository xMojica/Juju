import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate()
    const token = Cookies.get('token');

    return token ? <Component {...rest} /> : navigate("/login")
};

export default ProtectedRoute;