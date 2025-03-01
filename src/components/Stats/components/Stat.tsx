const Stat = (props: {
    header: string;
    children: JSX.Element
    className?: string;
}) => {
    return (
        <div className={`stats-container ${props.className}`}>
            <span className="stat-header">{props.header}</span>
            <div className="stat-slot">
                {props.children}
            </div>
        </div>
    )
}

export default Stat;