import { TOptions } from './types';

export const DEFAULT_OPTIONS: TOptions = {
    fontColor: '#FFFFFF',
    font: '18px arial',
    color: '#ED5565',
    radius: 16,
    rect: 'dynamic',
    fit: true,
} as const;

export const BADGE_EVENT = 'update-badge';