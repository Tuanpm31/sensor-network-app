import React, { useEffect, useState } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { Image, Button, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { styles, IChartData } from './TemperatureDetails';

export const HumidityDetails = (): React.ReactElement => {
  const [humidity, setHumidity] = useState<string>("");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const ref = firebase.database().ref('data')

    const listener = ref.on('value', (snapshot) => {
      setHumidity(snapshot.val().humidity);
    });
    return () => {
      ref.off('value', listener);
    }
  }, []);


  useEffect(() => {
    const trackingRef = firebase.database().ref("tracking").child("humidity");
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
          source={require('../assets/water-drop.png')}
          style={styles.image}
        />
        <Text>Độ ẩm hiện tại</Text>
        <Text category="h2" style={styles.textValue}>{humidity} %</Text>
        <Text category="h5" style={styles.chartLabel}>Biểu đồ</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={chartData} x="time" y="value" />
        </VictoryChart>
      </Layout>
    </ScrollView>
  )
};