import {
  products as seedProducts,
  inventory as seedInventory,
  shipments as seedShipments,
  dispatches as seedDispatches,
  orders as seedOrders,
  vehicles as seedVehicles,
  drivers as seedDrivers,
  marketers as seedMarketers,
} from '../data'
import type { Product, InventoryItem, Shipment, Dispatch, Order, Vehicle, Driver, Marketer } from '../types'
import { isSupabaseConfigured, supabase } from './supabase'
import type {
  ProductRow,
  InventoryRow,
  ShipmentRow,
  DispatchRow,
  OrderRow,
  VehicleRow,
  DriverRow,
  MarketerRow,
} from '../database.types'

export type FleetFlowData = {
  products: Product[]
  inventory: InventoryItem[]
  shipments: Shipment[]
  dispatches: Dispatch[]
  orders: Order[]
  vehicles: Vehicle[]
  drivers: Driver[]
  marketers: Marketer[]
}

export type FleetFlowDataSource = 'supabase' | 'mock'
export type CollectionName = keyof FleetFlowData

const seeds: FleetFlowData = {
  products: seedProducts,
  inventory: seedInventory,
  shipments: seedShipments,
  dispatches: seedDispatches,
  orders: seedOrders,
  vehicles: seedVehicles,
  drivers: seedDrivers,
  marketers: seedMarketers,
}

const fromProduct = (row: ProductRow): Product => ({
  id: row.id, name: row.name, brand: row.brand, code: row.code, category: row.category,
  packageSize: row.package_size, unit: row.unit, batch: row.batch, expiry: row.expiry,
  reorderLevel: row.reorder_level, image: row.image,
})
const toProduct = (item: Product): ProductRow => ({
  id: item.id, name: item.name, brand: item.brand, code: item.code, category: item.category,
  package_size: item.packageSize, unit: item.unit, batch: item.batch, expiry: item.expiry,
  reorder_level: item.reorderLevel, image: item.image,
})
const fromInventory = (row: InventoryRow): InventoryItem => ({
  id: row.id, productId: row.product_id, opening: row.opening, incoming: row.incoming,
  outgoing: row.outgoing, damaged: row.damaged, reserved: row.reserved, available: row.available,
  location: row.location, lastUpdated: row.last_updated,
})
const toInventory = (item: InventoryItem): InventoryRow => ({
  id: item.id, product_id: item.productId, opening: item.opening, incoming: item.incoming,
  outgoing: item.outgoing, damaged: item.damaged, reserved: item.reserved, available: item.available,
  location: item.location, last_updated: item.lastUpdated,
})
const fromShipment = (row: ShipmentRow): Shipment => ({
  id: row.id, supplier: row.supplier, driver: row.driver, vehicle: row.vehicle, arrival: row.arrival,
  expected: row.expected, received: row.received, damaged: row.damaged, status: row.status as Shipment['status'], qr: row.qr,
})
const toShipment = (item: Shipment): ShipmentRow => ({
  id: item.id, supplier: item.supplier, driver: item.driver, vehicle: item.vehicle, arrival: item.arrival,
  expected: item.expected, received: item.received, damaged: item.damaged, status: item.status, qr: item.qr,
})
const fromDispatch = (row: DispatchRow): Dispatch => ({
  id: row.id, marketer: row.marketer, product: row.product, quantity: row.quantity, vehicle: row.vehicle,
  driver: row.driver, dispatched: row.dispatched, destination: row.destination, status: row.status as Dispatch['status'],
})
const toDispatch = (item: Dispatch): DispatchRow => ({
  id: item.id, marketer: item.marketer, product: item.product, quantity: item.quantity, vehicle: item.vehicle,
  driver: item.driver, dispatched: item.dispatched, destination: item.destination, status: item.status,
})
const fromOrder = (row: OrderRow): Order => ({
  id: row.id, marketer: row.marketer, items: row.items, amount: Number(row.amount), created: row.created,
  delivery: row.delivery, status: row.status as Order['status'], priority: row.priority as Order['priority'],
})
const toOrder = (item: Order): OrderRow => ({
  id: item.id, marketer: item.marketer, items: item.items, amount: item.amount, created: item.created,
  delivery: item.delivery, status: item.status, priority: item.priority,
})
const fromVehicle = (row: VehicleRow): Vehicle => ({
  id: row.id, registration: row.registration, type: row.type, driver: row.driver, capacity: row.capacity,
  status: row.status as Vehicle['status'], trips: row.trips, maintenance: row.maintenance, location: row.location, eta: row.eta,
})
const toVehicle = (item: Vehicle): VehicleRow => ({
  id: item.id, registration: item.registration, type: item.type, driver: item.driver, capacity: item.capacity,
  status: item.status, trips: item.trips, maintenance: item.maintenance, location: item.location, eta: item.eta,
})
const fromDriver = (row: DriverRow): Driver => ({
  id: row.id, name: row.name, phone: row.phone, license: row.license, vehicle: row.vehicle, trips: row.trips,
  deliveries: row.deliveries, rating: Number(row.rating), status: row.status as Driver['status'], avatar: row.avatar,
})
const toDriver = (item: Driver): DriverRow => ({
  id: item.id, name: item.name, phone: item.phone, license: item.license, vehicle: item.vehicle, trips: item.trips,
  deliveries: item.deliveries, rating: item.rating, status: item.status, avatar: item.avatar,
})
const fromMarketer = (row: MarketerRow): Marketer => ({
  id: row.id, name: row.name, phone: row.phone, area: row.area, orders: row.orders, revenue: Number(row.revenue),
  status: row.status as Marketer['status'], avatar: row.avatar,
})
const toMarketer = (item: Marketer): MarketerRow => ({
  id: item.id, name: item.name, phone: item.phone, area: item.area, orders: item.orders, revenue: item.revenue,
  status: item.status, avatar: item.avatar,
})

