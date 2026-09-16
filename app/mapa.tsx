import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const INFO_CATEGORIA: Record<string, { nome: string; preco: string; eta: string; mecanicos: string }> = {
  reboque: { nome: "Reboque", preco: "R$ 89", eta: "8-15 min", mecanicos: "12" },
  mecanico: { nome: "Mecânico", preco: "R$ 60", eta: "10-20 min", mecanicos: "9" },
  bateria: { nome: "Bateria", preco: "R$ 45", eta: "6-12 min", mecanicos: "14" },
  pneu: { nome: "Pneu Furado", preco: "R$ 40", eta: "5-10 min", mecanicos: "16" },
  combustivel: { nome: "Combustível", preco: "R$ 35", eta: "10-18 min", mecanicos: "8" },
  chaveiro: { nome: "Chaveiro", preco: "R$ 55", eta: "12-20 min", mecanicos: "6" },
  outro: { nome: "Assistência", preco: "R$ 50", eta: "10-20 min", mecanicos: "10" },
};

const PRESTADORES_MOCK = [
  { id: "1", nome: "Auto Socorro Rápido", distancia: "1.2 km", nota: "4.8" },
  { id: "2", nome: "Guincho 24h Silva", distancia: "2.5 km", nota: "4.5" },
  { id: "3", nome: "Assistência Total", distancia: "3.1 km", nota: "4.2" },
];

export default function Mapa() {
  const router = useRouter();
  const params = useLocalSearchParams<{ categoria?: string }>();
  const categoria = typeof params.categoria === "string" ? params.categoria : "outro";
  const info = INFO_CATEGORIA[categoria] ?? INFO_CATEGORIA.outro;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>‹ Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Text style={styles.link}>🏠 Início</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>{info.nome}</Text>
      <Text style={styles.subtitulo}>Buscando prestadores próximos...</Text>

      <View style={styles.estatisticas}>
        <View style={styles.estatCard}>
          <Text style={styles.estatValor}>{info.preco}</Text>
          <Text style={styles.estatLabel}>Preço estimado</Text>
        </View>
        <View style={styles.estatCard}>
          <Text style={styles.estatValor}>{info.eta}</Text>
          <Text style={styles.estatLabel}>Chegada</Text>
        </View>
        <View style={styles.estatCard}>
          <Text style={styles.estatValor}>{info.mecanicos}</Text>
          <Text style={styles.estatLabel}>Mecânicos</Text>
        </View>
      </View>

      <View style={styles.mapaPlaceholder}>
        <Text style={styles.mapaPlaceholderTexto}>🗺️ Mapa em breve</Text>
      </View>

      <Text style={styles.secaoTitulo}>Prestadores próximos</Text>
      {PRESTADORES_MOCK.map((item) => (
        <View key={item.id} style={styles.prestadorCard}>
          <View>
            <Text style={styles.prestadorNome}>{item.nome}</Text>
            <Text style={styles.prestadorInfo}>{item.distancia} • ⭐ {item.nota}</Text>
          </View>
          <TouchableOpacity style={styles.chamarBotao}>
            <Text style={styles.chamarBotaoTexto}>Chamar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: colors.cream },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  topo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  link: { color: colors.navy, fontWeight: "600" },
  titulo: { color: colors.navy, fontSize: 22, fontWeight: "bold" },
  subtitulo: { color: colors.textMuted, fontSize: 14, marginTop: 4, marginBottom: 16 },
  estatisticas: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, gap: 10 },
  estatCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  estatValor: { color: colors.terracota, fontSize: 16, fontWeight: "bold" },
  estatLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: "center" },
  mapaPlaceholder: {
    height: 160,
    backgroundColor: colors.terracotaLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.terracota,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  mapaPlaceholderTexto: { color: colors.navy, fontWeight: "600" },
  secaoTitulo: { color: colors.navy, fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  prestadorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  prestadorNome: { color: colors.navy, fontWeight: "700", fontSize: 14 },
  prestadorInfo: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  chamarBotao: { backgroundColor: colors.terracota, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  chamarBotaoTexto: { color: colors.white, fontWeight: "700", fontSize: 13 },
});