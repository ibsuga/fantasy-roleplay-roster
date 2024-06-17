import Character from './pages/Character/Character';
import Navbar from './components/Navbar/Navbar';
import background from './assets/young_rathdiin.jpg';
import background_b from './assets/bash1.png';
import './App.css'


function App() {
  return (
    <div className="App">
      <div className="app-bg" style={{ backgroundImage: `url(${background})` }} />
      <div className="app-content">
        <Navbar />
        <Character />
      </div>
    </div>
  )
}

export default App
