# PM2 Dashboard React + Vite

Frontend dashboard built with React + Vite to monitor PM2 processes via API.

## 🚀 How to Use

1. Replace API URL in `App.jsx`:
   ```
   http://<EC2-IP>:3001/status
   ```

2. Install & start:
   ```bash
   npm install
   npm run dev
   ```

3. Expected API response:
   ```json
   [
     {
       "name": "app-1",
       "status": "online",
       "cpu": 3.2,
       "memory": "142.00",
       "uptime": 1713700000000
     }
   ]
   ```

## 📦 Build for Production

```bash
npm run build
```
