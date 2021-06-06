import React, { useRef, useEffect } from 'react'

interface IPreviewProps {
  code: string | undefined
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="iframe-root"></div>
      <script>
        window.addEventListener('message', (event)=>{
          try{
            eval(event.data)
          } catch(err){
            const root = document.querySelector('#iframe-root');
            root.innerHTML = '<div style="color:red"><h4 style="color:red">Runtime Error:</h4>' + err + '</div>';
            console.error(err)
          }
        }, false)
      </script>
    </body>
  </html>`

const Preview: React.FC<IPreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    // iframeRef.current.srcdoc = html

    iframeRef.current.contentWindow.postMessage(code, '*')
  }, [code])

  return (
    <div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        title="preview"
      />
    </div>
  )
}

export default Preview
