import { RecipeInternal } from './recipeInternal';

export interface PreparedItemInternal {
    id?: string;
    shortName: string;
    recipe: RecipeInternal;
    shouldStartAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
}
