import Navbar from '../../components/Navbar/Navbar';
import './Home.css'


const Home = () => {
    return (
        <div className="Home">
            <Navbar />
            <div className='content'>
                <div className='equipment-section'>Equipment</div>
                <div className='character-section'>Character</div>
                <div className='status-section'>Status</div>
            </div>
        </div>
    )
}

export default Home;