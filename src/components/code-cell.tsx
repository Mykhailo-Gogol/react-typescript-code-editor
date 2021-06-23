import React, { useState } from 'react'
import './code-cell-styles.css'

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

  const innitialEditorValue = `
/*
* Example app made with React 
*/

import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  title: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    border: '1px solid transparent',
    padding: '20px',
    color: 'white',
    backgroundColor: '#323232'
  }
};

const App = () => {
  return (
    <section>
      <h1 style={styles.title}>App</h1>
    </section>
  );
};

ReactDOM.render(<App />, document.querySelector('#iframe-root'));

  `

  return (
    <div className="code-cell-wrapper">
      <Resizable direction="vertical">
        <section
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
          <button className="submit_styles" onClick={onClick}>
            Run
          </button>
          <Preview code={code} />
        </section>
      </Resizable>
    </div>
  )
}

export default CodeCell
