import React, { useEffect, useState } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { Image, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { styles, IChartData } from './TemperatureDetails';

export const DustDetails = (): React.ReactElement => {
  const [dust, setDust] = useState<string>("");
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const ref = firebase.database().ref('data')

    const listener = ref.on('value', (snapshot) => {
      setDust(snapshot.val().dust);
    });
    return () => {
      ref.off('value', listener);
    }
  }, []);


  useEffect(() => {
    const trackingRef = firebase.database().ref("tracking").child("dust");
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
        <Text>Nồng độ bụi hiện tại</Text>
        <Text category="h2" style={styles.textValue}>{dust}  mg/m3</Text>
        <Text category="h5" style={styles.chartLabel}>Biểu đồ</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={chartData} x="time" y="value" />
        </VictoryChart>
      </Layout>
    </ScrollView>
  )
};