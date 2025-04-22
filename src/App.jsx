import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);

  const fetchPM2Status = async () => {
    try {
      const res = await axios.get('http://<EC2-IP>:3001/status'); // nedded real api of ec2 instance
      setProcesses(res.data);
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
