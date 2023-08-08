  import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

const Loading = ({
  color = '#ff206e',
  size = 'large',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        color={color}
        size={size}
      />
      <Text>Cargando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loading