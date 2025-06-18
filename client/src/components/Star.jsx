





const Star = (props) => {

    const rand = props.starType

    let starType;

    if (rand > 0.90) {
        starType = "star-lg"
    } else if (rand > 0.7) {
        starType = "star-md"
    } else {
        starType = "star-sm"
    }

    return (
        <div className={starType} style={{left: `${props.x}%`, top: `${props.y}%`}}>
        </div>
    )
}

export default Star