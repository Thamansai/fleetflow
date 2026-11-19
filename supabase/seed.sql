-- FleetFlow seed data. Re-running this file is safe because every insert is idempotent.

insert into public.products (id, name, brand, code, category, package_size, unit, batch, expiry, reorder_level, image) values
('p1','Thums Up','Coca-Cola','BEV-THM-250','Cola','250 ml','Crate','THM-24-08','2026-08-31',80,'🥤'),
('p2','Sprite','Coca-Cola','BEV-SPR-250','Lemon Lime','250 ml','Crate','SPR-24-07','2026-07-18',90,'🍋'),
('p3','Coca-Cola','Coca-Cola','BEV-COK-300','Cola','300 ml','Crate','COK-24-09','2026-09-20',100,'🥤'),
('p4','Fanta Orange','Coca-Cola','BEV-FAN-250','Orange','250 ml','Crate','FAN-24-06','2026-06-11',70,'🍊'),
('p5','Limca','Coca-Cola','BEV-LIM-250','Lemon Lime','250 ml','Crate','LIM-24-05','2026-05-28',60,'🍈'),
('p6','Kinley Water','Kinley','WTR-KIN-1000','Water','1 L','Case','KIN-24-10','2027-01-12',120,'💧')
on conflict (id) do nothing;

insert into public.inventory (id, product_id, opening, incoming, outgoing, damaged, reserved, available, location, last_updated) values
('i1','p1',420,180,260,4,32,304,'A-01-03','Today, 09:42'),
('i2','p2',520,240,410,7,48,295,'A-02-01','Today, 09:38'),
('i3','p3',680,320,380,3,65,552,'A-01-01','Today, 09:18'),
('i4','p4',280,80,210,2,18,130,'B-01-02','Yesterday, 17:32'),
('i5','p5',180,50,145,1,12,72,'B-02-03','Yesterday, 16:20'),
('i6','p6',760,420,520,6,82,654,'C-01-01','Today, 08:55')
on conflict (id) do nothing;

insert into public.shipments (id, supplier, driver, vehicle, arrival, expected, received, damaged, status, qr) values
('IN-240918','Coca-Cola Beverages Pvt. Ltd.','Rakesh Kumar','MH 12 AB 4832','Today, 10:30 am',640,640,4,'Verified','QR-IN-240918'),
('IN-240917','Kinley Distribution Hub','Vijay Singh','MH 14 CZ 0921','Today, 08:15 am',420,420,0,'Received','QR-IN-240917'),
('IN-240916','Coca-Cola Beverages Pvt. Ltd.','Amit Patil','MH 12 XY 6744','Yesterday, 04:45 pm',520,514,6,'Received','QR-IN-240916'),
('IN-240915','Regional Beverage Depot','Suresh Yadav','MH 43 Q 2210','Yesterday, 01:20 pm',300,0,0,'Pending','QR-IN-240915')
on conflict (id) do nothing;

insert into public.dispatches (id, marketer, product, quantity, vehicle, driver, dispatched, destination, status) values
('OUT-0821','Neha Traders','Sprite + Thums Up',210,'MH 12 AB 4832','Rakesh Kumar','Today, 09:55 am','Kothrud, Pune','On Route'),
('OUT-0820','Shree Retail Network','Coca-Cola + Fanta',180,'MH 14 CZ 0921','Vijay Singh','Today, 08:50 am','Hadapsar, Pune','Delivered'),
('OUT-0819','FreshMart Wholesale','Kinley Water',260,'MH 12 XY 6744','Amit Patil','Yesterday, 05:40 pm','Wakad, Pune','Delivered'),
('OUT-0818','Sai Supermarket','Thums Up + Limca',145,'MH 43 Q 2210','Suresh Yadav','Yesterday, 03:15 pm','Baner, Pune','Completed')
on conflict (id) do nothing;

insert into public.orders (id, marketer, items, amount, created, delivery, status, priority) values
('ORD-1042','Neha Traders',5,84200,'18 Sep 2024','19 Sep 2024','Approved','High'),
('ORD-1041','Shree Retail Network',3,63800,'18 Sep 2024','19 Sep 2024','Pending','Medium'),
('ORD-1040','FreshMart Wholesale',8,128500,'17 Sep 2024','18 Sep 2024','In Transit','High'),
('ORD-1039','Sai Supermarket',4,42750,'17 Sep 2024','18 Sep 2024','Delivered','Low'),
('ORD-1038','City Corner Stores',2,28600,'16 Sep 2024','17 Sep 2024','Rejected','Low')
on conflict (id) do nothing;

insert into public.vehicles (id, registration, type, driver, capacity, status, trips, maintenance, location, eta) values
('v1','MH 12 AB 4832','Tata 407','Rakesh Kumar','2.5 T','On Route',18,'28 Sep 2024','Kothrud','22 min'),
('v2','MH 14 CZ 0921','Ashok Leyland Dost','Vijay Singh','1.5 T','Available',22,'02 Oct 2024','Warehouse','—'),
('v3','MH 12 XY 6744','Tata Ace','Amit Patil','1.0 T','Completed',14,'19 Sep 2024','Wakad','Arrived'),
('v4','MH 43 Q 2210','Mahindra Bolero','Suresh Yadav','1.2 T','Maintenance',9,'Due today','Service Bay','—')
on conflict (id) do nothing;

insert into public.drivers (id, name, phone, license, vehicle, trips, deliveries, rating, status, avatar) values
('d1','Rakesh Kumar','+91 98765 43210','MH12 20150012345','MH 12 AB 4832',18,164,4.8,'Active','RK'),
('d2','Vijay Singh','+91 98220 77654','MH14 20170098765','MH 14 CZ 0921',22,198,4.9,'Active','VS'),
('d3','Amit Patil','+91 97654 23891','MH12 20160234567','MH 12 XY 6744',14,121,4.7,'Active','AP'),
('d4','Suresh Yadav','+91 98900 11223','MH43 20180034567','MH 43 Q 2210',9,86,4.5,'Inactive','SY')
on conflict (id) do nothing;

insert into public.marketers (id, name, phone, area, orders, revenue, status, avatar) values
('m1','Neha Traders','+91 98231 77821','Kothrud, Pune',42,842000,'Active','NT'),
('m2','Shree Retail Network','+91 97654 44219','Hadapsar, Pune',36,715500,'Active','SR'),
('m3','FreshMart Wholesale','+91 98902 11654','Wakad, Pune',28,548200,'Active','FW'),
('m4','Sai Supermarket','+91 98220 11888','Baner, Pune',19,337850,'Inactive','SS')
on conflict (id) do nothing;
