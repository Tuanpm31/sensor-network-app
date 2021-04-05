import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ScrollView, StyleSheet } from 'react-native';
import { StatusBarBackground } from '../StatusBarBackground';
import { IChartData } from "../screens/TemperatureDetails";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import * as firebase from 'firebase';


export const ChartScreen = (): React.ReactElement => {
  const [temperatureChartData, setTemperatureChartData] = useState<IChartData[]>([]);
  const [humidityChartData, setHumidityChartData] = useState<IChartData[]>([]);
  const [dustChartData, setDustChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const temperatureRef = firebase.database().ref("tracking").child("temperature");
    const humidityRef = firebase.database().ref("tracking").child("humidity");
    const dustRef = firebase.database().ref("tracking").child("dust");

    const temperatureListener = temperatureRef.on("value", (snapshot) => {
      const temp: IChartData[] = []
      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        const newObject: IChartData = {
          time: entry.time,
          value: entry.value
        }
        temp.push(newObject)
      })

      setTemperatureChartData(temp);
    });

    const humidityListener = humidityRef.on("value", (snapshot) => {
      const temp: IChartData[] = []
      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        const newObject: IChartData = {
          time: entry.time,
          value: entry.value
        }
        temp.push(newObject)
      })

      setHumidityChartData(temp);
    });

    const dustListener = humidityRef.on("value", (snapshot) => {
      const temp: IChartData[] = []
      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        const newObject: IChartData = {
          time: entry.time,
          value: entry.value
        }
        temp.push(newObject)
      })

      setDustChartData(temp);
    });

    return () => {
      temperatureRef.off("value", temperatureListener);
      humidityRef.off("value", humidityListener);
      dustRef.off("value", dustListener);
    }


  }, [])

  return (
    <React.Fragment>
      <StatusBarBackground />
      <ScrollView>
        <Layout style={styles.container}>
          <Text category='h3'>Nhiệt độ</Text>

          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine data={temperatureChartData} x="time" y="value" />
          </VictoryChart>

          <Text category="h3">Độ ẩm</Text>

          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine data={humidityChartData} x="time" y="value" />
          </VictoryChart>

          <Text category="h3">Nồng độ bụi</Text>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine data={dustChartData} x="time" y="value" />
          </VictoryChart>
        </Layout>
      </ScrollView>
    </React.Fragment>

  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 16,
    alignItems: 'center'
  }
})