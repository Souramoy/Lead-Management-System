import { Router } from 'express';
import { addLead, getLeads, updateLeadStatus, deleteLead } from '../controllers/leadController.js';

const router = Router();

router.get('/', getLeads);
router.post('/', addLead);
router.put('/:id', updateLeadStatus);
router.delete('/:id', deleteLead);

export default router;
