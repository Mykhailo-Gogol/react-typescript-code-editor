import React, { useState } from 'react'

import CodeEditor from './code-editor'
import Preview from './preview-window'
import Resizable from './resizable'

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
  title: { textAlign: 'center', fontFamily: 'sans-serif' },
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
  const submit_styles = {
    backgroundColor: '#3780ec',
    border: 'none',
    color: 'white',
  }
  return (
    <Resizable direction="vertical">
      <section
        className="code_cell_wrapper"
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CodeEditor
          onChange={(value) => {
            setInput(value)
          }}
          innitialValue={innitialEditorValue}
        />
        <button style={submit_styles} onClick={onClick}>
          Submit
        </button>
        <Preview code={code} />
      </section>
    </Resizable>
  )
}

export default CodeCell
