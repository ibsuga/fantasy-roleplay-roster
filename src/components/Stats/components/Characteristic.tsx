import './Characteristic.css'
import Skill from './Skill';

const Characteristic = (props: {
    label: string;
    skills: string[];
}) => {

    return (
        <div className="Characteristic">

            <span className='header'> {props.label} </span>

            <div className="content">

                {/* MODIFIER & SCORE */}
                <div>
                    <input className='modifier' type="text" maxLength={2} placeholder='-' />
                    <input className='score' type="text" maxLength={2} placeholder='-' />
                    <span>Modifier</span>
                    <span>Score</span>
                </div>

                {/* SAVING THROW */}
                <div>
                    <input type="checkbox" />
                    <input type="text" maxLength={2} placeholder='-' />
                    <span>Saving Throw</span>
                </div>

                {/* SKILLS */}
                <div>{
                    props.skills.map((skill: string, index: number) => <Skill key={index} name={skill} />)
                }</div>

            </div>

        </div>
    )
}

export default Characteristic;