import { NativeImage } from 'electron';

export type TOptions = {
    fontColor: string;
    font: string;
    color: string;
    radius: number;
    rect: boolean | 'dynamic';
    fit: boolean;
};

export type TOverlayIcon = {
    overlay: NativeImage | null;
    description: string;
};