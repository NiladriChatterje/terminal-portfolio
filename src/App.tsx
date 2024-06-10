import { Terminal, ITerminalOptions } from "@xterm/xterm"
import { useEffect, useRef } from "react"
import styles from './App.module.css'

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
      cursorInactiveStyle: 'outline',
      cursorBlink: true,
      cursorWidth: 10,
      cursorStyle: 'underline',
      rows: 40, cols: 170
    });
    terminal.open(terminalRef.current);
    terminal.write('welcome/{user}/$ ');
  }, [])
  return (
    <section>
      <div id={styles.terminal} ref={terminalRef} />
    </section>
  )
}

export default App
