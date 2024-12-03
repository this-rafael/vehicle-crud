# API de Gerenciamento de Veículos

## Introdução

Esta é a API para gerenciar veículos. Foi desenvolvida com **NestJS**, **TypeScript** e **MongoDB**. A escolha dessas tecnologias garante uma solução robusta e escalável para lidar com operações como criar, consultar, atualizar e excluir informações de veículos. A arquitetura é hexagonal, o que significa que as camadas estão bem definidas e podem ser mantidas e expandidas sem muita dor de cabeça.

---

## Arquitetura e Organização

A API foi construída pensando em modularidade e separação de responsabilidades. Isso significa que cada parte do sistema tem seu lugar e função específicos.

- A **lógica de negócios** é encapsulada na camada de domínio, onde tudo sobre veículos é definido: suas características, como devem ser salvos, recuperados e atualizados.

- A camada de **aplicação** é responsável por orquestrar as operações. É aqui que os casos de uso são implementados, como "criar um novo veículo" ou "buscar veículos com filtros".

- A parte de **infraestrutura** cuida do que está por trás das cortinas. Banco de dados, APIs REST e integrações com o mundo externo são tratados aqui.

- Por fim, as **interfaces** são os pontos de contato da API, responsáveis por validar os dados que entram e retornar as respostas para quem está consumindo o serviço.

---

## Funcionalidades Principais

A API cobre tudo que você esperaria de um sistema de gerenciamento de veículos:

- **CRUD completo**: Criação, consulta, atualização e exclusão (via soft delete, ou seja, o registro não é apagado, apenas marcado como inativo).
- **Pesquisa avançada**: Permite filtrar veículos por marca, modelo ou ano, com suporte a paginação e ordenação.
- **Documentação integrada**: Graças ao Swagger, a API oferece uma interface interativa para explorar e testar endpoints.
- **Validação robusta**: O uso de `class-validator` garante que os dados enviados respeitem as regras esperadas.

---

## Como Usar

Se quiser rodar a aplicação localmente, você vai precisar de **Node.js** (versão 20 ou superior) e **MongoDB**. Depois de configurar o ambiente, siga estes passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/this-rafael/vehicle-crud.git
   cd vehicle-crud/vehicle-backend
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/vehicle_db
   ```

4. Para rodar em desenvolvimento:
   ```bash
   pnpm start:dev
   ```

Se preferir usar Docker, basta rodar:
```bash
docker compose up --build
```

A API estará disponível em [http://localhost:3000/api](http://localhost:3000/api), onde você também encontra a documentação interativa.

---

## Estrutura Interna

A aplicação está organizada em módulos para facilitar a manutenção e futuras expansões. A lógica de negócios está na camada de domínio, e os casos de uso – como criar, atualizar ou buscar veículos – estão na camada de aplicação. Na infraestrutura, você encontrará os repositórios que lidam com o banco de dados e os controladores que gerenciam os endpoints.

---

## Endpoints Importantes

A API oferece os seguintes endpoints principais:

- `POST /vehicles`: Para criar um novo veículo.
- `GET /vehicles/:id`: Recupera as informações de um veículo pelo ID.
- `GET /vehicles`: Lista todos os veículos cadastrados.
- `GET /vehicles/search`: Permite buscar veículos usando filtros.
- `PUT /vehicles/:id`: Atualiza os dados de um veículo.
- `DELETE /vehicles/:id`: Marca um veículo como excluído.

---

## Desenvolvimento e Testes

Para garantir que tudo está funcionando como deveria, você pode executar os testes com:
```bash
pnpm test
```

E para manter o código limpo e bem formatado:
```bash
pnpm lint
pnpm format
```

---

## Extensibilidade

Caso precise adaptar ou expandir o sistema, o design modular da API facilita bastante:

- Quer trocar o banco de dados? Basta substituir o repositório do MongoDB por outro (como PostgreSQL).
- Precisa de uma nova funcionalidade? Adicione um caso de uso na camada de aplicação e expanda o controlador correspondente.
- Precisa de novos filtros na busca? Atualize os critérios de pesquisa e ajuste o DTO correspondente.

---

## Colaboradores

Se você tiver dúvidas ou sugestões, entre em contato:

**Rafael da Silva Pereira**
[dev.rafaelsp@gmail.com](mailto:dev.rafaelsp@gmail.com)