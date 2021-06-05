import React from 'react'
import { useMedia } from 'react-use'
import './App.css'

import CodeApp from './components/CodeApp'
import MobileView from './components/MobileView'

const App: React.FC = () => {
  const isWide = useMedia('(min-width: 1080px)')
  return <div>{isWide ? <CodeApp /> : <MobileView />}</div>
}

export default App
