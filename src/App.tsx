import './App.css'
import Character from './pages/Character/Character';
import Navbar from './components/Navbar/Navbar';
import useNavbarStore from './store/NavbarStore';


function App() {

  const characterBackground = useNavbarStore((state) => state.characterBackground);

  return (
    <div className="App">
      <div className="app-bg" style={{ backgroundImage: `url(${characterBackground})` }} />
      <div className="app-content">
        <Navbar />
        <Character />
      </div>
    </div>
  )
}

export default App
