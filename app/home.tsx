import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Örtöö</Text>
      <Text style={styles.subtitulo}>O que você precisa hoje?</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/solicitacao")}>
        <Text style={styles.cardIcone}>🆘</Text>
        <Text style={styles.cardTexto}>Solicitar Assistência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/perfil")}>
        <Text style={styles.cardIcone}>👤</Text>
        <Text style={styles.cardTexto}>Meu Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },
  cardIcone: {
    fontSize: 28,
    marginRight: 16,
  },
  cardTexto: {
    fontSize: 17,
    fontWeight: "600",
  },
});
