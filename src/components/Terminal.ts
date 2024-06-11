import { Terminal } from "@xterm/xterm";
export const terminal = new Terminal({
    allowTransparency: true,
    convertEol: true,
    cursorInactiveStyle: 'outline',
    cursorBlink: true,
    fontWeight: 900,
    fontWeightBold: 900,
    fontSize: window.innerWidth < 950 ? 8.5 : 15,
    cursorWidth: 10,
    customGlyphs: true,
    cursorStyle: 'bar',

});
terminal.options.theme = { background: '#363d45' }