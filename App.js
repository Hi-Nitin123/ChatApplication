import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/MainStack';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
