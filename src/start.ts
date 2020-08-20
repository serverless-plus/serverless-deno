import { app } from './main.jsx';

const PORT = 8080;

app.start({ port: PORT });

console.log(`Server start on http://localhost:${PORT}`);
