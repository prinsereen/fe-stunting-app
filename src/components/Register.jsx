import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import imgAuth from '../assets/img/img-auth.png';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: formData.username,
        password: formData.password,
        conf_password: formData.confirmPassword
      });

      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User sudah terdaftar');
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi nanti.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col md:flex-row w-full bg-white rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img src={imgAuth} className="h-full w-full object-cover" alt="Auth Image" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center mr-52">
          <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmasi Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="confirmPassword"
                placeholder="Confirmasi Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-6 items-center justify-between">
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Register
              </button>
            </div>
          </form>
          <p className="mt-4">
            Sudah punya akun? <Link to="/" className="text-indigo-600 font-semibold hover:text-indigo-800">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
