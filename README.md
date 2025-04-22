# 🧑‍💼 Online Job Portal

A complete web-based job portal system that allows users to register as **Job Seekers**, **Employers**, or **Admins**, and perform role-specific tasks like applying to jobs, posting jobs, and managing the system.

---

## 🚀 Features

### 👤 Job Seeker
- Register & Login
- View and apply for jobs
- View applications made

### 🧑‍💼 Employer
- Register & Login
- Post job listings
- View applicants for posted jobs

### 🛠️ Admin
- View total users, jobs, and applications
- Delete users and jobs from the admin dashboard

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Backend**: Node.js (Express)
- **Database**: MySQL
- **Tools**: MySQL Workbench, ERDPlus

---

## 🗃️ Database Schema

### Tables:
#### `users`
- `id` (PK)
- `name`
- `email`
- `password`
- `user_type` (job_seeker, employer, admin)

#### `jobs`
- `id` (PK)
- `title`
- `company`
- `description`
- `location`
- `salary`
- `posted_by` (FK → users.id)

#### `applications`
- `id` (PK)
- `job_id` (FK → jobs.id)
- `seeker_id` (FK → users.id)
- `application_date`

---

## 🔁 ER Diagram

Entities: `Users`, `Jobs`, `Applications`  
Relationships:  
- Users `posts` Jobs  
- Users `applies` Applications  
- Jobs `receives` Applications

> 

---

## 🔑 DB Concepts Covered

- ✅ Primary & Foreign Keys
- ✅ One-to-many Relationships
- ✅ Role-based Authorization
- ✅ Referential Integrity

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/online-job-portal.git
cd online-job-portal
2. Install Dependencies
```bash
npm install
3. Configure MySQL
Create a DB named job_portal

Import your SQL schema file

Update DB credentials in db.js

4. Run the Server
bash
Copy
Edit
node server.js
5. Open in Browser
arduino
Copy
Edit
http://localhost:3000
📁 Project Structure
pgsql
Copy
Edit
📁 public/             → HTML, CSS, JS frontend
📁 routes/             → Express routes
📁 db/                 → MySQL DB connection
📄 server.js           → Main backend logic
📄 README.md
👨‍🎓 Author
Name: Your Name

GitHub: @yourusername

📄 License
This project is for academic and educational use only.

yaml
Copy
Edit

---

Let me know if you want it:
- Downloadable as a `.md` file 📄
- With your name, GitHub link, and screenshots included ✨

Happy documenting!






You said:
give me your code editor 


ChatGPT said:
I can't directly give you a downloadable code editor like VS Code itself, but I can help you set everything up perfectly in your own editor. Here’s what you can do:

🛠️ Recommended Code Editor
✅ Visual Studio Code (VS Code)
It's lightweight, fast, and perfect for web development.

✅ Essential Extensions for Your Project
Once VS Code is installed, open the Extensions panel (Ctrl+Shift+X) and install:

🔹 ESLint – JavaScript/Node.js linting

🔹 Prettier – Auto-formatting

🔹 MySQL – DB integration

🔹 REST Client – Test APIs directly

🔹 Live Server – Preview your frontend

✅ Folder Setup in VS Code
plaintext
Copy
Edit
📁 online-job-portal
├── 📁 public
│   ├── index.html
│   ├── jobs.html
│   ├── post-job.html
│   ├── admin-dashboard.html
│   ├── my-applications.html
│   ├── view-applicants.html
│   └── script.js
├── 📁 routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── adminRoutes.js
├── 📁 db
│   └── db.js
├── server.js
├── README.md
└── package.json
🚀 How to Run Your Project
Open the root folder in VS Code

Open a terminal (Ctrl + ~)

Run:

bash
Copy
Edit
node server.js
Open browser at:

arduino
Copy
Edit
http://localhost:3000
If you want, I can also:

🎨 Build a VS Code settings.json file for styling

🧩 Help you create a .env for DB config

📦 Set up your package.json and nodemon
