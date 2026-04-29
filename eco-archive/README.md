# 🌿 Eco Archive

A **sustainable digital library** where students can upload, browse, and download study notes — built with green web design principles to minimize energy consumption.

---

## 🌍 Why "Eco"?

Most websites waste energy with heavy frameworks, autoplay videos, and bloated CSS. Eco Archive is different:

- 🌑 **Dark mode by default** — saves power on OLED/AMOLED screens
- 📦 **No heavy frameworks** — hand-written CSS under 5KB (no Tailwind CDN, no Bootstrap)
- ⚡ **Low-Data mode** — one click hides all images and videos
- 🔤 **System fonts only** — zero font download requests
- 📝 **Text-first** — designed for study notes, not media-heavy content

---

## ✨ Features

- 📤 Upload study notes (PDF, images, documents)
- 🔍 Browse and search resources by subject or file type
- ⬇️ Download resources with a download counter
- 👤 User registration and login
- 🛡️ Admin panel to manage users and resources
- 🌙 Dark / Light mode toggle (preference saved)
- ⚡ Low-Data mode toggle
- 🗑️ Delete your own uploads

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Templating | EJS |
| Database | MySQL |
| Auth | bcryptjs, express-session |
| File Uploads | Multer |
| Styling | Custom CSS (no frameworks) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL 8+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Manik2110/eco-archive.git
cd eco-archive

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DB credentials

# 4. Initialize the database
npm run init-db

# 5. Start the server
node server.js
```

Visit **http://localhost:3000**

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_NAME=eco_archive
DB_PASSWORD=your_db_password
SESSION_SECRET=any_random_secret_string
```

---

## 👤 Default Admin Account

```
Email:    admin@eco.com
Password: admin123
```

> Change this immediately after first login.

---

## 📁 Project Structure

```
eco-archive/
├── server.js
├── config/db.js
├── middleware/auth.js
├── routes/
│   ├── home.js
│   ├── auth.js
│   ├── resources.js
│   └── admin.js
├── setup/
│   ├── database.sql
│   └── init-db.js
├── public/
│   ├── css/style.css
│   └── js/app.js
└── views/
    ├── partials/
    ├── home.ejs
    ├── browse.ejs
    ├── upload.ejs
    ├── dashboard.ejs
    └── admin.ejs
```

---

## 📄 License

MIT — free to use and modify.
