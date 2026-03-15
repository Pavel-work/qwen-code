# QWEN.md — Контекст проекта

## Обзор проекта

**qwen-code** — это веб-приложение на базе **Next.js 16** с использованием **React 19** и **TypeScript**. Проект настроен для современной разработки с поддержкой TypeScript и использует App Router (директория `app/`).

### Основные технологии

| Технология | Версия |
|------------|--------|
| Next.js | ^16.1.6 |
| React | ^19.2.4 |
| React DOM | ^19.2.4 |
| TypeScript | 5.9.3 |
| @types/node | 25.5.0 |
| @types/react | 19.2.14 |

### Структура проекта

```
D:\cursor_project\qwen-code\
├── app/                    # Next.js App Router (основной код приложения)
│   ├── globals.css         # Глобальные стили
│   ├── layout.tsx          # Корневой layout (lang="ru")
│   └── page.tsx            # Главная страница
├── src/                    # Пустая директория для исходного кода
├── .next/                  # Build-директория Next.js (автогенерируемая)
├── node_modules/           # Зависимости npm
├── next.config.js          # Конфигурация Next.js
├── next-env.d.ts           # TypeScript-типы для Next.js
├── package.json            # Зависимости и скрипты
├── package-lock.json       # Locked-версии зависимостей
└── tsconfig.json           # Конфигурация TypeScript
```

## Сборка и запуск

### Команды npm

```bash
# Запуск dev-сервера (localhost:3000)
npm run dev

# Сборка для production
npm run build

# Запуск production-сервера
npm run start

# Запуск линтера
npm run lint
```

### Требования

- Node.js (версия, совместимая с Next.js 16)
- npm или другой пакетный менеджер

### Быстрый старт

```bash
# Установка зависимостей (если еще не установлены)
npm install

# Запуск в режиме разработки
npm run dev
```

## Конфигурация TypeScript

Проект использует следующую конфигурацию (`tsconfig.json`):

- **Target:** ES2017
- **Module:** ESNext
- **Module Resolution:** Node
- **JSX:** react-jsx
- **Strict mode:** отключён (`strict: false`)
- **No emit:** включён (Next.js компилирует самостоятельно)

Поддерживаемые расширения: `.ts`, `.tsx`, `.mts`

## Конвенции разработки

### Язык

- **HTML lang:** `ru` (указано в `app/layout.tsx`)
- Контент по умолчанию на русском языке

### Стилевой подход

- Минималистичные глобальные стили в `globals.css`
- Сброс margin/padding для всех элементов
- Системные шрифты (`system-ui`, `-apple-system`)
- Box-sizing: `border-box`

### Архитектурные паттерны

- **App Router:** используется директория `app/` вместо `pages/`
- **Server Components:** по умолчанию компоненты являются серверными
- **TypeScript:** предпочтительный язык разработки

### Структура исходного кода

- `app/` — страницы и layout'ы Next.js
- `src/` — зарезервирована для дополнительного исходного кода (компоненты, утилиты, хуки)

## Расширение проекта

### Рекомендуемая организация `src/`

```
src/
├── components/     # Переиспользуемые React-компоненты
├── hooks/          # Кастомные React-хуки
├── utils/          # Вспомогательные функции
├── types/          # TypeScript-типы и интерфейсы
└── lib/            # Конфигурации и утилиты
```

### Добавление новых страниц

Создавайте директории в `app/` для новых маршрутов:

```
app/
├── about/
│   └── page.tsx      # /about
├── blog/
│   └── page.tsx      # /blog
└── contact/
    └── page.tsx      # /contact
```

## Примечания

- `next.config.js` минималистичен — можно добавлять плагины и конфигурацию по мере необходимости
- `src/` директория пуста — готова для заполнения компонентами и модулями
- Проект использует ESM (`"type": "module"` в package.json)
