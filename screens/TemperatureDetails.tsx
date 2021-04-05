import React, { useEffect, useState } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { StyleSheet, Image, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

export type IChartData = {
  time: string,
  value: string
}

const data = [
  { time: new Date(1982, 1, 1), value: 125 },
  { time: new Date(1987, 1, 1), value: 257 },
  { time: new Date(1993, 1, 1), value: 345 },
  { time: new Date(1997, 1, 1), value: 515 },
  { time: new Date(2001, 1, 1), value: 132 },
  { time: new Date(2005, 1, 1), value: 305 },
  { time: new Date(2011, 1, 1), value: 270 },
  { time: new Date(2015, 1, 1), value: 470 }
];

export const TemperatureDetails = (): React.ReactElement => {
  const [temperature, setTemperature] = useState<string>("");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const ref = firebase.database().ref('data')

    const listener = ref.on('value', (snapshot) => {
      setTemperature(snapshot.val().temperature);
    });
    return () => {
      ref.off('value', listener);
    }
  }, []);


  useEffect(() => {
    const trackingRef = firebase.database().ref("tracking").child("temperature");
    const listenner = trackingRef.on('value', (snapshot) => {
      const temp: IChartData[] = []

      Object.keys(snapshot.val()).forEach((k) => {
        let entry = snapshot.val()[k];
        const newObject: IChartData = {
          time: entry.time,
          value: entry.value
        }
        temp.push(newObject)
      })

      setChartData(temp);
    });
    return () => {
      trackingRef.off('value', listenner);
    }

  }, []);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Image
          source={require('../assets/thermometer.png')}
          style={styles.image}
        />
        <Text>Nhiệt độ hiện tại</Text>
        <Text category="h2" style={styles.textValue}>{temperature} °C</Text>
        <Text category="h5" style={styles.chartLabel}>Biểu đồ</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={chartData} x="time" y="value" />
        </VictoryChart>
      </Layout>
    </ScrollView>
  )
};


export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 16,
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 16
  },
  textValue: {
    alignSelf: "center",
    marginTop: 16
  },
  chartLabel: {
    marginTop: 16
  }
})