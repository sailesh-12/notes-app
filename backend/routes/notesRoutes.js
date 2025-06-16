import express from 'express';
import {getAllNotes,createAllNotes,updateAllNotes,deleteAllNotes,getNotesById} from '../controllers/notesController.js'
const router=express.Router();

router.get('/',getAllNotes);
router.get('/:id',getNotesById);
router.post('/create',createAllNotes)

router.put('/update/:id',updateAllNotes)

router.delete('/delete/:id',deleteAllNotes)


export default router