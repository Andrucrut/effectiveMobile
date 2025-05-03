# Проект по управлению запросами

Этот проект представляет собой сервис для управления запросами, где можно создавать запросы, изменять их статус (в процессе, завершен, отменен), а также фильтровать запросы по датам. В проекте используется Express.js для серверной части и TypeORM для работы с базой данных.

## Структура проекта

```bash
.
├── src
│   ├── controllers         # Контроллеры для обработки запросов
│   ├── entities            # Сущности TypeORM для работы с базой данных
│   ├── routes              # Маршруты Express
│   ├── services            # Логика работы с запросами
│   └── config              # Конфигурации, включая подключение к базе данных
├── Dockerfile              # Dockerfile для сборки образа приложения
├── docker-compose.yml      # Настройки Docker для базы данных и приложения
├── .env                    # Переменные окружения
├── package.json            # Зависимости и скрипты для приложения
└── README.md               # Документация проекта
```

Для запуска проекта - docker-compose up --build

## Описание запросов

GET http://localhost:3000/requests - получние всего

POST http://localhost:3000/requests - создание
тело
```json
{
  "subject": "Проблема с интернетом",
  "description": "Wi-Fi не работает второй день"
}
```

PATCH http://localhost:3000/requests/3/take - взятие в работу

PATCH http://localhost:3000/requests/1/complete - завершение запроса
тело
```json
{
  "resolutionText": "Проблема решена. Сайт теперь загружается."
}
```

PATCH http://localhost:3000/requests/1/cancel - отмена запроса
тело
```json
{
  "cancellationReason": "Пользователь не подтвердил проблему."
}
```

GET http://localhost:3000/requests?startDate=2025-05-01&endDate=2025-05-02
Возвращает список запросов, созданных в указанном диапазоне дат

PATCH http://localhost:3000/requests/cancel/in-progress
Отменяет все запросы, находящиеся в статусе "IN_PROGRESS"
