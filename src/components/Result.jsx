import imgUser from '../assets/img/user.png';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const HealthResultTable = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [patientInfo, setPatientInfo] = useState({});
  const [resultTable, setResultTable] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/result/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.data.status === 'error') {
          setError(response.data.message);
        } else {
          const { pasien, result_table } = response.data.result;
          setPatientInfo(pasien);
          setResultTable(result_table);
        }
      } catch (error) {
        setError('Gagal mendapatkan data hasil kesehatan');
      }
    };
    fetchData();
  }, [id, accessToken]);

  return (
    <>
      <nav className="px-24 p-4 shadow-lg bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <Link to={'/search'}>
              <a className="flex items-center" aria-current="page" href="#">
                <img src={imgUser} className="w-10 h-12 rounded-full mr-2" alt="" />
                <span className="text-gray-700 pl-2 font-semibold">Dokter</span>
              </a>
            </Link>
          </div>
          <div className="flex flex-grow justify-center mr-24">
            <ul className="flex space-x-8">
              <li>
                <Link to={'/search'}>
                  <a className="text-gray-700 pl-2 hover:text-gray-900">Cari Pasien</a>
                </Link>
              </li>
              <li>
                <Link to={'/pasien/add'}>
                  <a className="text-gray-700 pl-2 hover:text-gray-900">Tambah Pasien</a>
                </Link>
              </li>
            </ul>
          </div>
          <Link to={'/'}>
            <button className="border font-semibold border-gray-300 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Logout
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-24 py-8 flex justify-between">
        {/* Left side */}
        <div className="flex flex-col">
          <p className="mb-4">
            <span className="font-semibold">Nama Pasien &ensp;&ensp;:</span> {patientInfo.nama}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Alamat &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;:</span> {patientInfo.alamat}
          </p>
          <p>
            <span className="font-semibold">Jenis Kelamin&ensp;&ensp;:</span> {patientInfo.jenis_kelamin}
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col">
          <p className="mb-4">
            <span className="font-semibold">Tanggal Lahir&ensp;&ensp;:</span> {patientInfo.tanggal_lahir}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Umur&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;:</span> {patientInfo.umur}
          </p>
          <p>
            <span className="font-semibold">NIK&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;:</span> {patientInfo.nik}
          </p>
        </div>
      </div>

      {/* Health result table */}
      <div className="overflow-x-auto px-24 ">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-indigo-200 ">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-indigo-200 px-4 py-2">Umur (Bulan)</th>
                <th className="border border-indigo-200 px-4 py-2">BB/TB</th>
                <th className="border border-indigo-200 px-4 py-2">IMT/UMUR</th>
                <th className="border border-indigo-200 px-4 py-2">TB/UMUR</th>
                <th className="border border-indigo-200 px-4 py-2">Lingkar Kepala</th>
                <th className="border border-indigo-200 px-4 py-2">KPSP</th>
              </tr>
            </thead>
            <tbody>
              {resultTable.map((data, index) => (
                <tr key={index}>
                  <td className="border border-indigo-200 px-4 py-2">{data.umur}</td>
                  <td className="border border-indigo-200 px-4 py-2">{data.hasil_WFL}</td>
                  <td className="border border-indigo-200 px-4 py-2">{data.hasil_BMI}</td>
                  <td className="border border-indigo-200 px-4 py-2">{data.hasil_LFA}</td>
                  <td className="border border-indigo-200 px-4 py-2">{data.hasil_HCFA}</td>
                  <td className="border border-indigo-200 px-4 py-2">{data.hasil_KPSP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
