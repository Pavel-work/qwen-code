export interface Profile {
  id: string
  email: string | null
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
  description: string | null
  created_at: string
}

export interface Item {
  id: string
  container_id: string
  user_id: string
  category_id: string | null
  name: string
  description: string | null
  quantity: number
  min_quantity: number
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface ItemWithRelations extends Item {
  container?: Container
  category?: Category | null
}

export interface Notification {
  id: string
  user_id: string
  item_id: string
  type: 'low_stock' | 'info'
  message: string
  is_read: boolean
  created_at: string
  item?: Item
}

export interface PendingOperation {
  id: string
  user_id: string
  operation: 'insert' | 'update' | 'delete'
  table_name: string
  record_id: string | null
  payload: Record<string, unknown>
  status: 'pending' | 'synced' | 'failed'
  created_at: string
  synced_at: string | null
}

// Предустановленные категории
export const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'user_id' | 'created_at'>[] = [
  { name: 'Инструменты', color: '#f97316', icon: 'wrench' },
  { name: 'Крепёж', color: '#3b82f6', icon: 'nail' },
  { name: 'Электрика', color: '#eab308', icon: 'zap' },
  { name: 'Сантехника', color: '#06b6d4', icon: 'droplets' },
  { name: 'Расходники', color: '#8b5cf6', icon: 'package' },
  { name: 'Автозапчасти', color: '#ef4444', icon: 'car' },
  { name: 'Садовый инвентарь', color: '#22c55e', icon: 'trees' },
  { name: 'Разное', color: '#6b7280', icon: 'box' },
]

// Цвета для выбора категории
export const CATEGORY_COLORS = [
  '#f97316', '#ef4444', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899',
  '#6b7280', '#d946ef',
]
