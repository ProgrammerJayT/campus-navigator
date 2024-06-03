import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";

const GetUserLocation = ({ setLoading, setLocation, setError }) => {
  useEffect(() => {
    let subscription;

    (async () => {
      try {
        if (!Device.isDevice) {
          setError(
            "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
          );
          return;
        }

        console.log("Requesting foreground permissions...");
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          console.log("Permission denied");
          return;
        }

        console.log("Foreground permissions granted");
        setLoading(true);

        console.log("Starting location subscription...");
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 1,
          },
          (location) => {
            setLoading(false);
            setLocation(location);
            console.log("Location updated:", location);
          }
        );
      } catch (error) {
        setError(`Error getting location: ${error.message}`);
        console.log("Error getting location:", error);
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
        console.log("Location subscription removed");
      }
    };
  }, []);

  return null;
};

export default GetUserLocation;
