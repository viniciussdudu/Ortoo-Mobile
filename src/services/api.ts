import { limparToken, salvarToken } from "./session";
import { CREDENCIAIS_MECANICO_DEMO } from "../mock-data";

export type UserType = "CLIENTE" | "PRESTADOR_AUTONOMO" | "EMPRESA";
export type TipoDocumento = "CPF" | "CNPJ";

/* ==================== USUÁRIOS & PERFIL ==================== */

export type RegisteredUser = {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: UserType;
  stripe_customer_id?: string | null;
  token?: string;
};

export type RegisterInput = {
  nome: string;
  email: string;
  password: string;
  documento: string;
  telefone: string;
  tipo_usuario: UserType;
  nome_fantasia?: string;
  descricao_empresa?: string;
  raio_atendimento_km?: number;
  latitude_atual?: number;
  longitude_atual?: number;
};

export type PerfilPrestador = {
  id: number;
  nome_fantasia?: string | null;
  descricao_empresa?: string | null;
  raio_atendimento_km?: number;
  disponivel?: boolean;
  latitude_atual?: number | null;
  longitude_atual?: number | null;
};

export type UserProfile = {
  id: number;
  stripe_customer_id?: string | null;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  tipo_documento: TipoDocumento;
  tipo_usuario: UserType;
  foto_url?: string | null;
  criado_em?: string;
  prestador?: PerfilPrestador | null;
  veiculo?: { modelo: string; placa: string; cor: string } | null;
  historico?: Array<{ id: number; data: string; problema: string; status: string }>;
};

