import './FeatureContainer.css';


const FeatureContainer = (props: {
    title: string,
    tools?: JSX.Element,
    proficiency?: JSX.Element,
    children: JSX.Element[]
}) => {

    return (
        <div className='FeatureContainer'>

            <div>
                <span>{props.title}</span>
                {props.tools}
            </div>

            <div className="content">
                {props.proficiency}
                {props.children}
            </div>

        </div>
    )

}
export default FeatureContainer;