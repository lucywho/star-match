import Game from "./Game"
import React, { useState } from "react"

const App = () => {
    const [gameId, setGameId] = useState(1)

    function refreshApp() {
        setGameId(gameId + 1)
    }

    return <Game key={gameId} startNewGame={refreshApp} />
}

export default App
