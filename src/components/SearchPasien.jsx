import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export const SearchPasien = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  // Mengambil data pasien dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://personal-be-kembangq.iqkjgx.easypanel.host/pasien', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data.status === 'success') {
          setOriginalData(response.data.result);
          setFilteredData(response.data.result);
        }
      } catch (error) {
        setError('Gagal mendapatkan data pasien.');
      }
    };
    fetchData();
  }, [accessToken]);

  // Handler untuk memperbarui query pencarian
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter data berdasarkan pencarian atau kembalikan data asli
    if (query === '') {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((pasien) =>
        pasien.nama.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  // Handler untuk delete pasien
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pasien ini?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://personal-be-kembangq.iqkjgx.easypanel.host/pasien/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setFilteredData(filteredData.filter((pasien) => pasien.id !== id));
      } catch (error) {
        setError('Gagal menghapus pasien.');
      }
    }
  };

  return (
    <>
      <Navbar/>
      {/* Bagian pencarian */}
      <div className="max-w-7xl mx-auto px-24 mt-8">
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari nama pasien..."
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>

        {/* Card untuk data pasien */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Looping untuk beberapa data pasien */}
          {filteredData.map((pasien) => (
            <div
              key={pasien.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <p className="text-lg font-semibold text-gray-700">{pasien.nama}</p>
                <p className="text-md text-gray-600">{pasien.alamat}</p>
              </div>
              <div className="flex flex-wrap justify-center pb-4 space-x-2">
                <div className="flex w-full justify-between px-6 mb-2">
                  <Link to={`/kpsp/${pasien.id}`}>
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white px-5 ml-2 py-1 rounded-md transition duration-300">
                      Input
                    </button>
                  </Link>
                  <Link to={`/result/${pasien.id}`}>
                    <button className="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-1 rounded-md transition duration-300">
                      Result
                    </button>
                  </Link>
                </div>
                <div className="flex w-full justify-between px-6">
                  <Link to={`/update/${pasien.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-300">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(pasien.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-md transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
