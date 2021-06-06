import React from 'react'

const MobileView: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        {' '}
        🖥️ Please, open on the Desktop 🖥️
      </h1>
    </div>
  )
}

export default MobileView
