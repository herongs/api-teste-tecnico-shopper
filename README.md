<h1 align="center" style="font-weight: bold;">Teste Técnico de Backend Shopper 💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Vamos Começar</a> • 
  <a href="#routes">API Endpoints</a> •
</p>

<p align="center">
    <b>O cenário proposto foi o desenvolvimento do back-end de um serviço que gerencia a leitura individualizada de 
consumo de água e gás. Utilizando IA de forma a facilitar a coleta da informação, obtendo a medição através da foto de um medidor.</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- Typescript
- NodeJS
- PostgreSQL
- Express
- Docker
  
<h2 id="started">🚀 Vamos Começar</h2>

<h3>Pré-requisitos</h3>

- Docker
- docker-compose

<h3>Clone</h3>

```bash
git clone https://github.com/herongs/api-teste-tecnico-shopper.git
```

<h3>Como rodar o projeto</h2>

Crie o arquivo .env

```yaml
GEMINI_API_KEY={YOUR_GEMINI_API_KEY}
```

Rode no terminal o comando:

```bash
docker-composer up --build
```

<h2 id="routes">📍 API Endpoints</h2>

| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /upload</kbd>     | Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a 
medida lida pela API [request details](#post-upload-detail)
| <kbd>PATCH /confirm</kbd>     | Responsável por confirmar ou corrigir o valor lido pelo LLM [request details](#patch-confirm-detail)
| <kbd>GET /:customer_code/list</kbd>     | Responsável por listar as medidas realizadas por um determinado cliente [response details](#get-list-detail)


<h3 id="post-upload-detail">POST /upload</h3>

**REQUEST**
```json
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER" ou "GAS"
}
```

**RESPONSE**
```json
{
 “image_url”: string,
 “measure_value”:integer,
 “measure_uuid”: string
}
```

<h3 id="patch-confirm-detail">PATCH /confirm</h3>

**REQUEST**
```json
{
 "measure_uuid": "string",
 "confirmed_value": integer
}
```

**RESPONSE**
```json
{
 “success”: true
}
```


<h3 id="get-list-detail">GET /:customer_code/list</h3>

**RESPONSE**
```json
{
 “customer_code”: string,
 “measures”: [
 {
 “measure_uuid”: string,
 “measure_datetime”: datetime,
 “measure_type”: string,
 “has_confirmed”:boolean,
 “image_url”: string
 },
 {
 “measure_uuid”: string,
 “measure_datetime”: datetime,
 “measure_type”: string,
 “has_confirmed”:boolean,
 “image_url”: string
 }
 ]
}
```
