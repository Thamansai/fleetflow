import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import {
  loadFleetFlowData,
  persistCollection,
  type CollectionName,
  type FleetFlowData,
  type FleetFlowDataSource,
} from '../services/fleetflow'
import { products, inventory, shipments, dispatches, orders, vehicles, drivers, marketers } from '../data'

function usePersistedCollection<K extends CollectionName>(
  name: K,
  initial: FleetFlowData[K],
): [FleetFlowData[K], Dispatch<SetStateAction<FleetFlowData[K]>>, Dispatch<SetStateAction<FleetFlowData[K]>>] {
  const [value, setValue] = useState(initial)
  const setPersistedValue = useCallback<Dispatch<SetStateAction<FleetFlowData[K]>>>((nextValue) => {
    setValue(previous => {
      const next = typeof nextValue === 'function'
        ? (nextValue as (previous: FleetFlowData[K]) => FleetFlowData[K])(previous)
        : nextValue
      void persistCollection(name, previous, next)
      return next
    })
  }, [name])
  return [value, setPersistedValue, setValue]
}

export function useFleetFlowData() {
  const [productsState, setProducts, hydrateProducts] = usePersistedCollection('products', products)
  const [inventoryState, , hydrateInventory] = usePersistedCollection('inventory', inventory)
  const [shipmentsState, setShipments, hydrateShipments] = usePersistedCollection('shipments', shipments)
  const [dispatchesState, setDispatches, hydrateDispatches] = usePersistedCollection('dispatches', dispatches)
  const [ordersState, setOrders, hydrateOrders] = usePersistedCollection('orders', orders)
  const [vehiclesState, setVehicles, hydrateVehicles] = usePersistedCollection('vehicles', vehicles)
  const [driversState, setDrivers, hydrateDrivers] = usePersistedCollection('drivers', drivers)
  const [marketersState, setMarketers, hydrateMarketers] = usePersistedCollection('marketers', marketers)
  const [source, setSource] = useState<FleetFlowDataSource>('mock')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    loadFleetFlowData().then(({ data, source: loadedSource }) => {
      if (!active) return
      hydrateProducts(data.products)
      hydrateInventory(data.inventory)
      hydrateShipments(data.shipments)
      hydrateDispatches(data.dispatches)
      hydrateOrders(data.orders)
      hydrateVehicles(data.vehicles)
      hydrateDrivers(data.drivers)
      hydrateMarketers(data.marketers)
      setSource(loadedSource)
      setLoading(false)
    }).catch(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [hydrateProducts, hydrateInventory, hydrateShipments, hydrateDispatches, hydrateOrders, hydrateVehicles, hydrateDrivers, hydrateMarketers])

  return {
    products: productsState,
    inventory: inventoryState,
    shipments: shipmentsState,
    dispatches: dispatchesState,
    orders: ordersState,
    vehicles: vehiclesState,
    drivers: driversState,
    marketers: marketersState,
    setProducts,
    setShipments,
    setDispatches,
    setOrders,
    setVehicles,
    setDrivers,
    setMarketers,
    source,
    loading,
  }
}
