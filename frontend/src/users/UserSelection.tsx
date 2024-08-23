import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import Swal from 'sweetalert2'

const UserSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    Swal.fire({
      title: "Role Selected",
      text: `You have selected the role: ${role}`,
      icon: 'success',
      position: 'center', // Center the alert
      showConfirmButton: false, // Hide the confirm button
      timer: 1500, // Auto close after 1.5 seconds
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        navigate('/dashboard'); // Navigate after alert is closed
      }
    });
  };

  return (
    <div className="container">
      <h1 style={{color:"black"}}>CRUD Movie management</h1>
      <h1>Select Your Role</h1>
      <div>
        <button
          onClick={() => handleSelect('MANAGER')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          MANAGER
        </button>
        <button
          onClick={() => handleSelect('TEAMLEADER')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          TEAMLEADER
        </button>
        <button
          onClick={() => handleSelect('FLOORSTAFF')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          FLOORSTAFF
        </button>
      </div>
    </div>
  );
};

export default UserSelection;
