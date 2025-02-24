const Skill = (props: {
    name: string;
}) => {
    return (
        <div className="skill">
            <input type="checkbox" />
            <input type="text" maxLength={2} placeholder='-' />
            <span> {props.name} </span>
        </div>
    )

}

export default Skill;