\`\`\`markdown

\# GarageOS --- Поэтапный План Разработки

\> \*\*Версия:\*\* 2.0

\> \*\*Формат:\*\* Step-by-Step Development Guide

\> \*\*Подход:\*\* Incremental Development с проверкой после каждого
шага

\> \*\*Дата создания:\*\* 2024

\-\--

\## 📋 Как использовать этот план

\| \# \| Правило \|

\|\-\--\|\-\-\-\-\-\-\-\--\|

\| 1 \| Выполняй шаги \*\*последовательно\*\* \|

\| 2 \| После каждого шага \*\*проверяй терминал\*\* на ошибки \|

\| 3 \| \*\*Тестируй\*\* функциональность перед переходом к следующему
шагу \|

\| 4 \| Если есть ошибки --- \*\*исправляй\*\* перед продолжением \|

\| 5 \| Отмечай выполненные шаги ✅ \|

\-\--

\## Полная карта этапов

\| Этап \| Название \| Время \|

\|\-\-\-\-\--\|\-\-\-\-\-\-\-\-\--\|\-\-\-\-\-\--\|

\| 0 \| Подготовка \| 30 мин \|

\| 1 \| Настройка Supabase \| 1 час \|

\| 2 \| Аутентификация \| 1.5 часа \|

\| 3 \| Базовый UI и Навигация \| 2 часа \|

\| 4 \| Контейнеры --- CRUD \| 3 часа \|

\| 5 \| Страница Контейнера и Вещи \| 4 часа \|

\| 6 \| QR Сканер \| 2 часа \|

\| 7 \| Глобальный Поиск \| 2 часа \|

\| 8 \| PWA и Оптимизация \| 2 часа \|

\| 9 \| Финальные штрихи (база) \| 1 час \|

\| \*\*10\*\* \| \*\*Категории вещей\*\* \| \*\*3 часа\*\* \|

\| \*\*11\*\* \| \*\*Редактирование вещей\*\* \| \*\*2.5 часа\*\* \|

\| \*\*12\*\* \| \*\*Уведомления о заканчивающихся вещах\*\* \| \*\*3
часа\*\* \|

\| \*\*13\*\* \| \*\*Оффлайн-режим и синхронизация\*\* \| \*\*5
часов\*\* \|

\-\--

\-\--

\# ЭТАП 0: Подготовка

\> ⏱ Ориентировочное время: \*\*30 минут\*\*

\-\--

\## Шаг 0.1 --- Инициализация Next.js проекта

\`\`\`bash

npx create-next-app@latest garage-os \--typescript \--tailwind \--app

cd garage-os

\`\`\`

\### ✅ Проверка

\- \[ \] Проект создан без ошибок

\- \[ \] \`npm run dev\` запускается без ошибок

\- \[ \] Открывается \`http://localhost:3000\` с приветственной
страницей Next.js

\-\--

\## Шаг 0.2 --- Установка базовых зависимостей

\`\`\`bash

npm install \\

\@supabase/supabase-js \\

\@tanstack/react-query \\

framer-motion \\

lucide-react \\

html5-qrcode \\

qrcode.react \\

react-hook-form \\

zod \\

\@hookform/resolvers \\

next-pwa \\

sonner \\

\@supabase/auth-helpers-nextjs \\

idb-keyval \\

use-debounce

\`\`\`

\> \*\*Новые зависимости (v2.0):\*\*

\> - \`idb-keyval\` --- для оффлайн-хранения в IndexedDB

\> - \`use-debounce\` --- для debounce поиска и уведомлений

\### ✅ Проверка

\- \[ \] Все пакеты установились без ошибок

\- \[ \] В \`package.json\` появились новые зависимости

\- \[ \] \`npm run dev\` работает после установки

\-\--

\## Шаг 0.3 --- Настройка Shadcn/UI

\`\`\`bash

npx shadcn@latest init

\`\`\`

Выбери при инициализации:

\| Параметр \| Значение \|

\|\-\-\-\-\-\-\-\-\--\|\-\-\-\-\-\-\-\-\--\|

\| Style \| Default \|

\| Base color \| Zinc \|

\| CSS variables \| Yes \|

Затем установи компоненты:

\`\`\`bash

npx shadcn@latest add \\

button card input dialog label textarea \\

skeleton toast progress avatar dropdown-menu \\

select badge tabs alert switch popover

\`\`\`

\> \*\*Новые компоненты (v2.0):\*\* \`select\`, \`badge\`, \`tabs\`,
\`alert\`, \`switch\`, \`popover\`

\### ✅ Проверка

\- \[ \] Создан файл \`components.json\`

\- \[ \] В папке \`components/ui\` появились компоненты

\- \[ \] Приложение запускается без ошибок

\-\--

\## Шаг 0.4 --- Создание структуры папок

Создай следующую структуру:

\`\`\`

/app

/(auth)/login/page.tsx

/(protected)/page.tsx

/(protected)/container/\[id\]/page.tsx

/(protected)/search/page.tsx

/(protected)/scanner/page.tsx

/(protected)/settings/page.tsx

/(protected)/categories/page.tsx ← НОВОЕ

/(protected)/notifications/page.tsx ← НОВОЕ

/(protected)/layout.tsx

/api/upload/route.ts

/api/notifications/check/route.ts ← НОВОЕ

layout.tsx

globals.css

/components

/ui ← от shadcn

/items

ItemCard.tsx

ItemForm.tsx

ItemEditForm.tsx ← НОВОЕ

ItemList.tsx

/containers

ContainerCard.tsx

ContainerList.tsx

ContainerForm.tsx

QRCodeDisplay.tsx

/categories ← НОВОЕ

CategoryBadge.tsx

CategorySelect.tsx

CategoryForm.tsx

CategoryList.tsx

/scanner

QRScanner.tsx

/notifications ← НОВОЕ

NotificationBell.tsx

NotificationList.tsx

LowStockAlert.tsx

/layout

BottomNav.tsx

Header.tsx

/providers

AuthProvider.tsx

QueryProvider.tsx

OfflineProvider.tsx ← НОВОЕ

NotificationProvider.tsx ← НОВОЕ

/lib

supabase.ts

utils.ts

types.ts

offline-store.ts ← НОВОЕ

sync-manager.ts ← НОВОЕ

notification-manager.ts ← НОВОЕ

/hooks

use-items.ts

use-containers.ts

use-categories.ts ← НОВОЕ

use-offline.ts ← НОВОЕ

use-notifications.ts ← НОВОЕ

use-online-status.ts ← НОВОЕ

/public

/icons

icon-192x192.png

icon-512x512.png

sw.js ← НОВОЕ (service worker)

\`\`\`

\### ✅ Проверка

\- \[ \] Все папки созданы

\- \[ \] Нет ошибок в терминале

\- \[ \] Структура соответствует плану

\-\--

\-\--

\# ЭТАП 1: Настройка Supabase

\> ⏱ Ориентировочное время: \*\*1 час\*\*

\-\--

\## Шаг 1.1 --- Создание проекта в Supabase

1\. Зайди на \[supabase.com\](https://supabase.com)

2\. Создай новый проект \*\*\"GarageOS\"\*\*

3\. Сохрани:

\- \`Project URL\`

\- \`Anon / Public Key\`

\### ✅ Проверка

\- \[ \] Проект создан

\- \[ \] Ключи скопированы

\-\--

\## Шаг 1.2 --- Создание таблиц в Supabase

В \*\*Supabase Dashboard → SQL Editor\*\* выполни:

\`\`\`sql

\-- =============================================

\-- ТАБЛИЦА ПРОФИЛЕЙ

\-- =============================================

CREATE TABLE profiles (

id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,

email TEXT,

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now())

);

\-- =============================================

\-- ТАБЛИЦА КАТЕГОРИЙ (НОВОЕ v2.0)

\-- =============================================

CREATE TABLE categories (

id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

name TEXT NOT NULL,

color TEXT DEFAULT \'#f97316\',

icon TEXT DEFAULT \'tag\',

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now()),

UNIQUE(user_id, name)

);

\-- =============================================

\-- ТАБЛИЦА КОНТЕЙНЕРОВ

\-- =============================================

CREATE TABLE containers (

id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

name TEXT NOT NULL,

description TEXT,

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now())

);

\-- =============================================

\-- ТАБЛИЦА ВЕЩЕЙ (ОБНОВЛЕНО v2.0)

\-- =============================================

CREATE TABLE items (

id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

container_id UUID REFERENCES containers(id) ON DELETE CASCADE NOT NULL,

user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

name TEXT NOT NULL,

description TEXT,

quantity INTEGER DEFAULT 1,

min_quantity INTEGER DEFAULT 0,

image_url TEXT,

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now()),

updated_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now())

);

\-- =============================================

\-- ТАБЛИЦА УВЕДОМЛЕНИЙ (НОВОЕ v2.0)

\-- =============================================

CREATE TABLE notifications (

id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

item_id UUID REFERENCES items(id) ON DELETE CASCADE NOT NULL,

type TEXT NOT NULL DEFAULT \'low_stock\',

message TEXT NOT NULL,

is_read BOOLEAN DEFAULT false,

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now())

);

\-- =============================================

\-- ТАБЛИЦА ОФФЛАЙН-ОПЕРАЦИЙ (НОВОЕ v2.0)

\-- =============================================

CREATE TABLE pending_operations (

id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

operation TEXT NOT NULL,

table_name TEXT NOT NULL,

record_id UUID,

payload JSONB NOT NULL,

status TEXT DEFAULT \'pending\',

created_at TIMESTAMPTZ DEFAULT timezone(\'utc\'::text, now()),

synced_at TIMESTAMPTZ

);

\-- =============================================

\-- RLS POLICIES

\-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE containers ENABLE ROW LEVEL SECURITY;

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE pending_operations ENABLE ROW LEVEL SECURITY;

\-- profiles

CREATE POLICY \"Users can view own profile\"

ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY \"Users can insert own profile\"

ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

\-- categories

CREATE POLICY \"Users can view own categories\"

ON categories FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own categories\"

ON categories FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Users can update own categories\"

ON categories FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY \"Users can delete own categories\"

ON categories FOR DELETE USING (auth.uid() = user_id);

\-- containers

CREATE POLICY \"Users can view own containers\"

ON containers FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own containers\"

ON containers FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Users can update own containers\"

ON containers FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY \"Users can delete own containers\"

ON containers FOR DELETE USING (auth.uid() = user_id);

\-- items

CREATE POLICY \"Users can view own items\"

ON items FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own items\"

ON items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Users can update own items\"

ON items FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY \"Users can delete own items\"

ON items FOR DELETE USING (auth.uid() = user_id);

\-- notifications

CREATE POLICY \"Users can view own notifications\"

ON notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own notifications\"

ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Users can update own notifications\"

ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY \"Users can delete own notifications\"

ON notifications FOR DELETE USING (auth.uid() = user_id);

\-- pending_operations

CREATE POLICY \"Users can manage own pending ops\"

ON pending_operations FOR ALL USING (auth.uid() = user_id);

\-- =============================================

\-- TRIGGERS

\-- =============================================

\-- Auto-update updated_at

CREATE OR REPLACE FUNCTION update_updated_at_column()

RETURNS TRIGGER AS \$\$

BEGIN

NEW.updated_at = now();

RETURN NEW;

END;

\$\$ LANGUAGE plpgsql;

CREATE TRIGGER update_items_updated_at

BEFORE UPDATE ON items

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();

\-- =============================================

\-- ФУНКЦИЯ: Проверка low stock (НОВОЕ v2.0)

\-- =============================================

CREATE OR REPLACE FUNCTION check_low_stock()

RETURNS TRIGGER AS \$\$

BEGIN

IF NEW.quantity \<= NEW.min_quantity AND NEW.min_quantity \> 0 THEN

\-- Проверяем нет ли уже непрочитанного уведомления

IF NOT EXISTS (

SELECT 1 FROM notifications

WHERE item_id = NEW.id

AND user_id = NEW.user_id

AND is_read = false

AND type = \'low_stock\'

) THEN

INSERT INTO notifications (user_id, item_id, type, message)

VALUES (

NEW.user_id,

NEW.id,

\'low_stock\',

format(\'⚠️ \"%s\" заканчивается! Осталось: %s (минимум: %s)\',

NEW.name, NEW.quantity, NEW.min_quantity)

);

END IF;

END IF;

RETURN NEW;

END;

\$\$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_low_stock

AFTER UPDATE OF quantity ON items

FOR EACH ROW

EXECUTE FUNCTION check_low_stock();

\-- Также проверяем при вставке

CREATE TRIGGER trigger_check_low_stock_insert

AFTER INSERT ON items

FOR EACH ROW

EXECUTE FUNCTION check_low_stock();

\-- =============================================

\-- ПРЕДУСТАНОВЛЕННЫЕ КАТЕГОРИИ

\-- =============================================

\-- (будут добавлены при первом входе пользователя через код)

\`\`\`

\### ✅ Проверка

\- \[ \] Все таблицы созданы (profiles, categories, containers, items,
notifications, pending_operations)

\- \[ \] RLS политики активны

\- \[ \] Триггеры созданы (updated_at, low_stock)

\- \[ \] Нет ошибок в SQL Editor

\-\--

\## Шаг 1.3 --- Создание Storage Bucket

В \*\*Supabase Dashboard → Storage\*\*:

1\. Создай новый bucket: \`item-photos\`

2\. Сделай его \*\*public\*\*

3\. Добавь policy для публичного чтения

\### ✅ Проверка

\- \[ \] Bucket создан

\- \[ \] Bucket public

\- \[ \] Можно загрузить тестовое фото

\-\--

\## Шаг 1.4 --- Настройка переменных окружения

Создай файл \`.env.local\` в корне проекта:

\`\`\`env

NEXT_PUBLIC_SUPABASE_URL=your_project_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

\`\`\`

\### ✅ Проверка

\- \[ \] Файл \`.env.local\` создан

\- \[ \] Переменные заполнены реальными значениями

\- \[ \] Перезапустил \`npm run dev\`

\-\--

\## Шаг 1.5 --- Создание Supabase клиента

Создай файл \`/lib/supabase.ts\`:

\`\`\`typescript

import { createClient } from \'@supabase/supabase-js\'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] Нет ошибок TypeScript

\- \[ \] Приложение запускается

\-\--

\## Шаг 1.6 --- Создание типов (ОБНОВЛЕНО v2.0)

Создай файл \`/lib/types.ts\`:

\`\`\`typescript

export interface Profile {

id: string

email: string \| null

created_at: string

}

export interface Category {

id: string

user_id: string

name: string

color: string

icon: string

created_at: string

}

export interface Container {

id: string

user_id: string

name: string

description: string \| null

created_at: string

}

export interface Item {

id: string

container_id: string

user_id: string

category_id: string \| null

name: string

description: string \| null

quantity: number

min_quantity: number

image_url: string \| null

created_at: string

updated_at: string

}

export interface ItemWithRelations extends Item {

container?: Container

category?: Category \| null

}

export interface Notification {

id: string

user_id: string

item_id: string

type: \'low_stock\' \| \'info\'

message: string

is_read: boolean

created_at: string

item?: Item

}

export interface PendingOperation {

id: string

user_id: string

operation: \'insert\' \| \'update\' \| \'delete\'

table_name: string

record_id: string \| null

payload: Record\<string, unknown\>

status: \'pending\' \| \'synced\' \| \'failed\'

created_at: string

synced_at: string \| null

}

// Предустановленные категории

export const DEFAULT_CATEGORIES: Omit\<Category, \'id\' \| \'user_id\'
\| \'created_at\'\>\[\] = \[

{ name: \'Инструменты\', color: \'#f97316\', icon: \'wrench\' },

{ name: \'Крепёж\', color: \'#3b82f6\', icon: \'nail\' },

{ name: \'Электрика\', color: \'#eab308\', icon: \'zap\' },

{ name: \'Сантехника\', color: \'#06b6d4\', icon: \'droplets\' },

{ name: \'Расходники\', color: \'#8b5cf6\', icon: \'package\' },

{ name: \'Автозапчасти\', color: \'#ef4444\', icon: \'car\' },

{ name: \'Садовый инвентарь\', color: \'#22c55e\', icon: \'trees\' },

{ name: \'Разное\', color: \'#6b7280\', icon: \'box\' },

\]

// Цвета для выбора категории

export const CATEGORY_COLORS = \[

\'#f97316\', \'#ef4444\', \'#eab308\', \'#22c55e\',

\'#3b82f6\', \'#8b5cf6\', \'#06b6d4\', \'#ec4899\',

\'#6b7280\', \'#d946ef\',

\]

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] Нет ошибок TypeScript

\- \[ \] Все новые типы определены

\-\--

\-\--

\# ЭТАП 2: Аутентификация

\> ⏱ Ориентировочное время: \*\*1.5 часа\*\*

\-\--

\## Шаг 2.1 --- Auth Provider

Создай \`/components/providers/AuthProvider.tsx\`:

\`\`\`typescript

\'use client\'

import { createContext, useContext, useEffect, useState } from \'react\'

import { User } from \'@supabase/supabase-js\'

import { supabase } from \'@/lib/supabase\'

import { DEFAULT_CATEGORIES } from \'@/lib/types\'

interface AuthContextType {

user: User \| null

loading: boolean

}

const AuthContext = createContext\<AuthContextType\>({

user: null,

loading: true,

})

export function AuthProvider({ children }: { children: React.ReactNode
}) {

const \[user, setUser\] = useState\<User \| null\>(null)

const \[loading, setLoading\] = useState(true)

// Создаём предустановленные категории для нового пользователя

const initializeUserData = async (userId: string) =\> {

// Проверяем есть ли уже категории

const { data: existing } = await supabase

.from(\'categories\')

.select(\'id\')

.eq(\'user_id\', userId)

.limit(1)

if (!existing \|\| existing.length === 0) {

const categories = DEFAULT_CATEGORIES.map((cat) =\> ({

\...cat,

user_id: userId,

}))

await supabase.from(\'categories\').insert(categories)

}

}

useEffect(() =\> {

supabase.auth.getSession().then(({ data: { session } }) =\> {

setUser(session?.user ?? null)

if (session?.user) {

initializeUserData(session.user.id)

}

setLoading(false)

})

const {

data: { subscription },

} = supabase.auth.onAuthStateChange((\_event, session) =\> {

setUser(session?.user ?? null)

if (session?.user) {

initializeUserData(session.user.id)

}

setLoading(false)

})

return () =\> subscription.unsubscribe()

}, \[\])

return (

\<AuthContext.Provider value={{ user, loading }}\>

{children}

\</AuthContext.Provider\>

)

}

export const useAuth = () =\> useContext(AuthContext)

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] При первом входе создаются категории по умолчанию

\- \[ \] Нет ошибок TypeScript

\-\--

\## Шаг 2.2 --- Query Provider

Создай \`/components/providers/QueryProvider.tsx\`:

\`\`\`typescript

\'use client\'

import { QueryClient, QueryClientProvider } from
\'@tanstack/react-query\'

import { useState } from \'react\'

export function QueryProvider({ children }: { children: React.ReactNode
}) {

const \[queryClient\] = useState(

() =\>

new QueryClient({

defaultOptions: {

queries: {

staleTime: 1000 \* 60 \* 5, // 5 минут

gcTime: 1000 \* 60 \* 30, // 30 минут (для оффлайн)

},

},

})

)

return (

\<QueryClientProvider client={queryClient}\>

{children}

\</QueryClientProvider\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] staleTime и gcTime настроены

\-\--

\## Шаг 2.3 --- Обновление root layout

Обнови \`/app/layout.tsx\`:

\`\`\`typescript

import type { Metadata } from \'next\'

import { Inter } from \'next/font/google\'

import \'./globals.css\'

import { AuthProvider } from \'@/components/providers/AuthProvider\'

import { QueryProvider } from \'@/components/providers/QueryProvider\'

import { OfflineProvider } from
\'@/components/providers/OfflineProvider\'

import { NotificationProvider } from
\'@/components/providers/NotificationProvider\'

import { Toaster } from \'sonner\'

const inter = Inter({ subsets: \[\'latin\', \'cyrillic\'\] })

export const metadata: Metadata = {

title: \'GarageOS\',

description: \'Система управления гаражом\',

manifest: \'/manifest.json\',

}

export default function RootLayout({

children,

}: {

children: React.ReactNode

}) {

return (

\<html lang=\"ru\"\>

\<body className={inter.className}\>

\<AuthProvider\>

\<QueryProvider\>

\<OfflineProvider\>

\<NotificationProvider\>

{children}

\<Toaster position=\"top-center\" /\>

\</NotificationProvider\>

\</OfflineProvider\>

\</QueryProvider\>

\</AuthProvider\>

\</body\>

\</html\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Layout обновлён

\- \[ \] Все провайдеры добавлены

\- \[ \] Приложение запускается (OfflineProvider и NotificationProvider
создадим позже --- пока заглушки)

\-\--

\## Шаг 2.4 --- Страница логина

Создай \`/app/(auth)/login/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import { supabase } from \'@/lib/supabase\'

import { Button } from \'@/components/ui/button\'

import { Input } from \'@/components/ui/input\'

import { Label } from \'@/components/ui/label\'

import {

Card,

CardContent,

CardDescription,

CardHeader,

CardTitle,

} from \'@/components/ui/card\'

import { toast } from \'sonner\'

export default function LoginPage() {

const \[email, setEmail\] = useState(\'\')

const \[loading, setLoading\] = useState(false)

const handleLogin = async (e: React.FormEvent) =\> {

e.preventDefault()

setLoading(true)

const { error } = await supabase.auth.signInWithOtp({ email })

if (error) {

toast.error(error.message)

} else {

toast.success(\'Проверьте email для входа\')

}

setLoading(false)

}

return (

\<div className=\"min-h-screen flex items-center justify-center p-4
bg-zinc-950\"\>

\<Card className=\"w-full max-w-md bg-zinc-900 border-zinc-800\"\>

\<CardHeader\>

\<CardTitle className=\"text-orange-500\"\>GarageOS\</CardTitle\>

\<CardDescription\>Введите email для входа\</CardDescription\>

\</CardHeader\>

\<CardContent\>

\<form onSubmit={handleLogin} className=\"space-y-4\"\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"email\"\>Email\</Label\>

\<Input

id=\"email\"

type=\"email\"

placeholder=\"you@example.com\"

value={email}

onChange={(e) =\> setEmail(e.target.value)}

className=\"bg-zinc-800 border-zinc-700\"

required

/\>

\</div\>

\<Button

type=\"submit\"

className=\"w-full bg-orange-500 hover:bg-orange-600\"

disabled={loading}

\>

{loading ? \'Отправка\...\' : \'Войти\'}

\</Button\>

\</form\>

\</CardContent\>

\</Card\>

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Страница создана

\- \[ \] Форма отображается

\- \[ \] При отправке приходит email

\-\--

\## Шаг 2.5 --- Middleware для защиты роутов

Создай \`/middleware.ts\` \*\*в корне проекта\*\*:

\`\`\`typescript

import { createMiddlewareClient } from \'@supabase/auth-helpers-nextjs\'

import { NextResponse } from \'next/server\'

import type { NextRequest } from \'next/server\'

export async function middleware(req: NextRequest) {

const res = NextResponse.next()

const supabase = createMiddlewareClient({ req, res })

const {

data: { session },

} = await supabase.auth.getSession()

if (!session && req.nextUrl.pathname !== \'/login\') {

return NextResponse.redirect(new URL(\'/login\', req.url))

}

if (session && req.nextUrl.pathname === \'/login\') {

return NextResponse.redirect(new URL(\'/\', req.url))

}

return res

}

export const config = {

matcher:
\[\'/((?!api\|\_next/static\|\_next/image\|favicon.ico\|manifest.json\|icons\|sw.js).\*)\'\],

}

\`\`\`

\### ✅ Проверка

\- \[ \] Middleware создан

\- \[ \] Без авторизации --- редирект на \`/login\`

\- \[ \] sw.js и manifest.json доступны без авторизации

\-\--

\-\--

\# ЭТАП 3: Базовый UI и Навигация

\> ⏱ Ориентировочное время: \*\*2 часа\*\*

\-\--

\## Шаг 3.1 --- Bottom Navigation (ОБНОВЛЕНО v2.0)

Создай \`/components/layout/BottomNav.tsx\`:

\`\`\`typescript

\'use client\'

import Link from \'next/link\'

import { usePathname } from \'next/navigation\'

import { Home, Search, ScanLine, Settings, Bell } from \'lucide-react\'

import { cn } from \'@/lib/utils\'

import { useNotifications } from \'@/hooks/use-notifications\'

const navItems = \[

{ href: \'/\', icon: Home, label: \'Главная\' },

{ href: \'/search\', icon: Search, label: \'Поиск\' },

{ href: \'/scanner\', icon: ScanLine, label: \'Сканер\' },

{ href: \'/notifications\', icon: Bell, label: \'Уведомления\' },

{ href: \'/settings\', icon: Settings, label: \'Настройки\' },

\]

export function BottomNav() {

const pathname = usePathname()

const { unreadCount } = useNotifications()

return (

\<nav className=\"fixed bottom-0 left-0 right-0 bg-zinc-900 border-t
border-zinc-800 px-4 py-2 safe-area-pb\"\>

\<div className=\"flex justify-around items-center max-w-md mx-auto\"\>

{navItems.map((item) =\> {

const Icon = item.icon

const isActive = pathname === item.href

const showBadge = item.href === \'/notifications\' && unreadCount \> 0

return (

\<Link

key={item.href}

href={item.href}

className={cn(

\'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors
relative\',

isActive

? \'text-orange-500\'

: \'text-zinc-400 hover:text-zinc-200\'

)}

\>

\<div className=\"relative\"\>

\<Icon className=\"w-6 h-6\" /\>

{showBadge && (

\<span className=\"absolute -top-1 -right-1 bg-red-500 text-white
text-\[10px\] font-bold rounded-full w-4 h-4 flex items-center
justify-center\"\>

{unreadCount \> 9 ? \'9+\' : unreadCount}

\</span\>

)}

\</div\>

\<span className=\"text-xs\"\>{item.label}\</span\>

\</Link\>

)

})}

\</div\>

\</nav\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Компонент создан

\- \[ \] 5 вкладок (добавлены Уведомления)

\- \[ \] Бейдж с количеством непрочитанных уведомлений

\-\--

\## Шаг 3.2 --- Header (ОБНОВЛЕНО v2.0)

Создай \`/components/layout/Header.tsx\`:

\`\`\`typescript

\'use client\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { supabase } from \'@/lib/supabase\'

import { Button } from \'@/components/ui/button\'

import { LogOut, Wifi, WifiOff } from \'lucide-react\'

import { useRouter } from \'next/navigation\'

import { useOnlineStatus } from \'@/hooks/use-online-status\'

export function Header() {

const { user } = useAuth()

const router = useRouter()

const isOnline = useOnlineStatus()

const handleLogout = async () =\> {

await supabase.auth.signOut()

router.push(\'/login\')

}

return (

\<header className=\"sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md
border-b border-zinc-800 px-4 py-3\"\>

\<div className=\"max-w-md mx-auto flex justify-between items-center\"\>

\<div className=\"flex items-center gap-2\"\>

\<h1 className=\"text-xl font-bold text-orange-500\"\>GarageOS\</h1\>

{!isOnline && (

\<div className=\"flex items-center gap-1 bg-yellow-500/20
text-yellow-500 px-2 py-0.5 rounded-full text-xs\"\>

\<WifiOff className=\"w-3 h-3\" /\>

\<span\>Оффлайн\</span\>

\</div\>

)}

\</div\>

{user && (

\<Button variant=\"ghost\" size=\"icon\" onClick={handleLogout}\>

\<LogOut className=\"w-5 h-5 text-zinc-400\" /\>

\</Button\>

)}

\</div\>

\</header\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Header создан

\- \[ \] Индикатор оффлайн-режима показывается

\- \[ \] Кнопка выхода работает

\-\--

\## Шаг 3.3 --- Защищённый layout

Создай \`/app/(protected)/layout.tsx\`:

\`\`\`typescript

import { Header } from \'@/components/layout/Header\'

import { BottomNav } from \'@/components/layout/BottomNav\'

export default function ProtectedLayout({

children,

}: {

children: React.ReactNode

}) {

return (

\<div className=\"min-h-screen bg-zinc-950 pb-24\"\>

\<Header /\>

\<main className=\"max-w-md mx-auto px-4 py-4\"\>

{children}

\</main\>

\<BottomNav /\>

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Layout создан

\- \[ \] Header и BottomNav отображаются

\- \[ \] Достаточный отступ снизу (\`pb-24\`)

\-\--

\-\--

\# ЭТАП 4: Контейнеры --- CRUD

\> ⏱ Ориентировочное время: \*\*3 часа\*\*

\-\--

\## Шаг 4.1 --- Хук для работы с контейнерами

Создай \`/hooks/use-containers.ts\`:

\`\`\`typescript

\'use client\'

import { useQuery, useMutation, useQueryClient } from
\'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { Container } from \'@/lib/types\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { toast } from \'sonner\'

export function useContainers() {

const { user } = useAuth()

const queryClient = useQueryClient()

const { data: containers, isLoading } = useQuery({

queryKey: \[\'containers\', user?.id\],

queryFn: async () =\> {

const { data, error } = await supabase

.from(\'containers\')

.select(\'\*\')

.eq(\'user_id\', user?.id)

.order(\'created_at\', { ascending: false })

if (error) throw error

return data as Container\[\]

},

enabled: !!user,

})

const createContainer = useMutation({

mutationFn: async ({ name, description }: { name: string; description?:
string }) =\> {

const { data, error } = await supabase

.from(\'containers\')

.insert({ user_id: user?.id, name, description })

.select()

.single()

if (error) throw error

return data

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'containers\'\] })

toast.success(\'Контейнер создан\')

},

onError: (error) =\> {

toast.error(error.message)

},

})

const deleteContainer = useMutation({

mutationFn: async (id: string) =\> {

const { error } = await supabase

.from(\'containers\')

.delete()

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'containers\'\] })

toast.success(\'Контейнер удалён\')

},

})

return { containers, isLoading, createContainer, deleteContainer }

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] Нет ошибок TypeScript

\-\--

\## Шаг 4.2 --- Компонент ContainerCard

Создай \`/components/containers/ContainerCard.tsx\`:

\`\`\`typescript

\'use client\'

import { Container } from \'@/lib/types\'

import { Card, CardContent, CardHeader, CardTitle } from
\'@/components/ui/card\'

import { Button } from \'@/components/ui/button\'

import { Package, Trash2 } from \'lucide-react\'

import Link from \'next/link\'

import { motion } from \'framer-motion\'

interface ContainerCardProps {

container: Container

itemCount?: number

onDelete: (id: string) =\> void

}

export function ContainerCard({ container, itemCount, onDelete }:
ContainerCardProps) {

return (

\<motion.div

initial={{ opacity: 0, y: 20 }}

animate={{ opacity: 1, y: 0 }}

exit={{ opacity: 0, scale: 0.9 }}

\>

\<Card className=\"bg-zinc-900 border-zinc-800
hover:border-orange-500/50 transition-colors\"\>

\<Link href={\`/container/\${container.id}\`}\>

\<CardHeader className=\"pb-2\"\>

\<div className=\"flex justify-between items-start\"\>

\<CardTitle className=\"text-lg text-zinc-100 flex items-center
gap-2\"\>

\<Package className=\"w-5 h-5 text-orange-500\" /\>

{container.name}

\</CardTitle\>

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={(e) =\> {

e.preventDefault()

onDelete(container.id)

}}

className=\"text-zinc-400 hover:text-red-500\"

\>

\<Trash2 className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

\</CardHeader\>

\<CardContent\>

\<p className=\"text-sm text-zinc-500\"\>

{container.description \|\| \'Нет описания\'}

\</p\>

\<div className=\"flex justify-between items-center mt-2\"\>

\<p className=\"text-xs text-zinc-600\"\>

{new Date(container.created_at).toLocaleDateString(\'ru-RU\')}

\</p\>

{typeof itemCount === \'number\' && (

\<p className=\"text-xs text-zinc-500\"\>

Вещей: {itemCount}

\</p\>

)}

\</div\>

\</CardContent\>

\</Link\>

\</Card\>

\</motion.div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Компонент создан

\- \[ \] Показывает количество вещей (если передано)

\-\--

\## Шаг 4.3 --- Главная страница

Обнови \`/app/(protected)/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useContainers } from \'@/hooks/use-containers\'

import { ContainerCard } from \'@/components/containers/ContainerCard\'

import { Button } from \'@/components/ui/button\'

import {

Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,

} from \'@/components/ui/dialog\'

import { Input } from \'@/components/ui/input\'

import { Label } from \'@/components/ui/label\'

import { Textarea } from \'@/components/ui/textarea\'

import { Plus, PackageOpen } from \'lucide-react\'

import { useState } from \'react\'

import { Skeleton } from \'@/components/ui/skeleton\'

import { motion, AnimatePresence } from \'framer-motion\'

export default function HomePage() {

const { containers, isLoading, createContainer, deleteContainer } =

useContainers()

const \[newName, setNewName\] = useState(\'\')

const \[newDescription, setNewDescription\] = useState(\'\')

const \[dialogOpen, setDialogOpen\] = useState(false)

const handleCreate = async () =\> {

if (!newName.trim()) return

await createContainer.mutateAsync({

name: newName,

description: newDescription \|\| undefined,

})

setNewName(\'\')

setNewDescription(\'\')

setDialogOpen(false)

}

if (isLoading) {

return (

\<div className=\"space-y-4\"\>

{\[1, 2, 3\].map((i) =\> (

\<Skeleton key={i} className=\"h-28 w-full bg-zinc-900\" /\>

))}

\</div\>

)

}

return (

\<div className=\"space-y-6\"\>

\<div className=\"flex justify-between items-center\"\>

\<h2 className=\"text-2xl font-bold text-zinc-100\"\>Мои
контейнеры\</h2\>

\<Dialog open={dialogOpen} onOpenChange={setDialogOpen}\>

\<DialogTrigger asChild\>

\<Button size=\"icon\" className=\"bg-orange-500 hover:bg-orange-600\"\>

\<Plus className=\"w-5 h-5\" /\>

\</Button\>

\</DialogTrigger\>

\<DialogContent className=\"bg-zinc-900 border-zinc-800\"\>

\<DialogHeader\>

\<DialogTitle\>Новый контейнер\</DialogTitle\>

\</DialogHeader\>

\<div className=\"space-y-4\"\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"name\"\>Название \*\</Label\>

\<Input

id=\"name\"

value={newName}

onChange={(e) =\> setNewName(e.target.value)}

placeholder=\"Полка №1\"

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"desc\"\>Описание\</Label\>

\<Textarea

id=\"desc\"

value={newDescription}

onChange={(e) =\> setNewDescription(e.target.value)}

placeholder=\"Необязательно\"

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\<Button

onClick={handleCreate}

className=\"w-full bg-orange-500 hover:bg-orange-600\"

\>

Создать

\</Button\>

\</div\>

\</DialogContent\>

\</Dialog\>

\</div\>

{containers && containers.length \> 0 ? (

\<motion.div layout className=\"space-y-4\"\>

\<AnimatePresence\>

{containers.map((container) =\> (

\<ContainerCard

key={container.id}

container={container}

onDelete={deleteContainer.mutate}

/\>

))}

\</AnimatePresence\>

\</motion.div\>

) : (

\<div className=\"text-center py-12\"\>

\<PackageOpen className=\"w-16 h-16 text-zinc-700 mx-auto mb-4\" /\>

\<p className=\"text-zinc-500\"\>Нет контейнеров\</p\>

\<p className=\"text-sm text-zinc-600\"\>Создайте первый контейнер\</p\>

\</div\>

)}

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Страница работает

\- \[ \] Создание с описанием работает

\- \[ \] Удаление работает

\-\--

\## Шаг 4.4 --- QR-код для контейнера

Создай \`/components/containers/QRCodeDisplay.tsx\`:

\`\`\`typescript

\'use client\'

import { QRCodeSVG } from \'qrcode.react\'

import {

Dialog, DialogContent, DialogHeader, DialogTitle,

} from \'@/components/ui/dialog\'

import { Button } from \'@/components/ui/button\'

import { Download } from \'lucide-react\'

interface QRCodeDisplayProps {

containerId: string

containerName: string

open: boolean

onOpenChange: (open: boolean) =\> void

}

export function QRCodeDisplay({

containerId, containerName, open, onOpenChange,

}: QRCodeDisplayProps) {

const containerUrl =

typeof window !== \'undefined\'

? \`\${window.location.origin}/container/\${containerId}\`

: \'\'

const handleDownload = () =\> {

const svg = document.getElementById(\`qr-\${containerId}\`)

if (!svg) return

const svgData = new XMLSerializer().serializeToString(svg)

const canvas = document.createElement(\'canvas\')

const ctx = canvas.getContext(\'2d\')

const img = new Image()

img.onload = () =\> {

canvas.width = img.width

canvas.height = img.height

ctx?.drawImage(img, 0, 0)

const pngFile = canvas.toDataURL(\'image/png\')

const link = document.createElement(\'a\')

link.download = \`container-\${containerName}.png\`

link.href = pngFile

link.click()

}

img.src = \'data:image/svg+xml;base64,\' + btoa(svgData)

}

return (

\<Dialog open={open} onOpenChange={onOpenChange}\>

\<DialogContent className=\"bg-zinc-900 border-zinc-800\"\>

\<DialogHeader\>

\<DialogTitle\>QR-код: {containerName}\</DialogTitle\>

\</DialogHeader\>

\<div className=\"flex flex-col items-center gap-4 py-4\"\>

\<div className=\"bg-white p-4 rounded-lg\"\>

\<QRCodeSVG

id={\`qr-\${containerId}\`}

value={containerUrl}

size={256}

level=\"H\"

/\>

\</div\>

\<p className=\"text-sm text-zinc-400 text-center\"\>

Отсканируйте для быстрого доступа к контейнеру

\</p\>

\<Button onClick={handleDownload} variant=\"outline\"
className=\"gap-2\"\>

\<Download className=\"w-4 h-4\" /\>

Скачать QR-код

\</Button\>

\</div\>

\</DialogContent\>

\</Dialog\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] QR-код генерируется

\- \[ \] Скачивание работает

\-\--

\-\--

\# ЭТАП 5: Страница Контейнера и Вещи

\> ⏱ Ориентировочное время: \*\*4 часа\*\*

\-\--

\## Шаг 5.1 --- Хук для работы с вещами (ОБНОВЛЕНО v2.0)

Создай \`/hooks/use-items.ts\`:

\`\`\`typescript

\'use client\'

import { useQuery, useMutation, useQueryClient } from
\'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { Item } from \'@/lib/types\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { toast } from \'sonner\'

export function useItems(containerId: string) {

const { user } = useAuth()

const queryClient = useQueryClient()

const { data: items, isLoading } = useQuery({

queryKey: \[\'items\', containerId\],

queryFn: async () =\> {

const { data, error } = await supabase

.from(\'items\')

.select(\`

\*,

category:categories(id, name, color, icon)

\`)

.eq(\'container_id\', containerId)

.order(\'created_at\', { ascending: false })

if (error) throw error

return data as (Item & { category: { id: string; name: string; color:
string; icon: string } \| null })\[\]

},

enabled: !!user && !!containerId,

})

const createItem = useMutation({

mutationFn: async (itemData: Partial\<Item\>) =\> {

const { data, error } = await supabase

.from(\'items\')

.insert({

\...itemData,

user_id: user?.id,

container_id: containerId,

})

.select()

.single()

if (error) throw error

return data

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'items\', containerId\] })

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

toast.success(\'Вещь добавлена\')

},

})

const updateItem = useMutation({

mutationFn: async ({ id, updates }: { id: string; updates:
Partial\<Item\> }) =\> {

const { error } = await supabase

.from(\'items\')

.update(updates)

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'items\', containerId\] })

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

toast.success(\'Вещь обновлена\')

},

})

const deleteItem = useMutation({

mutationFn: async (id: string) =\> {

const { error } = await supabase

.from(\'items\')

.delete()

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'items\', containerId\] })

toast.success(\'Вещь удалена\')

},

})

const updateQuantity = async (itemId: string, delta: number) =\> {

const item = items?.find((i) =\> i.id === itemId)

if (!item) return

const newQuantity = Math.max(0, item.quantity + delta)

await updateItem.mutateAsync({

id: itemId,

updates: { quantity: newQuantity },

})

}

return { items, isLoading, createItem, updateItem, deleteItem,
updateQuantity }

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] Запрос включает join с categories

\- \[ \] При изменении количества инвалидируются уведомления

\-\--

\## Шаг 5.2 --- Компонент CategoryBadge

Создай \`/components/categories/CategoryBadge.tsx\`:

\`\`\`typescript

\'use client\'

import { Badge } from \'@/components/ui/badge\'

interface CategoryBadgeProps {

name: string

color: string

size?: \'sm\' \| \'md\'

}

export function CategoryBadge({ name, color, size = \'sm\' }:
CategoryBadgeProps) {

return (

\<Badge

variant=\"outline\"

className={\`border-0 \${size === \'sm\' ? \'text-xs px-2 py-0\' :
\'text-sm px-3 py-1\'}\`}

style={{

backgroundColor: \`\${color}20\`,

color: color,

}}

\>

{name}

\</Badge\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Компонент создан

\- \[ \] Цвет применяется динамически

\-\--

\## Шаг 5.3 --- Компонент ItemCard (ОБНОВЛЕНО v2.0)

Создай \`/components/items/ItemCard.tsx\`:

\`\`\`typescript

\'use client\'

import { Item } from \'@/lib/types\'

import { Card, CardContent } from \'@/components/ui/card\'

import { Button } from \'@/components/ui/button\'

import { Minus, Plus, Trash2, Edit2, AlertTriangle } from
\'lucide-react\'

import Image from \'next/image\'

import { motion } from \'framer-motion\'

import { CategoryBadge } from \'@/components/categories/CategoryBadge\'

interface ItemCardProps {

item: Item & {

category?: { id: string; name: string; color: string; icon: string } \|
null

}

onUpdateQuantity: (id: string, delta: number) =\> void

onDelete: (id: string) =\> void

onEdit: (item: Item) =\> void

}

export function ItemCard({ item, onUpdateQuantity, onDelete, onEdit }:
ItemCardProps) {

const isLowStock = item.min_quantity \> 0 && item.quantity \<=
item.min_quantity

return (

\<motion.div

initial={{ opacity: 0, scale: 0.9 }}

animate={{ opacity: 1, scale: 1 }}

exit={{ opacity: 0, scale: 0.9 }}

layout

\>

\<Card className={\`bg-zinc-900 border-zinc-800 overflow-hidden \${

isLowStock ? \'border-l-4 border-l-yellow-500\' : \'\'

}\`}\>

\<div className=\"flex gap-4\"\>

{/\* Фото \*/}

{item.image_url && (

\<div className=\"relative w-24 h-24 flex-shrink-0\"\>

\<Image

src={item.image_url}

alt={item.name}

fill

className=\"object-cover\"

/\>

\</div\>

)}

{/\* Контент \*/}

\<CardContent className=\"flex-1 p-4\"\>

\<div className=\"flex justify-between items-start mb-1\"\>

\<div className=\"flex-1 min-w-0\"\>

\<h3 className=\"font-semibold text-zinc-100 flex items-center gap-2\"\>

{item.name}

{isLowStock && (

\<AlertTriangle className=\"w-4 h-4 text-yellow-500 flex-shrink-0\" /\>

)}

\</h3\>

{/\* Категория \*/}

{item.category && (

\<div className=\"mt-1\"\>

\<CategoryBadge

name={item.category.name}

color={item.category.color}

/\>

\</div\>

)}

\</div\>

\<div className=\"flex gap-1\"\>

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> onEdit(item)}

className=\"text-zinc-500 hover:text-blue-400 h-8 w-8\"

\>

\<Edit2 className=\"w-4 h-4\" /\>

\</Button\>

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> onDelete(item.id)}

className=\"text-zinc-500 hover:text-red-500 h-8 w-8\"

\>

\<Trash2 className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

\</div\>

{item.description && (

\<p className=\"text-sm text-zinc-500 mb-2\"\>{item.description}\</p\>

)}

{/\* Счётчик + минимум \*/}

\<div className=\"flex items-center justify-between\"\>

\<div className=\"flex items-center gap-2\"\>

\<Button

variant=\"outline\"

size=\"icon\"

onClick={() =\> onUpdateQuantity(item.id, -1)}

className=\"h-8 w-8 border-zinc-700\"

\>

\<Minus className=\"w-4 h-4\" /\>

\</Button\>

\<span className={\`text-lg font-bold w-12 text-center \${

isLowStock ? \'text-yellow-500\' : \'text-orange-500\'

}\`}\>

{item.quantity}

\</span\>

\<Button

variant=\"outline\"

size=\"icon\"

onClick={() =\> onUpdateQuantity(item.id, 1)}

className=\"h-8 w-8 border-zinc-700\"

\>

\<Plus className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

{item.min_quantity \> 0 && (

\<span className=\"text-xs text-zinc-600\"\>

мин: {item.min_quantity}

\</span\>

)}

\</div\>

\</CardContent\>

\</div\>

\</Card\>

\</motion.div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Кнопка редактирования добавлена

\- \[ \] Категория отображается бейджем

\- \[ \] Low stock выделяется жёлтой полосой и иконкой

\- \[ \] Показывается минимальное количество

\-\--

\## Шаг 5.4 --- Компонент CategorySelect

Создай \`/components/categories/CategorySelect.tsx\`:

\`\`\`typescript

\'use client\'

import { useCategories } from \'@/hooks/use-categories\'

import {

Select, SelectContent, SelectItem, SelectTrigger, SelectValue,

} from \'@/components/ui/select\'

interface CategorySelectProps {

value: string \| null

onChange: (value: string \| null) =\> void

}

export function CategorySelect({ value, onChange }: CategorySelectProps)
{

const { categories, isLoading } = useCategories()

if (isLoading) return null

return (

\<Select

value={value \|\| \'none\'}

onValueChange={(v) =\> onChange(v === \'none\' ? null : v)}

\>

\<SelectTrigger className=\"bg-zinc-800 border-zinc-700\"\>

\<SelectValue placeholder=\"Без категории\" /\>

\</SelectTrigger\>

\<SelectContent className=\"bg-zinc-800 border-zinc-700\"\>

\<SelectItem value=\"none\"\>Без категории\</SelectItem\>

{categories?.map((cat) =\> (

\<SelectItem key={cat.id} value={cat.id}\>

\<div className=\"flex items-center gap-2\"\>

\<div

className=\"w-3 h-3 rounded-full\"

style={{ backgroundColor: cat.color }}

/\>

{cat.name}

\</div\>

\</SelectItem\>

))}

\</SelectContent\>

\</Select\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Компонент создан

\- \[ \] Показывает список категорий с цветными точками

\- \[ \] Можно выбрать «Без категории»

\-\--

\## Шаг 5.5 --- Форма добавления вещи (ОБНОВЛЕНО v2.0)

Создай \`/components/items/ItemForm.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import { useForm } from \'react-hook-form\'

import { zodResolver } from \'@hookform/resolvers/zod\'

import \* as z from \'zod\'

import { supabase } from \'@/lib/supabase\'

import { Button } from \'@/components/ui/button\'

import { Input } from \'@/components/ui/input\'

import { Label } from \'@/components/ui/label\'

import { Textarea } from \'@/components/ui/textarea\'

import {

Dialog, DialogContent, DialogHeader, DialogTitle,

} from \'@/components/ui/dialog\'

import { Progress } from \'@/components/ui/progress\'

import { Camera, Upload } from \'lucide-react\'

import { toast } from \'sonner\'

import { CategorySelect } from
\'@/components/categories/CategorySelect\'

const itemSchema = z.object({

name: z.string().min(1, \'Название обязательно\'),

description: z.string().optional(),

quantity: z.number().min(1).default(1),

min_quantity: z.number().min(0).default(0),

})

type ItemFormData = z.infer\<typeof itemSchema\>

interface ItemFormProps {

containerId: string

open: boolean

onOpenChange: (open: boolean) =\> void

onSuccess: () =\> void

}

export function ItemForm({ containerId, open, onOpenChange, onSuccess }:
ItemFormProps) {

const \[imageFile, setImageFile\] = useState\<File \| null\>(null)

const \[imagePreview, setImagePreview\] = useState\<string \|
null\>(null)

const \[uploadProgress, setUploadProgress\] = useState(0)

const \[isUploading, setIsUploading\] = useState(false)

const \[categoryId, setCategoryId\] = useState\<string \| null\>(null)

const {

register, handleSubmit, reset, formState: { errors },

} = useForm\<ItemFormData\>({

resolver: zodResolver(itemSchema),

defaultValues: { quantity: 1, min_quantity: 0 },

})

const handleImageChange = (e: React.ChangeEvent\<HTMLInputElement\>) =\>
{

const file = e.target.files?.\[0\]

if (file) {

setImageFile(file)

const reader = new FileReader()

reader.onloadend = () =\> setImagePreview(reader.result as string)

reader.readAsDataURL(file)

}

}

const uploadImage = async (file: File): Promise\<string\> =\> {

const fileExt = file.name.split(\'.\').pop()

const fileName = \`\${crypto.randomUUID()}.\${fileExt}\`

const { error } = await supabase.storage

.from(\'item-photos\')

.upload(fileName, file, { cacheControl: \'3600\', upsert: false })

if (error) throw error

const { data } =
supabase.storage.from(\'item-photos\').getPublicUrl(fileName)

return data.publicUrl

}

const onSubmit = async (data: ItemFormData) =\> {

try {

setIsUploading(true)

setUploadProgress(0)

let imageUrl = null

if (imageFile) {

setUploadProgress(30)

imageUrl = await uploadImage(imageFile)

setUploadProgress(70)

}

setUploadProgress(90)

const { error } = await supabase.from(\'items\').insert({

\...data,

container_id: containerId,

user_id: (await supabase.auth.getUser()).data.user?.id,

image_url: imageUrl,

category_id: categoryId,

})

if (error) throw error

setUploadProgress(100)

toast.success(\'Вещь добавлена\')

setTimeout(() =\> {

reset()

setImageFile(null)

setImagePreview(null)

setUploadProgress(0)

setIsUploading(false)

setCategoryId(null)

onOpenChange(false)

onSuccess()

}, 500)

} catch (error) {

toast.error(error instanceof Error ? error.message : \'Ошибка\')

setIsUploading(false)

}

}

return (

\<Dialog open={open} onOpenChange={onOpenChange}\>

\<DialogContent className=\"bg-zinc-900 border-zinc-800 max-h-\[90vh\]
overflow-y-auto\"\>

\<DialogHeader\>

\<DialogTitle\>Добавить вещь\</DialogTitle\>

\</DialogHeader\>

\<form onSubmit={handleSubmit(onSubmit)} className=\"space-y-4\"\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"name\"\>Название \*\</Label\>

\<Input

id=\"name\"

{\...register(\'name\')}

className=\"bg-zinc-800 border-zinc-700\"

placeholder=\"Например: Дрель\"

/\>

{errors.name && (

\<p className=\"text-sm text-red-500\"\>{errors.name.message}\</p\>

)}

\</div\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"description\"\>Описание\</Label\>

\<Textarea

id=\"description\"

{\...register(\'description\')}

className=\"bg-zinc-800 border-zinc-700\"

placeholder=\"Необязательно\"

/\>

\</div\>

{/\* Категория \*/}

\<div className=\"space-y-2\"\>

\<Label\>Категория\</Label\>

\<CategorySelect value={categoryId} onChange={setCategoryId} /\>

\</div\>

\<div className=\"grid grid-cols-2 gap-4\"\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"quantity\"\>Количество\</Label\>

\<Input

id=\"quantity\"

type=\"number\"

min={1}

{\...register(\'quantity\', { valueAsNumber: true })}

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"min_quantity\"\>Минимум ⚠️\</Label\>

\<Input

id=\"min_quantity\"

type=\"number\"

min={0}

{\...register(\'min_quantity\', { valueAsNumber: true })}

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\</div\>

{/\* Фото \*/}

\<div className=\"space-y-2\"\>

\<Label\>Фотография\</Label\>

\<label className=\"block\"\>

\<div className=\"border-2 border-dashed border-zinc-700 rounded-lg p-6
text-center hover:border-orange-500 transition-colors cursor-pointer\"\>

{imagePreview ? (

\<img src={imagePreview} alt=\"Preview\" className=\"max-h-32 mx-auto
rounded\" /\>

) : (

\<\>

\<Camera className=\"w-8 h-8 text-zinc-500 mx-auto mb-2\" /\>

\<p className=\"text-sm text-zinc-400\"\>Нажмите для фото\</p\>

\</\>

)}

\</div\>

\<input

type=\"file\"

accept=\"image/\*\"

capture=\"environment\"

onChange={handleImageChange}

className=\"hidden\"

/\>

\</label\>

\</div\>

{isUploading && (

\<div className=\"space-y-2\"\>

\<Progress value={uploadProgress} className=\"h-2\" /\>

\<p className=\"text-sm text-zinc-500 text-center\"\>Загрузка\...\</p\>

\</div\>

)}

\<Button

type=\"submit\"

className=\"w-full bg-orange-500 hover:bg-orange-600\"

disabled={isUploading}

\>

\<Upload className=\"w-4 h-4 mr-2\" /\>

{isUploading ? \'Загрузка\...\' : \'Добавить\'}

\</Button\>

\</form\>

\</DialogContent\>

\</Dialog\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Форма содержит выбор категории

\- \[ \] Поле min_quantity (минимальное количество)

\- \[ \] Оба поля сохраняются в БД

\-\--

\## Шаг 5.6 --- Страница контейнера

Создай \`/app/(protected)/container/\[id\]/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useParams } from \'next/navigation\'

import { useItems } from \'@/hooks/use-items\'

import { ItemCard } from \'@/components/items/ItemCard\'

import { ItemForm } from \'@/components/items/ItemForm\'

import { ItemEditForm } from \'@/components/items/ItemEditForm\'

import { Button } from \'@/components/ui/button\'

import { Plus, ArrowLeft, QrCode } from \'lucide-react\'

import Link from \'next/link\'

import { useState } from \'react\'

import { QRCodeDisplay } from \'@/components/containers/QRCodeDisplay\'

import { Skeleton } from \'@/components/ui/skeleton\'

import { motion, AnimatePresence } from \'framer-motion\'

import { Item } from \'@/lib/types\'

export default function ContainerPage() {

const params = useParams()

const containerId = params.id as string

const { items, isLoading, updateQuantity, deleteItem } =
useItems(containerId)

const \[formOpen, setFormOpen\] = useState(false)

const \[qrOpen, setQrOpen\] = useState(false)

const \[editingItem, setEditingItem\] = useState\<Item \| null\>(null)

return (

\<div className=\"space-y-6\"\>

\<div className=\"flex items-center justify-between\"\>

\<div className=\"flex items-center gap-2\"\>

\<Link href=\"/\"\>

\<Button variant=\"ghost\" size=\"icon\"\>

\<ArrowLeft className=\"w-5 h-5\" /\>

\</Button\>

\</Link\>

\<h1 className=\"text-xl font-bold text-zinc-100\"\>Контейнер\</h1\>

\</div\>

\<div className=\"flex gap-2\"\>

\<Button

variant=\"outline\"

size=\"icon\"

onClick={() =\> setQrOpen(true)}

className=\"border-zinc-700\"

\>

\<QrCode className=\"w-5 h-5\" /\>

\</Button\>

\<Button

onClick={() =\> setFormOpen(true)}

className=\"bg-orange-500 hover:bg-orange-600\"

\>

\<Plus className=\"w-5 h-5 mr-2\" /\>

Добавить

\</Button\>

\</div\>

\</div\>

{isLoading ? (

\<div className=\"space-y-4\"\>

{\[1, 2, 3\].map((i) =\> (

\<Skeleton key={i} className=\"h-32 w-full bg-zinc-900\" /\>

))}

\</div\>

) : items && items.length \> 0 ? (

\<motion.div layout className=\"space-y-4\"\>

\<AnimatePresence\>

{items.map((item) =\> (

\<ItemCard

key={item.id}

item={item}

onUpdateQuantity={updateQuantity}

onDelete={deleteItem.mutate}

onEdit={(i) =\> setEditingItem(i)}

/\>

))}

\</AnimatePresence\>

\</motion.div\>

) : (

\<div className=\"text-center py-12\"\>

\<p className=\"text-zinc-500\"\>В контейнере пока пусто\</p\>

\<Button

onClick={() =\> setFormOpen(true)}

variant=\"outline\"

className=\"mt-4 border-zinc-700\"

\>

Добавить первую вещь

\</Button\>

\</div\>

)}

\<ItemForm

containerId={containerId}

open={formOpen}

onOpenChange={setFormOpen}

onSuccess={() =\> {}}

/\>

{editingItem && (

\<ItemEditForm

item={editingItem}

open={!!editingItem}

onOpenChange={(open) =\> !open && setEditingItem(null)}

onSuccess={() =\> setEditingItem(null)}

containerId={containerId}

/\>

)}

\<QRCodeDisplay

containerId={containerId}

containerName=\"Контейнер\"

open={qrOpen}

onOpenChange={setQrOpen}

/\>

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Страница открывается

\- \[ \] Кнопка редактирования открывает ItemEditForm

\- \[ \] Всё остальное работает как раньше

\-\--

\-\--

\# ЭТАП 6: QR Сканер

\> ⏱ Ориентировочное время: \*\*2 часа\*\*

\-\--

\## Шаг 6.1 --- Компонент сканера

Создай \`/components/scanner/QRScanner.tsx\`:

\`\`\`typescript

\'use client\'

import { useEffect, useState } from \'react\'

import { Html5Qrcode } from \'html5-qrcode\'

import { Button } from \'@/components/ui/button\'

import { X, Flashlight } from \'lucide-react\'

import { toast } from \'sonner\'

interface QRScannerProps {

onScan: (data: string) =\> void

onClose: () =\> void

}

export function QRScanner({ onScan, onClose }: QRScannerProps) {

const \[scanner, setScanner\] = useState\<Html5Qrcode \| null\>(null)

const \[isFlashOn, setIsFlashOn\] = useState(false)

useEffect(() =\> {

const html5QrCode = new Html5Qrcode(\'reader\')

setScanner(html5QrCode)

html5QrCode

.start(

{ facingMode: \'environment\' },

{ fps: 10, qrbox: { width: 250, height: 250 }, disableFlip: false },

(decodedText) =\> {

if (navigator.vibrate) navigator.vibrate(200)

toast.success(\'QR-код распознан!\')

onScan(decodedText)

html5QrCode.stop()

},

() =\> {}

)

.catch(() =\> toast.error(\'Не удалось запустить камеру\'))

return () =\> {

if (html5QrCode.isScanning) html5QrCode.stop()

}

}, \[onScan\])

const toggleFlash = async () =\> {

if (!scanner) return

try {

isFlashOn ? await scanner.applyFlashOff() : await scanner.applyFlashOn()

setIsFlashOn(!isFlashOn)

} catch {

toast.error(\'Фонарик недоступен\')

}

}

return (

\<div className=\"fixed inset-0 bg-black z-50 flex flex-col\"\>

\<div className=\"flex justify-between items-center p-4 bg-black/80\"\>

\<Button variant=\"ghost\" size=\"icon\" onClick={onClose}\>

\<X className=\"w-6 h-6 text-white\" /\>

\</Button\>

\<h2 className=\"text-white font-semibold\"\>Сканирование QR-кода\</h2\>

\<Button variant=\"ghost\" size=\"icon\" onClick={toggleFlash}\>

\<Flashlight className={\`w-6 h-6 \${isFlashOn ? \'text-yellow-400\' :
\'text-white\'}\`} /\>

\</Button\>

\</div\>

\<div className=\"flex-1 flex items-center justify-center p-4\"\>

\<div className=\"relative w-full max-w-sm\"\>

\<div id=\"reader\" className=\"rounded-lg overflow-hidden\" style={{
width: \'100%\' }} /\>

\<div className=\"absolute inset-0 border-2 border-orange-500 rounded-lg
pointer-events-none\"\>

\<div className=\"absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4
border-orange-500 -mt-1 -ml-1\" /\>

\<div className=\"absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4
border-orange-500 -mt-1 -mr-1\" /\>

\<div className=\"absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4
border-orange-500 -mb-1 -ml-1\" /\>

\<div className=\"absolute bottom-0 right-0 w-8 h-8 border-b-4
border-r-4 border-orange-500 -mb-1 -mr-1\" /\>

\</div\>

\</div\>

\</div\>

\<div className=\"p-4 bg-black/80 text-center\"\>

\<p className=\"text-zinc-400 text-sm\"\>Наведите камеру на QR-код
контейнера\</p\>

\</div\>

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Камера запускается

\- \[ \] QR-коды сканируются

\-\--

\## Шаг 6.2 --- Страница сканера

Создай \`/app/(protected)/scanner/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import { QRScanner } from \'@/components/scanner/QRScanner\'

import { useRouter } from \'next/navigation\'

import { ScanLine } from \'lucide-react\'

import { toast } from \'sonner\'

export default function ScannerPage() {

const \[scanning, setScanning\] = useState(false)

const router = useRouter()

const handleScan = (data: string) =\> {

setScanning(false)

let containerId = data

if (data.includes(\'/container/\')) {

const match = data.match(/\\/container\\/(\[\^/\]+)/)

if (match) containerId = match\[1\]

}

router.push(\`/container/\${containerId}\`)

toast.success(\'Контейнер открыт\')

}

return (

\<div\>

\<div className=\"text-center mb-8\"\>

\<ScanLine className=\"w-16 h-16 text-orange-500 mx-auto mb-4\" /\>

\<h1 className=\"text-2xl font-bold text-zinc-100 mb-2\"\>Сканер
QR-кодов\</h1\>

\<p className=\"text-zinc-500\"\>Отсканируйте QR-код на контейнере\</p\>

\</div\>

\<button

onClick={() =\> setScanning(true)}

className=\"w-full bg-orange-500 hover:bg-orange-600 text-white
font-semibold py-4 px-8 rounded-lg transition-colors\"

\>

Начать сканирование

\</button\>

\<div className=\"mt-8 p-4 bg-zinc-900 rounded-lg border
border-zinc-800\"\>

\<h3 className=\"font-semibold text-zinc-300 mb-2\"\>Как
использовать:\</h3\>

\<ol className=\"text-sm text-zinc-500 space-y-2 list-decimal
list-inside\"\>

\<li\>Нажмите «Начать сканирование»\</li\>

\<li\>Наведите камеру на QR-код\</li\>

\<li\>Дождитесь вибрации и автоматического перехода\</li\>

\</ol\>

\</div\>

{scanning && \<QRScanner onScan={handleScan} onClose={() =\>
setScanning(false)} /\>}

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Кнопка запускает сканер

\- \[ \] Редирект на контейнер после сканирования

\-\--

\-\--

\# ЭТАП 7: Глобальный Поиск

\> ⏱ Ориентировочное время: \*\*2 часа\*\*

\-\--

\## Шаг 7.1 --- Страница поиска (ОБНОВЛЕНО v2.0)

Создай \`/app/(protected)/search/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import { useQuery } from \'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { Input } from \'@/components/ui/input\'

import { Card, CardContent } from \'@/components/ui/card\'

import { Search as SearchIcon, Package } from \'lucide-react\'

import Image from \'next/image\'

import Link from \'next/link\'

import { Skeleton } from \'@/components/ui/skeleton\'

import { motion, AnimatePresence } from \'framer-motion\'

import { CategoryBadge } from \'@/components/categories/CategoryBadge\'

import { useDebouncedValue } from \'use-debounce\'

export default function SearchPage() {

const \[query, setQuery\] = useState(\'\')

const \[debouncedQuery\] = useDebouncedValue(query, 300)

const { data: results, isLoading } = useQuery({

queryKey: \[\'search\', debouncedQuery\],

queryFn: async () =\> {

if (!debouncedQuery.trim()) return \[\]

const { data, error } = await supabase

.from(\'items\')

.select(\`

\*,

container:containers!inner(id, name, user_id),

category:categories(id, name, color, icon)

\`)

.ilike(\'name\', \`%\${debouncedQuery}%\`)

.limit(20)

if (error) throw error

return data

},

enabled: debouncedQuery.length \> 0,

})

return (

\<div className=\"space-y-6\"\>

\<div\>

\<h1 className=\"text-2xl font-bold text-zinc-100 mb-4\"\>Поиск\</h1\>

\<div className=\"relative\"\>

\<SearchIcon className=\"absolute left-3 top-1/2 -translate-y-1/2 w-5
h-5 text-zinc-500\" /\>

\<Input

type=\"text\"

placeholder=\"Поиск вещей\...\"

value={query}

onChange={(e) =\> setQuery(e.target.value)}

className=\"pl-10 bg-zinc-900 border-zinc-800 text-zinc-100\"

autoFocus

/\>

\</div\>

\</div\>

{isLoading ? (

\<div className=\"space-y-4\"\>

{\[1, 2, 3\].map((i) =\> (

\<Skeleton key={i} className=\"h-24 w-full bg-zinc-900\" /\>

))}

\</div\>

) : results && results.length \> 0 ? (

\<motion.div layout className=\"space-y-4\"\>

\<AnimatePresence\>

{results.map((item: any) =\> (

\<motion.div

key={item.id}

initial={{ opacity: 0, y: 10 }}

animate={{ opacity: 1, y: 0 }}

exit={{ opacity: 0, y: -10 }}

\>

\<Link href={\`/container/\${item.container_id}\`}\>

\<Card className=\"bg-zinc-900 border-zinc-800
hover:border-orange-500/50 transition-colors\"\>

\<CardContent className=\"p-4\"\>

\<div className=\"flex gap-4\"\>

{item.image_url && (

\<div className=\"relative w-16 h-16 flex-shrink-0 rounded
overflow-hidden\"\>

\<Image src={item.image_url} alt={item.name} fill
className=\"object-cover\" /\>

\</div\>

)}

\<div className=\"flex-1 min-w-0\"\>

\<h3 className=\"font-semibold text-zinc-100
truncate\"\>{item.name}\</h3\>

{item.category && (

\<CategoryBadge name={item.category.name} color={item.category.color}
/\>

)}

\<div className=\"flex items-center gap-2 mt-1\"\>

\<Package className=\"w-4 h-4 text-orange-500\" /\>

\<span className=\"text-sm
text-zinc-400\"\>{item.container.name}\</span\>

\</div\>

\<p className=\"text-sm text-zinc-500 mt-1\"\>Кол-во:
{item.quantity}\</p\>

\</div\>

\</div\>

\</CardContent\>

\</Card\>

\</Link\>

\</motion.div\>

))}

\</AnimatePresence\>

\</motion.div\>

) : debouncedQuery.length \> 0 ? (

\<div className=\"text-center py-12\"\>

\<p className=\"text-zinc-500\"\>Ничего не найдено\</p\>

\</div\>

) : (

\<div className=\"text-center py-12 text-zinc-600\"\>

\<p\>Введите название вещи для поиска\</p\>

\</div\>

)}

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Поиск с debounce (300ms)

\- \[ \] Категория отображается в результатах

\- \[ \] Анимации плавные

\-\--

\-\--

\# ЭТАП 8: PWA и Оптимизация

\> ⏱ Ориентировочное время: \*\*2 часа\*\*

\-\--

\## Шаг 8.1 --- manifest.json

Создай \`/public/manifest.json\`:

\`\`\`json

{

\"name\": \"GarageOS\",

\"short_name\": \"GarageOS\",

\"description\": \"Система управления гаражом\",

\"start_url\": \"/\",

\"display\": \"standalone\",

\"background_color\": \"#09090b\",

\"theme_color\": \"#f97316\",

\"orientation\": \"portrait\",

\"icons\": \[

{

\"src\": \"/icons/icon-192x192.png\",

\"sizes\": \"192x192\",

\"type\": \"image/png\",

\"purpose\": \"any maskable\"

},

{

\"src\": \"/icons/icon-512x512.png\",

\"sizes\": \"512x512\",

\"type\": \"image/png\",

\"purpose\": \"any maskable\"

}

\]

}

\`\`\`

\### ✅ Проверка

\- \[ \] Manifest создан

\- \[ \] Иконки в \`/public/icons/\`

\-\--

\## Шаг 8.2 --- next.config.js

\`\`\`javascript

/\*\* \@type {import(\'next\').NextConfig} \*/

const nextConfig = {

images: {

remotePatterns: \[

{ protocol: \'https\', hostname: \'\*\*.supabase.co\' },

\],

},

}

module.exports = nextConfig

\`\`\`

\### ✅ Проверка

\- \[ \] Изображения из Supabase загружаются

\-\--

\## Шаг 8.3 --- Safe area CSS

Добавь в \`/app/globals.css\`:

\`\`\`css

\@tailwind base;

\@tailwind components;

\@tailwind utilities;

\@layer utilities {

.safe-area-pb {

padding-bottom: env(safe-area-inset-bottom);

}

}

\`\`\`

\### ✅ Проверка

\- \[ \] Safe area работает на iPhone

\-\--

\-\--

\# ЭТАП 9: Базовые финальные штрихи

\> ⏱ Ориентировочное время: \*\*1 час\*\*

Тестирование, деплой --- см. предыдущую версию плана. Далее ---
\*\*новые этапы v2.0\*\*.

\-\--

\-\--

\# ЭТАП 10: Категории вещей

\> ⏱ Ориентировочное время: \*\*3 часа\*\*

\-\--

\## Шаг 10.1 --- Хук для работы с категориями

Создай \`/hooks/use-categories.ts\`:

\`\`\`typescript

\'use client\'

import { useQuery, useMutation, useQueryClient } from
\'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { Category } from \'@/lib/types\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { toast } from \'sonner\'

export function useCategories() {

const { user } = useAuth()

const queryClient = useQueryClient()

const { data: categories, isLoading } = useQuery({

queryKey: \[\'categories\', user?.id\],

queryFn: async () =\> {

const { data, error } = await supabase

.from(\'categories\')

.select(\'\*\')

.eq(\'user_id\', user?.id)

.order(\'name\')

if (error) throw error

return data as Category\[\]

},

enabled: !!user,

})

const createCategory = useMutation({

mutationFn: async (cat: { name: string; color: string; icon?: string })
=\> {

const { data, error } = await supabase

.from(\'categories\')

.insert({ \...cat, user_id: user?.id })

.select()

.single()

if (error) {

if (error.code === \'23505\') throw new Error(\'Категория с таким именем
уже существует\')

throw error

}

return data

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'categories\'\] })

toast.success(\'Категория создана\')

},

onError: (error) =\> toast.error(error.message),

})

const updateCategory = useMutation({

mutationFn: async ({ id, updates }: { id: string; updates:
Partial\<Category\> }) =\> {

const { error } = await supabase

.from(\'categories\')

.update(updates)

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'categories\'\] })

queryClient.invalidateQueries({ queryKey: \[\'items\'\] })

toast.success(\'Категория обновлена\')

},

})

const deleteCategory = useMutation({

mutationFn: async (id: string) =\> {

const { error } = await supabase

.from(\'categories\')

.delete()

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'categories\'\] })

queryClient.invalidateQueries({ queryKey: \[\'items\'\] })

toast.success(\'Категория удалена\')

},

})

return { categories, isLoading, createCategory, updateCategory,
deleteCategory }

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] CRUD операции работают

\- \[ \] Уникальность имени обрабатывается

\-\--

\## Шаг 10.2 --- Форма создания категории

Создай \`/components/categories/CategoryForm.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import {

Dialog, DialogContent, DialogHeader, DialogTitle,

} from \'@/components/ui/dialog\'

import { Button } from \'@/components/ui/button\'

import { Input } from \'@/components/ui/input\'

import { Label } from \'@/components/ui/label\'

import { CATEGORY_COLORS } from \'@/lib/types\'

import { cn } from \'@/lib/utils\'

interface CategoryFormProps {

open: boolean

onOpenChange: (open: boolean) =\> void

onSubmit: (data: { name: string; color: string }) =\> void

initialData?: { name: string; color: string }

title?: string

}

export function CategoryForm({

open, onOpenChange, onSubmit,

initialData = { name: \'\', color: \'#f97316\' },

title = \'Новая категория\',

}: CategoryFormProps) {

const \[name, setName\] = useState(initialData.name)

const \[color, setColor\] = useState(initialData.color)

const handleSubmit = () =\> {

if (!name.trim()) return

onSubmit({ name, color })

setName(\'\')

setColor(\'#f97316\')

onOpenChange(false)

}

return (

\<Dialog open={open} onOpenChange={onOpenChange}\>

\<DialogContent className=\"bg-zinc-900 border-zinc-800\"\>

\<DialogHeader\>

\<DialogTitle\>{title}\</DialogTitle\>

\</DialogHeader\>

\<div className=\"space-y-4\"\>

\<div className=\"space-y-2\"\>

\<Label\>Название\</Label\>

\<Input

value={name}

onChange={(e) =\> setName(e.target.value)}

className=\"bg-zinc-800 border-zinc-700\"

placeholder=\"Инструменты\"

/\>

\</div\>

\<div className=\"space-y-2\"\>

\<Label\>Цвет\</Label\>

\<div className=\"flex flex-wrap gap-2\"\>

{CATEGORY_COLORS.map((c) =\> (

\<button

key={c}

type=\"button\"

onClick={() =\> setColor(c)}

className={cn(

\'w-8 h-8 rounded-full border-2 transition-transform\',

color === c

? \'border-white scale-110\'

: \'border-transparent hover:scale-105\'

)}

style={{ backgroundColor: c }}

/\>

))}

\</div\>

\</div\>

\<div className=\"flex items-center gap-3 p-3 bg-zinc-800 rounded-lg\"\>

\<div className=\"w-4 h-4 rounded-full\" style={{ backgroundColor: color
}} /\>

\<span className=\"text-zinc-100\"\>{name \|\|
\'Предпросмотр\'}\</span\>

\</div\>

\<Button

onClick={handleSubmit}

className=\"w-full bg-orange-500 hover:bg-orange-600\"

disabled={!name.trim()}

\>

Сохранить

\</Button\>

\</div\>

\</DialogContent\>

\</Dialog\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Выбор цвета из палитры

\- \[ \] Предпросмотр категории

\- \[ \] Валидация имени

\-\--

\## Шаг 10.3 --- Страница управления категориями

Создай \`/app/(protected)/categories/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useState } from \'react\'

import { useCategories } from \'@/hooks/use-categories\'

import { CategoryForm } from \'@/components/categories/CategoryForm\'

import { Button } from \'@/components/ui/button\'

import { Card, CardContent } from \'@/components/ui/card\'

import { Plus, Trash2, Edit2, Tag } from \'lucide-react\'

import { Skeleton } from \'@/components/ui/skeleton\'

import { Category } from \'@/lib/types\'

import { motion, AnimatePresence } from \'framer-motion\'

export default function CategoriesPage() {

const { categories, isLoading, createCategory, updateCategory,
deleteCategory } =

useCategories()

const \[formOpen, setFormOpen\] = useState(false)

const \[editingCategory, setEditingCategory\] = useState\<Category \|
null\>(null)

if (isLoading) {

return (

\<div className=\"space-y-4\"\>

{\[1, 2, 3, 4\].map((i) =\> (

\<Skeleton key={i} className=\"h-16 w-full bg-zinc-900\" /\>

))}

\</div\>

)

}

return (

\<div className=\"space-y-6\"\>

\<div className=\"flex justify-between items-center\"\>

\<h1 className=\"text-2xl font-bold text-zinc-100\"\>Категории\</h1\>

\<Button

size=\"icon\"

onClick={() =\> setFormOpen(true)}

className=\"bg-orange-500 hover:bg-orange-600\"

\>

\<Plus className=\"w-5 h-5\" /\>

\</Button\>

\</div\>

\<motion.div layout className=\"space-y-3\"\>

\<AnimatePresence\>

{categories?.map((cat) =\> (

\<motion.div

key={cat.id}

initial={{ opacity: 0, y: 10 }}

animate={{ opacity: 1, y: 0 }}

exit={{ opacity: 0, x: -100 }}

\>

\<Card className=\"bg-zinc-900 border-zinc-800\"\>

\<CardContent className=\"p-4 flex items-center justify-between\"\>

\<div className=\"flex items-center gap-3\"\>

\<div

className=\"w-5 h-5 rounded-full\"

style={{ backgroundColor: cat.color }}

/\>

\<span className=\"text-zinc-100 font-medium\"\>{cat.name}\</span\>

\</div\>

\<div className=\"flex gap-1\"\>

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> setEditingCategory(cat)}

className=\"text-zinc-400 hover:text-blue-400 h-8 w-8\"

\>

\<Edit2 className=\"w-4 h-4\" /\>

\</Button\>

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> deleteCategory.mutate(cat.id)}

className=\"text-zinc-400 hover:text-red-500 h-8 w-8\"

\>

\<Trash2 className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

\</CardContent\>

\</Card\>

\</motion.div\>

))}

\</AnimatePresence\>

\</motion.div\>

{(!categories \|\| categories.length === 0) && (

\<div className=\"text-center py-12\"\>

\<Tag className=\"w-16 h-16 text-zinc-700 mx-auto mb-4\" /\>

\<p className=\"text-zinc-500\"\>Нет категорий\</p\>

\</div\>

)}

{/\* Создание \*/}

\<CategoryForm

open={formOpen}

onOpenChange={setFormOpen}

onSubmit={(data) =\> createCategory.mutate(data)}

/\>

{/\* Редактирование \*/}

{editingCategory && (

\<CategoryForm

open={!!editingCategory}

onOpenChange={(open) =\> !open && setEditingCategory(null)}

onSubmit={(data) =\> {

updateCategory.mutate({ id: editingCategory.id, updates: data })

setEditingCategory(null)

}}

initialData={{

name: editingCategory.name,

color: editingCategory.color,

}}

title=\"Редактировать категорию\"

/\>

)}

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Список категорий отображается

\- \[ \] Можно создать категорию

\- \[ \] Можно редактировать (имя, цвет)

\- \[ \] Можно удалить

\- \[ \] Предустановленные категории видны после первого входа

\-\--

\## Шаг 10.4 --- Ссылка на категории в настройках

Обнови \`/app/(protected)/settings/page.tsx\`:

\`\`\`typescript

\'use client\'

import Link from \'next/link\'

import { Button } from \'@/components/ui/button\'

import { Card, CardContent } from \'@/components/ui/card\'

import { Tag, LogOut, ChevronRight } from \'lucide-react\'

import { supabase } from \'@/lib/supabase\'

import { useRouter } from \'next/navigation\'

import { useAuth } from \'@/components/providers/AuthProvider\'

export default function SettingsPage() {

const { user } = useAuth()

const router = useRouter()

const handleLogout = async () =\> {

await supabase.auth.signOut()

router.push(\'/login\')

}

return (

\<div className=\"space-y-6\"\>

\<h1 className=\"text-2xl font-bold text-zinc-100\"\>Настройки\</h1\>

\<Card className=\"bg-zinc-900 border-zinc-800\"\>

\<CardContent className=\"p-0\"\>

\<Link

href=\"/categories\"

className=\"flex items-center justify-between p-4 hover:bg-zinc-800
transition-colors rounded-lg\"

\>

\<div className=\"flex items-center gap-3\"\>

\<Tag className=\"w-5 h-5 text-orange-500\" /\>

\<span className=\"text-zinc-100\"\>Категории\</span\>

\</div\>

\<ChevronRight className=\"w-5 h-5 text-zinc-500\" /\>

\</Link\>

\</CardContent\>

\</Card\>

\<Card className=\"bg-zinc-900 border-zinc-800\"\>

\<CardContent className=\"p-4\"\>

\<p className=\"text-sm text-zinc-500 mb-2\"\>

Аккаунт: {user?.email}

\</p\>

\<Button

variant=\"destructive\"

onClick={handleLogout}

className=\"w-full\"

\>

\<LogOut className=\"w-4 h-4 mr-2\" /\>

Выйти

\</Button\>

\</CardContent\>

\</Card\>

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Ссылка на управление категориями

\- \[ \] Переход работает

\-\--

\-\--

\# ЭТАП 11: Редактирование вещей

\> ⏱ Ориентировочное время: \*\*2.5 часа\*\*

\-\--

\## Шаг 11.1 --- Форма редактирования вещи

Создай \`/components/items/ItemEditForm.tsx\`:

\`\`\`typescript

\'use client\'

import { useState, useEffect } from \'react\'

import { useForm } from \'react-hook-form\'

import { zodResolver } from \'@hookform/resolvers/zod\'

import \* as z from \'zod\'

import { supabase } from \'@/lib/supabase\'

import { Button } from \'@/components/ui/button\'

import { Input } from \'@/components/ui/input\'

import { Label } from \'@/components/ui/label\'

import { Textarea } from \'@/components/ui/textarea\'

import {

Dialog, DialogContent, DialogHeader, DialogTitle,

} from \'@/components/ui/dialog\'

import { Progress } from \'@/components/ui/progress\'

import { Camera, Save, Trash2 } from \'lucide-react\'

import { toast } from \'sonner\'

import { Item } from \'@/lib/types\'

import { CategorySelect } from
\'@/components/categories/CategorySelect\'

import { useItems } from \'@/hooks/use-items\'

import Image from \'next/image\'

const editSchema = z.object({

name: z.string().min(1, \'Название обязательно\'),

description: z.string().optional(),

quantity: z.number().min(0).default(1),

min_quantity: z.number().min(0).default(0),

})

type EditFormData = z.infer\<typeof editSchema\>

interface ItemEditFormProps {

item: Item

open: boolean

onOpenChange: (open: boolean) =\> void

onSuccess: () =\> void

containerId: string

}

export function ItemEditForm({

item, open, onOpenChange, onSuccess, containerId,

}: ItemEditFormProps) {

const { updateItem } = useItems(containerId)

const \[categoryId, setCategoryId\] = useState\<string \|
null\>(item.category_id)

const \[imageFile, setImageFile\] = useState\<File \| null\>(null)

const \[imagePreview, setImagePreview\] = useState\<string \|
null\>(item.image_url)

const \[uploadProgress, setUploadProgress\] = useState(0)

const \[isUploading, setIsUploading\] = useState(false)

const \[removeImage, setRemoveImage\] = useState(false)

const {

register, handleSubmit, reset, formState: { errors, isDirty },

} = useForm\<EditFormData\>({

resolver: zodResolver(editSchema),

defaultValues: {

name: item.name,

description: item.description \|\| \'\',

quantity: item.quantity,

min_quantity: item.min_quantity,

},

})

// Сбрасываем форму при смене item

useEffect(() =\> {

reset({

name: item.name,

description: item.description \|\| \'\',

quantity: item.quantity,

min_quantity: item.min_quantity,

})

setCategoryId(item.category_id)

setImagePreview(item.image_url)

setImageFile(null)

setRemoveImage(false)

}, \[item, reset\])

const handleImageChange = (e: React.ChangeEvent\<HTMLInputElement\>) =\>
{

const file = e.target.files?.\[0\]

if (file) {

setImageFile(file)

setRemoveImage(false)

const reader = new FileReader()

reader.onloadend = () =\> setImagePreview(reader.result as string)

reader.readAsDataURL(file)

}

}

const handleRemoveImage = () =\> {

setImageFile(null)

setImagePreview(null)

setRemoveImage(true)

}

const uploadImage = async (file: File): Promise\<string\> =\> {

const fileExt = file.name.split(\'.\').pop()

const fileName = \`\${crypto.randomUUID()}.\${fileExt}\`

const { error } = await supabase.storage

.from(\'item-photos\')

.upload(fileName, file, { cacheControl: \'3600\', upsert: false })

if (error) throw error

const { data } =
supabase.storage.from(\'item-photos\').getPublicUrl(fileName)

return data.publicUrl

}

const onSubmit = async (data: EditFormData) =\> {

try {

setIsUploading(true)

setUploadProgress(0)

let imageUrl = item.image_url

// Новое фото

if (imageFile) {

setUploadProgress(30)

imageUrl = await uploadImage(imageFile)

setUploadProgress(70)

}

// Удаление фото

if (removeImage) {

imageUrl = null

// TODO: удалить старый файл из Storage

}

setUploadProgress(90)

await updateItem.mutateAsync({

id: item.id,

updates: {

\...data,

category_id: categoryId,

image_url: imageUrl,

},

})

setUploadProgress(100)

toast.success(\'Вещь обновлена\')

setTimeout(() =\> {

setIsUploading(false)

setUploadProgress(0)

onOpenChange(false)

onSuccess()

}, 300)

} catch (error) {

toast.error(error instanceof Error ? error.message : \'Ошибка\')

setIsUploading(false)

}

}

return (

\<Dialog open={open} onOpenChange={onOpenChange}\>

\<DialogContent className=\"bg-zinc-900 border-zinc-800 max-h-\[90vh\]
overflow-y-auto\"\>

\<DialogHeader\>

\<DialogTitle\>Редактировать вещь\</DialogTitle\>

\</DialogHeader\>

\<form onSubmit={handleSubmit(onSubmit)} className=\"space-y-4\"\>

{/\* Название \*/}

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"edit-name\"\>Название \*\</Label\>

\<Input

id=\"edit-name\"

{\...register(\'name\')}

className=\"bg-zinc-800 border-zinc-700\"

/\>

{errors.name && (

\<p className=\"text-sm text-red-500\"\>{errors.name.message}\</p\>

)}

\</div\>

{/\* Описание \*/}

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"edit-desc\"\>Описание\</Label\>

\<Textarea

id=\"edit-desc\"

{\...register(\'description\')}

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

{/\* Категория \*/}

\<div className=\"space-y-2\"\>

\<Label\>Категория\</Label\>

\<CategorySelect value={categoryId} onChange={setCategoryId} /\>

\</div\>

{/\* Количество и минимум \*/}

\<div className=\"grid grid-cols-2 gap-4\"\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"edit-qty\"\>Количество\</Label\>

\<Input

id=\"edit-qty\"

type=\"number\"

min={0}

{\...register(\'quantity\', { valueAsNumber: true })}

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\<div className=\"space-y-2\"\>

\<Label htmlFor=\"edit-min\"\>Минимум ⚠️\</Label\>

\<Input

id=\"edit-min\"

type=\"number\"

min={0}

{\...register(\'min_quantity\', { valueAsNumber: true })}

className=\"bg-zinc-800 border-zinc-700\"

/\>

\</div\>

\</div\>

{/\* Фото \*/}

\<div className=\"space-y-2\"\>

\<Label\>Фотография\</Label\>

{imagePreview ? (

\<div className=\"relative\"\>

\<img

src={imagePreview}

alt=\"Preview\"

className=\"w-full max-h-48 object-cover rounded-lg\"

/\>

\<Button

type=\"button\"

variant=\"destructive\"

size=\"icon\"

className=\"absolute top-2 right-2 h-8 w-8\"

onClick={handleRemoveImage}

\>

\<Trash2 className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

) : (

\<label className=\"block\"\>

\<div className=\"border-2 border-dashed border-zinc-700 rounded-lg p-6
text-center hover:border-orange-500 transition-colors cursor-pointer\"\>

\<Camera className=\"w-8 h-8 text-zinc-500 mx-auto mb-2\" /\>

\<p className=\"text-sm text-zinc-400\"\>Добавить фото\</p\>

\</div\>

\<input

type=\"file\"

accept=\"image/\*\"

capture=\"environment\"

onChange={handleImageChange}

className=\"hidden\"

/\>

\</label\>

)}

{imagePreview && (

\<label className=\"block\"\>

\<Button type=\"button\" variant=\"outline\" className=\"w-full
border-zinc-700\"\>

\<Camera className=\"w-4 h-4 mr-2\" /\>

Заменить фото

\</Button\>

\<input

type=\"file\"

accept=\"image/\*\"

capture=\"environment\"

onChange={handleImageChange}

className=\"hidden\"

/\>

\</label\>

)}

\</div\>

{/\* Прогресс \*/}

{isUploading && (

\<div className=\"space-y-2\"\>

\<Progress value={uploadProgress} className=\"h-2\" /\>

\<p className=\"text-sm text-zinc-500
text-center\"\>Сохранение\...\</p\>

\</div\>

)}

\<Button

type=\"submit\"

className=\"w-full bg-orange-500 hover:bg-orange-600\"

disabled={isUploading}

\>

\<Save className=\"w-4 h-4 mr-2\" /\>

{isUploading ? \'Сохранение\...\' : \'Сохранить изменения\'}

\</Button\>

\</form\>

\</DialogContent\>

\</Dialog\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Форма открывается с предзаполненными данными

\- \[ \] Можно изменить все поля

\- \[ \] Можно заменить фото

\- \[ \] Можно удалить фото

\- \[ \] Можно изменить категорию

\- \[ \] Можно изменить минимальное количество

\- \[ \] Сохранение работает

\- \[ \] При смене item форма сбрасывается

\-\--

\-\--

\# ЭТАП 12: Уведомления о заканчивающихся вещах

\> ⏱ Ориентировочное время: \*\*3 часа\*\*

\-\--

\## Шаг 12.1 --- Хук для уведомлений

Создай \`/hooks/use-notifications.ts\`:

\`\`\`typescript

\'use client\'

import { useQuery, useMutation, useQueryClient } from
\'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { Notification } from \'@/lib/types\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { toast } from \'sonner\'

export function useNotifications() {

const { user } = useAuth()

const queryClient = useQueryClient()

const { data: notifications, isLoading } = useQuery({

queryKey: \[\'notifications\', user?.id\],

queryFn: async () =\> {

const { data, error } = await supabase

.from(\'notifications\')

.select(\`

\*,

item:items(id, name, quantity, min_quantity, container_id)

\`)

.eq(\'user_id\', user?.id)

.order(\'created_at\', { ascending: false })

.limit(50)

if (error) throw error

return data as (Notification & {

item: { id: string; name: string; quantity: number; min_quantity:
number; container_id: string }

})\[\]

},

enabled: !!user,

refetchInterval: 30000, // каждые 30 секунд

})

const unreadCount = notifications?.filter((n) =\> !n.is_read).length
\|\| 0

const markAsRead = useMutation({

mutationFn: async (id: string) =\> {

const { error } = await supabase

.from(\'notifications\')

.update({ is_read: true })

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

},

})

const markAllAsRead = useMutation({

mutationFn: async () =\> {

const { error } = await supabase

.from(\'notifications\')

.update({ is_read: true })

.eq(\'user_id\', user?.id)

.eq(\'is_read\', false)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

toast.success(\'Все уведомления прочитаны\')

},

})

const deleteNotification = useMutation({

mutationFn: async (id: string) =\> {

const { error } = await supabase

.from(\'notifications\')

.delete()

.eq(\'id\', id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

},

})

const clearAll = useMutation({

mutationFn: async () =\> {

const { error } = await supabase

.from(\'notifications\')

.delete()

.eq(\'user_id\', user?.id)

if (error) throw error

},

onSuccess: () =\> {

queryClient.invalidateQueries({ queryKey: \[\'notifications\'\] })

toast.success(\'Уведомления очищены\')

},

})

return {

notifications,

isLoading,

unreadCount,

markAsRead,

markAllAsRead,

deleteNotification,

clearAll,

}

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] Подсчёт непрочитанных работает

\- \[ \] Авто-обновление каждые 30 секунд

\- \[ \] mark/delete операции работают

\-\--

\## Шаг 12.2 --- NotificationProvider

Создай \`/components/providers/NotificationProvider.tsx\`:

\`\`\`typescript

\'use client\'

import { createContext, useContext, useEffect } from \'react\'

import { useNotifications } from \'@/hooks/use-notifications\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { toast } from \'sonner\'

import { supabase } from \'@/lib/supabase\'

interface NotificationContextType {

unreadCount: number

}

const NotificationContext = createContext\<NotificationContextType\>({

unreadCount: 0,

})

export function NotificationProvider({ children }: { children:
React.ReactNode }) {

const { user } = useAuth()

// Подписка на реалтайм уведомления

useEffect(() =\> {

if (!user) return

const channel = supabase

.channel(\'notifications\')

.on(

\'postgres_changes\',

{

event: \'INSERT\',

schema: \'public\',

table: \'notifications\',

filter: \`user_id=eq.\${user.id}\`,

},

(payload) =\> {

const notification = payload.new as any

toast.warning(notification.message, {

duration: 5000,

action: {

label: \'Посмотреть\',

onClick: () =\> {

window.location.href = \'/notifications\'

},

},

})

}

)

.subscribe()

return () =\> {

supabase.removeChannel(channel)

}

}, \[user\])

return (

\<NotificationContext.Provider value={{ unreadCount: 0 }}\>

{children}

\</NotificationContext.Provider\>

)

}

export const useNotificationContext = () =\>
useContext(NotificationContext)

\`\`\`

\### ✅ Проверка

\- \[ \] Провайдер создан

\- \[ \] Реалтайм подписка работает

\- \[ \] Toast показывается при новом уведомлении

\-\--

\## Шаг 12.3 --- Страница уведомлений

Создай \`/app/(protected)/notifications/page.tsx\`:

\`\`\`typescript

\'use client\'

import { useNotifications } from \'@/hooks/use-notifications\'

import { Button } from \'@/components/ui/button\'

import { Card, CardContent } from \'@/components/ui/card\'

import {

Bell, BellOff, AlertTriangle, Check, CheckCheck, Trash2, ExternalLink,

} from \'lucide-react\'

import { Skeleton } from \'@/components/ui/skeleton\'

import { motion, AnimatePresence } from \'framer-motion\'

import Link from \'next/link\'

import { cn } from \'@/lib/utils\'

export default function NotificationsPage() {

const {

notifications, isLoading, unreadCount,

markAsRead, markAllAsRead, deleteNotification, clearAll,

} = useNotifications()

if (isLoading) {

return (

\<div className=\"space-y-4\"\>

\<Skeleton className=\"h-8 w-48 bg-zinc-900\" /\>

{\[1, 2, 3\].map((i) =\> (

\<Skeleton key={i} className=\"h-24 w-full bg-zinc-900\" /\>

))}

\</div\>

)

}

return (

\<div className=\"space-y-6\"\>

{/\* Заголовок \*/}

\<div className=\"flex justify-between items-center\"\>

\<div\>

\<h1 className=\"text-2xl font-bold text-zinc-100\"\>Уведомления\</h1\>

{unreadCount \> 0 && (

\<p className=\"text-sm text-zinc-500\"\>

{unreadCount} непрочитанных

\</p\>

)}

\</div\>

\<div className=\"flex gap-2\"\>

{unreadCount \> 0 && (

\<Button

variant=\"outline\"

size=\"sm\"

onClick={() =\> markAllAsRead.mutate()}

className=\"border-zinc-700 text-xs\"

\>

\<CheckCheck className=\"w-4 h-4 mr-1\" /\>

Прочитать все

\</Button\>

)}

{notifications && notifications.length \> 0 && (

\<Button

variant=\"outline\"

size=\"sm\"

onClick={() =\> clearAll.mutate()}

className=\"border-zinc-700 text-xs text-red-400 hover:text-red-300\"

\>

\<Trash2 className=\"w-4 h-4 mr-1\" /\>

Очистить

\</Button\>

)}

\</div\>

\</div\>

{/\* Список \*/}

{notifications && notifications.length \> 0 ? (

\<motion.div layout className=\"space-y-3\"\>

\<AnimatePresence\>

{notifications.map((notif) =\> (

\<motion.div

key={notif.id}

initial={{ opacity: 0, x: -20 }}

animate={{ opacity: 1, x: 0 }}

exit={{ opacity: 0, x: 100 }}

\>

\<Card

className={cn(

\'bg-zinc-900 border-zinc-800 overflow-hidden\',

!notif.is_read && \'border-l-4 border-l-yellow-500\'

)}

\>

\<CardContent className=\"p-4\"\>

\<div className=\"flex items-start justify-between gap-3\"\>

\<div className=\"flex items-start gap-3 flex-1 min-w-0\"\>

\<AlertTriangle className=\"w-5 h-5 text-yellow-500 flex-shrink-0
mt-0.5\" /\>

\<div className=\"flex-1 min-w-0\"\>

\<p className={cn(

\'text-sm\',

notif.is_read ? \'text-zinc-400\' : \'text-zinc-100\'

)}\>

{notif.message}

\</p\>

\<p className=\"text-xs text-zinc-600 mt-1\"\>

{new Date(notif.created_at).toLocaleString(\'ru-RU\')}

\</p\>

\</div\>

\</div\>

\<div className=\"flex items-center gap-1 flex-shrink-0\"\>

{/\* Перейти к контейнеру \*/}

{notif.item && (

\<Link href={\`/container/\${notif.item.container_id}\`}\>

\<Button variant=\"ghost\" size=\"icon\" className=\"h-8 w-8
text-zinc-400 hover:text-orange-400\"\>

\<ExternalLink className=\"w-4 h-4\" /\>

\</Button\>

\</Link\>

)}

{/\* Отметить прочитанным \*/}

{!notif.is_read && (

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> markAsRead.mutate(notif.id)}

className=\"h-8 w-8 text-zinc-400 hover:text-green-400\"

\>

\<Check className=\"w-4 h-4\" /\>

\</Button\>

)}

{/\* Удалить \*/}

\<Button

variant=\"ghost\"

size=\"icon\"

onClick={() =\> deleteNotification.mutate(notif.id)}

className=\"h-8 w-8 text-zinc-400 hover:text-red-400\"

\>

\<Trash2 className=\"w-4 h-4\" /\>

\</Button\>

\</div\>

\</div\>

\</CardContent\>

\</Card\>

\</motion.div\>

))}

\</AnimatePresence\>

\</motion.div\>

) : (

\<div className=\"text-center py-16\"\>

\<BellOff className=\"w-16 h-16 text-zinc-700 mx-auto mb-4\" /\>

\<p className=\"text-zinc-500\"\>Нет уведомлений\</p\>

\<p className=\"text-sm text-zinc-600 mt-1\"\>

Установите минимальное количество для вещей, чтобы получать уведомления

\</p\>

\</div\>

)}

\</div\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Страница показывает список уведомлений

\- \[ \] Непрочитанные выделены жёлтой полосой

\- \[ \] Кнопка «Прочитать все» работает

\- \[ \] Кнопка перехода к контейнеру работает

\- \[ \] Удаление уведомлений работает

\- \[ \] Очистка всех уведомлений работает

\- \[ \] Бейдж в BottomNav обновляется

\-\--

\## Шаг 12.4 --- Проверка триггера low_stock

\*\*Тест:\*\*

1\. Создай вещь с \`quantity: 5\`, \`min_quantity: 3\`

2\. Уменьши количество до 3 (кнопкой −)

3\. Проверь: в таблице \`notifications\` должна появиться запись

4\. На странице \`/notifications\` должно появиться уведомление

5\. Toast должен показаться

\### ✅ Проверка

\- \[ \] Триггер срабатывает при \`quantity \<= min_quantity\`

\- \[ \] Уведомление не дублируется (пока не прочитано)

\- \[ \] Toast с кнопкой «Посмотреть»

\-\--

\-\--

\# ЭТАП 13: Оффлайн-режим и Синхронизация

\> ⏱ Ориентировочное время: \*\*5 часов\*\*

\-\--

\## Шаг 13.1 --- Хук для отслеживания онлайн-статуса

Создай \`/hooks/use-online-status.ts\`:

\`\`\`typescript

\'use client\'

import { useState, useEffect } from \'react\'

export function useOnlineStatus(): boolean {

const \[isOnline, setIsOnline\] = useState(true)

useEffect(() =\> {

// Инициализация

setIsOnline(navigator.onLine)

const handleOnline = () =\> setIsOnline(true)

const handleOffline = () =\> setIsOnline(false)

window.addEventListener(\'online\', handleOnline)

window.addEventListener(\'offline\', handleOffline)

return () =\> {

window.removeEventListener(\'online\', handleOnline)

window.removeEventListener(\'offline\', handleOffline)

}

}, \[\])

return isOnline

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] Реагирует на включение/выключение Wi-Fi

\- \[ \] В DevTools → Network → Offline переключение работает

\-\--

\## Шаг 13.2 --- Оффлайн хранилище (IndexedDB)

Создай \`/lib/offline-store.ts\`:

\`\`\`typescript

import { get, set, del, keys, entries, clear } from \'idb-keyval\'

const PENDING_OPS_PREFIX = \'pending_op\_\'

const CACHE_PREFIX = \'cache\_\'

// =============================================

// КЭШИРОВАНИЕ ДАННЫХ

// =============================================

export async function cacheData(key: string, data: unknown):
Promise\<void\> {

await set(\`\${CACHE_PREFIX}\${key}\`, {

data,

timestamp: Date.now(),

})

}

export async function getCachedData\<T\>(key: string): Promise\<T \|
null\> {

const cached = await get(\`\${CACHE_PREFIX}\${key}\`)

if (!cached) return null

return cached.data as T

}

export async function clearCache(): Promise\<void\> {

const allKeys = await keys()

for (const key of allKeys) {

if (String(key).startsWith(CACHE_PREFIX)) {

await del(key)

}

}

}

// =============================================

// ОЧЕРЕДЬ ОПЕРАЦИЙ (OFFLINE QUEUE)

// =============================================

export interface OfflineOperation {

id: string

operation: \'insert\' \| \'update\' \| \'delete\'

table: string

recordId?: string

payload: Record\<string, unknown\>

timestamp: number

}

export async function addPendingOperation(op: Omit\<OfflineOperation,
\'id\' \| \'timestamp\'\>): Promise\<void\> {

const id = crypto.randomUUID()

await set(\`\${PENDING_OPS_PREFIX}\${id}\`, {

\...op,

id,

timestamp: Date.now(),

})

}

export async function getPendingOperations():
Promise\<OfflineOperation\[\]\> {

const allEntries = await entries()

const ops: OfflineOperation\[\] = \[\]

for (const \[key, value\] of allEntries) {

if (String(key).startsWith(PENDING_OPS_PREFIX)) {

ops.push(value as OfflineOperation)

}

}

// Сортируем по времени создания

return ops.sort((a, b) =\> a.timestamp - b.timestamp)

}

export async function removePendingOperation(id: string):
Promise\<void\> {

await del(\`\${PENDING_OPS_PREFIX}\${id}\`)

}

export async function getPendingCount(): Promise\<number\> {

const allKeys = await keys()

return allKeys.filter((key) =\>
String(key).startsWith(PENDING_OPS_PREFIX)).length

}

export async function clearPendingOperations(): Promise\<void\> {

const allKeys = await keys()

for (const key of allKeys) {

if (String(key).startsWith(PENDING_OPS_PREFIX)) {

await del(key)

}

}

}

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] Функции кэширования работают

\- \[ \] Очередь операций работает

\- \[ \] Сортировка по timestamp

\-\--

\## Шаг 13.3 --- Менеджер синхронизации

Создай \`/lib/sync-manager.ts\`:

\`\`\`typescript

import { supabase } from \'./supabase\'

import {

getPendingOperations,

removePendingOperation,

OfflineOperation,

} from \'./offline-store\'

import { toast } from \'sonner\'

export async function syncPendingOperations(): Promise\<{

synced: number

failed: number

}\> {

const operations = await getPendingOperations()

if (operations.length === 0) {

return { synced: 0, failed: 0 }

}

let synced = 0

let failed = 0

for (const op of operations) {

try {

await executeSyncOperation(op)

await removePendingOperation(op.id)

synced++

} catch (error) {

console.error(\`Failed to sync operation \${op.id}:\`, error)

failed++

}

}

if (synced \> 0) {

toast.success(\`Синхронизировано: \${synced} операций\`)

}

if (failed \> 0) {

toast.error(\`Не удалось синхронизировать: \${failed} операций\`)

}

return { synced, failed }

}

async function executeSyncOperation(op: OfflineOperation):
Promise\<void\> {

switch (op.operation) {

case \'insert\': {

const { error } = await supabase

.from(op.table)

.insert(op.payload)

if (error) throw error

break

}

case \'update\': {

if (!op.recordId) throw new Error(\'No recordId for update\')

const { error } = await supabase

.from(op.table)

.update(op.payload)

.eq(\'id\', op.recordId)

if (error) throw error

break

}

case \'delete\': {

if (!op.recordId) throw new Error(\'No recordId for delete\')

const { error } = await supabase

.from(op.table)

.delete()

.eq(\'id\', op.recordId)

if (error) throw error

break

}

default:

throw new Error(\`Unknown operation: \${op.operation}\`)

}

}

\`\`\`

\### ✅ Проверка

\- \[ \] Файл создан

\- \[ \] Операции выполняются в правильном порядке

\- \[ \] Успешные операции удаляются из очереди

\- \[ \] Неудачные остаются для повторной попытки

\- \[ \] Toast-ы показывают результат

\-\--

\## Шаг 13.4 --- Оффлайн провайдер

Создай \`/components/providers/OfflineProvider.tsx\`:

\`\`\`typescript

\'use client\'

import { createContext, useContext, useEffect, useState, useCallback }
from \'react\'

import { useOnlineStatus } from \'@/hooks/use-online-status\'

import { syncPendingOperations } from \'@/lib/sync-manager\'

import { getPendingCount } from \'@/lib/offline-store\'

import { toast } from \'sonner\'

import { useQueryClient } from \'@tanstack/react-query\'

interface OfflineContextType {

isOnline: boolean

pendingCount: number

isSyncing: boolean

syncNow: () =\> Promise\<void\>

}

const OfflineContext = createContext\<OfflineContextType\>({

isOnline: true,

pendingCount: 0,

isSyncing: false,

syncNow: async () =\> {},

})

export function OfflineProvider({ children }: { children:
React.ReactNode }) {

const isOnline = useOnlineStatus()

const \[pendingCount, setPendingCount\] = useState(0)

const \[isSyncing, setIsSyncing\] = useState(false)

const queryClient = useQueryClient()

// Обновляем счётчик pending операций

const refreshPendingCount = useCallback(async () =\> {

const count = await getPendingCount()

setPendingCount(count)

}, \[\])

// Синхронизация

const syncNow = useCallback(async () =\> {

if (!isOnline \|\| isSyncing) return

setIsSyncing(true)

try {

const { synced } = await syncPendingOperations()

if (synced \> 0) {

// Инвалидируем все запросы чтобы обновить данные

queryClient.invalidateQueries()

}

} finally {

setIsSyncing(false)

await refreshPendingCount()

}

}, \[isOnline, isSyncing, queryClient, refreshPendingCount\])

// Автоматическая синхронизация при восстановлении сети

useEffect(() =\> {

if (isOnline) {

toast.success(\'Интернет восстановлен\', { duration: 2000 })

syncNow()

} else {

toast.warning(\'Нет интернета --- работаем оффлайн\', { duration: 3000
})

}

}, \[isOnline\]) // syncNow не добавляем в deps чтобы не было
бесконечного цикла

// Периодическая проверка pending операций

useEffect(() =\> {

refreshPendingCount()

const interval = setInterval(refreshPendingCount, 5000)

return () =\> clearInterval(interval)

}, \[refreshPendingCount\])

// Периодическая попытка синхронизации

useEffect(() =\> {

if (!isOnline) return

const interval = setInterval(() =\> {

if (pendingCount \> 0) syncNow()

}, 30000) // каждые 30 секунд

return () =\> clearInterval(interval)

}, \[isOnline, pendingCount, syncNow\])

return (

\<OfflineContext.Provider

value={{ isOnline, pendingCount, isSyncing, syncNow }}

\>

{children}

\</OfflineContext.Provider\>

)

}

export const useOffline = () =\> useContext(OfflineContext)

\`\`\`

\### ✅ Проверка

\- \[ \] Провайдер создан

\- \[ \] Toast при потере/восстановлении интернета

\- \[ \] Автосинхронизация при восстановлении сети

\- \[ \] Периодическая синхронизация каждые 30 секунд

\- \[ \] Счётчик pending операций обновляется

\-\--

\## Шаг 13.5 --- Хук для оффлайн-операций с вещами

Создай \`/hooks/use-offline.ts\`:

\`\`\`typescript

\'use client\'

import { useCallback } from \'react\'

import { useOnlineStatus } from \'./use-online-status\'

import { useQueryClient } from \'@tanstack/react-query\'

import { supabase } from \'@/lib/supabase\'

import { addPendingOperation, cacheData, getCachedData } from
\'@/lib/offline-store\'

import { Item } from \'@/lib/types\'

import { toast } from \'sonner\'

export function useOfflineItems(containerId: string) {

const isOnline = useOnlineStatus()

const queryClient = useQueryClient()

/\*\*

\* Обновление количества --- работает оффлайн

\*/

const offlineUpdateQuantity = useCallback(

async (itemId: string, newQuantity: number, userId: string) =\> {

if (isOnline) {

// Онлайн --- обычный запрос

const { error } = await supabase

.from(\'items\')

.update({ quantity: newQuantity })

.eq(\'id\', itemId)

if (error) throw error

} else {

// Оффлайн --- сохраняем в очередь

await addPendingOperation({

operation: \'update\',

table: \'items\',

recordId: itemId,

payload: { quantity: newQuantity },

})

// Обновляем кэш локально (optimistic update)

queryClient.setQueryData(

\[\'items\', containerId\],

(old: Item\[\] \| undefined) =\> {

if (!old) return old

return old.map((item) =\>

item.id === itemId ? { \...item, quantity: newQuantity } : item

)

}

)

toast.info(\'Сохранено оффлайн --- синхронизируется автоматически\')

}

queryClient.invalidateQueries({ queryKey: \[\'items\', containerId\] })

},

\[isOnline, containerId, queryClient\]

)

/\*\*

\* Создание вещи --- работает оффлайн (без фото)

\*/

const offlineCreateItem = useCallback(

async (itemData: Partial\<Item\>, userId: string) =\> {

if (isOnline) {

const { error } = await supabase

.from(\'items\')

.insert({ \...itemData, user_id: userId, container_id: containerId })

if (error) throw error

} else {

const tempId = crypto.randomUUID()

await addPendingOperation({

operation: \'insert\',

table: \'items\',

payload: {

\...itemData,

id: tempId,

user_id: userId,

container_id: containerId,

},

})

// Optimistic update

queryClient.setQueryData(

\[\'items\', containerId\],

(old: Item\[\] \| undefined) =\> {

const newItem: Item = {

id: tempId,

container_id: containerId,

user_id: userId,

category_id: (itemData.category_id as string) \|\| null,

name: itemData.name \|\| \'\',

description: itemData.description \|\| null,

quantity: itemData.quantity \|\| 1,

min_quantity: itemData.min_quantity \|\| 0,

image_url: null, // фото оффлайн не поддерживается

created_at: new Date().toISOString(),

updated_at: new Date().toISOString(),

}

return \[newItem, \...(old \|\| \[\])\]

}

)

toast.info(\'Вещь сохранена оффлайн (без фото)\')

}

},

\[isOnline, containerId, queryClient\]

)

/\*\*

\* Удаление вещи --- работает оффлайн

\*/

const offlineDeleteItem = useCallback(

async (itemId: string) =\> {

if (isOnline) {

const { error } = await supabase

.from(\'items\')

.delete()

.eq(\'id\', itemId)

if (error) throw error

} else {

await addPendingOperation({

operation: \'delete\',

table: \'items\',

recordId: itemId,

payload: {},

})

// Optimistic update --- удаляем из кэша

queryClient.setQueryData(

\[\'items\', containerId\],

(old: Item\[\] \| undefined) =\> {

if (!old) return old

return old.filter((item) =\> item.id !== itemId)

}

)

toast.info(\'Удаление сохранено оффлайн\')

}

},

\[isOnline, containerId, queryClient\]

)

return {

offlineUpdateQuantity,

offlineCreateItem,

offlineDeleteItem,

}

}

\`\`\`

\### ✅ Проверка

\- \[ \] Хук создан

\- \[ \] Онлайн --- обычный запрос к Supabase

\- \[ \] Оффлайн --- операция в IndexedDB + optimistic update

\- \[ \] Toast информирует о режиме

\- \[ \] При восстановлении сети --- автосинхронизация

\-\--

\## Шаг 13.6 --- Service Worker для кэширования

Создай \`/public/sw.js\`:

\`\`\`javascript

const CACHE_NAME = \'garage-os-v1\'

const OFFLINE_URL = \'/\'

// Ресурсы для предзагрузки

const PRECACHE_URLS = \[

\'/\',

\'/search\',

\'/scanner\',

\'/notifications\',

\'/settings\',

\'/manifest.json\',

\]

// Установка

self.addEventListener(\'install\', (event) =\> {

event.waitUntil(

caches.open(CACHE_NAME).then((cache) =\> {

return cache.addAll(PRECACHE_URLS)

})

)

self.skipWaiting()

})

// Активация --- очистка старых кэшей

self.addEventListener(\'activate\', (event) =\> {

event.waitUntil(

caches.keys().then((cacheNames) =\> {

return Promise.all(

cacheNames

.filter((name) =\> name !== CACHE_NAME)

.map((name) =\> caches.delete(name))

)

})

)

self.clients.claim()

})

// Перехват запросов

self.addEventListener(\'fetch\', (event) =\> {

const { request } = event

// Пропускаем запросы к Supabase API

if (request.url.includes(\'supabase.co\')) {

return

}

// Пропускаем POST/PUT/DELETE запросы

if (request.method !== \'GET\') {

return

}

event.respondWith(

// Стратегия: Network First, fallback to Cache

fetch(request)

.then((response) =\> {

// Кэшируем успешный ответ

if (response.status === 200) {

const responseClone = response.clone()

caches.open(CACHE_NAME).then((cache) =\> {

cache.put(request, responseClone)

})

}

return response

})

.catch(async () =\> {

// Нет сети --- отдаём из кэша

const cachedResponse = await caches.match(request)

if (cachedResponse) {

return cachedResponse

}

// Для навигации --- отдаём главную страницу

if (request.mode === \'navigate\') {

const cachedHome = await caches.match(\'/\')

if (cachedHome) return cachedHome

}

return new Response(\'Offline\', { status: 503 })

})

)

})

\`\`\`

\### ✅ Проверка

\- \[ \] Service Worker файл создан

\- \[ \] Страницы кэшируются

\- \[ \] Оффлайн --- приложение открывается

\- \[ \] API запросы не кэшируются SW (обрабатываются через IndexedDB)

\-\--

\## Шаг 13.7 --- Регистрация Service Worker

Добавь в \`/app/layout.tsx\` (внутри \`\<body\>\`, после \`\<Toaster
/\>\`):

\`\`\`typescript

\<script

dangerouslySetInnerHTML={{

\_\_html: \`

if (\'serviceWorker\' in navigator) {

navigator.serviceWorker.register(\'/sw.js\')

.then(reg =\> console.log(\'SW registered:\', reg.scope))

.catch(err =\> console.error(\'SW registration failed:\', err))

}

\`,

}}

/\>

\`\`\`

\### ✅ Проверка

\- \[ \] SW регистрируется (DevTools → Application → Service Workers)

\- \[ \] Кэш создан (DevTools → Application → Cache Storage)

\-\--

\## Шаг 13.8 --- Индикатор синхронизации в Header

Обнови \`/components/layout/Header.tsx\` --- добавь информацию о
pending:

\`\`\`typescript

\'use client\'

import { useAuth } from \'@/components/providers/AuthProvider\'

import { supabase } from \'@/lib/supabase\'

import { Button } from \'@/components/ui/button\'

import { LogOut, WifiOff, RefreshCw, CloudOff } from \'lucide-react\'

import { useRouter } from \'next/navigation\'

import { useOnlineStatus } from \'@/hooks/use-online-status\'

import { useOffline } from \'@/components/providers/OfflineProvider\'

export function Header() {

const { user } = useAuth()

const router = useRouter()

const isOnline = useOnlineStatus()

const { pendingCount, isSyncing, syncNow } = useOffline()

const handleLogout = async () =\> {

await supabase.auth.signOut()

router.push(\'/login\')

}

return (

\<header className=\"sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md
border-b border-zinc-800 px-4 py-3\"\>

\<div className=\"max-w-md mx-auto flex justify-between items-center\"\>

\<div className=\"flex items-center gap-2\"\>

\<h1 className=\"text-xl font-bold text-orange-500\"\>GarageOS\</h1\>

{/\* Оффлайн индикатор \*/}

{!isOnline && (

\<div className=\"flex items-center gap-1 bg-yellow-500/20
text-yellow-500 px-2 py-0.5 rounded-full text-xs\"\>

\<WifiOff className=\"w-3 h-3\" /\>

\<span\>Оффлайн\</span\>

\</div\>

)}

{/\* Pending операции \*/}

{pendingCount \> 0 && (

\<button

onClick={() =\> isOnline && syncNow()}

className=\"flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2
py-0.5 rounded-full text-xs hover:bg-blue-500/30 transition-colors\"

disabled={isSyncing \|\| !isOnline}

\>

{isSyncing ? (

\<RefreshCw className=\"w-3 h-3 animate-spin\" /\>

) : (

\<CloudOff className=\"w-3 h-3\" /\>

)}

\<span\>{pendingCount}\</span\>

\</button\>

)}

\</div\>

{user && (

\<Button variant=\"ghost\" size=\"icon\" onClick={handleLogout}\>

\<LogOut className=\"w-5 h-5 text-zinc-400\" /\>

\</Button\>

)}

\</div\>

\</header\>

)

}

\`\`\`

\### ✅ Проверка

\- \[ \] Показывает «Оффлайн» когда нет сети

\- \[ \] Показывает количество pending операций

\- \[ \] Клик запускает синхронизацию

\- \[ \] Спиннер при синхронизации

\- \[ \] Бейдж исчезает когда всё синхронизировано

\-\--

\## Шаг 13.9 --- Полный тест оффлайн-режима

\### Сценарий тестирования:

1\. \*\*Открой приложение онлайн\*\*, убедись что данные загрузились

2\. \*\*Включи авиарежим\*\* (или DevTools → Network → Offline)

3\. \*\*Проверь Header\*\* --- должен показать «Оффлайн»

4\. \*\*Открой контейнер\*\* --- данные должны быть (из кэша React
Query)

5\. \*\*Измени количество\*\* вещи (кнопка +/−)

\- Toast: «Сохранено оффлайн»

\- Header: появится бейдж «1»

6\. \*\*Добавь вещь\*\* (без фото)

\- Toast: «Вещь сохранена оффлайн (без фото)»

\- Вещь появится в списке (optimistic update)

\- Header: бейдж «2»

7\. \*\*Включи интернет обратно\*\*

\- Toast: «Интернет восстановлен»

\- Toast: «Синхронизировано: 2 операций»

\- Бейдж в Header исчезнет

8\. \*\*Перезагрузи страницу\*\* --- данные должны сохраниться

\### ✅ Проверка

\- \[ \] Приложение работает оффлайн

\- \[ \] Количество вещей меняется оффлайн

\- \[ \] Создание вещей работает оффлайн (без фото)

\- \[ \] Удаление вещей работает оффлайн

\- \[ \] При восстановлении сети --- автосинхронизация

\- \[ \] Данные не теряются

\- \[ \] Нет дублей после синхронизации

\- \[ \] Ошибки синхронизации показываются пользователю

\-\--

\-\--

\# 🎉 ИТОГ v2.0

\## Что реализовано

\| Функция \| Статус \|

\|\-\-\-\-\-\-\-\--\|\-\-\-\-\-\-\--\|

\| Авторизация через email \| ✅ \|

\| CRUD контейнеров \| ✅ \|

\| CRUD вещей с фото \| ✅ \|

\| QR-коды для контейнеров \| ✅ \|

\| Сканирование QR камерой \| ✅ \|

\| Глобальный поиск с debounce \| ✅ \|

\| PWA (установка на телефон) \| ✅ \|

\| Анимации и современный UI \| ✅ \|

\| \*\*Категории вещей (CRUD, цвета, предустановленные)\*\* \| ✅ \|

\| \*\*Редактирование вещей (все поля, фото, категория)\*\* \| ✅ \|

\| \*\*Уведомления о заканчивающихся вещах (триггер, реалтайм)\*\* \| ✅
\|

\| \*\*Оффлайн-режим (IndexedDB, очередь, auto-sync)\*\* \| ✅ \|

\-\--

\## Архитектура оффлайн

\`\`\`

┌─────────────────────────────────┐

│ Пользователь │

│ (React + Next.js) │

├────────────┬────────────────────┤

│ Онлайн │ Оффлайн │

│ Supabase │ IndexedDB │

│ напрямую │ + Pending Queue │

├────────────┴────────────────────┤

│ OfflineProvider │

│ ┌───────────────────────┐ │

│ │ useOnlineStatus() │ │

│ │ syncPendingOps() │ │

│ │ optimistic updates │ │

│ └───────────────────────┘ │

├─────────────────────────────────┤

│ Service Worker │

│ (кэширование страниц/assets) │

└─────────────────────────────────┘

\`\`\`

\-\--

\## Архитектура уведомлений

\`\`\`

┌───────────────────┐

│ items UPDATE │

│ quantity \<= min │

├───────────────────┤

│ PostgreSQL │

│ TRIGGER │──→ INSERT INTO notifications

├───────────────────┤

│ Supabase │

│ Realtime │──→ NotificationProvider

├───────────────────┤ │

│ Toast + Badge │◀──┘

│ в BottomNav │

└───────────────────┘

\`\`\`

\-\--

\> \*\*GarageOS v2.0 --- полнофункциональное PWA с оффлайн-режимом!
🛠️\*\*

\>

\> \*Версия документа: 2.0 \| 2024\*

\`\`\`
