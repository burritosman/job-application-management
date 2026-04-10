import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home/Home'

function App() {
  return (
    <ThemeProvider>
      <Home/>
    </ThemeProvider>
    
  )
}

export default App
