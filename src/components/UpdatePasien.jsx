import imgUser from '../assets/img/user.png';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const UpdatePasien = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    tanggal_lahir: '',
    nama_ayah: '',
    nama_ibu: '',
    jenis_kelamin: '',
    nik: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing data of the patient to be updated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pasien/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data.status === 'success') {
          setFormData(response.data.result);
        } else {
          setError('Gagal mendapatkan data pasien.');
        }
      } catch (error) {
        setError('Gagal mendapatkan data pasien.');
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (error) {
      setError('Gagal logout. Silakan coba lagi nanti.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pasien/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      navigate('/search');
    } catch (error) {
      setError('Gagal memperbarui pasien. Silakan coba lagi nanti.');
    }
  };

  return (
    <>
      <nav className="px-24 p-4 shadow-lg bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link to={'/search'} className="flex items-center">
              <img src={imgUser} className="w-10 h-12 rounded-full mr-2" alt="User" />
              <span className="text-gray-700 pl-2 font-semibold">Dokter</span>
            </Link>
          </div>
          <div className="flex flex-grow justify-center mr-24">
            <ul className="flex space-x-8">
              <li>
                <Link to={'/search'} className="text-gray-700 pl-2 hover:text-gray-900">
                  Cari Pasien
                </Link>
              </li>
              <li>
                <Link to={'/pasien/add'} className="text-gray-700 pl-2 hover:text-gray-900">
                  Tambah Pasien
                </Link>
              </li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="border font-semibold border-gray-300 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-52 mt-4">
        <div className="bg-white rounded-lg p-4">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Update Pasien</h4>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">Nama Pasien</h5>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">NIK</h5>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">Jenis Kelamin</h5>
                <select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Pilih Jawaban</option>
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>
            {/* Right column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">Nama Ayah</h5>
                <input
                  type="text"
                  name="nama_ayah"
                  value={formData.nama_ayah}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">Nama Ibu</h5>
                <input
                  type="text"
                  name="nama_ibu"
                  value={formData.nama_ibu}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-gray-700 mb-2">Tanggal Lahir</h5>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <h5 className="text-gray-700 mb-2">Alamat</h5>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-2 mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-8 my-3 py-1 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
