import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  selectedId: string | null;
  prestadores: Array<{ id: string; latitude: number; longitude: number }>;
  initialRegion: { latitude: number; longitude: number };
  onSelectMarker: (id: string) => void;
}

export default function MapaComponent({ selectedId, prestadores, initialRegion }: Props) {
  const selected = prestadores.find((p) => p.id === selectedId);
  const lat = selected ? selected.latitude : initialRegion.latitude;
  const lng = selected ? selected.longitude : initialRegion.longitude;

  const ZOOM_MARGIN = 0.001; 

const webMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - ZOOM_MARGIN}%2C${lat - ZOOM_MARGIN}%2C${lng + ZOOM_MARGIN}%2C${lat + ZOOM_MARGIN}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <View style={styles.container}>
      <iframe
        title="Mapa Web"
        src={webMapUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});