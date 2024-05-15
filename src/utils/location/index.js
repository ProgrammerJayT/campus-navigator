import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";

const GetUserLocation = ({ setLoading, setLocation }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let subscription;

    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setLoading(true);

      // Subscribe to location updates
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          // timeInterval: 10000,
          distanceInterval: 5,
        },
        (location) => {
          console.log("Location", location);
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