export type UpdateProfileInput = {
  nome: string;
  email: string;
  telefone: string;
  senha_atual?: string;
  // Campos de prestador
  nome_fantasia?: string;
  descricao_empresa?: string;
  raio_atendimento_km?: number;
  disponivel?: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  textBody?: string;
  signal?: AbortSignal;
};

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const method = options.method ?? "GET";
  const body = (options.body ?? {}) as Record<string, any>;
  let result: any = { sucesso: true, mensagem: "Salvo no modo demonstração." };

  if (path === "/auth/login") {
    const ehMecanico = String(body.email ?? "").toLowerCase() === CREDENCIAIS_MECANICO_DEMO.email;
    if (ehMecanico && body.password !== CREDENCIAIS_MECANICO_DEMO.senha) {
      throw new ApiError("Senha incorreta para a conta de demonstração do prestador.", 401);
    }
    mockProfile = ehMecanico
      ? { ...mockProfile, id: 2, nome: "Marcos Mecânico", email: CREDENCIAIS_MECANICO_DEMO.email, tipo_usuario: "PRESTADOR_AUTONOMO", prestador: { id: 1, nome_fantasia: "Auto Socorro Central", descricao_empresa: "Atendimento 24 horas", raio_atendimento_km: 25, disponivel: true } }
      : { ...mockProfile, id: 1, nome: "Ana Oliveira", email: body.email ?? mockProfile.email, tipo_usuario: "CLIENTE", prestador: null };
    result = { ...mockProfile, token: "ortoo-demo-token" };
  } else if (path === "/auth/cadastro") {
    const { password: _senha, ...dadosCadastro } = body;
    mockProfile = { ...mockProfile, ...dadosCadastro, tipo_documento: body.tipo_usuario === "EMPRESA" ? "CNPJ" : "CPF" };
    result = { ...mockProfile, token: "ortoo-demo-token" };
  } else if (path === "/auth/logout") {
    resetarDadosMockados();
    result = { sucesso: true };
  } else if (path === "/auth/recuperar-senha") {
    result = { sucesso: true, mensagem: "Senha atualizada no modo demonstração." };
  } else if (path.startsWith("/usuario/perfil/foto")) {
    result = { foto_url: "" };
  } else if (path.startsWith("/usuario/perfil") && method === "GET") {
    result = mockProfile;
  } else if (path.startsWith("/usuario/perfil")) {
    const { senha_atual: _senhaAtual, ...dadosPerfil } = body;
    mockProfile = { ...mockProfile, ...dadosPerfil };
  } else if (path === "/categorias") {
    result = mockCategorias;
  } else if (path === "/prestadores") {
    result = mockPrestadores;
  } else if (path === "/solicitacoes" && method === "POST") {
    const nova = { id: proximoId++, cliente_id: 1, prestador_id: body.prestador_id ?? 1, categoria_id: body.categoria_id ?? 1, status: "PENDENTE", descricao_problema: body.descricao_problema ?? "Assistência solicitada", latitude_origem: body.latitude_origem ?? -10.184, longitude_origem: body.longitude_origem ?? -48.333, valor_estimado: body.valor_estimado ?? 120, criado_em: new Date().toISOString(), categoria_nome: "Assistência veicular", prestador_nome: "Auto Socorro Central" };
    mockSolicitacoes.unshift(nova); result = nova;
  } else if (path.startsWith("/solicitacoes/") && path.endsWith("/cancelar")) {
    const id = Number(path.split("/")[2]); mockSolicitacoes = mockSolicitacoes.map((item) => item.id === id ? { ...item, status: "CANCELADO" } : item);
  } else if (path.startsWith("/solicitacoes/") && path.endsWith("/status")) {
    const id = Number(path.split("/")[2]); mockSolicitacoes = mockSolicitacoes.map((item) => item.id === id ? { ...item, status: body.status } : item); result = { sucesso: true, status: body.status };
  } else if (path.startsWith("/solicitacoes/") && path.endsWith("/chat")) {
    const id = Number(path.split("/")[2]);
    if (method === "POST") { const msg = { id: proximoId++, remetente_id: 1, remetente_nome: mockProfile.nome, conteudo: body.conteudo, criado_em: new Date().toISOString() }; (mockMensagens[id] ??= []).push(msg); result = msg; }
    else result = { solicitacao_id: id, prestador: { nome: "Auto Socorro Central" }, mensagens: mockMensagens[id] ?? [] };
  } else if (path.startsWith("/solicitacoes?")) {
    result = mockSolicitacoes;
  } else if (path === "/solicitacoes/pendentes") {
    result = mockSolicitacoes.filter((item) => item.status === "PENDENTE");
  } else if (path.startsWith("/solicitacoes/")) {
    result = mockSolicitacoes.find((item) => item.id === Number(path.split("/")[2])) ?? mockSolicitacoes[0];
  } else if (path.startsWith("/prestadores/localizacao")) {
    mockPrestadores[0].latitude_atual = body.latitude; mockPrestadores[0].longitude_atual = body.longitude;
  } else if (path.startsWith("/veiculos") && method === "GET") {
    result = path.split("?")[0] === "/veiculos" ? mockVeiculos : mockVeiculos.find((item) => item.id === Number(path.split("/")[2])) ?? mockVeiculos[0];
  } else if (path === "/veiculos" && method === "POST") {
    const novo = { ...body, id: proximoId++, usuario_id: 1, manutencoes: [] }; mockVeiculos.push(novo); result = novo;
  } else if (path.startsWith("/veiculos/") && method === "PATCH") {
    mockVeiculos = mockVeiculos.map((item) => item.id === Number(path.split("/")[2]) ? { ...item, km_atual: body.km_atual } : item);
  } else if (path.includes("/suporte") && method === "GET") {
    result = mockSuporte;
  } else if (path.includes("/suporte") && method === "POST") {
    const msg = { id: proximoId++, remetente: "USUARIO", conteudo: body.conteudo, criado_em: new Date().toISOString() }; mockSuporte.push(msg); result = msg;
  } else if (path.includes("/cartoes") && method === "GET") {
    result = [{ id: 1, usuario_id: 1, gateway: "demo", token_gateway: "demo", ultimos_digitos: "4242", bandeira: "Visa", principal: true }];
  } else if (path.includes("novo-cartao")) {
    result = { client_secret: "demo_secret", setup_intent_id: "demo_setup" };
  } else if (path.includes("salvar-cartao")) {
    result = { sucesso: true, mensagem: "Cartão de demonstração salvo." };
  }

  return result as T;
}

