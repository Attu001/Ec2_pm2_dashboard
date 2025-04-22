import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);

  const fetchPM2Status = async () => {
    try {
      const dummyData = [
        {
          name: "backend-api",
          status: "online",
          cpu: 3.1,
          memory: "120.5",
          uptime: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        },
        {
          name: "worker-service",
          status: "stopped",
          cpu: 0.0,
          memory: "0",
          uptime: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
        },
        {
          name: "realtime-engine",
          status: "online",
          cpu: 7.8,
          memory: "240.1",
          uptime: Date.now() - 1000 * 60 * 10, // 10 minutes ago
        }
      ];
      setProcesses(dummyData);
      
    } catch (err) {
      console.error('Error fetching PM2 status:', err);
    }
  };

  const formatUptime = (startTime) => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    fetchPM2Status();
    const interval = setInterval(fetchPM2Status, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🚀 PM2 Dashboard</h1>
      {processes.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CPU (%)</th>
              <th>Memory (MB)</th>
              <th>Uptime</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((proc) => (
              <tr key={proc.name}>
                <td>{proc.name}</td>
                <td>{proc.status}</td>
                <td>{proc.cpu}</td>
                <td>{proc.memory}</td>
                <td>{formatUptime(proc.uptime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
