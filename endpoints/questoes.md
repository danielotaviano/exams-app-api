# Questões ✅

## Listar questões de uma Prova
### Request

`GET /questions`

```json
{
	"examId": "exam_id"
}
```

### Response
`Lista de Questões da Prova indicada`
`Obs: Retorna as questões e as opções das questões em ordem aleatória`

```json
[
  {
    "id": "question_id",
    "statement": "question_statement",
    "examId": "exam_id",
    "createdAt": "2021-02-05T12:51:52.866Z",
    "updatedAt": "2021-02-05T12:51:52.866Z",
    "options": [
      {
        "id": "option_id",
        "value": "option_value",
        "correct": false || true,
        "createdAt": "2021-02-05T12:51:52.866Z",
        "updatedAt": "2021-02-05T12:51:52.866Z",
        "key": "a"
      }, ...
    ]
  }...
]
```


## Buscar por uma questão específica
#### Request

`GET /questions/:id`

### Response
`Questão com o id indicado`
`Obs: o parâmetro "key" é um campo virtual que não persiste no banco de dados, só é gerado ao buscar as questões de uma determinada prova.`
```json
{
    "id": "question_id",
    "statement": "question_statement",
    "examId": "exam_id",
    "createdAt": "2021-02-05T12:51:52.866Z",
    "updatedAt": "2021-02-05T12:51:52.866Z",
    "options": [
      {
        "id": "option_id",
        "value": "option_value",
        "correct": false || true,
        "createdAt": "2021-02-05T12:51:52.866Z",
        "updatedAt": "2021-02-05T12:51:52.866Z",
      }, ...
    ]
}

```
## Cadastrar uma Questão
### Request

 `POST /questions`
 `Obs: Para cadastrar uma questão, tem que existir pelo menos uma opção correta e 		não pode ter mais de uma opção com o mesmo value`
```json
{
   "examId":"exam_id",
   "statement":"question_statement",
   "options":[
      {
         "value":"option_value",
         "correct":false || true
      }, ...
   ]
}
```

### Response
`Questão cadastrada`

```json
{
   "examId":"exam_id",
   "statement":"question_statement",
   "options":[
      {
         "value":"option_value",
         "correct":false || true,
         "id":"option_id",
         "createdAt":"2021-02-05T12:51:52.866Z",
         "updatedAt":"2021-02-05T12:51:52.866Z"
      } ...
   ],
   "id":"question_id",
   "createdAt":"2021-02-05T12:51:52.866Z",
   "updatedAt":"2021-02-05T12:51:52.866Z"
}
```
 ## Atualizar uma Questão
### Request

 `PUT /questions/:id`
 `Obs: Você pode atualizar a opção de uma questão fornecendo obrigatoriamente o id da opção.`
```json
{
   "name":"question_name", // Optional
   "options":[
      {
         "id":"option_id",
         "value":"exam_value", // Optional
         "correct":"true || false" // Optional
      }
   ] // Optional
}
```

### Response
``` No Body returned for response```

 ## Deletar uma Questão
### Request

 `DELETE /questions/:id`

### Response
``` No Body returned for response```
