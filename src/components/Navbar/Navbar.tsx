import './Navbar.css';
import useNavbarStore from '../../store/NavbarStore';
import CharacterAvatar from './components/CharacterAvatar';


const Navbar = () => {

    const [characterName,
        updateCharacterName,
        characterExperience,
        updateCharacterExperience
    ] = useNavbarStore(state => [
        state.characterName,
        state.updateCharacterName,
        state.characterExperience,
        state.updateCharacterExperience
    ]);


    return (
        <div className='Navbar'>
            <div className='character-name'>
                <CharacterAvatar />
                <div className="character-name-shadow">{characterName}</div>
                <input type="text" placeholder='Adventurer name...' value={characterName} onChange={(e) => updateCharacterName(e.target.value)} />
            </div>
            <div className='button-section'>
                <span className='title-tiny'>FANTASY ROLEPLAY</span>
                <span className='title-big'>ROSTER</span>
            </div>
            <div className='level-section'>


                <div className='character-level'>

                    <div className='experience'>
                        {/* <span>Exp.</span> */}
                        <input type="text" maxLength={6} placeholder='exp here' value={characterExperience.currentExp} onChange={(e) => updateCharacterExperience(Number(e.target.value))} />
                        <span> / {characterExperience.nextLevelExp}</span>
                    </div>

                    <div className='label'>Level <span>{characterExperience.level}</span> </div>

                </div>

            </div>
        </div >
    )
}

export default Navbar;