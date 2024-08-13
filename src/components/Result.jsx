import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export const HealthResultTable = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [patientInfo, setPatientInfo] = useState({});
  const [resultTable, setResultTable] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://be-kembangq.toxrbm.easypanel.host/result/${id}`, {
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
      <Navbar/>

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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
