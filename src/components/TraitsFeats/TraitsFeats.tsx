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


            <div className='content'>

                <div className="content-top">
                    <Container />
                </div>

                <div className="content-center">
                    <Container />

                    <Container />
                </div>


                <div className="content-bottom">
                    <Container />
                </div>

            </div>


        </div>
    )
}

export default TraitsFeats;