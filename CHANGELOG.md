# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.0.65]() - 2020-10-05

### Added

- Home - Tabloids premium
- Solicitação para usuário avaliar na Store
- Tabloids na Home
- Carrossel com ofertas relâmpago

### Changed

- Novo layout do carrinho
- Forma de deletar os registros (DeletedAt)

### Fixed

- Ao acessar uma promoção pelo slider e clicar em "Voltar", ir para o mercado e não para Home
- Atualizar preços dos produtos do carrinho
- Busca em acessórios

## [1.0.64]() - 2020-09-30

### Added

- MENU - Botão compartilhar app

### Changed

- Login por SMS - Contagem regressiva de 60 segundos
- Upload de foto de perfil

### Fixed

- Endereço ultrapassando limite da tela, no header da home.
- Mensagem de “código inválido” mesmo logando no app
- "Retirada no local" (Grátis), continua cobrando frete.
- Toast ao (des)favoritar um produto
- Bug no chat entre usuário e admin
- Bug no calculo do frete
- Bug no calculo do produto promocional
- Bug no campo de busca mercado / restaurante

## [1.0.63]() - 2020-09-18

### Added

- Validação quando usuário está longe do endereço de entrega
- Tela suporte
- Slider redirecionar para estabelecimento (Mercado/Restaurante) ou produto (Mercado)
- Limite máximo de itens por compra em Mercado
- Opção para retirada no local
- Favoritar produtos em mercados

### Changed

- Novo layout tela "Resumo da compra"
- Novo layout tela "Agendamento da entrega"

### Fixed

- Cupom usado pelo cliente não era mostrado no admin, na tela de pedidos


## [1.0.55]() - 2020-08-26

### Fixed

- Validação quando usuário não permite localização ou está com gps desativado


## [1.0.46]() - 2020-08-06

### Added

- Registro de acessos (logado ou não)

### Changed

- Layout do método de pagamento

### Fixed

- Termos de uso sendo solicitado em todos os acessos
- Notificação do chat

## [1.0.45]() - 2020-07-28

### Added

- Cupon válido somente para primeira compra

### Changed

- Alterado texto das mensagens enviada por notificação
- Padronização da font 'Roboto'
- Ajuste nas dimensões e layout das imagens dos produtos dos restaurantes

### Fixed

- Ao entrar nos estabelecimentos dos Restaurantes e selecionar últimas categorias
- Nos resultado da busca, sempre mostrava o primeiro supermercado que foi acessado
- Sistema de busca dentro dos estabelecimentos


## [1.0.40]() - 2020-07-17

### Added

- Salvando no banco de dados a versão do aplicativo instalado no celular do usuário

<!-- ### Changed -->

### Fixed

- Bug no cadastro por telefone, solicitando email e senha
- Busca na home do app
- Busca retorna produtos e estabelecimentos
- Mensagem de validação do preço mínimo por compra
- iOS: Bug do teclado sobrepondo o campo de mensagem do chat
