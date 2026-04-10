import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home/Home'

function App() {
  return (
    // Global theme state (light/dark mode) accessible from any component via context
    // Home: Default page of the application
    <ThemeProvider>
      <Home/>
    </ThemeProvider>
    
  )
}

export default App