const mappers: Record<CollectionName, (row: any) => any> = {
  products: fromProduct,
  inventory: fromInventory,
  shipments: fromShipment,
  dispatches: fromDispatch,
  orders: fromOrder,
  vehicles: fromVehicle,
  drivers: fromDriver,
  marketers: fromMarketer,
}
const serializers: Record<CollectionName, (item: any) => any> = {
  products: toProduct,
  inventory: toInventory,
  shipments: toShipment,
  dispatches: toDispatch,
  orders: toOrder,
  vehicles: toVehicle,
  drivers: toDriver,
  marketers: toMarketer,
}

async function readCollection<K extends CollectionName>(name: K): Promise<{ rows: FleetFlowData[K]; connected: boolean }> {
  if (!supabase || !isSupabaseConfigured) return { rows: seeds[name], connected: false }
  const { data, error } = await (supabase as any).from(name).select('*').order('id')
  if (error || !data) return { rows: seeds[name], connected: false }
  return { rows: data.map(mappers[name]) as FleetFlowData[K], connected: true }
}

export async function loadFleetFlowData(): Promise<{ data: FleetFlowData; source: FleetFlowDataSource }> {
  const entries = await Promise.all((Object.keys(seeds) as CollectionName[]).map(async name => [name, await readCollection(name)] as const))
  const data = { ...seeds } as FleetFlowData
  let connected = false
  for (const [name, result] of entries) {
    data[name] = result.rows as never
    connected = connected || result.connected
  }
  return { data, source: connected ? 'supabase' : 'mock' }
}

export async function persistCollection<K extends CollectionName>(name: K, previous: FleetFlowData[K], next: FleetFlowData[K]): Promise<void> {
  if (!supabase || !isSupabaseConfigured) return
  const previousIds = new Set(previous.map(item => item.id))
  const nextIds = new Set(next.map(item => item.id))
  const removed = [...previousIds].filter(id => !nextIds.has(id))
  if (removed.length) await (supabase as any).from(name).delete().in('id', removed)
  if (next.length) await (supabase as any).from(name).upsert(next.map(serializers[name]), { onConflict: 'id' })
}
