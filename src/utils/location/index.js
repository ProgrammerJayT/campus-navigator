import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";

const GetUserLocation = ({ setLoading, setLocation, setError }) => {
  useEffect(() => {
    let subscription;

    (async () => {
      if (!Device.isDevice) {
        setError(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      setLoading(true);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (location) => {
          setLoading(false);
          setLocation(location);
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return null;
};

export default GetUserLocation;
