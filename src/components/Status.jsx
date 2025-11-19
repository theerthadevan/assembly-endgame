export default function Status(props) {
    function getStatusClass(props) {
        if (props.isGameWon) return "status-container-won"
        if (props.isGameLost) return "status-container-lost"
        if(props.isLastGuessIncorrect && !props.isGameLost && !props.isGameWon) return "status-container-msg"
        return "status-container"
    }
    
    const className = getStatusClass(props);

    return ( 
        <section className={className}>
            {props.isGameWon && (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>)}
            {props.isGameLost && (
                <> 
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>)}
                {props.isLastGuessIncorrect && !props.isGameLost && !props.isGameWon && (
                    <>
                        <p>"{props.statusMessage}"🫡</p>
                    </>
                )}
        </section>
    )   
}