import React, {createContext, useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../env';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const {baseUrl} = environment;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storeData = async json => {
    try {
      const jsonValue = JSON.stringify(json);
      await AsyncStorage.setItem('usuario', jsonValue);
    } catch (e) {
      console.log('error al guardar en AsyncStorage: ', e);
    }
  };

  const getData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('usuario');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      console.log('error al leer en AsyncStorage: ', e);
    }
  }, []);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      setUser(null);
    } catch (e) {
      console.log('error al eliminar en AsyncStorage: ', e);
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (e) {
      console.log('error al cargar contexto: ', e);
    } finally {
      setLoading(false);
    }
  }, [getData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            const resp = await axios.post(`${baseUrl}/v1/iniciar-sesion`, {
              correo: email,
              clave: password,
            });
            setUser(resp?.data?.detalle);
            storeData(resp?.data?.detalle);
          } catch (e) {
            Alert('Atención', 'Credenciales incorrectas');
            console.log(e);
          }
        },
        logout: async () => {
          try {
            Alert.alert('Atención', '¿Desear cerrar tu sesión?', [
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Cerrar Sesión',
                onPress: () => removeValue(),
              },
            ]);
          } catch (error) {
            console.log('error authprovider logout: ', error);
          }
        },
        loading,
        setLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
