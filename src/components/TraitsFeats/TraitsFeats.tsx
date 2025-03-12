import ClassFeaturesContainer from './components/ClassFeaturesContainer';
import FeatsContainer from './components/FeatsContainer';
import ProficiencyContainer from './components/ProficiencyContainer';
import TraitsContainer from './components/TraitsContainer';
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
                    <ClassFeaturesContainer />
                </div>

                <div className="content-center">
                    <FeatsContainer />
                </div>

                <div className="content-bottom">
                    <TraitsContainer />
                    <ProficiencyContainer />
                </div>

            </div>

        </div>
    )
}

export default TraitsFeats;