import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  innitialValue: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ innitialValue }) => {
  return (
    <div>
      <Editor
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
