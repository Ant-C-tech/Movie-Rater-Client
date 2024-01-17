import 'normalize.css';
import 'bulma/css/bulma.min.css';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm as solidFilm } from '@fortawesome/free-solid-svg-icons';
import { Box } from 'react-bulma-components';
import { CookiesProvider } from 'react-cookie';

import { Main, Auth } from './pages/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <Auth action='login' />,
  },
  {
    path: '/signup',
    element: <Auth action='signup' />,
  },
]);

function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1 className='app-title'>
          Movie <FontAwesomeIcon className='app-title-logo' icon={solidFilm} />{' '}
          Rater
        </h1>
      </header>
      <Box
        style={{
          position: 'relative',
          height: '90vh',
          maxHeight: '90vh',
          backgroundColor: 'inherit',
          border: '1px solid #48c78e',
          color: '#ccc',
          textAlign: 'center',
        }}
      >
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </Box>
    </div>
  );
}

export default App;
