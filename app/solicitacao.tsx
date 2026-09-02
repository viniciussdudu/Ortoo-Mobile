import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PROBLEMAS = [
  { id: "pneu", label: "Pneu furado", icone: "🛞" },
  { id: "bateria", label: "Bateria descarregada", icone: "🔋" },
  { id: "combustivel", label: "Sem combustível", icone: "⛽" },
  { id: "motor", label: "Motor não liga", icone: "🔧" },
  { id: "outro", label: "Outro problema", icone: "❓" },
];

export default function Solicitacao() {
  const router = useRouter();
  const [problemaSelecionado, setProblemaSelecionado] = useState<string | null>(null);

  const handleSolicitar = () => {
    router.push("/mapa");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O que está acontecendo?</Text>
      <Text style={styles.subtitle}>Selecione o problema para pedir assistência</Text>

      <View style={styles.opcoesContainer}>
        {PROBLEMAS.map((problema) => {
          const selecionado = problemaSelecionado === problema.id;
          return (
            <TouchableOpacity
              key={problema.id}
              style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
              onPress={() => setProblemaSelecionado(problema.id)}
            >
              <Text style={styles.opcaoIcone}>{problema.icone}</Text>
              <Text style={[styles.opcaoLabel, selecionado && styles.opcaoLabelSelecionada]}>
                {problema.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.botao, !problemaSelecionado && styles.botaoDesabilitado]}
        onPress={handleSolicitar}
        disabled={!problemaSelecionado}
      >
        <Text style={styles.botaoTexto}>Solicitar Assistência</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  opcoesContainer: {
    gap: 12,
    marginBottom: 32,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
  },
  opcaoSelecionada: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  opcaoIcone: {
    fontSize: 24,
    marginRight: 12,
  },
  opcaoLabel: {
    fontSize: 16,
  },
  opcaoLabelSelecionada: {
    color: "#2563eb",
    fontWeight: "600",
  },
  botao: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  botaoDesabilitado: {
    backgroundColor: "#ccc",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});