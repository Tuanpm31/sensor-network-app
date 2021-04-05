import React, { useEffect, useState } from 'react';
import { Card, Divider, Layout, Text } from '@ui-kitten/components';
import { StatusBarBackground } from '../StatusBarBackground';
import * as firebase from 'firebase';
import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export const HomeScreen = ({ navigation }): React.ReactElement => {
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [dust, setDust] = useState<string>("");

  useEffect(() => {
    firebase.database().ref('data').on('value', (snapshot) => {
      setTemperature(snapshot.val().temperature);
      setHumidity(snapshot.val().humidity);
      setDust(snapshot.val().dust);
    })
  }, []);

  return (
    <React.Fragment>
      <StatusBarBackground />
      <ScrollView>
        <Layout style={styles.container}>
          <Card style={styles.card}
            onPress={() => navigation.navigate("TemperatureDetails")}

          >
            <Image
              source={require('../assets/thermometer.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Nhiệt độ</Text>
            <Text category="h4" style={{ alignSelf: 'center' }}>{temperature} °C</Text>
          </Card>


          <Card style={styles.card} onPress={() => navigation.navigate("HumidityDetails")}>
            <Image
              source={require('../assets/water-drop.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Độ ẩm</Text>
            <Text category="h4" style={{ alignSelf: 'center' }}>{humidity}%</Text>
          </Card>

          <Card style={styles.card}
            onPress={() => navigation.navigate("DustDetails")}
          >
            <Image
              source={require('../assets/dust.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Nồng Độ Bụi</Text>
            <Text category="h4" style={{ alignSelf: 'center' }}>{dust} mg/m3</Text>
          </Card>
        </Layout>
      </ScrollView>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: "center"

  },
  headerTitle: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  layout: {
    flex: 1,
    paddingHorizontal: 8,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#fff",
    margin: 8,
    minWidth: 300,
  },
  cardText: {
    marginTop: 8,
    alignSelf: 'center'
  },
  cardImage: {
    width: 70,
    height: 70,
    alignSelf: 'center'
  }
})