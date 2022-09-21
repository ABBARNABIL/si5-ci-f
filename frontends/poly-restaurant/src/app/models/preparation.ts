import { CookedItem } from './cookedItem';

export interface Preparation {
    id: string;
    shouldBeReadyAt: Date;
    preparedItems: Array<CookedItem>;
}
