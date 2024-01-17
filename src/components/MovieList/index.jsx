import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck as solidCheck } from '@fortawesome/free-solid-svg-icons'
import { faEdit as solidEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash as solidTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bulma-components";
import { useCookies } from 'react-cookie';

import { API } from '../../api';

export const MovieList = ({
  movies,
  setMovies,
  selectedMovieId,
  setSelectedMovieId,
  setEditedMovieId,
  setIsCreatingMovie }) => {

  const [cookies] = useCookies(['user-token']);

  const deleteMovie = async (movieId) => {
    try {
      await API.deleteMovie(movieId, cookies['user-token']);
      setMovies(movies.filter(m => m.id !== movieId));
      setSelectedMovieId(null);
      setEditedMovieId(null);
      setIsCreatingMovie(false);
    } catch (error) {
      console.error('There was a problem with the delete operation: ', error);
    }
  };

  return (
    <div
      className='movie-list-wrapper'>
      <h2 className="movie-list-title">Movie List</h2>
      <ul className='movie-list' style={{
        height: cookies['user-token'] ? '72vh' : '78vh',
        maxHeight: cookies['user-token'] ? '72vh' : '78vh',
      }}>
        {movies && movies.map(movie => {
          return (
            <li className='movie-list-item'
              key={movie.id}
            >
              <div className="movie-list-item-content">
                {selectedMovieId === movie.id &&
                  <FontAwesomeIcon className='movie-list-item-icon' icon={solidCheck} />
                }
                <span className='movie-list-item-text'
                  onClick={() => {
                    setSelectedMovieId(movie.id)
                    setEditedMovieId(null)
                    setIsCreatingMovie(false)
                  }}>
                  {movie.title}
                </span>
              </div>
              {cookies['user-token'] && <div className="movie-controls">
                <Button className='button-custom' onClick={() => {
                  setSelectedMovieId(movie.id)
                  setEditedMovieId(movie.id)
                }}>
                  <FontAwesomeIcon className='button-icon' icon={solidEdit} />
                </Button>
                <Button className='button-custom' onClick={
                  () => deleteMovie(movie.id)
                }>
                  <FontAwesomeIcon className='button-icon' icon={solidTrash} />
                </Button>
              </div>}
            </li>
          )
        })}
      </ul>
    </div>
  )
};
