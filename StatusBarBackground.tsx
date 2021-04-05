import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export const StatusBarBackground = (): React.ReactElement => (
  <View style={styles.background}>

  </View>
);

const styles = StyleSheet.create({
  background: {
    height: (Platform.OS === "ios") ? 18 : 0,
    backgroundColor: "#fff"
  }
});