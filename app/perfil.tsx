import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

const USUARIO_MOCK = {
  nome: "Arthur Souza",
  email: "arthur.souza@email.com",
  telefone: "(63) 99999-0000",
};

const VEICULO_MOCK = {
  modelo: "Chevrolet Onix 2021",
  placa: "ABC1D23",
  cor: "Prata",
};

const HISTORICO_MOCK = [
  { id: "1", data: "28/08/2026", problema: "Pneu furado", status: "Concluído" },
  { id: "2", data: "15/08/2026", problema: "Bateria descarregada", status: "Concluído" },
  { id: "3", data: "02/08/2026", problema: "Sem combustível", status: "Cancelado" },
];

const MENU_MOCK = [
  { id: "pedidos", icone: "📦", label: "Meus Pedidos" },
  { id: "pagamento", icone: "💳", label: "Formas de Pagamento" },
  { id: "veiculos", icone: "🚗", label: "Veículos Cadastrados" },
  { id: "suporte", icone: "🆘", label: "Suporte 24h" },
  { id: "config", icone: "⚙️", label: "Configurações" },
];

export default function Perfil() {
  const router = useRouter();

  const getStatusStyle = (status: string) => {
    if (status === "Concluído") return styles.statusConcluido;
    if (status === "Cancelado") return styles.statusCancelado;
    return styles.statusPadrao;
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text style={styles.linkInicio}>🏠 Início</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {USUARIO_MOCK.nome
              .split(" ")
              .map((parte) => parte[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </Text>
        </View>
        <Text style={styles.nome}>{USUARIO_MOCK.nome}</Text>
        <Text style={styles.email}>{USUARIO_MOCK.email}</Text>
        <Text style={styles.telefone}>{USUARIO_MOCK.telefone}</Text>

        <TouchableOpacity style={styles.botaoSecundario}>
          <Text style={styles.botaoSecundarioTexto}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoTitulo}>Meu veículo</Text>
      <View style={styles.card}>
        <Text style={styles.veiculoModelo}>{VEICULO_MOCK.modelo}</Text>
        <Text style={styles.veiculoInfo}>
          Placa: {VEICULO_MOCK.placa} • Cor: {VEICULO_MOCK.cor}
        </Text>
      </View>

      <Text style={styles.secaoTitulo}>Menu</Text>
      <View style={styles.menuCard}>
        {MENU_MOCK.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuLinha, index !== MENU_MOCK.length - 1 && styles.menuLinhaBorda]}
            onPress={() => Alert.alert(item.label, "Em breve nesta versão do app.")}
          >
            <Text style={styles.menuIcone}>{item.icone}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuSeta}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.secaoTitulo}>Histórico de atendimentos</Text>
      {HISTORICO_MOCK.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.historicoLinha}>
            <View>
              <Text style={styles.historicoProblema}>{item.problema}</Text>
              <Text style={styles.historicoData}>{item.data}</Text>
            </View>
            <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
              <Text style={styles.statusTexto}>{item.status}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.botaoSair} onPress={() => router.replace("/")}>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: colors.cream },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  linkInicio: { color: colors.navy, fontWeight: "600", marginBottom: 20 },
  header: { alignItems: "center", marginBottom: 28 },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.terracota,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarTexto: { color: colors.cream, fontSize: 26, fontWeight: "bold" },
  nome: { color: colors.navy, fontSize: 20, fontWeight: "bold" },
  email: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  telefone: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  botaoSecundario: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.navy,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  botaoSecundarioTexto: { color: colors.navy, fontWeight: "600" },
  secaoTitulo: { color: colors.navy, fontSize: 16, fontWeight: "bold", marginBottom: 10, marginTop: 8 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  veiculoModelo: { color: colors.navy, fontSize: 15, fontWeight: "600" },
  veiculoInfo: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuLinha: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLinhaBorda: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcone: { fontSize: 18, marginRight: 12 },
  menuLabel: { flex: 1, color: colors.navy, fontSize: 14, fontWeight: "600" },
  menuSeta: { color: colors.textMuted, fontSize: 18 },
  historicoLinha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  historicoProblema: { color: colors.navy, fontSize: 15, fontWeight: "600" },
  historicoData: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  statusBadge: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  statusConcluido: { backgroundColor: colors.successBg },
  statusCancelado: { backgroundColor: colors.dangerBg },
  statusPadrao: { backgroundColor: colors.border },
  statusTexto: { fontSize: 12, fontWeight: "600" },
  botaoSair: { marginTop: 8, alignItems: "center", paddingVertical: 12 },
  botaoSairTexto: { color: colors.danger, fontWeight: "600", fontSize: 15 },
});