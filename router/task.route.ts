import { Router, Request, Response } from 'express';
import pool from '../database';

const taskRoute = Router();

taskRoute.get('/', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM taskmanagerdb.task');
        res.json(rows);
    } catch (err) {
        console.log('Fail to get tasks', err);
        res.status(500).send('Server Error');
    }
});

// Add a new task
taskRoute.post('/task', async (req: Request, res: Response) => {
    const { title, status } = req.body;
    
    if (!title || !status) {
        return res.status(400).send('Title and status are required');
    }

    try {
        const [result] = await pool.query('INSERT INTO taskmanagerdb.task (title, status) VALUES (?, ?)', [title, status]);
        const insertId = (result as any).insertId;

        res.status(201).json({ message: 'Task created successfully', taskId: insertId });
    } catch (err) {
        console.log('Fail to create task', err);
        res.status(500).send('Server Error');
    }
});

// Update task status
taskRoute.patch('/task/:id/status', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
        return res.status(400).send('Status is required');
    }

    try {
        const [result] = await pool.query('UPDATE taskmanagerdb.task SET status = ? WHERE id = ?', [status, id]);
        const affectedRows = (result as any).affectedRows;
        
        if (affectedRows > 0) {
            res.json({ message: 'Task status updated successfully' });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (err) {
        console.log('Fail to update task status', err);
        res.status(500).send('Server Error');
    }
});

// Delete a task
taskRoute.delete('/task/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM taskmanagerdb.task WHERE id = ?', [id]);
        const affectedRows = (result as any).affectedRows;

        if (affectedRows > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).send('Task not found');
        }
    } catch (err) {
        console.log('Fail to delete task', err);
        res.status(500).send('Server Error');
    }
});

export default taskRoute;
