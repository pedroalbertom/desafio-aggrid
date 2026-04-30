📦 Stock Manager - Full Stack Challenge
Sistema robusto para gerenciamento de estoque, permitindo o controle de produtos e fornecedores, com visualização de histórico de preços por meio de gráficos interativos.

🚀 Tecnologias Utilizadas
O projeto foi construído utilizando as tecnologias mais modernas do ecossistema JavaScript/TypeScript:

Backend
NestJS: Framework Node.js para aplicações eficientes e escaláveis.

TypeORM: ORM para mapeamento de dados entre o código e o banco de dados.

MySQL: Banco de dados relacional para persistência segura das informações.

TypeScript: Tipagem estática para maior segurança e produtividade.

Frontend
React + Vite: Biblioteca de UI com build tool extremamente rápida.

TypeScript: Garantia de consistência de dados em toda a aplicação.

Ag-Grid: Grelha de alta performance para exibição e filtragem de dados.

Recharts: Biblioteca de gráficos para visualização do histórico de preços.

Lucide React: Conjunto de ícones minimalistas.

🏗️ Arquitetura e Boas Práticas
O projeto foi desenvolvido seguindo princípios de Clean Architecture e S.O.L.I.D., garantindo:

Modularização: Componentes React isolados e reutilizáveis.

Custom Hooks: Lógica de negócio separada da camada de apresentação no frontend.

Separação de Preocupações: Backend organizado em módulos, serviços e controladores bem definidos.

Manutenibilidade: Código limpo, tipado e fácil de expandir.

🐳 Como Rodar o Projeto (Docker)
O projeto está totalmente dockerizado, o que facilita a execução do ambiente completo (Back, Front e Banco) com apenas um comando.

Pré-requisitos: Docker e Docker Compose instalados.

Clone o repositório.

Na raiz do projeto, execute:

Bash
docker-compose up --build
Acesse as aplicações:

Frontend: http://localhost:5173

Backend API: http://localhost:3000

🛠️ Funcionalidades Principais
[x] CRUD completo de Produtos e Fornecedores.

[x] Vínculo entre produtos e seus respectivos fornecedores.

[x] Histórico automático de preços (toda edição de preço gera um novo ponto no histórico).

[x] Gráfico interativo de evolução de preços por produto.

[x] Interface responsiva e otimizada para gerenciamento.

Desenvolvido como desafio técnico para estágio.
