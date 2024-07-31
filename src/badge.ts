import { BrowserWindow, ipcMain, app, IpcMainEvent, nativeImage } from 'electron';

import { TOptions, TOverlayIcon } from './shared/types';
import { BADGE_EVENT, DEFAULT_OPTIONS } from './shared/constants';

export const invokeBadge = (browserWindow: BrowserWindow, { radius, color, font, fontColor, rect, fit }: Partial<TOptions> = {}) => {
    const badgeOptions: TOptions = {
        fontColor: fontColor ?? DEFAULT_OPTIONS.fontColor,
        font: font ?? DEFAULT_OPTIONS.font,
        color: color ?? DEFAULT_OPTIONS.color,
        radius: radius ?? DEFAULT_OPTIONS.radius,
        rect: rect ?? DEFAULT_OPTIONS.rect,
        fit: fit ?? DEFAULT_OPTIONS.fit,
    };

    ipcMain.on(BADGE_EVENT, (_: IpcMainEvent, quantity?: number) => {
        if (browserWindow) {
            void update(quantity);
        }
    });

    const update = async (quantity?: number) => {
        if (process.platform !== 'win32') {
            app.setBadgeCount(quantity);
        } else {
            const overlayIcon: TOverlayIcon = { overlay: null, description: '' };

            if (quantity) {
                const dataUrl = await browserWindow.webContents.executeJavaScript(`window.draw = ${ draw }; window.draw(${ JSON.stringify(badgeOptions) }, ${ quantity })`);
                overlayIcon.overlay = nativeImage.createFromDataURL(dataUrl);
            }

            browserWindow.setOverlayIcon(overlayIcon.overlay, overlayIcon.description);
        }
    };

    const draw = ({ radius, color, font, fontColor, fit, rect }: TOptions, quantity: number) => {
        const size = Math.ceil(radius * 2);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = size;
        canvas.height = size;

        if (context) {
            const isRect = rect === true || (quantity > 99 && rect === 'dynamic');
            const maxWidth = fit ? size : undefined;

            context.clearRect(0, 0, size, size);
            context.fillStyle = color;
            context.beginPath();

            if (isRect) {
                context.roundRect(0, size * 0.3, size, size * 0.7, size * 0.15);
            } else {
                context.arc(radius, radius, radius, 0, 2 * Math.PI);
            }

            context.fill();
            context.font = font;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = fontColor;

            if (isRect) {
                context.fillText(quantity.toString(), radius * 0.95, radius * 1.4, maxWidth);
            } else {
                context.fillText(quantity.toString(), radius, radius * 1.1, maxWidth);
            }
        }

        return canvas.toDataURL();
    }
};