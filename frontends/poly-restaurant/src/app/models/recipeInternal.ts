export interface RecipeInternal {
    shortName: string;
    post: RecipeInternal.PostEnum;
    cookingSteps: Array<string>;
    meanCookingTimeInSec: number;
}
export namespace RecipeInternal {
    export type PostEnum = 'BAR' | 'COLD_DISH' | 'HOT_DISH';
    export const PostEnum = {
        BAR: 'BAR' as PostEnum,
        COLDDISH: 'COLD_DISH' as PostEnum,
        HOTDISH: 'HOT_DISH' as PostEnum
    };
}
