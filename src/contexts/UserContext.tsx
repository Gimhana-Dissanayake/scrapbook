import * as firebase from 'firebase/app';
import {createContext, FC, useContext, useEffect, useState} from 'react';
import {useAuth} from 'reactfire';

export interface UserContext {
  fireUser: firebase.User | null;
  setCurrentUser: (user: firebase.User | null) => void;
  signUp: (email: string, password: string) => Promise<firebase.User | null>;
  signIn: (email: string, password: string) => Promise<firebase.User | null>;
  logOut: () => Promise<any>;
}

interface State {
  fireUser: firebase.User | null;
}

const initialContext: UserContext = {
  fireUser: null,
  setCurrentUser: (user: firebase.User | null) => {},
  signUp: (email: string, password: string): any => {},
  signIn: (email: string, password: string): any => {},
  logOut: (): any => {},
};

const initialState: State = {
  fireUser: null,
};

const Context = createContext<UserContext>(initialContext);

export const UserProvider: FC = ({children}) => {
  const auth = useAuth();
  const [state, setState] = useState(initialState);

  const signUp = async (email: string, password: string): Promise<any> => {
    return await auth.createUserWithEmailAndPassword(email, password);
  };

  const signIn = async (email: string, password: string): Promise<any> => {
    return await (
      await auth.signInWithEmailAndPassword(email, password)
    ).user;
  };

  const setCurrentUser = (user: firebase.User | null) => {
    setState((pS) => ({
      ...pS,
      fireUser: user,
    }));
  };

  const logOut = async (): Promise<any> => {};

  useEffect(() => {
    console.log('run function');
  }, []);

  return (
    <Context.Provider
      value={{...state, setCurrentUser, signUp, signIn, logOut}}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppUser = (): UserContext => useContext(Context);
