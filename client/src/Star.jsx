





const Star = (props) => {


    return (
        <div className="star" style={{left: `${((Math.random() * 10 - 5) + props.index * 10) % 100}%`, top: `${((Math.random() * 10 - 5) + Math.floor(props.index / 10) * 10)}%`}}>
        </div>
    )
}

export default Star