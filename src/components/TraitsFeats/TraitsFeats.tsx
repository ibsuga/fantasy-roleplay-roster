import Container from './components/Container';
import './TraitsFeats.css'

const TraitsFeats = () => {
    return (
        <div className="TraitsFeats">

            <div className='title'>

                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'end' }}>INVENTORY</span>
                <span> TRAITS&FEATS </span>
                <span style={{ opacity: '25%', fontSize: '1.25em', alignSelf: 'center', justifySelf: 'start' }}>STATS</span>

            </div>

            <div className='list'>

                <div className="content-top">
                    <Container label='class features' />
                </div>

                <div className="content-center">
                    <Container label='feats' />
                </div>

                <div className="content-bottom">
                    <Container label='traits' />
                    <Container label='proficiencies' />
                </div>

            </div>

        </div>
    )
}

export default TraitsFeats;