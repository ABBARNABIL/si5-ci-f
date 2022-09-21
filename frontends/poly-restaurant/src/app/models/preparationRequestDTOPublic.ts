import { ItemsToBeCookedPublic } from './itemsToBeCookedPublic';

export interface PreparationRequestDTOPublic {
    tableId: number;
    itemsToBeCookedList: Array<ItemsToBeCookedPublic>;
}
