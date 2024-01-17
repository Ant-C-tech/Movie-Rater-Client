import './style.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket as solidRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus as solidUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Box } from 'react-bulma-components';
import { useCookies } from 'react-cookie';

import { NavControls } from '../../components/';
import { API } from '../../api/';

const { Field, Label, Input, Control } = Form;

export const Auth = ({ action }) => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['user-token']);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (cookies['user-token']) {
      navigate('/');
    }
  }, [cookies, navigate]);

  const loginUser = async () => {
    try {
      const response = await API.loginUser({ username, password });
      setCookie('user-token', response.token);
      setCookie('user', username);
    } catch (error) {
      console.error('There was a problem with the login operation: ', error);
    }
  };

  const signUpUser = async () => {
    try {
      await API.signUpUser({ username, password });
      loginUser();
    } catch (error) {
      console.error('There was a problem with the signup operation: ', error);
    }
  };

  return (
    <>
      <NavControls />
      <div className='auth-wrapper'>
        <h2 className='auth-form-title'>
          {action === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        <Box
          style={{
            width: '50%',
            margin: '0 auto 20px',
            backgroundColor: 'inherit',
            color: '#ccc',
            textAlign: 'center',
          }}
        >
          <Field>
            <Label className='auth-form-label' size='medium'>
              Name
            </Label>
            <p>150 characters or fewer. Letters, digits and @/./+/-/_ only.</p>
            <br />
            <Control>
              <Input
                placeholder='e.g. John Doe'
                type='text'
                value={username}
                maxLength={150}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Control>
          </Field>
          <Field>
            <Label className='auth-form-label' size='medium'>
              Password
            </Label>
            <Control>
              <Input
                placeholder='e.g. qwertyqwerty'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Control>
          </Field>
        </Box>
        <div className='auth-controls'>
          {action === 'login' ? (
            <Button
              className='button-custom'
              onClick={loginUser}
              disabled={username.length === 0 || password.length === 0}
            >
              <FontAwesomeIcon
                className='button-icon'
                icon={solidRightToBracket}
              />
              {'LogIn'}
            </Button>
          ) : (
            <Button
              className='button-custom'
              onClick={signUpUser}
              disabled={username.length === 0 || password.length === 0}
            >
              <FontAwesomeIcon className='button-icon' icon={solidUserPlus} />
              {'SignUp'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
