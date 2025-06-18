# Garagem Inteligente - Arsenal de Dados

Este projeto é uma aplicação simples que simula um backend Node.js/Express com múltiplos endpoints GET que retornam dados armazenados em arrays, e um frontend que consome esses endpoints para exibir as informações de forma dinâmica e interativa.

## Backend

### Endpoints disponíveis

- `GET /api/garagem/veiculos-destaque`  
  Retorna uma lista dos veículos em destaque na garagem.  
- `GET /api/garagem/veiculos-destaque/:id`  
  Retorna um veículo específico pelo ID.  
- `POST /api/garagem/veiculos-destaque`  
  Cria um novo veículo.  
- `PUT /api/garagem/veiculos-destaque/:id`  
  Atualiza um veículo existente.  
- `DELETE /api/garagem/veiculos-destaque/:id`  
  Deleta um veículo.

- `GET /api/garagem/servicos-oferecidos`  
  Retorna a lista de serviços oferecidos pela garagem.  
- `GET /api/garagem/servicos-oferecidos/:id`  
  Retorna um serviço específico pelo ID.  
- `POST /api/garagem/servicos-oferecidos`  
  Cria um novo serviço.  
- `PUT /api/garagem/servicos-oferecidos/:id`  
  Atualiza um serviço existente.  
- `DELETE /api/garagem/servicos-oferecidos/:id`  
  Deleta um serviço.

- `GET /api/garagem/ferramentas-essenciais`  
  Retorna a lista de ferramentas essenciais para mecânicos e entusiastas.  
- `GET /api/garagem/ferramentas-essenciais/:id`  
  Retorna uma ferramenta específica pelo ID.  
- `POST /api/garagem/ferramentas-essenciais`  
  Cria uma nova ferramenta.  
- `PUT /api/garagem/ferramentas-essenciais/:id`  
  Atualiza uma ferramenta existente.  
- `DELETE /api/garagem/ferramentas-essenciais/:id`  
  Deleta uma ferramenta.

### Configuração do Banco de Dados MySQL

1. Instale o MySQL em sua máquina. Você pode baixar em: https://dev.mysql.com/downloads/

2. Após a instalação, acesse o MySQL via terminal ou cliente gráfico e execute os comandos abaixo para criar o banco e as tabelas:

```sql
CREATE DATABASE garagem_inteligente;

USE garagem_inteligente;

CREATE TABLE veiculos_destaque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    destaque VARCHAR(255),
    imagemUrl VARCHAR(255)
);

CREATE TABLE servicos_garagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    precoEstimado VARCHAR(50)
);

CREATE TABLE ferramentas_essenciais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    utilidade TEXT
);
```

3. Atualize o arquivo `backend/server.js` com as credenciais do seu banco MySQL na variável `dbConfig`.

### Como rodar o backend

1. Navegue até a pasta `backend`:
   ```
   cd backend
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor:
   ```
   node server.js
   ```
4. O servidor estará rodando na porta 3000 por padrão.

## Frontend

O frontend está na pasta `frontend` e consiste em:

- `index.html`: estrutura da página com seções para veículos, serviços e ferramentas.
- `client.js`: script que faz fetch dos dados do backend e atualiza a interface dinamicamente.
- `styles.css`: estilos CSS separados.

### Como usar o frontend

Abra o arquivo `frontend/index.html` em um navegador. A página irá carregar os dados do backend automaticamente e permitirá interatividade, como expandir detalhes, filtro de busca e atualizar os dados manualmente.

## Considerações finais

Este projeto é uma base para entender como criar múltiplos endpoints GET em um backend Node.js/Express integrando com banco de dados MySQL e consumir esses dados em um frontend dinâmico. Pode ser expandido com funcionalidades adicionais, como autenticação, deploy em nuvem, entre outros.
