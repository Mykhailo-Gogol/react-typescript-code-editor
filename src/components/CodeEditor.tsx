import React, { useRef } from 'react'
import Editor, { EditorDidMount } from '@monaco-editor/react'

import prettier from 'prettier'
import parser from 'prettier/parser-babel'

// TS
interface CodeEditorProps {
  innitialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, innitialValue }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      return onChange(getValue())
    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const handleClickFormat = () => {
    const unformatted = editorRef.current.getModel().getValue()
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    })
    editorRef.current.setValue(formatted)
  }

  return (
    <div className="editor_wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleClickFormat}
      >
        Format
      </button>
      <Editor
        editorDidMount={onEditorDidMount}
        value={innitialValue}
        theme="dark"
        width="600px"
        height="400px"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
