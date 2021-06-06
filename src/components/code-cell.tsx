import React, { useState } from 'react'

import CodeEditor from './code-editor'
import Preview from './preview-window'

import bundle from '../bundler/bundler'

const CodeCell: React.FC = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  }

  const innitialEditorValue = `import React from 'react';
import ReactDOM from "react-dom";

const styles = {
  title: { color: 'white', textAlign: 'center', fontFamily: 'sans-serif' },
};

const App = () => {
  return (
    <div>
      <p style={styles.title}>Code Editor App</p>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#iframe-root'))
  `

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

        <Preview code={code} />
      </div>
    </section>
  )
}

export default CodeCell
