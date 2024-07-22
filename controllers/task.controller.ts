import { Router, Request, Response } from 'express';
import { Task } from '../model/task';


// for testing 

const productList: Task[] = [
    {
        id: 1,
        title: 'Bombril',
        status: 'pending'
    },
    {
        id: 1,
        title: 'Sausage',
        status: 'pending'
    }
]
const getAll = (req: Request, res: Response) => {
    res.status(200).send(productList);
}
export default { getAll }