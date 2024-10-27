import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: (isAdmin: boolean) => void; // Update callback to accept isAdmin
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, { email, password });
      const { access_token, isAdmin } = response.data; // Assume isAdmin is returned from the backend

      // Store the token if login is successful
      if (access_token) {
        localStorage.removeItem('token');
        localStorage.setItem('token', access_token);
        onLoginSuccess(isAdmin); // Pass isAdmin status to the callback
        navigate('/'); // Navigate to home page after login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      // Improved error handling based on different status codes
      if (error.response?.status === 401) {
        setError('Invalid email or password.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Unable to connect. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded w-full transition duration-200 hover:bg-blue-700">
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 underline w-full hover:text-blue-800 focus:outline-none py-2 mt-5"
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
