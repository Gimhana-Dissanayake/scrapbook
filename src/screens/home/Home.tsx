import React from 'react';
import {useHistory} from 'react-router';

import {useAppUser} from '../../contexts/UserContext';

const Home = () => {
  const history = useHistory();
  const {logOut} = useAppUser();

  return (
    <h1 className="ml-4 mt-2">
      <button
        onClick={async () => {
          await logOut();

          history.push('/signin');
        }}
      >
        logout
      </button>
    </h1>
  );
};

export default Home;
