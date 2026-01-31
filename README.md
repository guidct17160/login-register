Login / Register (Node.js + PostgreSQL)
-
โปรเจคนี้เป็นระบบ Login/Register ที่มี Authentication เพื่อความปลอดภัย
-
ประกอบด้วย Register / Login / JWT / Forgot Password / Reset Password / HashPassword
ใช้ Database เป็นตัว Postgres

แยกเป็น 2 Folder
-
Backend
-
Node.js
Express.js
JWT(jsonwebtoken)
bcrypt
dotenv
cors (จะได้เชื่อม Frontend ได้)

Frontend
-
HTML
CSS
JavaScript

How to run
-
Download in cmd
-
code .
npm init -y
npm i nodemon --save-dev
npm i express pg dotenv jsonwebtoken bcrypt 

How to run
-
เปิด VSCode และ download ตัว Live Five Server
เปิดไฟล์ .html กดคลิ้กขวาและเลือก Open with Five Server
และสมารถเล่นได้เลยครับ
<img width="1057" height="524" alt="image" src="https://github.com/user-attachments/assets/ec068a88-bd07-406d-85af-88c8fd9b7413" />



Server จะ run ที่ : http://localhost:3000
-
Test API โดย ใช้ Postman
-
POST register/การสมัครสมาชิก
-
ใส่ : http://localhost:3000/register
<img width="1090" height="880" alt="image" src="https://github.com/user-attachments/assets/c35c7036-40c8-45fb-ad7c-8aa65443b908" />

POST login/การเข้าสู่ระบบ
-
ใส่ : http://localhost:3000/login
<img width="1092" height="879" alt="image" src="https://github.com/user-attachments/assets/0eb70c00-e88b-4c98-8ef4-18a2ace01c0b" />
จะเห็นว่าจะได้ token มาเพื่อเป็นการยืนยันตัวตน

GET ดูว่า login อยู่มั้ย
-
ใส่ : http://localhost:3000/profile
ไปที่ Headers และใส่ Authorization เป็น token ที่ได้มาจากการ login ต้องมี Bearer อยู่ข้างหน้า 
<img width="1093" height="928" alt="image" src="https://github.com/user-attachments/assets/d54bcb01-8c20-4a9e-adff-5cdda8923b7f" />


GET ดูข้อมูลการสมัคร
-
ใส่ : http://localhost:3000/
<img width="1088" height="926" alt="image" src="https://github.com/user-attachments/assets/cd649174-1387-46bd-a70e-d2e452b4550d" />

POST ลืมรหัส
-
ใส่ : http://localhost:3000/forgot-password
<img width="1094" height="929" alt="image" src="https://github.com/user-attachments/assets/3da7b21c-37b7-4ecd-ba42-c73513ceef26" />
Token นี้จะอยู่ได้ 15 นาที
<img width="243" height="88" alt="image" src="https://github.com/user-attachments/assets/dde194f5-4bd0-43bf-a659-2fb1f6b66673" />

POST รีเซ็ตรหัส
-
ใส่ : http://localhost:3000/reset-password
นำ Token ที่ได้จากการลืมรหัสมา
<img width="1089" height="929" alt="image" src="https://github.com/user-attachments/assets/fed5adf2-18ea-4d5a-bdae-73a63b55f2f8" />

GET ลอง Update รหัสผ่านใหม่
-
ใส่ : http://localhost:3000/login
ใส่รหัสที่พึ่งสร้างมาใหม่
<img width="1085" height="922" alt="image" src="https://github.com/user-attachments/assets/e1e26a39-98cc-4d0b-9d3d-219211e0a145" />
ถ้าใส่รหัสเก่ามันจะขึ้นแบบนี้
<img width="1087" height="923" alt="image" src="https://github.com/user-attachments/assets/6d5ce304-2d82-4719-b217-9782c561486b" />













