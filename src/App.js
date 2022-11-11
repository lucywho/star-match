import { utils, startingSet } from "./utils"
import { useState } from "react"
import PlayNumber from "./components/PlayNumber"
import StarDisplay from "./components/StarDisplay"

function App() {
    const [stars, setStars] = useState(utils.random(1, startingSet.length))
    const [availableNums, setAvailableNums] = useState(startingSet)
    const [candidateNums, setCandidateNums] = useState([])

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

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === "used") {
            return
        }
        const newCandidateNums = candidateNums.concat(number)
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailableNums = availableNums.filter(
                (num) => !newCandidateNums.includes(num)
            )
            setStars(utils.randomSumIn(newAvailableNums, startingSet.length))
            setAvailableNums(newAvailableNums)
            setCandidateNums([])
        }
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
                        {utils
                            .range(1, startingSet.length)
                            .map((number, numId) => (
                                <PlayNumber
                                    key={numId}
                                    number={number}
                                    status={numberStatus(number)}
                                    onClick={onNumberClick}
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
