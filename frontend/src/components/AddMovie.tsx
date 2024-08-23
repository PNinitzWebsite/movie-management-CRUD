import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/storeContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const AddMovie: React.FC = observer(() => {
  const navigate = useNavigate();
  const store = useStore();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('G');
  const [error, setError] = useState('');

  const userRole = localStorage.getItem('userRole');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await store.addMovie({ title, year: parseInt(year), rating });
      setTitle('');
      setYear('');
      setRating('G');
      setError('');
    } catch (error) {
        setError('Failed to add movie');
    }
  };

  if (!userRole) {
    return <div>Please select a role first.</div>;
  }

  return (
    <div className='container'>
       <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
      >Dashboard</button>
      <h1>Add Movie</h1>
      {userRole === 'MANAGER' || userRole === 'TEAMLEADER' || userRole === 'FLOORSTAFF' ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Year:
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Rating:
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="M">M</option>
                <option value="MA">MA</option>
                <option value="R">R</option>
              </select>
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Add Movie</button>
        </form>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}
    </div>
  );
});

export default AddMovie;
