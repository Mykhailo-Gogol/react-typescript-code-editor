import React from 'react'
import './resizable-styles.css'
import { ResizableBox } from 'react-resizable'
import { useMedia } from 'react-use'

interface IResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<IResizableProps> = ({ direction, children }) => {
  const isWide = useMedia('(min-width: 1200px)')
  return (
    <ResizableBox
      height={isWide ? 600 : 350}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  )
}

export default Resizable
