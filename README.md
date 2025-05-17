## 🛠️ Setup Instructions

### 1️⃣ Copy `.env` File

Duplicate the environment file provided:

```bash
cp .env.example .env
```

### 2️⃣ Build Docker Containers

Build the application containers:

```bash
docker-compose build
```

### 3️⃣ Start Docker Containers

Start the containers in your terminal:

```bash
docker-compose up
```

Or start in detached mode:

```bash
docker-compose up -d
```

### 4️⃣ Access PHP Container

Enter the running PHP container:

```bash
docker-compose exec php-fpm bash
```

### 5️⃣ Navigate to Laravel Project Directory

Once inside the container, change directory to the Laravel project:

```bash
cd /var/www/html
```

### 6️⃣ Install PHP Dependencies

Install Laravel's PHP dependencies using Composer:

```bash
composer install
```

### 7️⃣ Generate Laravel Application Key

Generate a new app key for Laravel:

```bash
php artisan key:generate
```

### 8️⃣ Run Migrations with Seeding

Migrate the database and seed it with initial data:

```bash
php artisan migrate --seed
```

Your Backend API is available here: 

```
http://localhost
```
