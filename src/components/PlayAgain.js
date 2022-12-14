const PlayAgain = (props) => {
    return (
        <div className="game-done">
            <div
                className="message"
                style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
            >
                {props.gameStatus === "lost" ? "Out of time!" : "You won!"}
            </div>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    )
}

export default PlayAgain
