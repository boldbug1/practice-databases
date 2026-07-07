import express from 'express';
const router = express.Router();
import { getTasks, patchTasks, postTasks } from '../database/queries.js';

   
router.get('/', async (req, res) => {
  try {
    const assigned_person = req.query.name || ''
    const priority = req.query.priority
    const current_page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 3
    const offset = (current_page - 1) * limit
   
    const response = await getTasks(assigned_person,priority,limit,offset,current_page);

    console.log(response)
    res.status(200).json(response)
  } catch(error) {
    console.log(error); 
    
    res.status(500).json('Error while fetching data') 
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, assigned_to, priority, status, due_date } = req.body;

    const response = await postTasks(title, assigned_to, priority, status, due_date);
    res.status(201).json(response);
  } catch (error) {
    console.log(`${error}`)
    console.log('Database Error : Error while post data')
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    const Updates = req.body

    if (Object.keys(Updates).length == 0) {
      return res.status(400).json({ error: 'No update fields provided' })
    }

    const updatedTask = await patchTasks(taskId,Updates);

    if(!updatedTask){
      return res.status(404).json("Task not found");
    }

    return res.status(200).json(updatedTask);
    
  } catch (error) {
    console.error('Patch Execution Error:', error)
    return res.status(500).json('Error updating task parameters');
  }
});

export default router;