import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


const Routes = () => {

  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );


};

export default Routes;