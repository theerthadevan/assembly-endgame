export default function Chips(props) {
const styles = {
  backgroundColor: props.backgroundColor,
  color: props.color
}

    return (
        <>
            <span style={styles} className={props.className}>{props.value}</span>
        </>
    )
}