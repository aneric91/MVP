// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import { UserProvider } from './src/context/AuthContext';

const App = () => (
    <UserProvider>
        <AppNavigator />
    </UserProvider>
);

export default App;
