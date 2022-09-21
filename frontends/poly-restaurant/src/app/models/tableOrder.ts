import { OrderingLine } from './orderingLine';
import { Preparation } from './preparation';

export interface TableOrder {
    id?: string;
    tableNumber?: number;
    customersCount?: number;
    opened: Date;
    lines?: Array<OrderingLine>;
    preparations?: Array<Preparation>;
    billed?: Date;
}
