import React, {useState} from 'react';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {useAppUser} from '../../../contexts/UserContext';
import {authError} from '../../../shared/validation/Validation';
import './SignUpStyles.scss';

const SignUp = () => {
  const history = useHistory();
  const {signUp} = useAppUser();
  const [state, setState] = useState({
    loading: false,
    hasError: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (state.password !== state.confirmPassword) {
      setState((pS) => ({
        ...pS,
        loading: false,
        hasError: "Passwords don't match",
      }));
      return;
    }

    try {
      await signUp(state.email, state.password);
      history.push('/');
    } catch (e: any) {
      console.log(e);

      setState((pS) => ({
        ...pS,
        loading: false,
        hasError: authError.get(e.code) ?? 'Something went wrong!',
      }));
    }
  };

  return (
    <div className="sign-up-global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Sign in Scrapbook</h3>
          <div className="card-text">
            {state.hasError && (
              <Alert variant="danger" className="text-center">
                {state.hasError}
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
              <Form.Group>
                <Form.Label htmlFor="exampleInputPassword2">
                  Confirm Password
                </Form.Label>

                <Form.Control
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-sm"
                  id="exampleInputPassword2"
                  onChange={inputChangeHandler}
                  value={state.confirmPassword}
                  onFocus={resetError}
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={sumbitHandler}
              >
                Sign up{' '}
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
                Have an account? <Link to="/signin">Sign In</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
