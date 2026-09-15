import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  selectedId: string | null;
  prestadores: Array<{
    id: string;
    nome: string;
    distancia: string;
    avaliacao: number;
    latitude: number;
    longitude: number;
  }>;
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onSelectMarker: (id: string) => void;
}

export default function MapaComponent({
  selectedId,
  prestadores,
  initialRegion,
  onSelectMarker,
}: Props) {
  return (
    <MapView
      style={styles.mapa}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
    >
      {prestadores.map((p) => (
        <Marker
          key={p.id}
          coordinate={{ latitude: p.latitude, longitude: p.longitude }}
          title={p.nome}
          description={`${p.distancia} • ⭐ ${p.avaliacao}`}
          pinColor={selectedId === p.id ? "#1d4ed8" : "#2563eb"}
          onPress={() => onSelectMarker(p.id)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
});