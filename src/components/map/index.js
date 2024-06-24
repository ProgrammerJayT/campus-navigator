import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ coords, markers }) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: coords?.latitude || 0,
    longitude: coords?.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.001,
  });

  const [markerCoords, setMarkerCoords] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      const newRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      };

      setInitialRegion(newRegion);
      setMarkerCoords(coords);

      // Animate to new coordinates
      mapRef.current.animateToRegion(newRegion);
    }
  }, [coords]);

  useEffect(() => {
    console.log("Markers", markers);
  }, [markers]);

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
            pinColor="blue"
          />
        )}

        {markers?.length > 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker?.latitude,
                longitude: marker?.longitude,
              }}
              title={`${marker.name}`}
              // description={`${marker.name}`}
              pinColor="red"
            />
          ))}
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
