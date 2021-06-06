import './App.css'
import React from 'react'
import { useMedia } from 'react-use'

import CodeApp from './components/code-app'
import MobileView from './components/mobile-view'

const App: React.FC = () => {
  const isWide = useMedia('(min-width: 1080px)')

  return <div>{isWide ? <CodeApp /> : <MobileView />}</div>
}

export default App