let proximoId = 3;
const perfilDemoInicial: any = { id: 1, nome: "Ana Oliveira", email: "ana@ortoo.com", telefone: "(63) 99999-0000", documento: "123.456.789-00", tipo_documento: "CPF", tipo_usuario: "CLIENTE", veiculo: { modelo: "Honda Civic", placa: "ABC1D23", cor: "Prata" }, historico: [] };
let mockProfile: any = { ...perfilDemoInicial };
const mockCategorias: Categoria[] = [{ id: 1, nome: "Troca de pneu", descricao: "Estepe ou reparo" }, { id: 2, nome: "Bateria", descricao: "Carga ou troca" }, { id: 3, nome: "Guincho", descricao: "Reboque do veículo" }, { id: 4, nome: "Pane mecânica", descricao: "Socorro mecânico" }];
const mockPrestadores: Prestador[] = [{ id: 1, usuario_id: 2, nome: "Auto Socorro Central", nome_fantasia: "Auto Socorro Central", descricao_empresa: "Atendimento 24 horas", raio_atendimento_km: 25, disponivel: true, latitude_atual: -10.18, longitude_atual: -48.33, servicos: [{ id: 1, prestador_id: 1, categoria_id: 1, categoria_nome: "Troca de pneu", preco_base: 120 }, { id: 2, prestador_id: 1, categoria_id: 2, categoria_nome: "Bateria", preco_base: 150 }, { id: 3, prestador_id: 1, categoria_id: 3, categoria_nome: "Guincho", preco_base: 250 }, { id: 4, prestador_id: 1, categoria_id: 4, categoria_nome: "Pane mecânica", preco_base: 180 }] }];
const solicitacoesDemoIniciais: Solicitacao[] = [
  { id: 1, cliente_id: 1, prestador_id: 1, categoria_id: 1, status: "A_CAMINHO", descricao_problema: "Pneu furado", latitude_origem: -10.184, longitude_origem: -48.333, valor_estimado: 120, criado_em: new Date().toISOString(), categoria_nome: "Troca de pneu", prestador_nome: "Auto Socorro Central", prestador_latitude: -10.18, prestador_longitude: -48.33 },
  { id: 2, cliente_id: 1, prestador_id: 1, categoria_id: 2, status: "PENDENTE", descricao_problema: "Bateria descarregada", latitude_origem: -10.176, longitude_origem: -48.337, valor_estimado: 150, criado_em: new Date().toISOString(), categoria_nome: "Bateria", prestador_nome: "Auto Socorro Central", prestador_latitude: -10.18, prestador_longitude: -48.33 },
];
let mockSolicitacoes: Solicitacao[] = solicitacoesDemoIniciais.map((item) => ({ ...item }));
const mensagensDemoIniciais: Record<number, MensagemChat[]> = { 1: [{ id: 1, remetente_id: 2, remetente_nome: "Auto Socorro Central", conteudo: "Olá! Já estou a caminho.", criado_em: new Date().toISOString() }] };
let mockMensagens: Record<number, MensagemChat[]> = { 1: mensagensDemoIniciais[1].map((item) => ({ ...item })) };
const veiculosDemoIniciais: any[] = [{ id: 1, usuario_id: 1, modelo: "Honda Civic", placa: "ABC1D23", cor: "Prata", tipo: "CARRO", km_atual: 42000, manutencoes: [] }];
let mockVeiculos: any[] = veiculosDemoIniciais.map((item) => ({ ...item, manutencoes: [...item.manutencoes] }));
const mensagensSuporteDemoIniciais: any[] = [{ id: 1, usuario_id: 1, remetente_tipo: "SUPORTE", conteudo: "Olá! Como podemos ajudar?", criado_em: new Date().toISOString() }];
let mockSuporte: any[] = mensagensSuporteDemoIniciais.map((item) => ({ ...item }));

function resetarDadosMockados() {
  proximoId = 3;
  mockProfile = { ...perfilDemoInicial };
  mockSolicitacoes = solicitacoesDemoIniciais.map((item) => ({ ...item }));
  mockMensagens = Object.fromEntries(Object.entries(mensagensDemoIniciais).map(([id, mensagens]) => [id, mensagens.map((item) => ({ ...item }))]));
  mockVeiculos = veiculosDemoIniciais.map((item) => ({ ...item, manutencoes: [...item.manutencoes] }));
  mockSuporte = mensagensSuporteDemoIniciais.map((item) => ({ ...item }));
  mockPrestadores[0].latitude_atual = -10.18;
  mockPrestadores[0].longitude_atual = -48.33;
}

/* ==================== AUTENTICAÇÃO ==================== */

export function register(input: RegisterInput) {
  return request<RegisteredUser>("/auth/cadastro", {
    method: "POST",
    body: input,
  });
}

export async function login(
  input: Pick<RegisterInput, "email" | "password">,
): Promise<RegisteredUser> {
  const usuario = await request<RegisteredUser>("/auth/login", {
    method: "POST",
    body: input,
  });

  if (!usuario.token) {
    throw new ApiError("A API não retornou a credencial de acesso.");
  }

  await salvarToken(usuario.token, usuario.tipo_usuario);
  return usuario;
}

export type RecuperarSenhaInput = {
  email: string;
  novaSenha: string;
};

