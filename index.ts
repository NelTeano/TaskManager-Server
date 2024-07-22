import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRouter from './router/task.route';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

app.use('/api', taskRouter);


