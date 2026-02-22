# Equipment Management System

Equipment Management System is a backend service for tracking, issuing, and managing company equipment with confirmation and accountability control.

The system provides transparent asset assignment and prevents untracked usage of company resources.

---

## Overview

The system supports:

- Equipment registry management  
- User management  
- Equipment issuing workflow  
- Confirmation of equipment acceptance  
- Assignment history tracking  

Each equipment issuance requires explicit confirmation from the user.

---

## Technology Stack

- Python (FastAPI)  
- PostgreSQL  
- SQLAlchemy (Async)  
- REST API  

Optional:

- WebSocket for real-time notifications  

---

## Core Entities

### User

- id  
- surname  
- name  
- father_name  
- email  

### Equipment

- id  
- name  
- category  
- status  

### Issue (Equipment Assignment)

- id  
- user_id  
- equipment_id  
- issued_by  
- confirmed (boolean)  
- created_at  

---

## Business Logic

1. User submits an equipment request  
2. A new issue record is created with `confirmed = false`  
3. The system requests user confirmation  
4. After confirmation, the issue status is updated  
5. Equipment is officially assigned  

Unconfirmed records are not treated as valid assignments.

---

## API Examples

### Create issue
