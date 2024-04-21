/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './Context/AuthContext';
import { TimerProvider } from './Context/TimerContext';

const Root = () => (
    <AuthProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);
