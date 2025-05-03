import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';
import { RequestStatus } from './enums/request-status';

@Entity()
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: RequestStatus,
        default: RequestStatus.NEW,
    })
    status: RequestStatus;

    @Column({ nullable: true })
    resolutionText: string;

    @Column({ nullable: true })
    cancellationReason: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
