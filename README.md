# Kantin Kejujuran

Kantin kejujuran adalah website dimana pengguna dapat menjual suatu barang dan membelinya. Setiap barang yang dijual ataupun dibeli akan ditambahkan secara manual oleh pengguna di saldo utama (sesuai konsep kejujuran yang diusung).

Website ini dibuat dengan framework Next Js sebagai Frontend, Gin sebagai Backend, dan MongoDB sebagai database.

## Instalasi

Masuk ke folder /frontend

```bash
npm install
```
Masuk ke folder /backend

```bash
go get -u -v -f all
```

## Mempersiapkan environment
1. Membuat file .env di dalam folder /backend
2. Menyalin data berikut ini
```bash
MONGOURI=""
API_SECRET=""
TOKEN_HOUR_LIFESPAN=""
```
3. Pengisian Mongouri dapat dilakukan dengan cara berikut : 
  * Membuat akun di website MongoDB https://www.mongodb.com
  * Membuat database baru dengan nama bebas
  * Menghubungkan database dengan aplikasi lokal dengan cara memilih connect, kemudian memilih connect your application, memilih driver Go dan version 1.6 or later
  * Menyalin link yang didapatkan dan meletakannya di Mongouri
4. Pengisian API_SECRET berbentuk string dan TOKEN_HOUR_LIFESPAN berbentuk integer dibebaskan kepada pengguna

## Cara menjalankan
1. Masuk ke folder /backend, jalankan 
```bash
go run main.go
```
2. Masuk ke folder /frontend, jalankan
```bash
npm run dev
```
