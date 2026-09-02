import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { createAccount } from "./auth-store";

export default function Cadastro() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid =
    email.trim() !== "" && password.trim().length >= 6 && confirmPassword.trim() !== "";

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert("Senhas diferentes", "Digite a mesma senha nos dois campos.");
      return;
    }

    const result = createAccount(email, password);
    if (!result.ok) {
      Alert.alert("Não foi possível criar a conta", result.message);
      return;
    }

    Alert.alert("Conta criada", "Agora você já pode entrar ou testar a recuperação de senha.", [
      { text: "Ir para o login", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Os dados ficam disponíveis apenas enquanto o app estiver aberto.</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.primaryButton, !isFormValid && styles.disabledButton]}
        onPress={handleCreateAccount}
        disabled={!isFormValid}
      >
        <Text style={styles.primaryButtonText}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 24 },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  primaryButton: { backgroundColor: "#2563eb", borderRadius: 8, paddingVertical: 14, alignItems: "center" },
  disabledButton: { backgroundColor: "#9ca3af" },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#2563eb", fontSize: 15, textAlign: "center", marginTop: 20 },
});
