**Project Documentation: Lightweight Scheduling System**

---

### Overview

This is a lightweight scheduling system built using the following stack:

* **Frontend:** React.js with Bootstrap
* **Backend:** Node.js with Express
* **Database:** MySQL

The system enables users to set their availability and generate shareable booking links for others to reserve time slots. The solution focuses on conflict-free time-based booking, with a minimal and efficient user interface.

---

### Features

**1. User Availability Panel:**

* Users can select a date and define a start and end time for availability.
* After saving, a list of the selected availability slots appears (stored locally, not persisted across refresh).
* A unique booking link is generated using UUID, which can be shared with clients.

**2. Public Booking Page:**

* Anyone with a valid booking link can view available time slots for future dates.
* Booked slots are hidden to prevent double-booking.
* Users can select a time slot and book it. The system will validate and save the booking.

**3. Error Handling & Validation:**

* Invalid booking links show a 404 page.
* Server and client-side validation is enforced.
* Booking conflicts are prevented.

---

### Database Schema & SQL Queries

Run these queries in MySQL to set up your database:

```sql
CREATE DATABASE IF NOT EXISTS scheduler_app;
USE scheduler_app;

CREATE TABLE room (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  user_limit INT
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE booking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE map_booking_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  user_id INT,
  url VARCHAR(255),
  FOREIGN KEY (booking_id) REFERENCES booking(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### How to Run Locally

**1. Backend:**

```bash
cd backend
npm install
node index.js
```

**2. Frontend:**

```bash
cd frontend
npm install
npm start
```

---

### Notes

* You can create new users via the `/api/users` endpoint.
* Availability is added via `/api/availability`.
* Bookings are handled via `/api/booking`.

Let me know if you'd like to connect authentication, integrate email confirmations, or host it publicly.

---

**Submitted by:** \[Your Name]
**Date:** \[Submission Date]
**Repository:** \[GitHub Link]
