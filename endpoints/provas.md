# Provas 📝

## Listar provas cadastradas
### Request

`GET /exams`

### Response
`Lista de Provas cadastradas`

```json
[
  {
    "id": "exam_id",
    "name": "exam name",
    "description": "exam description",
    "type": "ONLINE" || "OFFLINE",
    "createdAt": "2021-02-05T07:11:45.056Z",
    "updatedAt": "2021-02-05T07:11:45.056Z",
    "questions": [
      {
        "id": "question_id",
        "statement": "question statement",
        "examId": "exam_id",
        "createdAt": "2021-02-05T12:50:54.228Z",
        "updatedAt": "2021-02-05T12:50:54.228Z",
        "options": [
          {
            "id": "option_id",
            "value": "option_value",
            "correct": false || true,
            "createdAt": "2021-02-05T12:50:54.228Z",
            "updatedAt": "2021-02-05T12:50:54.228Z"
          }, ...

        ]
      }, ...
    ]
  }
]
```

## Buscar por uma prova específica
### Request

`GET /exams/:id`

### Response
`Prova com o id indicado`
```json
{
  "id": "exam_id",
  "name": "exam_name",
  "description": "exam_description",
  "type": "ONLINE" || "OFFLINE",
  "createdAt": "2021-02-05T06:50:01.041Z",
  "updatedAt": "2021-02-05T06:50:01.041Z",
  "questions": [...]
}

```
## Cadastrar uma Prova
### Request

 `POST /exams/`
```json
{
	"name":"exam_name",
	"description":"exam_description",
	"type":"ONLINE" || "OFFLINE"
}
```

### Response
`Prova cadastrada`
```json
{
  "name": "exam_name",
  "description": "exam_description",
  "type": "ONLINE",
  "id": "07dafea1-a2bc-4420-805d-9a947d29801a",
  "createdAt": "2021-02-05T14:38:59.338Z",
  "updatedAt": "2021-02-05T14:38:59.338Z"
}
```
 ## Atualizar uma prova
### Request

 `PUT /exams/:id`
```json
{
	"name":"exam_name", // Optional
	"description":"exam_description", // Optional
	"type":"ONLINE" || "OFFLINE" // Optional
}
```

### Response
``` No Body returned for response```

 ## Deletar uma Prova
### Request

 `DELETE /exams/:id`

### Response
``` No Body returned for response```
