import * as firebase from 'firebase/app';
import {createContext, FC, useContext, useEffect, useState} from 'react';
import {useAuth} from 'reactfire';

export interface UserContext {
  fireUser: firebase.User | null | undefined;
  setCurrentUser: (user: firebase.User | null) => void;
  signUp: (email: string, password: string) => Promise<firebase.User | null>;
  signIn: (email: string, password: string) => Promise<firebase.User | null>;
  logOut: () => Promise<any>;
}

interface State {
  fireUser: firebase.User | null | undefined;
}

const initialContext: UserContext = {
  fireUser: undefined,
  setCurrentUser: (user: firebase.User | null) => {},
  signUp: (email: string, password: string): any => {},
  signIn: (email: string, password: string): any => {},
  logOut: (): any => {},
};

const initialState: State = {
  fireUser: undefined,
};

const Context = createContext<UserContext>(initialContext);

export const UserProvider: FC = ({children}) => {
  const auth = useAuth();
  const [state, setState] = useState(initialState);

  const signUp = async (email: string, password: string): Promise<any> => {
    return (await auth.createUserWithEmailAndPassword(email, password)).user;
  };

  const signIn = async (email: string, password: string): Promise<any> => {
    return (await auth.signInWithEmailAndPassword(email, password)).user;
  };

  const setCurrentUser = (user: firebase.User | null) => {
    setState((pS) => ({
      ...pS,
      fireUser: user,
    }));
  };

  const logOut = async (): Promise<any> => {
    auth.signOut();
  };

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unSubscribe;
  }, [state.fireUser]);

  return (
    <Context.Provider
      value={{...state, setCurrentUser, signUp, signIn, logOut}}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppUser = (): UserContext => useContext(Context);
