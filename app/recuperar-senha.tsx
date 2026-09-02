import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { resetPassword } from "./auth-store";

export default function RecuperarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid =
    email.trim() !== "" && newPassword.trim().length >= 6 && confirmPassword.trim() !== "";

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Senhas diferentes", "Digite a mesma senha nos dois campos.");
      return;
    }

    const result = resetPassword(email, newPassword);
    if (!result.ok) {
      Alert.alert("Conta não encontrada", result.message);
      return;
    }

    Alert.alert("Senha alterada", "Use sua nova senha para entrar. Esta alteração vale somente nesta sessão.", [
      { text: "Ir para o login", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar senha</Text>
      <Text style={styles.subtitle}>
        Informe o e-mail da conta e defina uma nova senha. Nenhum e-mail será enviado.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail cadastrado"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova senha (mínimo 6 caracteres)"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.primaryButton, !isFormValid && styles.disabledButton]}
        onPress={handleResetPassword}
        disabled={!isFormValid}
      >
        <Text style={styles.primaryButtonText}>Alterar senha</Text>
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
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", lineHeight: 20, marginBottom: 24 },
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
