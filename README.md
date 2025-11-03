# Account Transfer System with Balance Validation

A simple Express + MongoDB app simulating money transfers between users with balance validation.

## API Endpoints

### POST /create-users
**Body:**
```json
[
  { "name": "Alice", "balance": 1000 },
  { "name": "Bob", "balance": 500 }
]
