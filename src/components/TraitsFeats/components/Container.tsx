import './Container.css';
import TraitsFeatsDialog from './TraitsFeatsDialog';

const Container = (props: {
    label: string,
}) => {
    return (
        <div className='Container'>

            <div>
                <span>{props.label}</span>
                <TraitsFeatsDialog />
            </div>

            <div className="content">

                <div className="epic-badge">
                    <div className="epic-badge__name">Epic Feat Name</div>
                    <div className="epic-badge__details">
                        <span>LV.1</span>
                        <span>ORIGIN FEAT</span>
                    </div>
                </div>

                <div className="badge">gift of the chromatic dragon</div>
                <div className="badge">short badge</div>
                <div className="badge">short badge</div>
                <div className="badge">short badge</div>

            </div>

        </div>
    )
}

export default Container;