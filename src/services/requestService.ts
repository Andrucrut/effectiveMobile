import { AppDataSource } from '../config/AppDataSource';
import { RequestEntity } from '../entities/requestEntity';
import { RequestStatus } from '../entities/enums/request-status';
import { Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

const requestRepo = AppDataSource.getRepository(RequestEntity);

export const createRequest = async (subject: string, description: string) => {
    const request = requestRepo.create({ subject, description });
    return await requestRepo.save(request);
};

export const takeInProgress = async (id: number) => {
    const request = await requestRepo.findOne({ where: { id } });
    if (!request) throw new Error('Request not found');
    request.status = RequestStatus.IN_PROGRESS;
    return await requestRepo.save(request);
};

export const completeRequest = async (id: number, resolutionText: string) => {
    const request = await requestRepo.findOne({ where: { id } });
    if (!request) throw new Error('Request not found');
    request.status = RequestStatus.COMPLETED;
    request.resolutionText = resolutionText;
    return await requestRepo.save(request);
};

export const cancelRequest = async (id: number, cancellationReason: string) => {
    const request = await requestRepo.findOne({ where: { id } });
    if (!request) throw new Error('Request not found');
    request.status = RequestStatus.CANCELLED;
    request.cancellationReason = cancellationReason;
    return await requestRepo.save(request);
};

export const getRequests = async (startDate?: string, endDate?: string) => {
    const where: any = {};

    if (startDate && endDate) {
        where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
        where.createdAt = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
        where.createdAt = LessThanOrEqual(new Date(endDate));
    }

    return await requestRepo.find({ where, order: { createdAt: 'DESC' } });
};

export const cancelAllInProgress = async () => {
    console.log("Attempting to cancel all IN_PROGRESS requests...");
    await AppDataSource.getRepository(RequestEntity)
        .createQueryBuilder()
        .update(RequestEntity)
        .set({ status: RequestStatus.CANCELLED })
        .where("status = :status", { status: RequestStatus.IN_PROGRESS })
        .execute();
    console.log("Cancellation completed.");
};