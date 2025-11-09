import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>モダンウェブアプリケーション</h1>
        <p>React + TypeScript + Viteで構築</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <h2>カウンター</h2>
          <div className="counter">
            <button 
              className="btn btn-secondary" 
              onClick={() => setCount(count - 1)}
              aria-label="減らす"
            >
              −
            </button>
            <span className="count-display">{count}</span>
            <button 
              className="btn btn-primary" 
              onClick={() => setCount(count + 1)}
              aria-label="増やす"
            >
              +
            </button>
          </div>
          <button 
            className="btn btn-reset" 
            onClick={() => setCount(0)}
          >
            リセット
          </button>
        </div>

        <div className="card">
          <h2>機能</h2>
          <ul className="feature-list">
            <li>⚡️ Viteによる高速開発</li>
            <li>⚛️ React 18</li>
            <li>📘 TypeScript</li>
            <li>🎨 モダンなUIデザイン</li>
            <li>📱 レスポンシブ対応</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 モダンウェブアプリ</p>
      </footer>
    </div>
  )
}

export default App
