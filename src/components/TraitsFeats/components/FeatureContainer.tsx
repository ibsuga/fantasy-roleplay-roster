import './FeatureContainer.css';


const FeatureContainer = (props: {
    title: string,
    tools?: JSX.Element,
    children: JSX.Element
}) => {

    return (
        <div className='FeatureContainer'>

            <div>
                <span>{props.title}</span>
                {props.tools}
            </div>

            <div className="content">
                {props.children}
            </div>

        </div>
    )

}
export default FeatureContainer;