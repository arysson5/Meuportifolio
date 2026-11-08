# Contrato do portfolio

Regras fechadas para o app em `portfolio/`. O `index.html` da pasta acima não muda.

## Conteúdo

- Os textos vendem: falam do que cada projeto entrega, para cliente e recrutador, sem frase negativa e sem inventar número ou tecnologia que o projeto não tem. Ficam em `src/data/site.ts`.
- O título da aba é "Arysson — Back-end".
- O hero mostra o nome "Arysson", a frase "Back-end pleno. PHP, Laravel e Node. Mais de 4 anos na BGF. Disponível para remoto." e o botão "Falar no WhatsApp".
- O WhatsApp usa o link já publicado: `https://wa.me/?text=Oi%20Arysson%2C%20vi%20o%20portf%C3%B3lio%20e%20quero%20conversar.`
- O sobre usa "Tecnologia que todo mundo entende. Eu faço o sistema, do banco de dados ao botão. A frase do topo é o trabalho. O sistema fica de pé, roda no dia a dia, e quem contrata entende o que ele faz."
- A lista Cases tem cinco itens, nesta ordem: Hannover Store, Chatbot da Briza, Bgf-contracts, Oráculo BGF, Cara do produto.
- Hannover cita só o que o código público tem: catálogo, login, painel admin, o chatbot Hannovinho, React, Vite e Fastify.

## Projeto ao vivo

- A lista de projetos começa com um item: Hannover Store, categoria Cliente.
- O botão "Live Project" aparece uma vez e abre `https://hannover-store.vercel.app`.
- O código da loja abre `https://github.com/arysson5/HannoverStore`.
- Um projeto novo entra acrescentando um item no array. Sem `liveUrl`, o botão Live Project não aparece.

## Seções

A página tem, nesta ordem: Hero, faixa de prints, Sobre, Stack, Cases, Projeto, Briza, Contratos, Oráculo, Cara, Contato.

- O link da Briza é o código do fluxo (o case é o bot no WhatsApp, não um site).
- Contratos e Oráculo linkam o código no GitHub.
- Cara mantém Virada, Intelligence e Iza, com poster e vídeo, mais o link "Ver outro convite no ar" (`https://brunaethiago.vercel.app`).
- Contato mostra o nome, GitHub, LinkedIn, Instagram e o WhatsApp.

## Imagens

- Retrato, prints, logo e vídeos vêm de `assets/` do site atual.
- A faixa não usa GIF de outro portfólio.
- O site não usa a logo: nem nos cantos do sobre, nem na faixa.

## Celular

- Abaixo de `md`, o menu vira um botão que abre as quatro âncoras: Sobre, Cases, Cara, Contato.
- O botão do menu tem área de toque de pelo menos 44px.
- No hero estreito, o retrato fica no fluxo, abaixo do nome.
- A faixa usa tiles menores no celular.
- Cases empilha o número e o texto.
- O card do projeto empilha as imagens em uma coluna.
