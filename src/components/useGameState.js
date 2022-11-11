import { utils, startingSet } from "../utils"
import { useState, useEffect } from "react"

export const useGameState = () => {
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

    const setGameState = (newCandidateNums) => {
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
    return { stars, availableNums, candidateNums, secondsLeft, setGameState }
}
