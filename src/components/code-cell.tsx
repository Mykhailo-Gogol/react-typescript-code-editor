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
import ReactDOM from 'react-dom';

const styles = {
  title: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    border: '1px solid black',
    padding: '20px',
    color: 'white',
    backgroundColor: 'coral',
  },
  title_app: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    border: '1px solid black',
    height: '70vh',
  },
  title_p: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    height: '70vh',
    padding: '0 10px',
  },
};

const App = () => {
  return (
    <div>
      <p style={styles.title}>Code Editor App</p>
      <p style={styles.title_app}>
        <p>App</p>
        <p style={styles.title_p}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#iframe-root'));

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
          Run
        </button>
        <Preview code={code} />
      </section>
    </Resizable>
  )
}

export default CodeCell
