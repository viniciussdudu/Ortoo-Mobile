
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

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
      <TouchableOpacity style={styles.linkInicio} onPress={() => router.push("/home")}>
        <Text style={styles.linkInicioTexto}>🏠 Início</Text>
      </TouchableOpacity>

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
    paddingTop: 56,
    backgroundColor: colors.cream,
  },
  linkInicio: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  linkInicioTexto: {
    fontSize: 14,
    color: colors.navy,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.navy,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 24,
  },
  opcoesContainer: {
    gap: 12,
    marginBottom: 32,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
  },
  opcaoSelecionada: {
    borderColor: colors.terracota,
    backgroundColor: colors.terracotaLight,
  },
  opcaoIcone: {
    fontSize: 24,
    marginRight: 12,
  },
  opcaoLabel: {
    fontSize: 16,
    color: colors.navy,
  },
  opcaoLabelSelecionada: {
    color: colors.terracota,
    fontWeight: "700",
  },
  botao: {
    backgroundColor: colors.terracota,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  botaoDesabilitado: {
    backgroundColor: colors.border,
  },
  botaoTexto: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: "700",
  },
});