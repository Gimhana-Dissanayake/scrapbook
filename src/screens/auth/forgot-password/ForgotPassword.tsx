import React, {useState} from 'react';
import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {useAppUser} from '../../../contexts/UserContext';
import {authError} from '../../../shared/validation/Validation';

const ForgotPassword = () => {
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
          <h3 className="card-title text-center">Recovery email</h3>
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

              <Button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={sumbitHandler}
              >
                Send recovery email{' '}
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
