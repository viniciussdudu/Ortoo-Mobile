import React from "react";

export interface MapaComponentProps {
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

declare const MapaComponent: React.ComponentType<MapaComponentProps>;
export default MapaComponent;