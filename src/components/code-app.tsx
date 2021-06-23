import React from 'react'
import './code-app-styles.css'
import CodeCell from './code-cell'

const CodeApp: React.FC = () => {
  return (
    <section>
      <h1
        // href="https://github.com/Mykhailo-Gogol/react-typescript-code-editor"
        // target="_blank"
        className="header-link"
        // rel="noreferrer"
      >
        GitHub
      </h1>
      <CodeCell />
    </section>
  )
}

export default CodeApp
