export const whatsappUrl =
  'https://wa.me/?text=Oi%20Arysson%2C%20vi%20o%20portf%C3%B3lio%20e%20quero%20conversar.'

// A frase do hero em partes, para o bloco ter hierarquia. Juntas, formam heroLine.
export const heroParts = {
  role: 'Back-end pleno.',
  stack: 'PHP, Laravel e Node.',
  experience: 'Mais de 4 anos na BGF.',
  status: 'Disponível para remoto.',
}

export const heroLine = [heroParts.role, heroParts.stack, heroParts.experience, heroParts.status].join(' ')

export const aboutText =
  'Tecnologia que todo mundo entende. Eu faço o sistema, do banco de dados ao botão. A frase do topo é o trabalho. O sistema fica de pé, roda no dia a dia, e quem contrata entende o que ele faz.'

export const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#cases', label: 'Cases' },
  { href: '#cara', label: 'Cara' },
  { href: '#contato', label: 'Contato' },
]

export const cases = [
  {
    number: '01',
    name: 'Hannover Store',
    description:
      'Loja virtual de ponta a ponta, para cliente e no ar: catálogo, login, painel admin e o chatbot Hannovinho atendendo quem chega. Front em React e Vite, API em Fastify.',
  },
  {
    number: '02',
    name: 'Chatbot da Briza',
    description:
      'O atendimento do estúdio roda sozinho no WhatsApp: orçamento pelas áreas do corpo, agenda no Google Calendar, sinal no PIX e um painel para o estúdio ajustar mensagem, horário e número.',
  },
  {
    number: '03',
    name: 'Bgf-contracts',
    description:
      'O contrato chega em PDF ou DOCX e a análise sai pronta: checklist dos requisitos mínimos e comparação entre o original e a versão do cliente. Nasceu do trabalho real da BGF.',
  },
  {
    number: '04',
    name: 'Oráculo BGF',
    description:
      'Um chat que conhece a empresa. Lê o que ela já tem e responde em cima disso: PDF, site e YouTube viram fonte da resposta.',
  },
  {
    number: '05',
    name: 'Cara do produto',
    description:
      'Também faço a cara do produto. Landings e convites no ar, prontos para converter: Virada Extraordinária, Intelligence Contabilidade e o convite da Iza.',
  },
]

export const briza = {
  title: 'Chatbot da Briza',
  lede: 'O atendimento do estúdio no piloto automático: o cliente chama no WhatsApp, o bot orça, agenda e confirma.',
  codeUrl: 'https://github.com/arysson5/chatbottatoo',
  codeLabel: 'Ver o código do fluxo',
  steps: [
    { title: 'Orçamento', text: 'O valor sai pelas áreas do corpo, na hora, dentro da conversa.' },
    { title: 'Agenda', text: 'O cliente escolhe o horário livre e ele entra direto no Google Calendar.' },
    { title: 'Sinal', text: 'O PIX confirma o horário e garante a sessão.' },
    { title: 'Painel', text: 'O estúdio ajusta mensagem, horário e número.' },
    { title: 'Stack', text: 'Evolution API, Next.js, Google Calendar e leitura do comprovante.' },
  ],
}

export const contratos = {
  title: 'Bgf-contracts',
  lede: 'O contrato chega em PDF ou DOCX e a ferramenta confere cláusula por cláusula, do começo ao fim. Nasceu do trabalho real da BGF.',
  codeUrl: 'https://github.com/arysson5/Bgf-contracts',
  codeLabel: 'Ver o código',
  checks: [
    'Checklist dos requisitos mínimos, lido no arquivo.',
    'Comparação entre o original e a versão do cliente.',
    'Stack: Python, Streamlit, leitura de PDF e DOCX.',
  ],
}

export const oraculo = {
  title: 'Oráculo BGF',
  lede: 'Um chat que conhece a empresa: lê o que ela já tem e responde em cima disso.',
  codeUrl: 'https://github.com/arysson5/oraculoBGF',
  codeLabel: 'Ver o código',
  sources: [
    { title: 'PDF', text: 'O documento entra como fonte da resposta.' },
    { title: 'Site', text: 'A página pública também entra na leitura.' },
    { title: 'YouTube', text: 'A fala do vídeo vira contexto do chat.' },
    { title: 'Stack', text: 'Python, Streamlit, LangChain, pypdf e a transcrição do YouTube.' },
  ],
}

export const face = {
  title: 'Também faço a cara do produto.',
  moreHref: 'https://brunaethiago.vercel.app',
  moreLabel: 'Ver outro convite no ar',
}

export const contact = {
  title: 'Se o sistema precisa existir de verdade, me chama.',
  name: 'Arysson Menezes',
  github: 'https://github.com/arysson5',
  linkedin: 'https://www.linkedin.com/in/arysson-menezes-dev/',
  instagram: 'https://www.instagram.com/arysson.dev/',
}

export const socials = [
  { label: 'LinkedIn', handle: 'arysson-menezes-dev', href: contact.linkedin },
  { label: 'GitHub', handle: 'arysson5', href: contact.github },
  { label: 'Instagram', handle: '@arysson.dev', href: contact.instagram },
] as const
