import { Product, InventoryItem, Shipment, Dispatch, Order, Vehicle, Driver, Marketer, Activity } from './types'

export const products: Product[] = [
  {id:'p1',name:'Thums Up',brand:'Coca-Cola',code:'BEV-THM-250',category:'Cola',packageSize:'250 ml',unit:'Crate',batch:'THM-24-08',expiry:'2026-08-31',reorderLevel:80,image:'🥤'},
  {id:'p2',name:'Sprite',brand:'Coca-Cola',code:'BEV-SPR-250',category:'Lemon Lime',packageSize:'250 ml',unit:'Crate',batch:'SPR-24-07',expiry:'2026-07-18',reorderLevel:90,image:'🍋'},
  {id:'p3',name:'Coca-Cola',brand:'Coca-Cola',code:'BEV-COK-300',category:'Cola',packageSize:'300 ml',unit:'Crate',batch:'COK-24-09',expiry:'2026-09-20',reorderLevel:100,image:'🥤'},
  {id:'p4',name:'Fanta Orange',brand:'Coca-Cola',code:'BEV-FAN-250',category:'Orange',packageSize:'250 ml',unit:'Crate',batch:'FAN-24-06',expiry:'2026-06-11',reorderLevel:70,image:'🍊'},
  {id:'p5',name:'Limca',brand:'Coca-Cola',code:'BEV-LIM-250',category:'Lemon Lime',packageSize:'250 ml',unit:'Crate',batch:'LIM-24-05',expiry:'2026-05-28',reorderLevel:60,image:'🍈'},
  {id:'p6',name:'Kinley Water',brand:'Kinley',code:'WTR-KIN-1000',category:'Water',packageSize:'1 L',unit:'Case',batch:'KIN-24-10',expiry:'2027-01-12',reorderLevel:120,image:'💧'},
]
export const inventory: InventoryItem[] = [
  {id:'i1',productId:'p1',opening:420,incoming:180,outgoing:260,damaged:4,reserved:32,available:304,location:'A-01-03',lastUpdated:'Today, 09:42'},
  {id:'i2',productId:'p2',opening:520,incoming:240,outgoing:410,damaged:7,reserved:48,available:295,location:'A-02-01',lastUpdated:'Today, 09:38'},
  {id:'i3',productId:'p3',opening:680,incoming:320,outgoing:380,damaged:3,reserved:65,available:552,location:'A-01-01',lastUpdated:'Today, 09:18'},
  {id:'i4',productId:'p4',opening:280,incoming:80,outgoing:210,damaged:2,reserved:18,available:130,location:'B-01-02',lastUpdated:'Yesterday, 17:32'},
  {id:'i5',productId:'p5',opening:180,incoming:50,outgoing:145,damaged:1,reserved:12,available:72,location:'B-02-03',lastUpdated:'Yesterday, 16:20'},
  {id:'i6',productId:'p6',opening:760,incoming:420,outgoing:520,damaged:6,reserved:82,available:654,location:'C-01-01',lastUpdated:'Today, 08:55'},
]
export const shipments: Shipment[] = [
  {id:'IN-240918',supplier:'Coca-Cola Beverages Pvt. Ltd.',driver:'Rakesh Kumar',vehicle:'MH 12 AB 4832',arrival:'Today, 10:30 am',expected:640,received:640,damaged:4,status:'Verified',qr:'QR-IN-240918'},
  {id:'IN-240917',supplier:'Kinley Distribution Hub',driver:'Vijay Singh',vehicle:'MH 14 CZ 0921',arrival:'Today, 08:15 am',expected:420,received:420,damaged:0,status:'Received',qr:'QR-IN-240917'},
  {id:'IN-240916',supplier:'Coca-Cola Beverages Pvt. Ltd.',driver:'Amit Patil',vehicle:'MH 12 XY 6744',arrival:'Yesterday, 04:45 pm',expected:520,received:514,damaged:6,status:'Received',qr:'QR-IN-240916'},
  {id:'IN-240915',supplier:'Regional Beverage Depot',driver:'Suresh Yadav',vehicle:'MH 43 Q 2210',arrival:'Yesterday, 01:20 pm',expected:300,received:0,damaged:0,status:'Pending',qr:'QR-IN-240915'},
]
export const dispatches: Dispatch[] = [
  {id:'OUT-0821',marketer:'Neha Traders',product:'Sprite + Thums Up',quantity:210,vehicle:'MH 12 AB 4832',driver:'Rakesh Kumar',dispatched:'Today, 09:55 am',destination:'Kothrud, Pune',status:'On Route'},
  {id:'OUT-0820',marketer:'Shree Retail Network',product:'Coca-Cola + Fanta',quantity:180,vehicle:'MH 14 CZ 0921',driver:'Vijay Singh',dispatched:'Today, 08:50 am',destination:'Hadapsar, Pune',status:'Delivered'},
  {id:'OUT-0819',marketer:'FreshMart Wholesale',product:'Kinley Water',quantity:260,vehicle:'MH 12 XY 6744',driver:'Amit Patil',dispatched:'Yesterday, 05:40 pm',destination:'Wakad, Pune',status:'Delivered'},
  {id:'OUT-0818',marketer:'Sai Supermarket',product:'Thums Up + Limca',quantity:145,vehicle:'MH 43 Q 2210',driver:'Suresh Yadav',dispatched:'Yesterday, 03:15 pm',destination:'Baner, Pune',status:'Completed'},
]
export const orders: Order[] = [
  {id:'ORD-1042',marketer:'Neha Traders',items:5,amount:84200,created:'18 Sep 2024',delivery:'19 Sep 2024',status:'Approved',priority:'High'},
  {id:'ORD-1041',marketer:'Shree Retail Network',items:3,amount:63800,created:'18 Sep 2024',delivery:'19 Sep 2024',status:'Pending',priority:'Medium'},
  {id:'ORD-1040',marketer:'FreshMart Wholesale',items:8,amount:128500,created:'17 Sep 2024',delivery:'18 Sep 2024',status:'In Transit',priority:'High'},
  {id:'ORD-1039',marketer:'Sai Supermarket',items:4,amount:42750,created:'17 Sep 2024',delivery:'18 Sep 2024',status:'Delivered',priority:'Low'},
  {id:'ORD-1038',marketer:'City Corner Stores',items:2,amount:28600,created:'16 Sep 2024',delivery:'17 Sep 2024',status:'Rejected',priority:'Low'},
]
export const vehicles: Vehicle[] = [
  {id:'v1',registration:'MH 12 AB 4832',type:'Tata 407',driver:'Rakesh Kumar',capacity:'2.5 T',status:'On Route',trips:18,maintenance:'28 Sep 2024',location:'Kothrud',eta:'22 min'},
  {id:'v2',registration:'MH 14 CZ 0921',type:'Ashok Leyland Dost',driver:'Vijay Singh',capacity:'1.5 T',status:'Available',trips:22,maintenance:'02 Oct 2024',location:'Warehouse',eta:'—'},
  {id:'v3',registration:'MH 12 XY 6744',type:'Tata Ace',driver:'Amit Patil',capacity:'1.0 T',status:'Completed',trips:14,maintenance:'19 Sep 2024',location:'Wakad',eta:'Arrived'},
  {id:'v4',registration:'MH 43 Q 2210',type:'Mahindra Bolero',driver:'Suresh Yadav',capacity:'1.2 T',status:'Maintenance',trips:9,maintenance:'Due today',location:'Service Bay',eta:'—'},
]
export const drivers: Driver[] = [
  {id:'d1',name:'Rakesh Kumar',phone:'+91 98765 43210',license:'MH12 20150012345',vehicle:'MH 12 AB 4832',trips:18,deliveries:164,rating:4.8,status:'Active',avatar:'RK'},
  {id:'d2',name:'Vijay Singh',phone:'+91 98220 77654',license:'MH14 20170098765',vehicle:'MH 14 CZ 0921',trips:22,deliveries:198,rating:4.9,status:'Active',avatar:'VS'},
  {id:'d3',name:'Amit Patil',phone:'+91 97654 23891',license:'MH12 20160234567',vehicle:'MH 12 XY 6744',trips:14,deliveries:121,rating:4.7,status:'Active',avatar:'AP'},
  {id:'d4',name:'Suresh Yadav',phone:'+91 98900 11223',license:'MH43 20180034567',vehicle:'MH 43 Q 2210',trips:9,deliveries:86,rating:4.5,status:'Inactive',avatar:'SY'},
]
export const marketers: Marketer[] = [
  {id:'m1',name:'Neha Traders',phone:'+91 98231 77821',area:'Kothrud, Pune',orders:42,revenue:842000,status:'Active',avatar:'NT'},
  {id:'m2',name:'Shree Retail Network',phone:'+91 97654 44219',area:'Hadapsar, Pune',orders:36,revenue:715500,status:'Active',avatar:'SR'},
  {id:'m3',name:'FreshMart Wholesale',phone:'+91 98902 11654',area:'Wakad, Pune',orders:28,revenue:548200,status:'Active',avatar:'FW'},
  {id:'m4',name:'Sai Supermarket',phone:'+91 98220 11888',area:'Baner, Pune',orders:19,revenue:337850,status:'Inactive',avatar:'SS'},
]
export const activities: Activity[] = [
  {id:'a1',title:'Shipment verified',detail:'IN-240918 • 640 crates received',time:'12 minutes ago',tone:'green'},
  {id:'a2',title:'Order approved',detail:'ORD-1042 • Neha Traders',time:'38 minutes ago',tone:'blue'},
  {id:'a3',title:'Low stock alert',detail:'Limca is below reorder level',time:'1 hour ago',tone:'amber'},
  {id:'a4',title:'Vehicle maintenance due',detail:'MH 43 Q 2210 needs service',time:'2 hours ago',tone:'red'},
]
export const weeklyFlow = [{day:'Mon',incoming:420,outgoing:380},{day:'Tue',incoming:510,outgoing:430},{day:'Wed',incoming:380,outgoing:510},{day:'Thu',incoming:620,outgoing:450},{day:'Fri',incoming:540,outgoing:580},{day:'Sat',incoming:680,outgoing:610},{day:'Sun',incoming:480,outgoing:390}]
