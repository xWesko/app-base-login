import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { environment } from '../../env';

const { mainColor } = environment;

export default function CustomButton({
  label,
  onPress,
  backgroundColor = mainColor,
  textColor = '#fff',
  loading = false,
}) {

  const LoadingText = () => {
    return (
      <View style={styles.loadingContaier}>
        <Text style={{ ...styles.text, color: textColor }}>Cargando</Text>
        <ActivityIndicator
          size="small"
          color={textColor}
          style={{ marginLeft: 20 }}
        />
      </View>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        padding: 20,
        opacity: loading ? 0.6 : 1,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      { loading 
        ? <LoadingText /> 
        : <Text style={{ ...styles.text, color: textColor }}>{label}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loadingContaier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  }
});