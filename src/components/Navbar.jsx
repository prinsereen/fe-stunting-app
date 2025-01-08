import imgUser from '../assets/img/user.png';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      await axios.delete('http://103.250.10.16:3001/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      localStorage.removeItem('accessToken');
      navigate('/'); // Navigate to the homepage or login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error state or notification here
    }
  };

  return (
    <nav className="px-24 p-4 shadow-lg bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to={'/search'} className="flex items-center">
            {/* Replace with your user avatar or icon */}
            <img
              src={imgUser}
              className="w-10 h-12 rounded-full mr-2"
              alt="User"
            />
            <span className="text-gray-700 pl-2 font-semibold">Dokter</span>
          </Link>
        </div>
        <div className="flex flex-grow justify-center mr-24">
          <ul className="flex space-x-8">
            <li>
              <Link
                to={'/search'}
                className="text-gray-700 pl-2 hover:text-gray-900"
              >
                Cari Pasien
              </Link>
            </li>
            <li>
              <Link
                to={'/pasien/add'}
                className="text-gray-700 pl-2 hover:text-gray-900"
              >
                Tambah Pasien
              </Link>
            </li>
            <li>
              <Link
                to={'/print'}
                className="text-gray-700 pl-2 hover:text-gray-900"
              >
                Cetak
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
  );
};

export default Navbar;
