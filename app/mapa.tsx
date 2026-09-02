import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PRESTADORES_MOCK = [
  { id: "1", nome: "Auto Socorro Rápido", distancia: "1.2 km", avaliacao: 4.8 },
  { id: "2", nome: "Guincho 24h Silva", distancia: "2.5 km", avaliacao: 4.5 },
  { id: "3", nome: "Assistência Total", distancia: "3.1 km", avaliacao: 4.2 },
];

export default function Mapa() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>{"<"} Voltar</Text>
      </TouchableOpacity>

      <View style={styles.mapaPlaceholder}>
        <Text style={styles.mapaPlaceholderTexto}>📍 Sua localização atual</Text>
        <Text style={styles.mapaPlaceholderSub}>(mapa real será integrado depois)</Text>
      </View>

      <Text style={styles.listaTitulo}>Prestadores próximos</Text>

      <ScrollView style={styles.lista}>
        {PRESTADORES_MOCK.map((prestador) => (
          <View key={prestador.id} style={styles.card}>
            <View>
              <Text style={styles.cardNome}>{prestador.nome}</Text>
              <Text style={styles.cardInfo}>
                {prestador.distancia} • ⭐ {prestador.avaliacao}
              </Text>
            </View>
            <TouchableOpacity style={styles.cardBotao}>
              <Text style={styles.cardBotaoTexto}>Chamar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 56,
  },
  voltar: {
    marginBottom: 16,
  },
  voltarTexto: {
    fontSize: 16,
    color: "#2563eb",
  },
  mapaPlaceholder: {
    height: 220,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  mapaPlaceholderTexto: {
    fontSize: 16,
    fontWeight: "600",
  },
  mapaPlaceholderSub: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  lista: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  cardNome: {
    fontSize: 15,
    fontWeight: "600",
  },
  cardInfo: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  cardBotao: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cardBotaoTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});