import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserSelection from './users/UserSelection';
import Dashboard from './users/Dashboard';
import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';
import DeleteMovie from './components/DeleteMovie';
import EditMovie from './components/EditMovie';
import NotAuthorized from './components/NotAuthorized';
import { useParams } from 'react-router-dom';
import './styles.css';

const App: React.FC = () => {
  // Function to check if the user is MANAGER
  const requireManager = (element: JSX.Element) => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'MANAGER' ? element : <Navigate to="/not-authorized" />;
  };

  const EditMovieWrapper: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    return <EditMovie title={title!} />;
  };
  return (
    <Router>
        <Routes>
            <Route path="/" element={<UserSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-movie" element={
                <div>
                    <AddMovie />
                    <MovieList />
                </div>
                } />
            <Route path="/manage-movies" element={requireManager(<DeleteMovie />)} />
            <Route path="/edit-movie/:title" element={<EditMovieWrapper />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
    </Router>
  );
};

export default App;
