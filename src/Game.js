import { useState, useEffect } from "react"
import { utils, startingSet } from "./utils"
import PlayAgain from "./components/PlayAgain"
import PlayNumber from "./components/PlayNumber"
import StarDisplay from "./components/StarDisplay"

function Game(props) {
    const [stars, setStars] = useState(utils.random(1, startingSet.length))
    const [availableNums, setAvailableNums] = useState(startingSet)
    const [candidateNums, setCandidateNums] = useState([])
    const [secondsLeft, setSecondsLeft] = useState(10)

    useEffect(() => {
        console.log("useEffect")
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000)
            return () => clearTimeout(timerId)
        }
    })

    const candidatesAreWrong = utils.sum(candidateNums) > stars
    const gameStatus =
        availableNums.length === 0
            ? "won"
            : secondsLeft === 0
            ? "lost"
            : "active"

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
        if (currentStatus === "used" || gameStatus !== "active") {
            return
        }

        const newCandidateNums =
            currentStatus === "available"
                ? candidateNums.concat(number)
                : candidateNums.filter((can) => can !== number)

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
                        {gameStatus !== "active" ? (
                            <PlayAgain
                                onClick={props.startNewGame}
                                gameStatus={gameStatus}
                            />
                        ) : (
                            <StarDisplay stars={stars} />
                        )}
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
                <div className="timer">Time Remaining: {secondsLeft}</div>
            </div>
        </>
    )
}

export default Game
