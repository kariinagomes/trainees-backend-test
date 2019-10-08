## Instructions to run the project:

### Requirements:
  - nodejs
  - npm

### Development environment:
  - Clone this repository
  - Access backend-nodejs-corujao folder:  
    ```
    cd teste-backend/backend-nodejs-corujao
    ```
  
  - Install dependencies:  
    ```
    npm install or yarn install
    ```
    
  - Build containers (nodejs and mongodb):  
    ```
    docker-compose build
    ```    
  - Create and start containers (nodejs and mongodb):    
    ```
    docker-compose up
    ```    
  - Run the project:  
    ```
    npm start or yarn start
    ```    
  - Or run the project using nodemon:  
    ```
    npm dev or yarn dev
    ```    
  - Execute tests:  
    ```
    npm test or yarn test
    ```
    
#### Libraries installed:

  - Dependencies: 
    - express
    - mongoose
    - dotenv

  - Dev dependencies:
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