# Sistema-Inventory

![Java](https://img.shields.io/badge/Java-21-orange?logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-green?logo=spring-boot&logoColor=white) ![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white) ![Maven](https://img.shields.io/badge/Maven-red?logo=apache-maven&logoColor=white) ![npm](https://img.shields.io/badge/npm-blue?logo=npm&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-blue?logo=tailwindcss&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-6.2.0-green?logo=spring-security&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)

## 📦 Sistema de Gerenciamento de Inventário — Full Stack

Este projeto é um sistema Full Stack para gerenciamento de inventário, desenvolvido como atividade acadêmica. Ele é composto por uma API REST construída com Spring Boot e uma SPA (Single Page Application) em Angular.

O sistema oferece funcionalidades completas para o gerenciamento de produtos e categorias, incluindo autenticação, cadastro, edição, exclusão, filtros e pesquisa em tempo real. A interface é moderna e responsiva, garantindo uma experiência de usuário fluida.

---

## 🎯 Objetivo do Projeto

O principal objetivo deste projeto foi aplicar e integrar conceitos modernos de desenvolvimento Full Stack, tais como:

*   **Backend**: Spring Boot com arquitetura em camadas, Spring Data JPA e PostgreSQL.
*   **Frontend**: Angular com componentização, consumo de API REST, e responsividade (Mobile First).
*   **Integração**: Comunicação eficiente entre Frontend e Backend, seguindo boas práticas de desenvolvimento.

---

## 🏗️ Arquitetura Geral

```text
┌─────────────────────────┐
│      Angular SPA        │
│ Angular + Material +    │
│ TailwindCSS + RxJS      │
└──────────┬──────────────┘
           │ HTTP/JSON
           ▼
┌─────────────────────────┐
│      Spring Boot API    │
│ Controllers             │
│ Services                │
│ DTOs                    │
│ Repositories            │
└──────────┬──────────────┘
           │ JPA/Hibernate
           ▼
┌─────────────────────────┐
│      PostgreSQL         │
└─────────────────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

*   Java 21
*   Spring Boot
*   Spring Data JPA
*   Spring Security
*   Hibernate
*   PostgreSQL
*   Maven
*   Swagger / OpenAPI

### Frontend

*   Angular 17
*   Angular Material
*   TailwindCSS
*   RxJS
*   TypeScript
*   Angular Signals

---

## ✨ Funcionalidades

### Autenticação

*   Login com e-mail e senha.
*   Endpoint de autenticação dedicado.
*   Controle de sessão via LocalStorage.
*   AuthGuard para proteção de rotas privadas.

### Produtos

*   Listagem, cadastro, edição e exclusão de produtos.
*   Busca por nome e filtro por categoria.
*   Exibição do preço formatado em Real (R$).

### Categorias

*   Listagem e cadastro de categorias.
*   Integração dinâmica com produtos e atualização automática de filtros.

### Interface

*   Dashboard responsivo com Sidebar de navegação.
*   Cards modernos, Snackbar de notificações e Dialogs de confirmação.
*   Loading Spinner, Skeleton Loading e Empty State.
*   Suporte a Dark Mode / Light Mode.

---

## 🔒 Credenciais de Acesso (para testes)

| Campo  | Valor                                                 |
| ------ | ----------------------------------------------------- |
| E-mail | [admin@fatec.sp.gov.br](mailto:admin@fatec.sp.gov.br) |
| Senha  | admin123                                              |

---

## 🗄️ Estrutura do Backend

```text
src/main/java
├── controller
├── service
├── repository
├── model
├── dto
│   ├── request
│   └── response
├── infra
│   ├── security
│   └── config
└── ApiApplication.java
```

---

## 🖥️ Estrutura do Frontend

```text
src/app
├── core
│   ├── guards
│   ├── models
│   ├── services
│   └── interceptors
│
├── shared
│   └── pipes
│
├── features
│   ├── auth
│   └── dashboard
│
├── app.routes.ts
├── app.config.ts
└── app.component.ts
```

---

## 🚀 Como Executar o Backend

### 1. Clonar o projeto

```bash
git clone <repositorio-api>
```

### 2. Configurar PostgreSQL

Crie um banco de dados com o nome `inventario`:

```sql
CREATE DATABASE inventario;
```

Configure as propriedades de conexão no seu `application.properties` ou `application.yml`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/inventario
spring.datasource.username=postgres
spring.datasource.password=senha
```

### 3. Executar

Navegue até o diretório raiz do backend e execute:

```bash
mvn spring-boot:run
```

A API estará disponível em:

```text
http://localhost:8080
```

E a documentação Swagger em:

```text
http://localhost:8080/swagger-ui.html
```

---

## 🚀 Como Executar o Frontend

### 1. Instalar dependências

Navegue até o diretório raiz do frontend e execute:

```bash
npm install
```

### 2. Executar

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## 🌐 Configuração de CORS

Para garantir a comunicação entre o frontend Angular e o backend Spring Boot, a seguinte configuração de CORS é utilizada:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
```

---

## 📡 Principais Endpoints

### Autenticação

```http
POST /api/usuarios/login
```

### Usuários

```http
GET /api/usuarios
POST /api/usuarios
```

### Categorias

```http
GET /api/categorias
POST /api/categorias
```

### Produtos

```http
GET /api/produtos
GET /api/produtos/{id}
POST /api/produtos
PUT /api/produtos/{id}
DELETE /api/produtos/{id}
GET /api/produtos/categoria/{id}
GET /api/produtos/busca
```

---

## 📚 Conceitos Aplicados

*   API REST
*   DTO Pattern
*   Arquitetura em Camadas
*   Repository Pattern
*   Dependency Injection
*   Componentização
*   Lazy Loading
*   Feature First Architecture
*   Reactive Forms
*   Signals
*   Guards
*   Responsividade Mobile First

---

## 👨‍💻 Autor

Desenvolvido por: Yuri Ribeiro Abe 🔗 https://github.com/YuriAbe
