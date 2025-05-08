# Documentação Técnica do Front-End da Aplicação de Gerenciamento de Tarefas

## Menu
- [1. Introdução](#1-introdução)
- [2. Contexto do Desafio](#2-contexto-do-desafio)
- [3. Decisão pela Versão do Angular](#3-decisão-pela-versão-do-angular)
- [4. Estrutura do Projeto](#4-estrutura-do-projeto)
- [5. Dependências](#5-dependências)
- [6. Componentes](#6-componentes)
- [7. Serviços](#7-serviços)
- [8. Gerenciamento de Estado](#8-gerenciamento-de-estado)
- [9. Rotas](#9-rotas)
- [10. Interface do Usuário](#10-interface-do-usuário)
- [11. Responsividade](#11-responsividade)
- [12. Testes](#12-testes)
- [13. Decisões Técnicas](#13-decisões-técnicas)
- [14. Imagens](#14-imagens)
- [15. Como Rodar o Projeto](#15-como-rodar-o-projeto)
- [16. Conclusão](#16-conclusão)
- [17. Referências](#17-referências)
  
## 1. Introdução

Esta documentação técnica detalha o front-end da aplicação de gerenciamento de tarefas, desenvolvida para atender ao desafio de criar uma aplicação web com Angular. O desafio solicitava o uso do Angular 16 ou a versão mais recente, e optamos pela versão 19, a mais atual, para aproveitar melhorias de desempenho, suporte a componentes Standalone e ferramentas modernas. A aplicação permite aos usuários adicionar, editar, excluir e visualizar tarefas, com funcionalidades de filtragem por status (pendente ou concluída). O front-end utiliza Angular Material para uma interface responsiva e implementa gerenciamento de estado com serviços e RxJS, integrando-se a uma API RESTful desenvolvida com Spring Boot.

O objetivo é fornecer uma experiência de usuário intuitiva, com uma interface clara e funcionalidades robustas que atendem aos requisitos do desafio, incluindo operações CRUD, responsividade, testes e documentação clara.

## 2. Contexto do Desafio

O desafio consistiu em desenvolver uma aplicação de gerenciamento de tarefas com os seguintes requisitos:

- **Gerenciamento de Tarefas**:
  - Adicionar novas tarefas com título, descrição e data de vencimento.
  - Editar tarefas existentes. 
  - Excluir tarefas. 
  - Marcar tarefas como concluídas. 
  - Filtrar tarefas por status (pendente, concluída). 

- **Interface do Usuário**:
  - Criar uma interface amigável e responsiva. 
  - Utilizar componentes do Angular Material. 

- **Persistência de Dados**:
  - Utilizar uma API RESTful para persistir os dados. 
  - Implementar operações CRUD. 

- **Requisitos Técnicos**:
  - Usar Angular 16 ou a versão mais recente (optamos por Angular 19). 
  - Seguir as melhores práticas de desenvolvimento Angular. 
  - Implementar gerenciamento de estado (especificado como NgRx, mas adaptado para RxJS). 
  - Escrever testes unitários e end-to-end (E2E) com Cypress. 

- **Entrega**:
  - Código-fonte em um repositório Git. 
  - README com instruções de configuração. 
  - Documentação das decisões técnicas. 

Esta documentação aborda como o front-end atende a esses requisitos, detalhando a arquitetura, componentes, serviços, guardas e decisões técnicas.

## 3. Decisão pela Versão do Angular

O desafio permitia o uso do Angular 16 ou a versão mais recente. Optamos pela versão 19, para aproveitar melhorias em performance, suporte a componentes Standalone e ferramentas de desenvolvimento modernas. A escolha foi justificada pela simplicidade do projeto, que não apresentou incompatibilidades significativas com a versão 19, e pela facilidade de manutenção futura.

- **Benefícios**:
  - Melhorias em performance e renderização.
  - Suporte a novas funcionalidades, como componentes Standalone.
  - Alinhamento com as práticas mais recentes da comunidade Angular.

## 4. Estrutura do Projeto

O projeto segue a estrutura padrão gerada pelo Angular CLI, organizada para facilitar manutenção e escalabilidade. Abaixo está a estrutura principal:

| **Diretório**         | **Descrição**                                                                 |
|-----------------------|-------------------------------------------------------------------------------|
| `src/app`             | Contém o código principal da aplicação.                                       |
| `src/app/shared/components`  | Componentes reutilizáveis, como `ErrorDialogComponent`. |
| `src/app/tarefas/components`  | Componentes de apresentação, como `TarefasListComponent`. |
| `src/app/tarefas/containers`  | Componentes de inteligentes, como `TarefasComponent` e `TarefaFormComponent`.   |
| `src/app/tarefas/services`    | Serviços, como `TarefasService`, para lógica de negócios e chamadas à API.    |
| `src/app/tarefas/guards`      | Guardas de rota, como `TarefaResolver`, para resolver dados antes da navegação. |
| `src/app/tarefas/models`      | Modelos de dados, como a interface `Tarefa`.                                   |
| `src/assets`          | Recursos estáticos, como imagens e estilos CSS.                               |
| `cypress/e2e`                 | Testes end-to-end com Cypress.                                                |

Essa organização modular permite a separação clara de responsabilidades, facilitando a adição de novas funcionalidades e a manutenção do código.

## 5. Dependências

O front-end utiliza as seguintes dependências principais, listadas no arquivo `package.json`:

| **Dependência**                     | **Versão** | **Descrição**                                                                 |
|-------------------------------------|------------|-------------------------------------------------------------------------------|
| `@angular/core`                     | ^19.2.0    | Núcleo do framework Angular.                                                  |
| `@angular/common`                   | ^19.2.0    | Módulos comuns do Angular.                                                    |
| `@angular/forms`                    | ^19.2.0    | Suporte a formulários reativos e baseados em templates.                       |
| `@angular/router`                   | ^19.2.0    | Gerenciamento de rotas na aplicação.                                          |
| `@angular/material`                 | ~19.2.14   | Componentes de UI para tabelas, formulários, botões, diálogos, etc.           |
| `@angular/cdk`                      | ~19.2.14   | Componentes de desenvolvimento de UI, como diálogos e acessibilidade.          |
| `rxjs`                              | ~7.8.0     | Programação reativa com Observables.                                          |
| `zone.js`                           | ~0.15.0    | Gerenciamento de zonas para mudanças assíncronas.                             |
| `@angular-devkit/build-angular`     | ^19.2.10   | Ferramentas de build para Angular.                                            |
| `@angular/cli`                      | ^19.2.10   | CLI do Angular para desenvolvimento e build.                                  |
| `@angular/compiler-cli`             | ^19.2.0    | Compilador para Angular.                                                      |
| `@types/jasmine`                    | ~5.1.0     | Tipos para testes com Jasmine.                                                |
| `cypress`                           | ^14.3.3    | Framework para testes end-to-end.                                             |
| `jasmine-core`                      | ~5.6.0     | Framework de testes unitários.                                                |
| `karma`                             | ~6.4.0     | Executor de testes unitários.                                                 |
| `karma-chrome-launcher`             | ~3.2.0     | Lançador do Chrome para testes Karma.                                         |
| `karma-coverage`                    | ~2.2.0     | Geração de relatórios de cobertura de testes.                                 |
| `karma-jasmine`                     | ~5.1.0     | Integração do Jasmine com Karma.                                              |
| `karma-jasmine-html-reporter`       | ~2.1.0     | Relatórios HTML para testes Jasmine.                                          |
| `typescript`                        | ~5.7.2     | Suporte a TypeScript.                                                         |

Essas dependências foram atualizadas para garantir compatibilidade com o Angular 19, suportando uma aplicação robusta com interface moderna, reatividade eficiente e testes abrangentes.

## 6. Componentes

Os principais componentes do front-end são:

### 6.1. ErrorDialogComponent
- **Propósito**: Exibe mensagens de erro em um diálogo modal.
- **Uso**: Notifica erros, como falhas ao salvar ou excluir tarefas.
- **Funcionalidades**:
  - Exibe uma mensagem injetada via `MAT_DIALOG_DATA`.
  - Inclui um botão para fechar o diálogo.
- **Código**:
  ```typescript
  @Component({
    selector: 'app-error-dialog',
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    template: `
      <h1 mat-dialog-title style="color: red;">Error!</h1>
      <div mat-dialog-content>{{ data }}</div>
      <div mat-dialog-actions align="center">
        <button mat-stroked-button mat-dialog-close>Close</button>
      </div>
    `
  })
  export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
  }
  ```
- **Integração**: Aberto por componentes como `TarefasComponent` e `TarefasListComponent` em caso de erros.

### 6.2. TarefasListComponent
- **Propósito**: Exibe a lista de tarefas em formato de tabela (desktop) ou cartões (mobile).
- **Funcionalidades**:
  - Colunas: Título, Descrição, Data de Vencimento, Status (checkbox), Ações (editar, excluir).
  - Permite marcar tarefas como concluídas via `toggleConclusao`.
  - Emite eventos para adicionar, editar ou excluir tarefas.
- **Código**:
  - **Inputs**: Recebe a lista de tarefas via `@Input() tarefas: Tarefa[]`.
  - **Outputs**: Emite eventos `add`, `edit` e `remove`.
  - **Métodos**:
    - `toggleConclusao`: Chama `TarefasService.marcarComoConcluida` e atualiza o status.
    - `onAdd`, `onEdit`, `onDelete`: Emitem eventos para o componente pai.
  - **Erro**: Exibe `ErrorDialogComponent` em caso de falha.
- **Integração**: Usado dentro de `TarefasComponent`.

### 6.3. TarefaFormComponent
- **Propósito**: Formulário para adicionar ou editar tarefas.
- **Campos**:
  - `idTarefa`: ID da tarefa (opcional para novas tarefas).
  - `tituloTarefa`: Título da tarefa.
  - `descricaoTarefa`: Descrição da tarefa.
  - `dataVencimentoTarefa`: Data de vencimento.
  - `tarefaConcluida`: Status de conclusão (checkbox).
- **Funcionalidades**:
  - Inicializa o formulário com dados resolvidos pela rota (`TarefaResolver`).
  - Submete os dados via `TarefasService.save`.
  - Exibe notificações de sucesso (`MatSnackBar`) ou erro (`ErrorDialogComponent`).
- **Código**:
  - Usa `ReactiveFormsModule` para formulários reativos.
  - **Métodos**:
    - `onSubmit`: Salva a tarefa e navega de volta.
    - `onCancel`: Retorna à página anterior.
  - **Integração**: Acessado via rotas `/nova` e `/editar/:idTarefa`.

### 6.4. TarefasComponent
- **Propósito**: Componente principal que integra a lista de tarefas e o formulário.
- **Funcionalidades**:
  - Exibe a lista de tarefas usando `TarefasListComponent`.
  - Oferece um filtro por status via `mat-select`.
  - Gerencia navegação para adicionar ou editar tarefas.
  - Atualiza a lista após operações.
- **Código**:
  - Usa `BehaviorSubject` para gerenciar o estado do filtro (`filtroSubject`).
  - Combina `tarefas$` e `filtroSubject` para criar `tarefasFiltradas$` usando `combineLatest`.
  - **Métodos**:
    - `atualizarFiltro`: Atualiza o filtro de status.
    - `refresh`: Recarrega a lista de tarefas.
    - `onAdd`, `onEdit`, `onDelete`: Gerenciam navegação e exclusão.
  - **Integração**: Componente raiz da rota `/`.

## 7. Serviços

### 7.1. TarefasService
- **Propósito**: Encapsula operações CRUD, comunicando-se com a API RESTful.
- **Métodos**:
  | **Método**                | **Descrição**                                                                 | **Endpoint**                     |
  |---------------------------|-------------------------------------------------------------------------------|----------------------------------|
  | `listarTarefas`           | Busca todas as tarefas.                                                       | GET `/api/tarefas`              |
  | `save`                    | Cria ou atualiza uma tarefa.                                                  | POST `/api/tarefas` ou PUT `/api/tarefas/:id` |
  | `marcarComoConcluida`     | Alterna o status de conclusão.                                                | PATCH `/api/tarefas/:id/concluir` |
  | `loadById`                | Busca uma tarefa pelo ID.                                                     | GET `/api/tarefas/:id`          |
  | `create`                  | Cria uma nova tarefa.                                                         | POST `/api/tarefas`             |
  | `update`                  | Atualiza uma tarefa existente.                                                | PUT `/api/tarefas/:id`          |
  | `delete`                  | Exclui uma tarefa.                                                            | DELETE `/api/tarefas/:id`       |
- **Código**:
  - Usa `HttpClient` para requisições HTTP.
  - Retorna `Observables` para reatividade.
  - Inclui `delay` e `tap` para simulação de latência e logging.

### 7.2. TarefaResolver
- **Propósito**: Resolve dados da tarefa antes de carregar o `TarefaFormComponent`.
- **Comportamento**:
  - Busca a tarefa pelo ID via `TarefasService.loadById` se presente na rota.
  - Retorna um objeto padrão com a data atual se não houver ID.
- **Código**:
  ```typescript
  @Injectable({
    providedIn: 'root'
  })
  export class TarefaResolver {
    constructor(private service: TarefasService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if (route.params && route.params['idTarefa']) {
        return this.service.loadById(route.params['idTarefa']);
      }
      const dataAtualFormatada = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      return of({
        idTarefa: '',
        tituloTarefa: '',
        descricaoTarefa: '',
        dataVencimentoTarefa: dataAtualFormatada,
        tarefaConcluida: false
      });
    }
  }
  ```
- **Integração**: Usado nas rotas `/nova` e `/editar/:idTarefa`.

## 8. Gerenciamento de Estado

Embora o desafio sugerisse NgRx, optamos por serviços com RxJS (`BehaviorSubject`, `Observables`) devido à simplicidade do projeto:

- **Estado**:
  - Lista de tarefas (`tarefas$`: `Observable<Tarefa[]>`).
  - Estado do filtro (`filtroSubject`: `BehaviorSubject<string>`).
- **Reatividade**:
  - `tarefas$` carrega dados via `TarefasService.listarTarefas`.
  - `tarefasFiltradas$` combina `tarefas$` e `filtroSubject` com `combineLatest`.
- **Atualização**:
  - O método `refresh` recarrega `tarefas$` após operações.

Essa abordagem é nativa ao Angular, reduzindo complexidade em comparação com NgRx, que seria mais adequado para projetos maiores.

## 9. Rotas

As rotas são definidas no módulo de roteamento (`TAREFAS_ROUTES`):

| **Rota**                  | **Componente**            | **Descrição**                                                                 |
|---------------------------|---------------------------|-------------------------------------------------------------------------------|
| `/`                       | `TarefasComponent`        | Exibe a lista de tarefas com filtros.                                         |
| `/nova`                   | `TarefaFormComponent`     | Formulário para adicionar uma nova tarefa.                                    |
| `/editar/:idTarefa`       | `TarefaFormComponent`     | Formulário para editar uma tarefa existente.                                  |

- **Resolver**: `TarefaResolver` carrega dados antes de renderizar o formulário.

## 10. Interface do Usuário

A interface utiliza Angular Material:

| **Componente**       | **Uso**                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `mat-table`          | Lista de tarefas em tabela (desktop).                                   |
| `mat-form-field`     | Campos de entrada para formulários.                                     |
| `mat-checkbox`       | Status de conclusão das tarefas.                                        |
| `mat-icon`           | Ícones para ações (editar, excluir).                                    |
| `mat-card`           | Tarefas em cartões (mobile).                                            |
| `mat-toolbar`        | Barra superior com título e filtros.                                    |
| `mat-select`         | Filtro por status.                                                      |
| `mat-snack-bar`      | Notificações de sucesso.                                                |
| `mat-dialog`         | Diálogos de erro (`ErrorDialogComponent`).                              |

## 11. Responsividade

- **Telas Grandes (> 600px)**: Tabela com colunas para título, descrição, vencimento, status e ações.
- **Telas Pequenas (≤ 600px)**: Cartões com informações da tarefa e botões de ação.
- **CSS**:
  ```scss
  .desktop-view { display: block; }
  .mobile-view { display: none; }
  @media (max-width: 600px) {
    .desktop-view { display: none; }
    .mobile-view { display: block; }
  }
  ```

## 12. Testes

- **Unitários**: Jasmine/Karma, cobrindo componentes e serviços.
- **E2E**: Cypress, validando fluxos como adicionar, editar e excluir tarefas.

## 13. Decisões Técnicas

| **Aspecto**                | **Decisão**                                                                 | **Justificativa**                                                                 |
|----------------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Versão do Angular**      | Angular 19 em vez de 16.                                                    | Melhorias em performance e suporte a funcionalidades modernas.                    |
| **Gerenciamento de Estado** | RxJS em vez de NgRx.                                                        | Simplicidade do projeto; NgRx seria excessivo.                                    |
| **Responsividade**         | Tabela para desktop, cartões para mobile.                                   | Melhor usabilidade em dispositivos móveis.                                        |
| **Testes E2E**            | Cypress em vez de Protractor.                                               | Cypress é mais moderno e fácil de configurar.                                     |


## 14. Imagens

### 14.1. Tarefas Cadastradas
![Tarefas Cadastradas](https://github.com/user-attachments/assets/300beb92-3596-4d60-8ed3-8cbfb028bb43
)

### 14.2. Tela de Detalhes da Tarefa
![Tela de Detalhes da Tarefa](https://github.com/user-attachments/assets/145f4789-4e8b-451e-9dee-792dae1c22fe
)


## 15. Como Rodar o Projeto

### 15.1. Pré-requisitos
- **Node.js**: Para o projeto foi usada a versão mais recente LTS (Long Term Support) do Node.js (v22.15.0) disponível em [nodejs.org](https://nodejs.org/). Verifique a instalação com:
  ```bash
  node -v
  npm -v
  ```
- **Angular CLI**: Instale globalmente com o comando abaixo, para o projeto também foi usada a versao mais recente do angular que é a v19.2.10, por isso não é necessário especificar a versao de instalação:
  ```bash
  npm install -g @angular/cli
  ```
  Verifique a versão com:
  ```bash
  ng version
  ```

### 15.2. Configuração do Front-End
1. Clone o repositório do projeto.
2. Navegue até o diretório do front-end e instale as dependências:
   ```bash
   npm install
   ```
3. Execute o projeto:
   ```bash
   npm run start
   ```
   A aplicação estará disponível em `http://localhost:4200`.
4. Para executar os testes unitários:
   ```bash
   npm test
   ```
5. Para executar os testes end-to-end com Cypress (para obter sucesso é necessário que tanto o front quanto o back estejam rodando):
   ```bash
   npx cypress open
   ```

### 15.3. Configuração do Back-End
O back-end é desenvolvido com Spring Boot e utiliza Java 21. Siga os passos abaixo:

- **Pré-requisitos**:
  - Instale o JDK 21 (disponível em [adoptium.net](https://adoptium.net/)).
  - Instale o Maven (disponível em [maven.apache.org](https://maven.apache.org/)).
  - Verifique as instalações:
    ```bash
    java -version
    mvn -version
    ```

- **Configuração**:
  1. Clone o repositório do back-end.
  2. Navegue até o diretório do back-end e instale as dependências:
     ```bash
     mvn clean install
     ```
  3. Execute o projeto:
     ```bash
     mvn spring-boot:run
     ```
     A API estará disponível em `http://localhost:8080`.

- **Banco de Dados**:
  - O projeto utiliza H2 como banco de dados embutido. Não é necessária configuração adicional, pois o H2 é inicializado automaticamente.

## 16. Conclusão

O front-end da aplicação é robusto, responsivo e bem testado, utilizando Angular 19 e Angular Material. A escolha pela versão 19 garante alinhamento com as práticas atuais, e a documentação detalha a arquitetura e decisões técnicas.


## 17. Referências

- [Angular Official Documentation](https://angular.dev)
- [Angular Material Documentation](https://material.angular.io)
- [RxJS Official Documentation](https://rxjs.dev)
- [Cypress Official Documentation](https://www.cypress.io)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Maven Documentation](https://maven.apache.org/)
