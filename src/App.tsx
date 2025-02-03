import React from 'react';
import CustomRoute from './router/index';
import { GlobalStateProvider } from './store/globalStateContext';

const App: React.FC = () => {
    return (
        <GlobalStateProvider>
            <CustomRoute />
        </GlobalStateProvider>
    );
};

export default App;