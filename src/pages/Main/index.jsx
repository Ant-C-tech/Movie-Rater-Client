import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as solidPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Columns, Heading } from 'react-bulma-components';
import { useCookies } from 'react-cookie';

import {
  MovieList,
  MovieDetails,
  EditMovie,
  CreateMovie,
  NavControls,
} from '../../components/';
import { API } from '../../api/';

export const Main = () => {
  const [cookies] = useCookies(['user-token', 'user']);

  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [editedMovieId, setEditedMovieId] = useState(null);
  const [isCreatingMovie, setIsCreatingMovie] = useState(false);

  const storeMovies = async () => {
    const movies = await API.getMovies();
    setMovies(movies);
  };

  useEffect(() => {
    storeMovies();
  }, []);

  return (
    <main className='main'>
      <NavControls
        setSelectedMovieId={setSelectedMovieId}
        setEditedMovieId={setEditedMovieId}
        setIsCreatingMovie={setIsCreatingMovie}
      />
      <Heading subtitle style={{ color: '#ccc' }}>
        {`Welcome to Movie Rater${cookies.user ? `, ${cookies.user}` : ''}!`}
      </Heading>
      {cookies['user-token'] && (
        <Button
          className='button-success'
          color='success'
          onClick={() => {
            setSelectedMovieId(null);
            setEditedMovieId(null);
            setIsCreatingMovie(true);
          }}
        >
          <FontAwesomeIcon className='button-icon' icon={solidPlus} />
        </Button>
      )}
      <Columns>
        <Columns.Column>
          <MovieList
            movies={movies}
            setMovies={setMovies}
            selectedMovieId={selectedMovieId}
            setSelectedMovieId={setSelectedMovieId}
            setEditedMovieId={setEditedMovieId}
            setIsCreatingMovie={setIsCreatingMovie}
          />
        </Columns.Column>

        <Columns.Column>
          {editedMovieId ? (
            <EditMovie
              editedMovieId={editedMovieId}
              setEditedMovieId={setEditedMovieId}
              movies={movies}
              setMovies={setMovies}
              setIsCreatingMovie={setIsCreatingMovie}
            />
          ) : isCreatingMovie ? (
            <CreateMovie
              movies={movies}
              setMovies={setMovies}
              setIsCreatingMovie={setIsCreatingMovie}
            />
          ) : (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              movies={movies}
              setMovies={setMovies}
              setIsCreatingMovie={setIsCreatingMovie}
            />
          )}
        </Columns.Column>
      </Columns>
    </main>
  );
};
