# electron-badge

## Installation
```
$ npm install badge-electron
```

## Features
* Add badge for electron app on Windows, macOS or Linux
* Change type of badge (circle or rectangle)
* Change color, font, resolution of badge (only Windows)
* Typescript supported

## Methods

It needs to be placed into main process
```typescript
declare const invokeBadge: (browserWindow: BrowserWindow, options?: Partial<TOptions>) => void;
```

Badge options (only Windows)
```typescript
type TOptions = {
    fontColor: string;
    font: string;
    color: string;
    radius: number;
    rect: boolean | 'dynamic';
    fit: boolean;
};

const DEFAULT_OPTIONS = {
    fontColor: '#FFFFFF',
    font: '18px arial',
    color: '#ED5565',
    radius: 16,
    rect: 'dynamic',
    fit: true,
};
```
* [radius, font] You can increase radius to get bigger resolution for your badge. If you are increasing resolution, you need to increase font too.
* [rect] If set to 'dynamic', changes badge from circle to rectangle, if number bigger than 99
* [fit] If set to true, tries to fit whole number into badge

## Usage
```typescript
    // 1. Initialize badge in main process
    invokeBadge(mainWindow);
    // 2. Update badge from renderer process (do not use sendSync method)
    ipcRendere.send('update-badge', 13);
    // 3. To clear badge just call this from renderer process
    ipcRendere.send('update-badge');
```