import React from 'react';
import {preloadFirestore, SuspenseWithPerf} from 'reactfire';
import './App.css';
import {UserProvider} from './contexts/UserContext';
import Routes from './routes/Routes';

function App() {
  preloadFirestore({
    setup: (firestore) =>
      firestore().enablePersistence({synchronizeTabs: true}),
  });

  return (
    <SuspenseWithPerf
      fallback={<div>loading...</div>}
      traceId={'load-application'}
    >
      <UserProvider>
        <Routes />
      </UserProvider>
    </SuspenseWithPerf>
  );
}

export default App;
