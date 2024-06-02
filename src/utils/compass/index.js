// Compass.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { AppColors } from "../../constants/colors";
import { cardinalPoints } from "../cardinal-points";

const Compass = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let subscription;
    const startCompass = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      subscription = await Location.watchHeadingAsync(({ trueHeading }) => {
        setHeading(trueHeading);
      });
    };

    startCompass();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {Math.round(heading)}° {cardinalPoints(Math.round(heading))}
      </Text>
      <Text style={styles.mark}>.</Text>
      <View style={styles.compass}>
        <Image
          source={require("../../../assets/images/compass.png")}
          style={[
            styles.arrow,
            { transform: [{ rotate: `${360 - heading}deg` }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
  },
  compass: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  mark: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColors.danger,
  },
});

export default Compass;
