import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import MapaComponent from "../components/MapaComponent";

interface Prestador {
  id: string;
  nome: string;
  distancia: string;
  avaliacao: number;
  latitude: number;
  longitude: number;
}

const PRESTADORES_MOCK: Prestador[] = [
  { id: "1", nome: "Auto Socorro Rápido", distancia: "1.2 km", avaliacao: 4.8, latitude: -15.7941, longitude: -47.8825 },
  { id: "2", nome: "Guincho 24h Silva", distancia: "2.5 km", avaliacao: 4.5, latitude: -15.7981, longitude: -47.8755 },
  { id: "3", nome: "Assistência Total", distancia: "3.1 km", avaliacao: 4.2, latitude: -15.7891, longitude: -47.8915 },
];

const INITIAL_REGION = {
  latitude: -10.177234595085936,
  longitude: -48.36179426775851,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function Mapa() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleChamar = (prestador: Prestador) => {
    Alert.alert("Solicitação", `Chamando ${prestador.nome}...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
          <Text style={styles.voltarTexto}>{"<"} Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapaContainer}>
        <MapaComponent
          selectedId={selectedId}
          prestadores={PRESTADORES_MOCK}
          initialRegion={INITIAL_REGION}
          onSelectMarker={(id) => setSelectedId(id)}
        />
      </View>

      <Text style={styles.listaTitulo}>Prestadores próximos</Text>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
        showsVerticalScrollIndicator={false}
      >
        {PRESTADORES_MOCK.map((prestador) => {
          const isSelected = selectedId === prestador.id;
          return (
            <TouchableOpacity
              key={prestador.id}
              style={[styles.card, isSelected && styles.cardSelecionado]}
              onPress={() => setSelectedId(prestador.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardDetalhes}>
                <Text style={styles.cardNome}>{prestador.nome}</Text>
                <Text style={styles.cardInfo}>
                  {prestador.distancia} • ⭐ {prestador.avaliacao}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.cardBotao}
                onPress={() => handleChamar(prestador)}
              >
                <Text style={styles.cardBotaoTexto}>Chamar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  voltar: { alignSelf: "flex-start" },
  voltarTexto: { fontSize: 16, color: "#2563eb", fontWeight: "500" },
  mapaContainer: {
    height: 240,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#e5e7eb",
  },
  listaTitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 12, paddingHorizontal: 16, color: "#111827" },
  lista: { flex: 1 },
  listaContent: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  cardSelecionado: { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
  cardDetalhes: { flex: 1, marginRight: 12 },
  cardNome: { fontSize: 15, fontWeight: "600", color: "#1f2937" },
  cardInfo: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  cardBotao: { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  cardBotaoTexto: { color: "#fff", fontWeight: "600", fontSize: 13 },
});