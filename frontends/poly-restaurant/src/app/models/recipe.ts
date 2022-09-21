export interface Recipe {
    shortName: string;
    post: Recipe.PostEnum;
    cookingSteps: Array<string>;
    meanCookingTimeInSec: number;
}
export namespace Recipe {
    export type PostEnum = 'BAR' | 'COLD_DISH' | 'HOT_DISH';
    export const PostEnum = {
        BAR: 'BAR' as PostEnum,
        COLDDISH: 'COLD_DISH' as PostEnum,
        HOTDISH: 'HOT_DISH' as PostEnum
    };
}