export function recuperarSenha(input: RecuperarSenhaInput) {
  return request<{ sucesso: boolean; mensagem: string }>(
    "/auth/recuperar-senha",
    {
      method: "POST",
      body: input,
    },
  );
}

export function getUserProfile(usuarioId?: number) {
  const query = usuarioId ? `?usuario_id=${usuarioId}` : "";
  return request<UserProfile>(`/usuario/perfil${query}`);
}

export function updateUserProfile(input: UpdateProfileInput) {
  return request<{ sucesso: boolean; mensagem: string }>("/usuario/perfil", {
    method: "PUT",
    body: input,
  });
}

export function salvarFotoPerfil(base64: string) {
  return request<{ foto_url: string }>("/usuario/perfil/foto", { method: "PUT", textBody: base64 });
}

export function enderecoFotoPerfil(foto: string) {
  return foto;
}

export async function logout(): Promise<{ sucesso: boolean }> {
  try {
    await request<{ sucesso: boolean }>("/auth/logout", { method: "POST" });
  } catch {
    // Mesmo sem rede, a sessão local precisa ser encerrada.
  } finally {
    await limparToken();
  }
  return { sucesso: true };
}

/* ==================== CATEGORIAS & PRESTADORES ==================== */

export type Categoria = {
  id: number;
  nome: string;
  descricao?: string | null;
  icone_url?: string | null;
};

export function listarCategorias(signal?: AbortSignal) {
  return request<Categoria[]>("/categorias", { signal });
}

export type ServicoOferecido = {
  id: number;
  prestador_id: number;
  categoria_id: number;
  categoria_nome?: string;
  preco_base: number | string;
};

export type Prestador = {
  id: number;
  usuario_id: number;
  nome?: string;
  nome_fantasia?: string | null;
  descricao_empresa?: string | null;
  raio_atendimento_km: number;
  disponivel: boolean;
  latitude_atual?: number | null;
  longitude_atual?: number | null;
  servicos?: ServicoOferecido[];
};

export function listarPrestadores() {
  return request<Prestador[]>("/prestadores");
}

export function atualizarLocalizacaoPrestador(latitude: number, longitude: number) {
  return request<{ sucesso: boolean; latitude: number; longitude: number }>(
    "/prestadores/localizacao",
    { method: "PUT", body: { latitude, longitude } },
  );
}

/* ==================== SOLICITAÇÕES ==================== */

export type SolicitacaoStatus =
  | "PENDENTE"
  | "ACEITO"
  | "A_CAMINHO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "CANCELADO";

// Alias para manter compatibilidade com códigos antigos que importem StatusSolicitacao
export type StatusSolicitacao = SolicitacaoStatus;

export type Solicitacao = {
  id: number;
  cliente_id: number;
  prestador_id?: number | null;
  categoria_id?: number;
  status: SolicitacaoStatus;
  descricao_problema?: string | null;
  latitude_origem: number | string;
  longitude_origem: number | string;
  valor_estimado?: number | string | null;
  criado_em: string;
  categoria_nome?: string;
  cliente_nome?: string;
  cliente_telefone?: string;
  prestador_nome?: string;
  prestador_latitude?: number | string | null;
  prestador_longitude?: number | string | null;
};

export type CriarSolicitacaoInput = {
  prestador_id: number;
  categoria_id: number;
  descricao_problema?: string;
  latitude_origem: number;
  longitude_origem: number;
  valor_estimado?: number;
};

export function criarSolicitacao(input: CriarSolicitacaoInput) {
  return request<Solicitacao>("/solicitacoes", { method: "POST", body: input });
}

export function listarMinhasSolicitacoes(clienteId: number) {
  return request<Solicitacao[]>(`/solicitacoes?cliente_id=${encodeURIComponent(clienteId)}`);
}

export function cancelarSolicitacao(id: number) {
  return request<{ sucesso: boolean; mensagem: string }>(
    `/solicitacoes/${id}/cancelar`,
    { method: "PATCH" },
  );
}

export function listarSolicitacoesPendentes() {
  return request<Solicitacao[]>("/solicitacoes/pendentes");
}

export function buscarSolicitacaoPorId(id: number) {
  return request<Solicitacao>(`/solicitacoes/${id}`);
}

export function atualizarStatusSolicitacao(
  id: number,
  status: SolicitacaoStatus,
  prestador_id?: number,
) {
  return request<{ sucesso: boolean; status: string }>(
    `/solicitacoes/${id}/status`,
    {
      method: "PATCH",
      body: { status, prestador_id },
    },
  );
}

