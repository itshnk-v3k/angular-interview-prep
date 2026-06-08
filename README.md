# Подготовка к Senior Angular Interview

Полный справочник для подготовки к собеседованию на позицию Senior Angular Developer.
Фокус: финтех, торговые платформы, real-time системы.

**Двуязычный интерфейс (EN/RU)** — переключатель языка в шапке (выбор сохраняется). 20 тем.

## Темы

| Раздел | Содержание |
|---|---|
| JavaScript | Объекты, массивы, замыкания, event loop, промисы, прототипы |
| TypeScript | Дженерики, utility-типы, размеченные объединения, декораторы |
| Angular | Жизненный цикл, CD, DI, standalone, формы, маршрутизация, гарды, пайпы, @if/@for/@defer |
| Auth | Вход/выход, JWT access/refresh токены, хранение, интерцептор, тихое обновление с ротацией |
| RxJS | Все операторы с определениями, Subject'ы, pipe(), утечки памяти |
| NgRx | Store, actions, reducers, effects, selectors, signal store |
| Signals | signal, computed, effect, toSignal, input, model |
| Платформа | WebSocket, Canvas, ServiceWorker, WebWorker |
| HTTP | Все методы, интерцепторы, обработка ошибок |
| Архитектура | MVVM, паттерны GoF, ООП, SOLID, DRY, KISS, YAGNI |
| Практика | Задачи на live coding + общение с клиентом |
| Шпаргалка | Быстрый справочник для повторения перед собеседованием |

## Использование

Откройте `index.html` в любом браузере. Сборка не требуется.

## Развёртывание на GitHub Pages

1. Запушьте проект в репозиторий GitHub
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`
3. Сайт будет доступен по адресу `https://[username].github.io/[repo-name]`

## Возможности

- Двуязычный интерфейс EN/RU с переключателем (сохраняется в localStorage)
- Тёмная тема (оранжевый акцент) — единственная тема сайта
- Отслеживание прогресса (отметка пройденных тем)
- Поиск по странице
- Интерактивные вопросы и ответы с раскрытием
- Тесты с мгновенной проверкой
- Кнопка «Копировать» на всех блоках кода
- Шпаргалка, удобная для печати
- Адаптивная вёрстка (мобильные устройства)

## Структура проекта

```
/
├── index.html              Главная / дашборд
├── styles/main.css         Глобальная дизайн-система (тёмная оранжевая тема)
├── js/app.js               Вся интерактивная логика
├── pages/                  18 страниц по темам
│   ├── js-core.html        typescript.html       angular-core.html
│   ├── signals.html        di.html               forms.html
│   ├── routing.html        rxjs.html             ngrx.html
│   ├── websocket.html      canvas.html           workers.html
│   ├── http.html           architecture.html     solid-dry.html
│   ├── live-coding.html    communication.html    cheatsheet.html
└── README.md
```

Без фреймворков, сборщиков, npm и сервера. Чистый HTML + CSS + ванильный JS.
Подсветка синтаксиса — highlight.js с CDN (тема github-dark).
