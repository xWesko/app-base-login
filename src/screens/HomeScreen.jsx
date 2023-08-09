import React, { useContext } from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

import { environment } from '../../env';

export default function HomeScreen() {

  const { baseUrl } = environment;
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        animated={true}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.userArea}>
          <Text style={{ fontSize: 20 }}>Hola</Text>
          <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{user?.name}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  userArea: {
    marginVertical: 1,
    marginHorizontal: '5%'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 4,
  },
  switchView: {
    alignItems: 'center',
    flexDirection: "row",
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  viewIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  result: {
    marginBottom: 50,
  },
  textResult: {
    fontSize: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleRow: {
    fontWeight: '500', 
    fontSize: 18
  },
  titleDescr: {
    fontWeight: '300', 
    fontSize: 18
  },
  textGenerico: {
    color: '#434343',
    fontSize: 18,
    textAlign: 'center',
  }
});