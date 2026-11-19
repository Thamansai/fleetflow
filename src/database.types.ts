export type ProductRow = {
  id: string
  name: string
  brand: string
  code: string
  category: string
  package_size: string
  unit: string
  batch: string
  expiry: string
  reorder_level: number
  image: string
}

export type InventoryRow = {
  id: string
  product_id: string
  opening: number
  incoming: number
  outgoing: number
  damaged: number
  reserved: number
  available: number
  location: string
  last_updated: string
}

export type ShipmentRow = {
  id: string
  supplier: string
  driver: string
  vehicle: string
  arrival: string
  expected: number
  received: number
  damaged: number
  status: string
  qr: string
}

export type DispatchRow = {
  id: string
  marketer: string
  product: string
  quantity: number
  vehicle: string
  driver: string
  dispatched: string
  destination: string
  status: string
}

export type OrderRow = {
  id: string
  marketer: string
  items: number
  amount: number
  created: string
  delivery: string
  status: string
  priority: string
}

export type VehicleRow = {
  id: string
  registration: string
  type: string
  driver: string
  capacity: string
  status: string
  trips: number
  maintenance: string
  location: string
  eta: string
}

export type DriverRow = {
  id: string
  name: string
  phone: string
  license: string
  vehicle: string
  trips: number
  deliveries: number
  rating: number
  status: string
  avatar: string
}

export type MarketerRow = {
  id: string
  name: string
  phone: string
  area: string
  orders: number
  revenue: number
  status: string
  avatar: string
}

export interface Database {
  public: {
    Tables: {
      products: { Row: ProductRow; Insert: ProductRow; Update: Partial<ProductRow> }
      inventory: { Row: InventoryRow; Insert: InventoryRow; Update: Partial<InventoryRow> }
      shipments: { Row: ShipmentRow; Insert: ShipmentRow; Update: Partial<ShipmentRow> }
      dispatches: { Row: DispatchRow; Insert: DispatchRow; Update: Partial<DispatchRow> }
      orders: { Row: OrderRow; Insert: OrderRow; Update: Partial<OrderRow> }
      vehicles: { Row: VehicleRow; Insert: VehicleRow; Update: Partial<VehicleRow> }
      drivers: { Row: DriverRow; Insert: DriverRow; Update: Partial<DriverRow> }
      marketers: { Row: MarketerRow; Insert: MarketerRow; Update: Partial<MarketerRow> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
