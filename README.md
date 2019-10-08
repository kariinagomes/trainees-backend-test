## Instruções para rodar o projeto:

### Pré requisitos:
  - nodejs
  - npm
  - docker e docker-compose

### Ambiente de desenvolvimento:
  - Clonar esse repositório
  - Acessar a pasta backend-nodejs-corujao:  
    ```
    cd teste-backend/backend-nodejs-corujao
    ```
  - Instalar dependências:  
    ```
    npm install ou yarn install
    ```
  - Construir as imagens descritas no docker compose (nodejs and mongodb):  
    ```
    docker-compose build
    ```    
  - Criar e iniciar os containers (nodejs and mongodb):    
    ```
    docker-compose up -d
    ```    
  - Executar os testes:  
    ```
    npm test ou yarn test
    ```
    
#### Dependências instaladas:

  - Dependências: 
    - express
    - mongoose
    - dotenv

  - Dependências de desenvolvimento:
    - nodemon    
    - mocha
    - chai
    - chai-http
    
___

# Sciensa: Teste de desenvolvedor back-end

Neste teste, avaliaremos a sua capacidade de implementar corretamente uma API REST.
  - Faça um fork desse repositório
  - Implemente a API documentada no arquivo `api.yml`, presente na raiz deste repositório
  - Use o repositório de dados de sua preferência (mongo, redis, mysql, mssql etc)
  - Forneça acesso de leitura do seu fork para o avaliador da Sciensa

# Diferenciais que levaremos em consideração ao avaliar o seu teste!
  - Cobertura de testes
  - Automação (imagem de docker e ambiente local containerizado com docker-compose)
  - Estrutura do projeto
  - Qualidade de código

Boa sorte!  
#vamosjuntos