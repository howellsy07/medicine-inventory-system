# Medicine Inventory System

A laboratory-exam project that combines a **Laravel 12 REST API**, an **Eloquent/SQLite database**, and a **React + Vite + React Router** single-page application.

## Included requirements

- Default login screen with protected routes
- Required credentials: `pharmacist` / `med123`
- Medicine List, Add Medicine, and Medicine Details screens
- Fixed bottom-right add button on the list screen
- Client-side and Laravel server-side inline validation
- Loading, empty, and API error states
- REST endpoints for listing, creating, and viewing medicines
- Data persistence through Eloquent and SQLite (not browser memory)
- Responsive purple interface based on the CCS112 Task Manager design
- Laravel feature tests for persistence, validation, list, and detail endpoints

## Project structure

```text
medicine-inventory-system/
├── app/                    # Laravel controllers and Eloquent model
├── database/               # Medicine migration and sample seeder
├── routes/api.php          # REST API routes
├── tests/Feature/          # Backend feature tests
└── frontend/               # React/Vite single-page application
```

## First-time setup (PowerShell)

From the folder where you want to keep the project:

```powershell
git clone https://github.com/howellsy07/medicine-inventory-system.git
cd medicine-inventory-system

composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -Force
php artisan migrate --seed

cd frontend
npm install
```

## Run the system

Open **two PowerShell windows** in the project.

Terminal 1 — Laravel API:

```powershell
cd medicine-inventory-system
php artisan serve
```

Terminal 2 — React frontend:

```powershell
cd medicine-inventory-system\frontend
npm run dev
```

Open `http://localhost:5173` and log in using:

- Username: `pharmacist`
- Password: `med123`

The Vite development server forwards `/api` requests to Laravel at `http://127.0.0.1:8000`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/medicines` | Load all medicine records |
| POST | `/api/medicines` | Validate and save a medicine |
| GET | `/api/medicines/{id}` | Load one medicine's full details |

## Run the checks

```powershell
php artisan test
cd frontend
npm run build
```

For the PDF submission, capture these five screenshots after the app is running:

1. Failed login with the inline error message
2. Medicine List showing the persistent sample medicine
3. Add Medicine form with all fields filled before saving
4. Medicine Details after the new record is saved
5. Medicine List after closing and reopening both servers

Created by **John Howell J. Sy** for CCS112.
