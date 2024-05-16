import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ coords }) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: coords?.latitude || 0,
    longitude: coords?.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.001,
  });

  const [markerCoords, setMarkerCoords] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log("new coords", coords);

    if (coords.latitude && coords.longitude) {
      setInitialRegion({
        ...initialRegion,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setMarkerCoords(coords);

      // Animate to new coordinates
      mapRef.current.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      });
    }
  }, [coords]);

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChange={() => {}} // Dummy function to prevent warning
      >
        {markerCoords && (
          <Marker
            coordinate={markerCoords}
            title="Your Location"
            description={`This is your current location ${markerCoords.latitude}, ${markerCoords.longitude}`}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
