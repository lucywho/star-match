import { useState } from "react"
import { utils } from "./utils"
import PlayNumber from "./components/PlayNumber"
import StarDisplay from "./components/StarDisplay"

function App() {
    const [stars, setStars] = useState(utils.random(1, 9))
    const [availableNums, setAvailableNums] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9,
    ])
    const [candidateNums, setCandidateNums] = useState([1, 7])

    const candidatesAreWrong = utils.sum(candidateNums) > stars

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return "used"
        }

        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? "wrong" : "candidate"
        }

        return "available"
    }

    return (
        <>
            <header>Star Match Game</header>

            <div className="game">
                <div className="help">
                    Pick 1 or numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        <StarDisplay stars={stars} />
                    </div>
                    <div className="right">
                        {utils.range(1, 9).map((number, numId) => (
                            <PlayNumber
                                key={numId}
                                number={number}
                                status={numberStatus(number)}
                            />
                        ))}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        </>
    )
}

export default App
