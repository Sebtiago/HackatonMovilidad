// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirige al Home después de iniciar sesión
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex min-h-screen">
    {/* Sección de la imagen de fondo con degradado */}
    <div
      className="hidden md:block w-1/2 bg-cover bg-center relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(8, 48, 128, 0.1), rgba(8, 48, 128, 0.6)), url(https://th.bing.com/th/id/OIP._Hc63jOKQq24X7fTt31MAQHaFj?rs=1&pid=ImgDetMain)',
      }}
    >
      <div className='text-white bottom-12 left-12 absolute'>
<img src="icon.svg" alt=""  className='b'/>
<h1 className='text-8xl font-black'>MobiVi</h1>
<h3 className='text-4xl font-medium'>Siempre informado,<br></br> siempre en movimiento.</h3>
      </div>
    </div>

      {/* Sección del formulario */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Bienvenido a MobiVi</h2>
          <p className="text-center text-gray-500 mb-8">
            Accede a información actualizada y mantén a nuestra ciudad en movimiento.
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-b-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border  border-b-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition duration-200"
            >
              Ingresar
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 my-12">
            Para cualquier consulta, contacta con el soporte de MobiVi <br />
            <a href="#" className="text-blue-500 hover:underline">
              Soporte Técnico
            </a>
          </p>
          <div>
          <p className="text-center text-xs text-gray-500 my-4">O visualiza el mapa de la ciudad sin inciar sessión</p>
          <button
          onClick={() => navigate('/mapa')}
          className="w-full bg-white text-secondary hover:bg-secondary-dark rounded-md p-4 font-bold border border-secondary hover:text-white transition duration-200"
        >
          Mapa movilidad Villaviencio
        </button>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Login;
