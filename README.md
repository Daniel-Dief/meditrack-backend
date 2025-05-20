# 🏥 API de Agendamentos Médicos - GraphQL

Este projeto é uma API construída com **Node.js**, **TypeScript**, **Prisma** e **GraphQL (Apollo Server)** para gerenciar o agendamento de consultas entre médicos e pacientes.

## 🚀 Tecnologias

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat-square) **Node.js**
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) **TypeScript**
- ![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?logo=graphql&logoColor=white&style=flat-square) **GraphQL**
- ![Apollo Server](https://img.shields.io/badge/-Apollo%20Server-311C87?logo=apollo-graphql&logoColor=white&style=flat-square) **Apollo Server**
- ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white&style=flat-square) **Prisma ORM**
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=flat-square) **MySQL** *(ou adaptável para PostgreSQL / SQLite)*



---

## 📁 Estrutura do Projeto

```

.
├── prisma/
│   └── schema.prisma      # Definição do modelo de dados
├── src/
│   ├── server.ts          # Inicialização do servidor Apollo
│   └── graphql/
│       ├── schemas/       # Tipos, Queries e Mutations do GraphQL
│       └── resolvers/     # Resolvers das operações GraphQL
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Este arquivo

````

---

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Daniel-Dief/meditrack-backend.git
cd meditrack-backend
````

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz com o conteúdo:

```env
DATABASE_URL="sqlite:./dev.db"  # ou PostgreSQL, MySQL etc
```

### 4. Gerar o banco de dados

```bash
npx prisma migrate dev --name init
```

### 5. Iniciar o servidor em modo desenvolvimento

```bash
npm run dev
```

A API estará disponível em:
➡️ `http://localhost:4000/`
Você poderá acessar o Playground do GraphQL diretamente nesse endereço.

---

## ✍️ Exemplos de Queries GraphQL

### 🔍 Buscar agendamentos

```graphql
query {
  allAppointments {
    AppointmentId
    AppointmentDate
    Doctor {
      Name
    }
    Patient {
      Name
    }
    Status {
      Name
    }
  }
}
```

### ➕ Criar novo agendamento

```graphql
mutation {
  createAppointment(input: {
    AppointmentDate: "2025-05-25T14:00:00Z"
    PatientId: 1
    DoctorId: 2
    StatusId: 1
  }) {
    AppointmentId
    AppointmentDate
  }
}
```

---

## 🧠 Funcionalidades

* Cadastro e gerenciamento de usuários (paciente, médico)
* Agendamento de consultas
* Registro de consultas e prescrições
* Anexos em consultas (exames, receitas, etc)
* Autenticação (em breve)

---

## 📌 Autor

Desenvolvido por [Daniel Diefenthaeler](https://github.com/Daniel-Dief)

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
