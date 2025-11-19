import Status from "./components/Status"
import { languages } from "./languages"
import Chips from "./components/Chips"
import { useEffect, useState } from "react"
import { getFarewellText, getRandomWord } from "./utils"
import clsx from "clsx"
import Confetti from "react-confetti"

function App() {
  const [word, setWord] = useState(getRandomWord)
  console.log(word)
  const [guessedLetters, setGuessedLetters] = useState([])

  useEffect(() =>{
    function handleKeyDown(e) {
      const key = e.key.toLowerCase()
      if(key >= 'a' && key <='z') addGuessedLetter(key)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [guessedLetters])

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

  function resetGame() {
    setWord(getRandomWord)
    setGuessedLetters([])
  }

  const currWord = [...word].map((letter, index) =>{
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )
    return (<span key={index} className={letterClassName}>{guessedLetters.includes(letter) || isGameLost ? letter.toUpperCase() : " "}</span>)}
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
      {isGameWon && <Confetti />}
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
        <button onClick={resetGame}>New Game</button>
      </section>)}
    </main>
  )
}

export default App
