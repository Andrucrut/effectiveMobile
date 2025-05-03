import { Request, Response } from 'express';
import * as requestService from '../services/requestService';

export const createRequest = async (req: Request, res: Response) => {
    try {
        const { subject, description } = req.body;
        const request = await requestService.createRequest(subject, description);
        res.status(201).json(request);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const takeInProgress = async (req: Request, res: Response) => {
    try {
        const request = await requestService.takeInProgress(Number(req.params.id));
        res.json(request);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const completeRequest = async (req: Request, res: Response) => {
    try {
        const { resolutionText } = req.body;
        const request = await requestService.completeRequest(Number(req.params.id), resolutionText);
        res.json(request);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelRequest = async (req: Request, res: Response) => {
    try {
        const { cancellationReason } = req.body;
        const request = await requestService.cancelRequest(Number(req.params.id), cancellationReason);
        res.json(request);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRequests = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        const requests = await requestService.getRequests(startDate as string, endDate as string);
        res.json(requests);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelAllInProgress = async (_: Request, res: Response) => {
    try {
        await requestService.cancelAllInProgress();
        res.json({ message: 'All IN_PROGRESS requests cancelled' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
