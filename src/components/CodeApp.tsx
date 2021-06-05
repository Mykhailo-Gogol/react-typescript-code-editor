import * as esbuild from 'esbuild-wasm'
import React, { useState, useEffect, useRef } from 'react'

import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin'
import { fetchPlugin } from '../plugins/fetch-plugin'
import CodeEditor from './CodeEditor'

import 'react-notifications/lib/notifications.css'

const CodeApp: React.FC = () => {
  const outputRef = useRef<any>()
  const iframeRef = useRef<any>()

  const [input, setInput] = useState('')

  const startService = async () => {
    outputRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }
  useEffect(() => {
    startService()
  }, [])

  const html = `
  <html>
    <head></head>
    <body>
      <div id="frame-root"></div>
      <script>
        window.addEventListener('message', (event)=>{
          try{
            eval(event.data)
          } catch(err){
            const root = document.querySelector('#frame-root');
            root.innerHTML = '<div style="color:red"><h4 style="color:red">Runtime Error:</h4>' + err + '</div>';
            console.error(err)
          }
        }, false)
      </script>
    </body>
  </html>`

  const onClick = async () => {
    if (!outputRef.current) {
      return
    }

    iframeRef.current.srcdoc = html

    const result = await outputRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    })

    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  const innitialEditorValue = 'import React from "react"'

  return (
    <section>
      <h1>Compile</h1>
      <CodeEditor innitialValue={innitialEditorValue} />
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        title="preview"
        style={{
          display: 'block',
          width: '100%',
          outline: 'none',
          border: 'none',
          borderTop: '1px solid rgba(255, 255, 255, 0.6)',
          color: '#fff',
        }}
      ></iframe>
    </section>
  )
}

export default CodeApp
