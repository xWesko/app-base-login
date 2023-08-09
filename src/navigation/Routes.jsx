import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import Loading from '../components/Loading';


const Routes = () => {

  const { user } = useContext(AuthContext);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = () => {
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged()
    }, 1000);
  }, []);


  if (initializing) return <Loading />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );


};

export default Routes;