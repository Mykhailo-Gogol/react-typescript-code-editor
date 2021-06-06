import React from 'react'
import './resizable-styles.css'
import { ResizableBox } from 'react-resizable'

interface IResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={400} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  )
}

export default Resizable
