import { utils, colors } from "./utils"

function App() {
    const stars = utils.random(1, 9)
    return (
        <>
            <header>Star Match Game</header>

            <div className="game">
                <div className="help">
                    Pick 1 or numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {utils.range(1, stars).map((starId) => (
                            <div
                                key={starId}
                                className="star"
                                style={{ color: colors.used }}
                            ></div>
                        ))}
                    </div>
                    <div className="right">
                        {utils.range(1, 9).map((number, numId) => (
                            <button key={numId} className="number">
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        </>
    )
}

export default App
