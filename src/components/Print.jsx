// src/Print.jsx
import { useEffect, useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
import Navbar from './Navbar.jsx';

// Membuat style untuk PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 15,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "7.44%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColNo: {
    width: "3%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 8,
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColNo}><Text style={styles.tableCell}>No.</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>NIK</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Nama</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Umur (Bulan)</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Alamat</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Tanggal Lahir</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Nama Ayah</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Nama Ibu</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>No HP</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>RT/RW</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Jenis Kelamin</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Tinggi</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Berat</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Lingkar Kepala</Text></View>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableColNo}><Text style={styles.tableCell}>{index + 1}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.nik}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.nama}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.umur_dalam_bulan}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.alamat}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.tanggal_lahir}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.nama_ayah}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.nama_ibu}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.no_hp}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.rt}/{item.rw}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.jenis_kelamin}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.panjang}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.berat_badan}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.lingkar_kepala}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Print = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.get('https://be-kembangq.toxrbm.easypanel.host/print', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-12 bg-white">
      {data.length > 0 ? (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">NIK</th>
                  <th className="border px-4 py-2">Nama</th>
                  <th className="border px-4 py-2">Umur (Bulan)</th>
                  <th className="border px-4 py-2">Alamat</th>
                  <th className="border px-4 py-2">Tanggal Lahir</th>
                  <th className="border px-4 py-2">Nama Ayah</th>
                  <th className="border px-4 py-2">Nama Ibu</th>
                  <th className="border px-4 py-2">No HP</th>
                  <th className="border px-4 py-2">RT/RW</th>
                  <th className="border px-4 py-2">Jenis Kelamin</th>
                  <th className="border px-4 py-2">Panjang (cm)</th>
                  <th className="border px-4 py-2">Berat Badan (kg)</th>
                  <th className="border px-4 py-2">Lingkar Kepala (cm)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.nik}</td>
                    <td className="border px-4 py-2">{item.nama}</td>
                    <td className="border px-4 py-2">{item.umur_dalam_bulan}</td>
                    <td className="border px-4 py-2">{item.alamat}</td>
                    <td className="border px-4 py-2">{item.tanggal_lahir}</td>
                    <td className="border px-4 py-2">{item.nama_ayah}</td>
                    <td className="border px-4 py-2">{item.nama_ibu}</td>
                    <td className="border px-4 py-2">{item.no_hp}</td>
                    <td className="border px-4 py-2">{item.rt}/{item.rw}</td>
                    <td className="border px-4 py-2">{item.jenis_kelamin}</td>
                    <td className="border px-4 py-2">{item.panjang}</td>
                    <td className="border px-4 py-2">{item.berat_badan}</td>
                    <td className="border px-4 py-2">{item.lingkar_kepala}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PDFDownloadLink
            document={<MyDocument data={data} />}
            fileName="KembangQ-Data.pdf"
            className="bg-blue-500 text-white py-2 px-4 rounded "
          >
            {({loading}) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </>
      ) : (
        <p>Anda belum input data bulan ini </p>
      )}
    </div>
    </>
  );
}

export default Print;
