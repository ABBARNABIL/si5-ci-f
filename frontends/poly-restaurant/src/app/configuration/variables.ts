import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const BASE_PATH_KITCHEN = new InjectionToken<string>('basePathKitchen');
export const BASE_PATH_DINING = new InjectionToken<string>('basePathDining');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
