import * as esbuild from 'esbuild-wasm'
import React, { useState, useEffect, useRef } from 'react'

import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin'
import { fetchPlugin } from '../plugins/fetch-plugin'

import CodeEditor from './CodeEditor'

const CodeApp: React.FC = () => {
  const [input, setInput] = useState('')

  const outputRef = useRef<any>()
  const iframeRef = useRef<any>()

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
    if (!outputRef.current) return

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
    <section className="code_editor_wrapper">
      <CodeEditor
        onChange={(value) => {
          setInput(value)
        }}
        innitialValue={innitialEditorValue}
      />
      <div>
        <button onClick={onClick}>Submit</button>
        <iframe
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-scripts"
          title="preview"
        ></iframe>
      </div>
    </section>
  )
}

export default CodeApp
