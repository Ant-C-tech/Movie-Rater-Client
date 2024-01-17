import { useEffect, useState } from 'react';
import { Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk as solidFloppy } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

import { API } from '../../api';
import { getMovieById } from '../../utils/getMovieById';
import { MovieForm } from '../MovieForm';

export const EditMovie = ({
  editedMovieId,
  setEditedMovieId,
  movies,
  setMovies,
  setIsCreatingMovie,
}) => {
  const [cookies] = useCookies(['user-token']);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const movie = getMovieById(editedMovieId, movies);
    setTitle(movie.title);
    setDescription(movie.description);
  }, [movies, editedMovieId]);

  const updateMovie = async () => {
    const movie = getMovieById(editedMovieId, movies);
    const updatedMovie = {
      ...movie,
      title,
      description,
    };
    try {
      await API.updateMovie(editedMovieId, updatedMovie, cookies['user-token']);
      const updatedMovies = movies.map((movie) => {
        if (movie.id === updatedMovie.id) {
          return updatedMovie;
        }
        return movie;
      });
      setMovies(updatedMovies);
      setEditedMovieId(null);
      setIsCreatingMovie(false);
    } catch (error) {
      console.error('There was a problem with the update operation: ', error);
    }
  };

  return (
    <div className='movie-form-wrapper'>
      <h2 className='movie-form-title'>Edit the Movie</h2>
      <MovieForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <Button
        className='button-custom'
        onClick={updateMovie}
        disabled={title.length === 0 || description.length === 0}
      >
        <FontAwesomeIcon className='button-icon' icon={solidFloppy} />
        Save
      </Button>
    </div>
  );
};
