import React, { useState, useEffect } from 'react';
import { useStore } from '../stores/storeContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles.css';

interface EditMovieProps {
  title: string; // รับชื่อของภาพยนตร์ที่ต้องการแก้ไขเป็น prop
}

const EditMovie: React.FC<EditMovieProps> = () => {
  const navigate = useNavigate();
  const movieStore = useStore(); // ใช้ useStore เพื่อเข้าถึง store
  const { title } = useParams<{ title: string }>();
  const store = useStore();
  const movie = store.movies.find(m => m.title === title);
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState(movie?.year || 2022);
  const [newRating, setNewRating] = useState<'G' | 'PG' | 'M' | 'MA' | 'R'>('G');

  useEffect(() => {
    // ค้นหาภาพยนตร์ที่ต้องการแก้ไขจาก store
    const movie = movieStore.movies.find((m) => m.title === title);
    if (movie) {
      setNewTitle(movie.title);
      setNewYear(movie.year);
      setNewRating(movie.rating);
    }
  }, [title, movieStore.movies]);

  const handleEditMovie = async () => {
    if (movie) {
      try {
        if (
          movie.title === newTitle &&
          movie.year === newYear &&
          movie.rating === newRating
        ) {
          alert("No changes detected! (ไม่มีการเปลี่ยนแปลงข้อมูล)");
          navigate('/add-movie');
          return; // ยุติการทำงานหากไม่มีการเปลี่ยนแปลงข้อมูล
        }

        await store.updateMovie(movie.title, {
          title: newTitle,
          year: newYear,
          rating: newRating
        });

        alert("Movie updated successfully!");
        navigate('/add-movie');
      } catch (error) {
        console.error('Failed to update movie (ไม่ได้อัพเดตข้อมูลใหม่)', error);
        alert("Failed to update movie (ไม่ได้อัพเดตข้อมูลใหม่)");
        navigate('/add-movie');
      }
    } else {
      alert("Movie not found!");
      navigate('/add-movie');
    }
  };

  if (!movie) {
    return <div className='container'>
        <button
            onClick={() => navigate('/add-movie')}
        >Back</button>
      <h2>Edit Movie</h2>
      Movie not found!</div>;
  }
  

  return (
    <div className="container">
        <button
            onClick={() => navigate('/add-movie')}
        >Back</button>
      <h2>Edit Movie</h2>
      <form onSubmit={handleEditMovie}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
          />
        </div>
        <div>
          <label>Year:</label>
          <input 
            type="number" 
            value={newYear} 
            onChange={(e) => setNewYear(Number(e.target.value))} 
          />
        </div>
        <div>
          <label>Rating:</label>
          <select 
            value={newRating} 
            onChange={(e) => setNewRating(e.target.value as 'G' | 'PG' | 'M' | 'MA' | 'R')}
          >
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="M">M</option>
            <option value="MA">MA</option>
            <option value="R">R</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditMovie;
