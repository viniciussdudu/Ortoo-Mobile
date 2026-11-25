import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { enderecoFotoPerfil } from "../src/services/api";
import { useTema } from "../src/tema";

type Props = { nome: string; foto?: string | null; onChange: (foto: string) => void };

export function FotoPerfil({ nome, foto, onChange }: Props) {
  const { cores } = useTema();
  const [erro, setErro] = useState("");
  const [fotoComErro, setFotoComErro] = useState<string>();
  const iniciais = nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0]).join("").toUpperCase() || "?";

  function escolherFoto() {
    setErro("A troca de foto requer armazenamento de arquivos, indisponível nesta versão sem servidor.");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: cores.primaria, borderColor: cores.destaque }]}>
        {foto && foto !== fotoComErro ? (
          <Image accessibilityLabel="Foto de perfil" source={{ uri: enderecoFotoPerfil(foto) }} style={styles.foto} onError={() => setFotoComErro(foto)} />
        ) : <Text style={[styles.iniciais, { color: cores.sobrePrimaria }]}>{iniciais}</Text>}
      </View>
      <Pressable accessibilityRole="button" onPress={escolherFoto} style={styles.botao}>
        <Text style={[styles.rotulo, { color: cores.destaque }]}>{foto ? "Alterar foto de perfil" : "Adicionar foto de perfil"}</Text>
      </Pressable>
      {!!erro && <Text accessibilityRole="alert" style={[styles.erro, { color: cores.erro }]}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", borderWidth: 2, overflow: "hidden" },
  foto: { width: "100%", height: "100%" },
  iniciais: { fontSize: 26, fontWeight: "800" },
  botao: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12 },
  rotulo: { fontWeight: "700" },
  erro: { textAlign: "center", maxWidth: 300 },
});
