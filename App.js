import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/MainStack';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
