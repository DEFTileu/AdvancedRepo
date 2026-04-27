# Travel MVP

A demo travel app combining **car-sharing** (Anytime-style) and **accommodation rental** (Krisha-style) for Almaty, Kazakhstan. Tourists arrive, see a map, grab a nearby car, and book a place to stay — optionally as a one-click combo.

## Features

- 🗺️ Interactive map with car + apartment pins (Leaflet + OpenStreetMap)
- 🚗 Car listing, detail page, and hourly booking
- 🏠 Apartment listing, detail page, and per-night booking
- 🔗 **Combo booking** — recommended car + place in one flow
- 🧠 Smart recommendation (highest-rated available pair)
- 🌍 Multi-language UI: English / Русский / Қазақша
- 📱 Mobile-first responsive layout

## Stack

- Spring Boot 4 + Thymeleaf (server-rendered HTML)
- Java 17, Gradle (Kotlin DSL)
- Spring Security (form login + BCrypt) — bookings tied to logged-in users
- PostgreSQL 16 (auto-seeded with mock data on first startup)
- Tailwind CSS via CDN, Leaflet via CDN — no frontend build step
- Spring i18n via `messages_*.properties`

## Quick start

### Option 1 — Docker (recommended)

From the repo root:

```bash
docker compose up --build
```

Brings up Postgres + the app together. Open http://localhost:8080.

### Option 2 — Local Gradle (Postgres still required)

```bash
docker compose up -d postgres   # docker Postgres on host port 15432
cd src/backend
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:15432/travel \
  ./gradlew bootRun
```

The host port for docker Postgres is **15432** to avoid clashing with any local Postgres on 5432. Inside `docker compose up --build` the app talks to `postgres:5432` over the internal network, so the host port mapping is irrelevant in that case.

## Demo login

An admin account is seeded on first startup. Sign in to add cars and apartments via `/admin`:

- **Username:** `admin`
- **Password:** `admin1234`

Regular users can register at `/register` and book whatever the admin has published.

## Endpoints

| Path | Description |
|---|---|
| `/` | Map (main screen) |
| `/cars` · `/cars/{id}` | Car catalog & detail |
| `/apartments` · `/apartments/{id}` | Stays catalog & detail |
| `/combo` | Suggested car + stay combo |
| `/bookings` · `/bookings/{id}` | Booking history & confirmation |
| `/lang/{en\|ru\|kk}` | Switch language |
| `/login` · `/register` · `/logout` | Auth |
| `/api/markers/cars` · `/api/markers/apartments` | JSON for map pins |

## Project layout

```
src/backend/
  src/main/java/com/travel/
    domain/      JPA entities (Car, Apartment, Booking)
    repo/        Spring Data repositories
    service/     Business logic + recommendation engine
    web/         Controllers + DTOs
    config/      WebMvcConfigurer, data seeder, city props
  src/main/resources/
    templates/   Thymeleaf views (map, cars, apartments, combo, bookings)
    messages*.properties   i18n bundles (EN/RU/KK)
    application.yml
  Dockerfile
docker-compose.yml
```

## Notes

- Only the `admin` account is seeded on first startup. The catalog starts empty — sign in as admin and use `/admin` to add cars and apartments. Listings, bookings, registrations and availability flips persist in Postgres across restarts (`pg_data` volume).
- Each car/apartment has an image stored as base64 in the database. The `Add new` form has a Leaflet map — click anywhere on it to drop the location pin.
- To wipe state: `docker compose down -v` then `up --build` again.
- Payments are simulated — every booking is immediately marked `CONFIRMED`.
