import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export const KPSP = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataKPSP, setDataKPSP] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [lingkarKepala, setLingkarKepala] = useState('');
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-ium.up.railway.app/kpsp/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data.status === 'success') {
          setDataKPSP(response.data.result);
        } else {
          setError('Gagal mendapatkan data KPSP');
        }
      } catch (error) {
        setError('Gagal mendapatkan data KPSP');
      }
    };
    fetchData();
  }, [id, accessToken]);

  const handlePertumbuhanSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      panjang: parseFloat(tinggiBadan),
      berat_badan: parseFloat(beratBadan),
      lingkar_kepala: parseFloat(lingkarKepala)
    };

    try {
      await axios.post(`https://backend-ium.up.railway.app/kpsp/result/pertumbuhan/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSuccess('Berhasil Menambahkan data Pertumbuhan');
      setError('');
      if (dataKPSP.length === 0) {
        navigate(`/result/${id}`);  // Navigate to the result page if no KPSP data exists
      }
    } catch (error) {
      setError('Anda sudah input data bulan ini');
      setSuccess('');
    }
  };

  const handleKPSPSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      for (const [soal_item_id, value] of Object.entries(answers)) {
        await axios.post(`https://backend-ium.up.railway.app/kpsp/${id}`, {
          soal_item_id,
          value
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
      await axios.patch(`https://backend-ium.up.railway.app/kpsp/result/${id}`, {
        id,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setSuccess('Berhasil Menyimpan Data KPSP');
      setError('');
      navigate(`/result/${id}`);
    } catch (error) {
      setError('Gagal menyimpan data KPSP');
      setSuccess('');
    }
    setIsSubmitting(false);
  };

  const handleAnswerChange = (soal_item_id, value) => {
    setAnswers({
      ...answers,
      [soal_item_id]: value
    });
  };

  return (
    <>
      <Navbar/>
      <div className="max-w-7xl mx-auto px-52 mt-4">
        <div className="bg-white rounded-lg p-4">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">PERTUMBUHAN</h4>
          </div>
          <form onSubmit={handlePertumbuhanSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h5 className="text-gray-700 mb-1">Berat Badan</h5>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={beratBadan}
                    onChange={(e) => setBeratBadan(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-gray-700 mb-2">Tinggi Badan</h5>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={tinggiBadan}
                    onChange={(e) => setTinggiBadan(e.target.value)}
                  />
                </div>
              </div>
              {/* Right column */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <h5 className="text-gray-700 mb-2">Lingkar Kepala</h5>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={lingkarKepala}
                    onChange={(e) => setLingkarKepala(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-8 py-2 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 mt-6"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {success && (
        <div className="max-w-7xl mx-auto px-52 mt-2">
          <div className="bg-white rounded-lg p-4">
            <p className="text-green-500">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-52 mt-2">
          <div className="bg-white rounded-lg p-4">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      {dataKPSP.length > 0 && (
        <div className="max-w-7xl mx-auto px-52 mt-4">
          <div className="bg-white rounded-lg p-4">
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-gray-700">KUESIONER PRA SKIRING PERKEMBANGAN</h4>
            </div>
            <form onSubmit={handleKPSPSubmit}>
              {dataKPSP.map(item => (
                <div key={item.id} className="mb-6">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">{item.pertanyaan}</p>
                      {item.foto_url && (
                        <img src={item.foto_url} alt={`Soal ${item.id}`} className="mb-2 max-w-full h-auto" />
                      )}
                    </div>
                    <div className="ml-4">
                      <select
                        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        value={answers[item.id] || ''}
                        onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                      >
                        <option value="">Pilih Jawaban</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-8 my-3 py-1 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
