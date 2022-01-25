import * as React from 'react';
import Routes from './routes';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return <Routes />;
}
