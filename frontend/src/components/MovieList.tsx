import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/storeContext';
import { Link } from 'react-router-dom';
import '../styles.css';

const MovieList = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.loadMovies(); // โหลดข้อมูลเมื่อ component ถูก mount
  }, [store]);

  if (store.movies.length === 0) {
    return <div className='container'>No movies available</div>;
  }

  return (
    <div className='container'>
      <h1>Movie List</h1>
      <ul>
        {store.movies.map((movie) => (
          <> <li key={movie.title}>
            {movie.title} ({movie.year}) - {movie.rating}
              <Link to={`/edit-movie/${movie.title}`}>
                <button className='btn-gold'>Edit</button>
              </Link>
          </li> 
          </>
        ))}
      </ul>
    </div>
  );
});

export default MovieList;
