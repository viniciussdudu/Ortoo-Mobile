import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, Platform } from "react-native";
import StripeProviderWrapper from "../components/StripeProviderWrapper";
import { TemaProvider, useTema } from "../src/tema";
import { obterTipoUsuario, obterToken } from "../src/services/session";

// Desativa avisos do LogBox na Web para evitar colisões com o inspector
if (Platform.OS === "web") {
  LogBox.ignoreAllLogs();
}

function Navegacao() {
  const { cores, escuro } = useTema();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    let ativo = true;
    void Promise.all([obterToken(), obterTipoUsuario()]).then(([token, tipoUsuario]) => {
      if (!ativo) return;
      const rotasPublicas = ["/", "/cadastro", "/recuperar-senha"];
      const rotaInicial = tipoUsuario === "CLIENTE" ? "/home" : "/mecanico";

      if (!token && !rotasPublicas.includes(pathname)) {
        router.replace("/");
      } else if (token && rotasPublicas.includes(pathname)) {
        router.replace(rotaInicial);
      } else if (token && pathname === "/mecanico" && tipoUsuario === "CLIENTE") {
        router.replace("/home");
      } else if (token && pathname === "/home" && tipoUsuario !== "CLIENTE") {
        router.replace("/mecanico");
      }
    });
    return () => { ativo = false; };
  }, [pathname, router]);

  return (
    <>
      <StatusBar style={escuro ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: cores.fundo },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const content = (
    <TemaProvider>
      <Navegacao />
    </TemaProvider>
  );

  // No navegador web, ignora o StripeProvider nativo para evitar ecrã em branco
  if (Platform.OS === "web") {
    return content;
  }

  // Em Android / iOS, utiliza o wrapper nativo do Stripe
  return <StripeProviderWrapper>{content}</StripeProviderWrapper>;
}
