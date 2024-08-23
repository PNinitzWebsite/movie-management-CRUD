import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/storeContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const DeleteMovie: React.FC = observer(() => {
  const navigate = useNavigate();
  const store = useStore();

  // Load movies when the component mounts
  React.useEffect(() => {
    store.loadMovies();
  }, [store]);

  // Handle delete button click
  const handleDelete = (title: string) => {
    if (window.confirm(`Are you sure you want to delete (คุณต้องการจะลบจริงใช่ไหม)"${title}"?`)) {
      store.deleteMovie(title);
    }
  };

  if (store.movies.length === 0) {
    return <div className='container'>
      <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
      >Dashboard</button>
      <h1>Manage Movies</h1>
      No movies available</div>;
  }

  return (
    <div className="container">
      <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
      >Dashboard</button>
      <h1>Manage Movies</h1>
      <ul>
        {store.movies.map((movie) => (
          <li key={movie.title}>
            {movie.title} ({movie.year}) - {movie.rating}
            <button className='btn-red' onClick={() => handleDelete(movie.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default DeleteMovie;
