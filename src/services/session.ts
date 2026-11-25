// Sessão de demonstração: o token permanece apenas durante a execução do app.
let tokenEmMemoria: string | null = null;
let tipoUsuarioEmMemoria: "CLIENTE" | "PRESTADOR_AUTONOMO" | "EMPRESA" | null = null;

export async function salvarToken(token: string, tipoUsuario: "CLIENTE" | "PRESTADOR_AUTONOMO" | "EMPRESA") {
  tokenEmMemoria = token;
  tipoUsuarioEmMemoria = tipoUsuario;
}

export async function obterToken(): Promise<string | null> {
  return tokenEmMemoria;
}

export async function obterTipoUsuario() {
  return tipoUsuarioEmMemoria;
}

export async function limparToken() {
  tokenEmMemoria = null;
  tipoUsuarioEmMemoria = null;
}
