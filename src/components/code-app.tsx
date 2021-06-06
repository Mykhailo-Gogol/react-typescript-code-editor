import React from 'react'
import CodeCell from './code-cell'

const CodeApp: React.FC = () => {
  return (
    <section>
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderBottom: 'none',
          margin: '0',
          padding: '15px 0',
        }}
      >
        Compile Editor
      </h1>
      <CodeCell />
    </section>
  )
}

export default CodeApp
