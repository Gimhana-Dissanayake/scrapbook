import React, {useState} from 'react';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {useAppUser} from '../../../contexts/UserContext';
import {authError} from '../../../shared/validation/Validation';

import './SignInStyles.scss';

const SignIn = () => {
  const history = useHistory();
  const {signIn} = useAppUser();
  const [state, setState] = useState({
    loading: false,
    hasError: '',
    email: '',
    password: '',
  });

  const inputChangeHandler = (e: any) => {
    setState((pS) => ({...pS, [e.target.name]: e.target.value}));
  };

  const resetError = () => {
    setState((pS) => ({
      ...pS,
      hasError: '',
    }));
  };

  const sumbitHandler = async (e: any) => {
    setState((pS) => ({
      ...pS,
      loading: true,
    }));
    e.preventDefault();
    try {
      await signIn(state.email, state.password);
      history.push('/');
    } catch (e: any) {
      console.log('error', e);
      setState((pS) => ({
        ...pS,
        loading: false,
        hasError: authError.get(e.code) ?? 'Something went wrong!',
      }));
    }
  };

  return (
    <div className="sign-in-global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Log in Scrapbook</h3>
          <div className="card-text">
            {state.hasError && (
              <Alert variant="danger" className="text-center">
                Bad credentials
              </Alert>
            )}

            <Form>
              <Form.Group>
                <Form.Label htmlFor="exampleInputEmail1">
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={inputChangeHandler}
                  value={state.email}
                  onFocus={resetError}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="exampleInputPassword1">
                  Password
                </Form.Label>
                <Link
                  to="/forgot-password"
                  style={{float: 'right', fontSize: 12}}
                >
                  Forgot password?
                </Link>

                <Form.Control
                  type="password"
                  name="password"
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  onChange={inputChangeHandler}
                  value={state.password}
                  onFocus={resetError}
                />
              </Form.Group>
              <Button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={sumbitHandler}
              >
                Sign in{' '}
                {state.loading && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
              <div className="sign-up">
                Don't have an account? <Link to="/signup">Create One</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
