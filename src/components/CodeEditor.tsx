import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  innitialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, innitialValue }) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      return onChange(getValue())
    })
  }
  return (
    <div>
      <Editor
        editorDidMount={onEditorDidMount}
        value={innitialValue}
        theme="dark"
        height="300px"
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

        // defaultValue="// some comment"
      />
    </div>
  )
}

export default CodeEditor
