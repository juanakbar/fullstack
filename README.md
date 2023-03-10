## Getting Started
clone dulu repository git ini
```bash
git clone https://github.com/juanakbar/fullstack.git petshop/
```
Setelah clone Repository ini jalankan perintah menggunakan terminal
```bash
cd petshop/
composer install
```
Setelah selesai  jalankan perintah beirkut
```bash
cp env.example .env
```
Setelah meng-Copy File .env lakukan konfigurasi pada didalam file tersebut
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_service
DB_USERNAME=root
DB_PASSWORD=root
```
Host dan port nya sesuaikan dengan mysql anda dan ketikan perintah
```bash
php artisan migrate:fresh
```
lalu genereta key
```bash
 php artisan key:generate
```
Lalu, ketikan:

```bash
npm install
```
seteleh itu buka 2 terminal di folder petshop

Setelah itu diterminal pertama, ketikan:

```bash
npm run dev
```
seteleh selesai Jalankan perintah migrasi dan seed database di terminal ke dua
```php
php artisan migrate:fresh --seed
```
seteleh selesai Jalankan development server laravel
```php
php artisan artisan serve
```

dan akses melalu 127.0.0.1:8000
