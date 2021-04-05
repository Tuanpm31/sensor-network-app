import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigator/AppNavigator';

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDyTQmugtLdJLY8GRA7tucDFuxx3Dw5_uA",
  authDomain: "graduation-thesis-8ffb0.firebaseapp.com",
  databaseURL: "https://graduation-thesis-8ffb0-default-rtdb.firebaseio.com",
  projectId: "graduation-thesis-8ffb0",
  storageBucket: "graduation-thesis-8ffb0.appspot.com",
  messagingSenderId: "820360035086",
  appId: "1:820360035086:web:b58ff5ab0f99772ff1355f"
};

firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <StatusBar />
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
