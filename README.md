#  ÖRTÖÖ — Assistência Veicular Sob Demanda

> **Mobilidade, segurança e resposta rápida na palma da sua mão.**

O **ÖRTÖÖ** é uma plataforma de assistência veicular sob demanda que conecta, por meio da geolocalização em tempo real, motoristas em situações de emergência a prestadores de serviços automotivos próximos, de forma rápida, transparente e totalmente sem a necessidade de mensalidades ou contratos engessados.

---

## Rodar a versão front-end

Esta versão funciona sem API ou banco de dados. Os dados de demonstração ficam em memória e voltam aos valores iniciais quando o aplicativo é reiniciado. Para entrar como cliente, use qualquer e-mail e senha não vazios. A conta de prestador está definida em `src/mock-data.ts`:

- E-mail: `mecanico@ortoo.com`
- Senha: `mecanico123`

O cadastro também aceita dados de demonstração.

As telas de assistência, acompanhamento, prestadores, chat, perfil, veículos, suporte e cartões usam registros locais simulados. A localização continua usando a permissão GPS do aparelho. Pagamentos são apenas confirmados visualmente e não geram cobranças reais. Envio de foto de perfil depende de armazenamento de arquivos e está indisponível nesta versão.

O login e a sessão são demonstrativos: não há API autenticada nem banco de dados. A sessão vale apenas enquanto o app está aberto; sair limpa o token de demonstração e os dados simulados da sessão. A proteção de rotas evita navegação acidental, mas não substitui autorização no servidor. Consulte [as decisões de autenticação, privacidade e permissões](docs/decisoes-capitulo-14.md).

Inicie o projeto com `npm start` e escolha Android, iOS ou Web no Expo.

---

##  O Problema

Imprevistos no trânsito — como pneu furado, falta de combustível (pane seca), bateria descarregada ou falhas mecânicas — geram alto estresse e vulnerabilidade para os condutores. O modelo tradicional de assistência veicular enfrenta sérios gargalos:

* ** Demora no atendimento:** Longos períodos de espera por guinchos ou mecânicos sem estimativa precisa.
* ** Burocracia e Custos Fixos:** Obrigatoriedade de assinaturas mensais ou anuais em seguros e associações, mesmo para quem raramente utiliza o serviço.
* ** Falta de Transparência:** Dificuldade em rastrear a localização do prestador em tempo real e incerteza sobre os prazos de chegada.

O **ÖRTÖÖ** resolve essa dor ao transformar a assistência veicular em um serviço moderno **sob demanda (*pay-per-use*)**, acionado diretamente pelo smartphone.

---

##  Quem Nós Somos

Somos uma solução tecnológica focada em **mobilidade, segurança e eficiência**. Atuamos como a ponte inteligente entre quem precisa de socorro imediato nas ruas e os profissionais capacitados para resolver o problema, utilizando geolocalização precisa para otimizar o tempo de resposta e reduzir custos operacionais.

---

##  Origem do Nome

A palavra **ÖRTÖÖ** (pronuncia-se *Ortô*) tem origem no antigo Império Mongol. O *Örtöö* era um eficiente sistema postal de postos de rota e mensageiros criado para cobrir grandes distâncias, garantindo socorro, suprimentos e comunicação rápida aos viajantes ao longo do caminho.

Resgatamos essa essência histórica de **suporte, conexão e prontidão em rotas** para dar vida à nossa plataforma.

---

##  Público-Alvo

Nossa plataforma atende de forma integrada às duas pontas do ecossistema:

###  Usuários & Condutores
* **Condutores sem seguro:** Donos de carros e motos que não possuem apólice tradicional.
* **Motoristas de aplicativo e entregadores:** Profissionais que dependem do veículo e não podem perder tempo de trabalho parados.
* **Viajantes e motoristas casuais:** Pessoas que buscam previsibilidade, segurança e ajuda rápida em viagens ou deslocamentos diários.

###  Prestadores de Serviço
* Guinchos autônomos, chaveiros, mecânicos móveis, borracharias e socorristas de bateria que desejam expandir sua cartela de clientes e rentabilizar horários ociosos.

---

## 👥 Equipe de Desenvolvimento

| Integrante | GitHub |
| :--- | :--- |
| **Vinicius Silveira** | [@viniciussdudu](https://github.com/viniciussdudu) |
| **Arthur Bispo** | [@bispo047](https://github.com/bispo047) |
| **Klaus** | [@Klaus1215](https://github.com/Klaus1215) |

---
