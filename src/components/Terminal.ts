import { Terminal } from "@xterm/xterm";
export const terminal = new Terminal({
    allowTransparency: true,
    convertEol: true,
    cursorInactiveStyle: 'outline',
    cursorBlink: true,
    fontWeight: 400,
    fontWeightBold: 400,
    fontSize: window.innerWidth < 950 ? 10.7 : 13,
    cursorWidth: 10,
    customGlyphs: true,
    cursorStyle: 'bar',
});
terminal.options.theme = { background: '#02020200' }

export const lastBarrier = { lastBarrier: 0 };
