
เบื้องต้น npm install ของทั้ง backend และ frontend แนะนำให้ลบอันเก่าออกแล้วติดตั้งใหม่ครับ
ผมใช้ nvm use node 16

Run Server.js | backend
ื- npm start

Server จะมี 4 ส่วน CRUD
1. GET endpoint to fetch movies (get /api/movies)
2. POST endpoint to add a movie (post /api/movies)
3. DELETE endpoint to delete a movie (delete /api/movies/:title)
4. UPDATE endpoint to update a movie (put /api/movies/:title)

Run Client | frontend
- npm start

ใช้งานเบื้องต้นสามารถใช้งานได้โดยการเลือก ใช้ ว่าจะเข้า Users ไหน 
มี Users ทั่วไปจะมี (เพิ่ม,อัพเดต,อ่านข้อมูล อยู่แล้ว)
- MANAGER (เฉพาะผู้ใช้ประเภท MANAGER เท่านั้นที่สามารถลบบันทึกภาพยนตร์ได้)
- TEAMLEADER
- FLOORSTAFF
