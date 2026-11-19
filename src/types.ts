export type Status = 'Active' | 'Inactive' | 'Pending' | 'In Transit' | 'Delivered' | 'Approved' | 'Rejected' | 'Available' | 'Maintenance' | 'On Route' | 'Completed' | 'Verified' | 'Received'

export interface Product { id:string; name:string; brand:string; code:string; category:string; packageSize:string; unit:string; batch:string; expiry:string; reorderLevel:number; image:string }
export interface InventoryItem { id:string; productId:string; opening:number; incoming:number; outgoing:number; damaged:number; reserved:number; available:number; location:string; lastUpdated:string }
export interface Shipment { id:string; supplier:string; driver:string; vehicle:string; arrival:string; expected:number; received:number; damaged:number; status:Status; qr:string }
export interface Dispatch { id:string; marketer:string; product:string; quantity:number; vehicle:string; driver:string; dispatched:string; destination:string; status:Status }
export interface Order { id:string; marketer:string; items:number; amount:number; created:string; delivery:string; status:Status; priority:'High'|'Medium'|'Low' }
export interface Vehicle { id:string; registration:string; type:string; driver:string; capacity:string; status:Status; trips:number; maintenance:string; location:string; eta:string }
export interface Driver { id:string; name:string; phone:string; license:string; vehicle:string; trips:number; deliveries:number; rating:number; status:Status; avatar:string }
export interface Marketer { id:string; name:string; phone:string; area:string; orders:number; revenue:number; status:Status; avatar:string }
export interface Activity { id:string; title:string; detail:string; time:string; tone:'blue'|'green'|'amber'|'red' }
