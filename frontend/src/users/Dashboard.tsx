import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../styles.css';
import Swal from 'sweetalert2';

const Dashboard: React.FC = observer(() => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
  
    if (!userRole) {
      navigate('/'); // Redirect to UserSelection if no role is selected
      return null;
    }

    const handleExit = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out and returned to the user selection screen.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('userRole');
          navigate('/');
        }
      });
    };
  
    return (
      <div className='container'>
        <button
            onClick={handleExit}
            className="btn-red"
        >Exit this user</button>
        <h1>Dashboard</h1>
        <div>
          <button
            onClick={() => navigate('/add-movie')}
          >
            Add Movie
          </button>
          {userRole === 'MANAGER' && (
            <button
              onClick={() => navigate('/manage-movies')}
            >
              Manage Movies
            </button>
          )}
        </div>
      </div>
    );
  });
  
  export default Dashboard;