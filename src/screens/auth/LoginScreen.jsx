import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Keyboard,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginSVG from '../../assets/images/login.svg';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';
import { AuthContext } from '../../navigation/AuthProvider';

const LoginScreen = () => {

  const {login} = useContext(AuthContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [campos, setCampos] = useState({
    email: null,
    password: null
  });

  const handleLogin = () => {
    try {
      setCargando(true);
      if(!campos.email && !campos.password) {
        Alert("Error", "Ingresa el correo y contraseña.");
        return
      }
      login(campos.email, campos.password);
    } catch (error) {
      console.log('error al inciar sesion: ', error);
    } finally {
      setCargando(false);
    }

  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
    <StatusBar 
      barStyle="dark-content"
      animated={true}
    />
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView style={{ paddingHorizontal: 25,  }}>
        <View style={{ alignItems: 'center', display: keyboardStatus ? 'none': 'flex'}}>
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            marginTop: keyboardStatus ? '50%' : 0
          }}>
          Iniciar sesión
        </Text>

        <InputField
          label={'Email'}
          name='email'
          setCampos={setCampos}
          campos={campos}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Contraseña'}
          name='password'
          setCampos={setCampos}
          campos={campos}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <CustomButton 
          label={"Ingresar"} 
          onPress={handleLogin} 
          loading={cargando}
        />
     
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default LoginScreen;