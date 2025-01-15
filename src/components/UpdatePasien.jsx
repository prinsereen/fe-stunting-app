import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

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
    nik: '',
    no_hp: '',
    rt: '',
    rw: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the existing data of the patient to be updated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://personal-be-kembangq.iqkjgx.easypanel.host/pasien/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data.status === 'success') {
          setFormData(response.data.result);
          //console.log(formData)
        } else {
          setError('Gagal mendapatkan data pasien.');
        }
      } catch (error) {
        setError('Gagal mendapatkan data pasien.');
      }
    };
    fetchData();
  }, [id, accessToken]);

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
      await axios.patch(`https://personal-be-kembangq.iqkjgx.easypanel.host/pasien/${id}`, formData, {
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
      <Navbar/>
      <div className="max-w-7xl mx-auto px-52 mt-4">
        <div className="bg-white rounded-lg p-4">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Pasien Baru</h4>
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

            <div className="col-span-2 flex flex-col">
              <h5 className="text-gray-700 mb-2">No HP</h5>
              <input
                type="text"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <h5 className="text-gray-700 mb-2">RT</h5>
              <input
                type="text"
                name="rt"
                value={formData.rt}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
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
            <div className="col-span-2 flex flex-col">
              <h5 className="text-gray-700 mb-2">RW</h5>
              <input
                type="text"
                name="rw"
                value={formData.rw}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            </div>
            <div className="col-span-2 mt-2 flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-8 my-3 py-2 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
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
