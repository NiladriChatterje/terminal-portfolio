import { Terminal, ITerminalOptions } from "@xterm/xterm"
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";

const TerminalStyle = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0, left: 0
}

function App() {

  const terminalRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    const terminal = new Terminal({
      allowTransparency: true,
      convertEol: true,
      cursorInactiveStyle: 'outline',
      cursorBlink: true,
      fontWeight: 800,
      cursorWidth: 10,
      customGlyphs: true,
      lineHeight: 1.6,
      cursorStyle: 'underline',
      rows: 40, cols: 170
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalRef.current);
    fitAddon.fit();
    terminal.write('welcome/{user}/$ >>');


    terminal.onKey(async ({ key }) => {
      if (key.charCodeAt(0) === 127) terminal.write('\b \b')

      else if (key.charCodeAt(0) === 13) {

        terminal.write("\nwelcome/{user}/$ >>");
      }
      else terminal.write(key)
    })
  }, [])
  return (
    <>
      <Toaster />
      <section>
        <div id={styles.terminal} ref={terminalRef} />
      </section>
    </>
  )
}

export default App
function data(arg1: string, arg2: void) {
  throw new Error("Function not implemented.");
}

