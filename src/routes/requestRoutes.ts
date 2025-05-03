import { Router } from 'express';
import {
    createRequest,
    takeInProgress,
    completeRequest,
    cancelRequest,
    getRequests,
    cancelAllInProgress,
} from '../controllers/requestController';

const router = Router();

router.post('/', createRequest);
router.patch('/:id/take', takeInProgress);
router.patch('/:id/complete', completeRequest);
router.patch('/:id/cancel', cancelRequest);
router.get('/', getRequests);
router.patch('/cancel/in-progress', cancelAllInProgress);

export default router;
