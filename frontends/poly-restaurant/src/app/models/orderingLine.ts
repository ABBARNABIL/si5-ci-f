import { OrderingItem } from './orderingItem';

export interface OrderingLine {
    item?: OrderingItem;
    howMany?: number;
    sentForPreparation?: boolean;
}
