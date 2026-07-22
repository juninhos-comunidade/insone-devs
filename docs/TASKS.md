<h1 align="center">📋 Divisão de Tarefas — insone-devs</h1>

> ⚠️ **Isto é apenas uma sugestão!** A divisão abaixo é um ponto de partida para organizar o trabalho entre os integrantes, baseada na stack atual do projeto (NestJS + Prisma no backend, React + Tailwind no frontend). A equipe é livre para reorganizar, trocar ou remanejar tarefas conforme achar melhor — o objetivo é apenas dar um norte inicial.

---

## 👑 Juliana Freire (Líder)
- Coordenação geral do projeto e acompanhamento do progresso da equipe
- Revisão de Pull Requests e definição de padrões de arquitetura
- Páginas do frontend (`frontend/src/pages`): Login, Register, Home
- Integração com a API (`frontend/src/services`): Axios, chamadas de auth e usuários
- Rotas protegidas (`frontend/src/routes`)

## Gustavo Geraldo
- Módulo de usuários no backend (`backend/src/users`): controller, service, DTOs
- Modelagem de dados e migrations com Prisma (`backend/prisma`)
- Configuração e manutenção do banco de dados (PostgreSQL)

## Lucas Paguetti Pereira
- Módulo de autenticação no backend (`backend/src/auth`): login, JWT, guards

## Maria Clara Castro
- Componentes de UI reutilizáveis (`frontend/src/components/ui`): Button, Input, etc.
- Estilização com TailwindCSS e identidade visual do projeto
- Contexto e hooks de autenticação no frontend (`AuthContext`, `useAuth`)

---

### 🔄 Observação
Conforme o MVP evoluir e novas funcionalidades forem adicionadas, essas responsabilidades podem — e devem — ser reavaliadas em conjunto pela equipe.
