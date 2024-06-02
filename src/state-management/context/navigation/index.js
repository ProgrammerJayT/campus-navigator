import React, { createContext, useContext, useEffect, useState } from "react";
import * as Speech from "expo-speech";
import LocationStateContext from "../location";
import { calculateBearing } from "../../../utils/bearing";

const NavigationStateContext = createContext();

export const NavigationStateProvider = ({ children }) => {
  const [isNextToDestination, setIsNextToDestination] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [interestsPlace, setInterestsPlace] = useState({});
  const [distance, setDistance] = useState(0);
  const [checkedBounds, setCheckedBounds] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [bearingToDestination, setBearingToDestination] = useState(0);

  let haversine = require("haversine");
  let promptVoice = "com.apple.ttsbundle.siri_Martha_en-GB_compact";
  let promptVoiceRate = 1.0;

  const { location } = useContext(LocationStateContext);

  const providerChildren = {
    bounds,
    distance,
    isArrived,
    isNavigating,
    checkedBounds,
    interestsPlace,
    isNextToDestination,
    bearingToDestination,
    setBounds,
    setDistance,
    setIsArrived,
    setIsNavigating,
    setCheckedBounds,
    setInterestsPlace,
    setIsNextToDestination,
    setBearingToDestination,
  };

  useEffect(() => {
    //
    if (interestsPlace) {
      setIsNextToDestination(checkIsNextToDestination());
    }
  }, [interestsPlace]);

  useEffect(() => {
    if (isNavigating) {
      if (isNextToDestination) {
        setIsNavigating(false);
      }

      speak(
        isNextToDestination
          ? "You are 5 meters within your destination"
          : "Let's Go"
      );
    }
  }, [isNavigating]);

  useEffect(() => {
    if (Object.keys(interestsPlace).length) {
      console.log("There is a place");
      const bearing = calculateBearing(
        location?.latitude,
        location?.longitude,
        interestsPlace?.latitude,
        interestsPlace?.longitude
      );

      setBearingToDestination(Math.floor(bearing));
    }

    let calculatedDistance = haversine(location, interestsPlace, {
      unit: "meter",
    });
    setDistance(Math.round(calculatedDistance));
  }, [interestsPlace, location]);

  useEffect(() => {
    //
    if (isNavigating) {
      //
      setIsNextToDestination(checkIsNextToDestination());

      if (isNextToDestination) {
        setIsNavigating(false);
        speak("You have reached your destination");

        return setCheckedBounds([]);
      }

      if (bounds.length) {
        bounds.forEach((element) => {
          let nextToBound = haversine(location, element, {
            threshold: 5,
            unit: "meter",
          });

          if (
            nextToBound &&
            isNavigating &&
            !checkedBounds.includes(element.id)
          ) {
            setCheckedBounds((prev) => [...prev, element.id]);
            speak(`At this point you should see ${element.surroundings}`);
          } else {
            nextToBound = false;
          }
        });
      }
    }
  }, [location]);

  const checkIsNextToDestination = () => {
    return haversine(location, interestsPlace, {
      threshold: 5,
      unit: "meter",
    });
  };

  const speak = (message) => {
    return Speech.speak(message, {
      rate: promptVoiceRate,
      voice: promptVoice,
    });
  };

  return (
    <NavigationStateContext.Provider value={providerChildren}>
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateContext;
