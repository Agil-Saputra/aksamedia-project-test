# SIMPEN - Sistem Manajemen Pengguna

SIMPEN (Sistem Manajemen Pengguna) adalah aplikasi manajemen pengguna berbasis web yang dibangun dengan React dan Tailwind CSS.

## ✨ Fitur

- **Autentikasi Pengguna** - Sistem login/logout 
- **Manajemen Pengguna** - Operasi CRUD data pengguna
- **Analitik Dashboard** - Gambaran statistik 
- **Manajemen Profil** - Kemampuan melihat dan mengedit profil pengguna
- **Desain Responsif** - sepenuhnya responsif untuk desktop, tablet dan mobile


### Framework Frontend

- **React 19.1.0** - React terbaru dengan hooks dan fitur modern
- **React Router DOM 7.6.3** - Routing dan navigasi sisi klien
- **Vite 7.0.4** - Build tool cepat dan server pengembangan

### Styling & Desain
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **PostCSS 8.5.6** - Pemrosesan dan optimasi CSS
- **Autoprefixer 10.4.21** - Penambahan prefix vendor otomatis

### Tools Pengembangan
- **ESLint 9.30.1** - Linting kode dan jaminan kualitas
- **Vite Plugin React 4.6.0** - Integrasi React untuk Vite

## 📁 Struktur Project

```
src/
├── components/         
│   ├── navbar.jsx     
│   ├── sidebar.jsx     
│   ├── pagination.jsx  
│   ├── user-filters.jsx 
│   ├── user-row.jsx   
│   ├── theme-dropdown.jsx
│   ├── user-dropdown.jsx  
│   └── protected-route.jsx 
├── context/           
│   ├── auth-context.jsx
│   └── theme-context.jsx 
├── layout/            
│   └── admin-layout.jsx 
├── pages/              
│   ├── login.jsx     
│   ├── dashboard.jsx   
│   ├── users.jsx       
│   └── profile.jsx   
└── assets/             
    └── react.svg      
```



### Pre-requisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn package manager

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/Agil-Saputra/aksamedia-project-test.git
   cd aksamedia-project-test
   ```

2. **Install dependency**
   ```bash
   npm install
   ```

3. **Jalankan server dev**
   ```bash
   npm run dev
   ```

4. **Buka browser**
    Buka halaman ini:  `http://localhost:5173`


## 📄 Lisensi

Proyek ini adalah bagian dari proyek tes magang untuk Aksamedia.

## 👨‍💻 Developer

**Agil Saputra**  
Proyek Magang - Aksamedia

*Dibangun dengan ❤️ oleh agil*
