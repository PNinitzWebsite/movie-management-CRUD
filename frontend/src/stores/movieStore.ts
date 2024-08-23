import { types, Instance, SnapshotOut, flow } from 'mobx-state-tree';
import axios from 'axios';

// Define the model for a single movie
const MovieModel = types.model({
  title: types.string,
  year: types.number,
  rating: types.enumeration('Rating', ['G', 'PG', 'M', 'MA', 'R'])
});
// Define the store for managing movies
const MovieStore = types.model({
  movies: types.array(MovieModel)
})
.actions(self => ({
  loadMovies: flow(function* () {
    try {
      const response = yield axios.get('/api/movies');
      // ตรวจสอบว่า data เป็น array ของ objects ที่ตรงกับ MovieModel
      self.movies.replace(response.data);
    } catch (error) {
      console.error('Failed to load movies', error);
    }
  }),
  addMovie: flow(function* (movie) {
    try {
      if (self.movies.find((m) => m.title === movie.title)) {
        console.error('Movie title already exists');
        alert("Movie title already exists (มีชื่อหนังซ้ำแล้ว)");
        return;
      }
      yield axios.post('/api/movies', movie);
      self.movies.push(movie);
    } catch (error) {
      console.error('Failed to add movie', error);
    }
  }),
  
  // Delete a movie from the API and store
  deleteMovie: flow(function* (title: string) {
    try {
      yield axios.delete(`/api/movies/${title}`, {
        headers: { 'role': 'MANAGER' } // Example role-based authorization
      });
      self.movies.replace(self.movies.filter(movie => movie.title !== title));
      alert("Delete a movie success! (ลบสำเร็จแล้ว)");
    } catch (error) {
      console.error('Failed to delete movie', error);
    }
  }),
  updateMovie: flow(function* (oldTitle: string, updatedMovie: { title: string; year: number; rating: "G" | "PG" | "M" | "MA" | "R" }) {
    try {
      // ค้นหาภาพยนตร์ที่มีชื่อ oldTitle
      const movie = self.movies.find((m) => m.title === oldTitle);
      if (movie) {
        // ตรวจสอบว่าข้อมูลที่อัปเดตเหมือนกับข้อมูลเดิมหรือไม่
        if (
          movie.title === updatedMovie.title &&
          movie.year === updatedMovie.year &&
          movie.rating === updatedMovie.rating
        ) {
          alert("No changes detected! (ไม่มีการเปลี่ยนแปลงข้อมูล)");
          window.location.href = "/add-movie";
          return; // ยุติการทำงานหากไม่มีการเปลี่ยนแปลงข้อมูล
        }

        // ส่งคำขออัปเดตไปยัง API
        yield axios.put(`/api/movies/${oldTitle}`, updatedMovie);

        // อัปเดตข้อมูลใน store
        movie.title = updatedMovie.title;
        movie.year = updatedMovie.year;
        movie.rating = updatedMovie.rating;

        alert("Movie updated successfully!");
      } else {
        console.error('Movie not found');
        alert("Movie not found!");
      }
    } catch (error) {
      console.error('Failed to update movie (ไม่ได้อัพเดตข้อมูลใหม่)', error);
      alert("Failed to update movie (ไม่ได้อัพเดตข้อมูลใหม่)");
    }
  }),
}));

// Type definitions for the store
export interface MovieStoreType extends Instance<typeof MovieStore> {}
export interface MovieStoreSnapshot extends SnapshotOut<typeof MovieStore> {}

// Export the store model
export { MovieStore };
