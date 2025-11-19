import Status from "./components/Status"
import { languages } from "./languages"
import Chips from "./components/Chips"
import { useState } from "react"
import { getFarewellText } from "./utils"
import clsx from "clsx"

function App() {
  const [word, setWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  const wrongGuessCount = guessedLetters.filter(letter => !word.includes(letter)).length
  const isGameWon = [...word].every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length -1
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length- 1]
  const isLastGuessIncorrect = lastGuessedLetter && !word.includes(lastGuessedLetter)
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prevGuessedLetters => 
      prevGuessedLetters.includes(letter) ? prevGuessedLetters :
      [...prevGuessedLetters, letter])
  }

  const currWord = [...word].map((letter, index) =>
    <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : " "}</span>
  )

  const keyboard = [...alphabet].map(letter =>{
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && word.includes(letter)
    const isWrong = isGuessed && !word.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong : isWrong
    })

    return (<button key={letter} className={className} 
            onClick={() => addGuessedLetter(letter)} disabled={isGameOver}>
              {letter.toUpperCase()}
    </button>)}
  )

  const langChips = languages.map((langObj, index) =>{
    const isLangLost = index < wrongGuessCount
    return (<Chips key ={langObj.name} className={isLangLost ? "lost" : null}
    value={langObj.name} backgroundColor={langObj.backgroundColor} color={langObj.color} />)}
  )

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p> 
      </header>
      <Status isGameLost={isGameLost} isGameWon={isGameWon} isLastGuessIncorrect={isLastGuessIncorrect} statusMessage={getFarewellText(languages[wrongGuessCount -1 ]?.name)}/>
      <section className="langChip-container">
        {langChips}
      </section>
      <section className="currWord-container">
        {currWord}
      </section>

      <section className="keyboard-container">
        {keyboard}
      </section>

      {isGameOver && (<section className="newgame-button">
        <button>New Game</button>
      </section>)}
    </main>
  )
}

export default App
