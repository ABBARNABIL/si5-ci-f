import { PreparedItemPublic } from './preparedItemPublic';

export interface PreparationPublic {
    id: string;
    tableId?: number;
    shouldBeReadyAt: Date;
    completedAt?: Date;
    takenForServiceAt?: Date;
    preparedItems: Array<PreparedItemPublic>;
}
