# Decisões de autenticação, privacidade e permissões

## Escopo desta entrega

Este repositório entrega o front-end da demonstração. Não existe API autenticada nem banco de dados conectado. Por isso, a tela de login, os perfis e os atendimentos usam dados simulados. O login de cliente aceita qualquer e-mail e senha preenchidos; a conta pública de prestador fica em `src/mock-data.ts`. Essas credenciais servem somente para a demonstração e não são segredos.

A sessão de demonstração e o token fictício ficam em memória. Reiniciar o app encerra a sessão. Sair limpa o token e restaura os dados de perfil, veículo, atendimento, chat e suporte. As rotas exigem uma sessão para organizar a navegação, mas essa regra roda no próprio app e pode ser alterada por quem controla o aparelho. Sem servidor, não há como validar identidade, autorização, expiração ou revogação de sessão. Também não há respostas reais de API `401` e `403` para tratar.

Não adicionamos armazenamento seguro persistente para o token fictício: guardar esse token no cofre do sistema daria aparência de uma sessão confiável sem haver um servidor que o emita ou valide. Quando o app for ligado a uma API, a autenticação deverá ser implementada junto com ela; o servidor valida as credenciais, aplica autorização por usuário e responde a `401`/`403`. O token real deverá ser guardado no SecureStore, enviado apenas por HTTPS e apagado do aparelho ao sair ou após uma recusa `401`.

## Dados usados na demonstração

| Dado | Finalidade | Onde fica | Duração e remoção |
| --- | --- | --- | --- |
| Nome, e-mail, telefone e documento do perfil | Exibir e editar o perfil de cliente ou prestador | Estado do app e serviço de dados simulados em memória | Até sair ou encerrar o app; sair restaura o perfil de exemplo |
| Modelo, placa, cor e quilometragem do veículo | Demonstrar cadastro, manutenção e histórico | Serviço de dados simulados em memória | Até sair ou encerrar o app; sair restaura o veículo de exemplo |
| Localização atual e coordenadas da assistência | Encontrar prestadores próximos e mostrar o acompanhamento | Permissão de localização em primeiro plano; coordenadas da solicitação em memória | Usada durante o fluxo de assistência; os dados simulados são limpos ao sair |
| Mensagens de chat e suporte | Demonstrar a conversa entre cliente, prestador e suporte | Serviço de dados simulados em memória | Até sair ou encerrar o app; sair restaura as mensagens de exemplo |
| Dados de cartão | Mostrar estados da tela de pagamentos | Apenas cartão fictício com final `4242`; nenhum número real é solicitado | Não é armazenado um cartão real; estado simulado é restaurado ao sair |
| Senha digitada | Permitir a demonstração de entrada | Campo de entrada durante a autenticação | Não é guardada pelo serviço simulado. A senha de demonstração do prestador é pública no repositório e nunca deve ser reutilizada |
| Foto de perfil | Não coletada nesta entrega | A seleção e o envio de foto estão desativados | Nenhum arquivo é lido ou enviado |

Os dados de exemplo devem continuar fictícios. Não inserir nomes, documentos, telefones, placas, conversas ou coordenadas reais em `src/mock-data.ts` ou nos dados iniciais do serviço.

## Permissões e configuração

- Localização em primeiro plano é necessária para pedir assistência e mostrar o mapa. O app solicita a permissão quando a pessoa inicia esse fluxo ou o acompanhamento. Não solicitamos localização em segundo plano.
- Não usamos câmera, microfone, galeria ou seleção de arquivos; por isso esses acessos não estão habilitados nesta entrega.
- Pagamentos são simulados e não capturam dados de cartão nem usam chave de gateway.
- O `.gitignore` ignora `.env`, arquivos locais de ambiente e arquivos de chave/certificado. Não há segredo de API configurado neste repositório. Qualquer variável `EXPO_PUBLIC_` futura será pública dentro do app e não poderá conter senha ou chave privada.

## Próxima etapa quando houver servidor

Implementar autenticação no servidor, armazenamento seguro de senha com hash e salt, autorização por usuário e função, transporte HTTPS, sessão com expiração e encerramento no servidor. No app, adotar SecureStore para o token real, limpar os dados locais associados à sessão em `logout` e `401`, tratar `403` sem repetir a operação e documentar a retenção de dados. A tela de rota protegida continuará sendo uma conveniência de navegação; o servidor é responsável por negar acesso a dados e operações não autorizados.
