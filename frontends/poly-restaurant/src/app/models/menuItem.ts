export interface MenuItem {
    id? : string;
    fullName: string;
    shortName: string;
    price?: number;
    category: MenuItem.CategoryEnum;
    image: string;
}
export namespace MenuItem {
    export type CategoryEnum = 'STARTER' | 'MAIN' | 'DESSERT' | 'BEVERAGE';
    export const CategoryEnum = {
        STARTER: 'STARTER' as CategoryEnum,
        MAIN: 'MAIN' as CategoryEnum,
        DESSERT: 'DESSERT' as CategoryEnum,
        BEVERAGE: 'BEVERAGE' as CategoryEnum
    };
}
