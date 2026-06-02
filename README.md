# Sistema-Inventory

## 📦 Sistema de Gerenciamento de Inventário — Full Stack

Sistema Full Stack para gerenciamento de inventário desenvolvido como atividade acadêmica, composto por uma API REST em Spring Boot e uma SPA (Single Page Application) em Angular.

O sistema permite o gerenciamento de produtos e categorias, oferecendo recursos de autenticação, cadastro, edição, exclusão, filtros e pesquisa em tempo real através de uma interface moderna e responsiva.

---

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação completa seguindo conceitos modernos de desenvolvimento Full Stack:

* Backend em Spring Boot
* Frontend em Angular
* Arquitetura em camadas
* Consumo de API REST
* Integração Frontend ↔ Backend
* Banco de dados PostgreSQL
* Responsividade
* Componentização
* Boas práticas de desenvolvimento

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

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Security
* Hibernate
* PostgreSQL
* Maven
* Swagger / OpenAPI

### Frontend

* Angular 17
* Angular Material
* TailwindCSS
* RxJS
* TypeScript
* Angular Signals

---

## ✨ Funcionalidades

### Autenticação

* Login utilizando e-mail e senha
* Endpoint dedicado de autenticação
* Controle de sessão utilizando LocalStorage
* AuthGuard protegendo rotas privadas

### Produtos

* Listagem de produtos
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Busca por nome
* Filtro por categoria
* Exibição do preço formatado em Real (R$)

### Categorias

* Listagem de categorias
* Cadastro de categorias
* Integração dinâmica com produtos
* Atualização automática dos filtros

### Interface

* Dashboard responsivo
* Sidebar de navegação
* Cards modernos
* Snackbar de notificações
* Dialogs de confirmação
* Loading Spinner
* Skeleton Loading
* Empty State
* Dark Mode / Light Mode

---

## 🔒 Credenciais de Acesso

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

Criar um banco de dados:

```sql
CREATE DATABASE inventario;
```

Configurar:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/inventario
spring.datasource.username=postgres
spring.datasource.password=senha
```

### 3. Executar

```bash
mvn spring-boot:run
```

API disponível em:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui.html
```

---

## 🚀 Como Executar o Frontend

### Instalar dependências

```bash
npm install
```

### Executar

```bash
ng serve
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

## 🌐 Configuração de CORS

Para permitir a comunicação entre Angular e Spring Boot:

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

* API REST
* DTO Pattern
* Arquitetura em Camadas
* Repository Pattern
* Dependency Injection
* Componentização
* Lazy Loading
* Feature First Architecture
* Reactive Forms
* Signals
* Guards
* Responsividade Mobile First

---

## 👨‍💻 Autor

Desenvolvido por: Yuri Ribeiro Abe 🔗 https://github.com/YuriAbe

