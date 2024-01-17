import './style.css';

import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export const NavControls = ({
  setSelectedMovieId,
  setEditedMovieId,
  setIsCreatingMovie,
}) => {
  const [cookies, , removeCookie] = useCookies(['user-token']);

  if (window.location.pathname === '/') {
    return (
      <nav className='nav-controls'>
        {cookies['user-token'] ? (
          <Link
            to='/'
            className='nav-control'
            onClick={() => {
              removeCookie('user-token');
              removeCookie('user');
              setSelectedMovieId(null);
              setEditedMovieId(null);
              setIsCreatingMovie(false);
            }}
          >
            LogOut
          </Link>
        ) : (
          <>
            <Link to='/login' className='nav-control'>
              LogIn
            </Link>
            <Link to='/signup' className='nav-control'>
              SignUp
            </Link>
          </>
        )}
      </nav>
    );
  } else {
    return (
      <nav className='nav-controls'>
        <Link to='/' className='nav-control'>
          Movies
        </Link>
      </nav>
    );
  }
};
