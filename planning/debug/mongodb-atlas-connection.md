# Debug Session: MongoDB Atlas Connection

## ROOT CAUSE FOUND
1.  **Missing Connection Logic**: `backend/index.js` lacked Mongoose code.
2.  **Missing Password**: `.env` contained the `<db_password>` placeholder.
3.  **Special Character**: The user's password contains `@`, which requires URL-encoding (`%40`) in the connection string.

## Actions Taken
1.  **Integrated Mongoose**: Added connection logic and logging to `index.js`.
2.  **Updated `.env`**: Injected the Atlas connection string.
3.  **Applied Credentials**: Updated `.env` with the user's password, applying URL-encoding to the `@` character.

## Evidence Summary
- `bad auth` error confirmed the placeholder/password was the issue.
- User provided password: `sindhublava@2110`.

## Verification
- Terminal should now show `✅ Connected to MongoDB Atlas`.

## Status
**REOPENED**

## 2026-05-11 Investigation
- **Symptom**: `MongooseServerSelectionError` with `ReplicaSetNoPrimary`.
- **Deep Dive**:
  - DNS resolution (SRV/TXT) is working.
  - TCP connectivity to shards on port 27017 is successful (`Test-NetConnection` passed).
  - Detailed error log shows: `MongoNetworkError: tlsv1 alert internal error (SSL alert number 80)`.
- **Diagnosis**: 
  - **SSL alert 80** from MongoDB Atlas is a definitive sign that the client IP is not whitelisted.
  - Even though TCP is open, Atlas rejects the TLS handshake if the IP is not in the "Network Access" list.

## Required Action for User
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Go to **Security** -> **Network Access**.
3. Click **Add IP Address**.
4. Click **Add Current IP Address** or add `0.0.0.0/0` (Allow Access from Anywhere) to test.
5. Wait ~30 seconds for the change to propagate and try again.
