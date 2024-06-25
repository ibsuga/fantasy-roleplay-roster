import './Navbar.css';


const Navbar = () => {
    return (
        <div className='Navbar'>
            <div className='character-name'>
                <div className="character-name-shadow">Radan Ardiin</div>
                <span>Radan Ardiin</span>
            </div>
            <div className='button-section'>
                <div className='navbar-button'>Character</div>
                <div className='navbar-button'>Skills</div>
                <div className='navbar-button'>Adventure</div>
            </div>
            <div className='level-section'>
                <div className='character-level'>Character Level</div>
            </div>
        </div >
    )
}

export default Navbar;