/* ==================== CHAT DO ATENDIMENTO ==================== */

export type MensagemChat = {
  id: number;
  remetente_id: number;
  remetente_nome: string;
  conteudo: string;
  criado_em: string;
};

export type ConversaAtendimento = {
  solicitacao_id: number;
  prestador: { nome: string };
  mensagens: MensagemChat[];
};

export function listarMensagensChat(solicitacaoId: number) {
  return request<ConversaAtendimento>(`/solicitacoes/${solicitacaoId}/chat`);
}

export function enviarMensagemChat(solicitacaoId: number, conteudo: string) {
  return request<MensagemChat>(`/solicitacoes/${solicitacaoId}/chat`, {
    method: "POST",
    body: { conteudo },
  });
}

/* ==================== CARTÕES & STRIPE ==================== */

export type CartaoUsuario = {
  id: number;
  usuario_id: number;
  gateway: string;
  token_gateway: string;
  ultimos_digitos: string;
  bandeira?: string | null;
  validade_mes?: number | null;
  validade_ano?: number | null;
  apelido?: string | null;
  principal: boolean;
  criado_em?: string;
};

export type SalvarCartaoInput = {
  usuario_id: number;
  setup_intent_id: string;
  ultimos_digitos?: string;
  bandeira?: string;
  validade_mes?: number;
  validade_ano?: number;
  apelido?: string;
  principal?: boolean;
};

export function criarSetupIntentCartao(usuarioId: number) {
  return request<{ client_secret: string; setup_intent_id: string }>("/pagamento/novo-cartao", {
    method: "POST",
    body: { usuario_id: usuarioId },
  });
}

export function salvarCartao(input: SalvarCartaoInput) {
  return request<{ sucesso: boolean; mensagem: string }>(
    "/pagamento/salvar-cartao",
    {
      method: "POST",
      body: input,
    },
  );
}

export function listarCartoes(usuarioId: number) {
  return request<CartaoUsuario[]>(`/pagamento/cartoes?usuario_id=${encodeURIComponent(usuarioId)}`);
}

export type TipoVeiculo = "CARRO" | "MOTO" | "BICICLETA" | "BIKE_ELETRICA" | "CAMINHAO";

export type Veiculo = {
  id: number;
  tipo: TipoVeiculo;
  marca: string | null;
  modelo: string;
  ano: number | null;
  placa: string | null;
  cor: string | null;
  km_atual: number;
  km_atualizado_em: string;
};

export type Manutencao = {
  id: number;
  tipo: string;
  descricao: string | null;
  km_na_execucao: number | null;
  custo: string | null;
  executado_em: string;
};

export type VeiculoDetalhado = Veiculo & { manutencoes: Manutencao[] };

export function listarVeiculos(usuarioId: number) {
  return request<Veiculo[]>(`/veiculos?usuario_id=${usuarioId}`);
}

export function obterVeiculo(id: number) {
  return request<VeiculoDetalhado>(`/veiculos/${id}`);
}

export function criarVeiculo(input: {
  usuario_id: number;
  tipo?: TipoVeiculo;
  marca?: string;
  modelo: string;
  ano?: number;
  placa?: string;
  cor?: string;
  km_atual?: number;
}) {
  return request<Veiculo>("/veiculos", { method: "POST", body: input });
}

export function atualizarQuilometragem(id: number, km_atual: number) {
  return request<{ sucesso: boolean; km_atual: number }>(
    `/veiculos/${id}/quilometragem`,
    { method: "PATCH", body: { km_atual } },
  );
}

// O backend descobre o prestador pelo token; o app não envia prestador_id.
export type CadastrarServicoInput = {
  categoria_id: number;
  preco_base: number;
};

export function cadastrarServico(input: CadastrarServicoInput) {
  return request<ServicoOferecido>("/servicos", { method: "POST", body: input });
}

/* ==================== SUPORTE CENTRAL ==================== */

export type TipoRemetenteSuporte = "USUARIO" | "SUPORTE";

export type MensagemSuporte = {
  id: number;
  usuario_id: number;
  remetente_tipo: TipoRemetenteSuporte;
  conteudo: string;
  criado_em: string;
};

export function listarMensagensSuporte() {
  return request<MensagemSuporte[]>("/suporte/mensagens");
}

export function enviarMensagemSuporte(conteudo: string) {
  return request<MensagemSuporte>("/suporte/mensagens", {
    method: "POST",
    body: { conteudo },
  });
}
