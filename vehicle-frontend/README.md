## Vehicle Management Frontend

Este é o frontend do sistema de gerenciamento de veículos, construído com Angular e configurado como uma aplicação standalone.
O projeto oferece funcionalidades para listar, criar, editar e excluir veículos, com suporte a filtros de pesquisa.

---

### **Tecnologias Utilizadas**
- **Angular 19**
- **Bootstrap 5**
- **Angular Forms**
- **Ng-Bootstrap**
- **TypeScript**

---

### **Como Iniciar o Projeto**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/this-rafael/vehicle-crud.git
   cd vehicle-crud/vehicle-frontend
   ```

2. **Instale as dependências**:
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm start
   ```

4. Acesse o frontend em: [http://localhost:4200](http://localhost:4200)

---

### **Estrutura do Projeto**

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── vehicle-create/        # Formulário para criar novos veículos
│   │   ├── vehicle-detail/        # Modal de detalhes e edição de veículos
│   │   └── vehicle-list/          # Listagem de veículos com filtros e paginação
│   └── services/
│       └── vehicle.service.ts     # Serviço para interagir com a API de veículos
└── assets/                        # Recursos estáticos (imagens, ícones, etc.)
```

---

### **Principais Funcionalidades**

#### **1. Listagem de Veículos**
- Caminho: `/`
- Exibe uma lista de veículos em formato de cards.
- Possui filtros de pesquisa:
  - Nome do veículo.
  - Marca.
  - Ano de fabricação.
- Implementa paginação com botões de "Carregar Mais".
- Botão "Adicionar Veículo" redireciona para o formulário de criação.

#### **2. Criação de Veículos**
- Caminho: `/create`
- Formulário para cadastrar um novo veículo.
- Validações:
  - **Placa**: Obrigatória, exatamente 7 caracteres.
  - **Chassi**: Obrigatório.
  - **Renavam**: Obrigatório.
  - **Modelo**: Obrigatório.
  - **Marca**: Obrigatória.
  - **Ano**: Obrigatório, entre 1886 e o ano atual.
- Após salvar, redireciona para a página de listagem.

#### **3. Edição de Veículos**
- Acessado clicando em um card da listagem.
- Abre um modal com os detalhes do veículo.
- Permite edição direta dos campos.
- Validações:
  - Mesmas do formulário de criação.
- Botões:
  - **Salvar**: Atualiza os dados do veículo.
  - **Deletar**: Exclui o veículo e recarrega a listagem.

#### **4. Exclusão de Veículos**
- Disponível no modal de edição.
- Confirmação de exclusão.
- Após a exclusão, a página é recarregada automaticamente.

---

### **Serviço de API**

O serviço `VehicleService` é responsável por consumir a API REST do backend. Ele oferece os seguintes métodos:

- **`getVehicles(skip, take)`**:
  Busca veículos com suporte a paginação e filtros.
- **`createVehicle(vehicle)`**:
  Cadastra um novo veículo.
- **`updateVehicle(id, vehicle)`**:
  Atualiza os dados de um veículo existente.
- **`deleteVehicle(id)`**:
  Exclui um veículo pelo ID.

---

### **Configurações de Estilo**

- **Bootstrap**:
  - Classes utilizadas para layout e estilização.


---

### **Como Adicionar Funcionalidades**

1. **Criar um novo componente**:
   - Use o comando:
     ```bash
     ng generate component components/nome-do-componente --standalone
     ```

2. **Adicionar um novo método no serviço**:
   - Edite `vehicle.service.ts` para incluir novas chamadas de API.

3. **Configurar rotas**:
   - Atualize as rotas em `app.routes.ts`.

---

