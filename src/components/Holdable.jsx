import React from 'react'

const holdTime = 400 // ms
const holdDistance = 5 ** 2 // pixels squared

export default function Holdable({ id, onClick, onHold, children }) {

    const [timer, setTimer] = React.useState(null)
    const [pos, setPos] = React.useState([0, 0])

    function onPointerDown(evt) {
        setPos([evt.clientX, evt.clientY]) // save position for later
        const event = { ...evt } // convert synthetic event to real object
        const timeoutId = window.setTimeout(timesup.bind(null, event), holdTime)
        setTimer(timeoutId)
    }

    function onPointerUp(evt) {
        if (timer) {
            window.clearTimeout(timer)
            setTimer(null)
            onClick(evt)
        }
    }

    function onPointerMove(evt) {
        // cancel hold operation if moved too much
        if (timer) {
            const d = (evt.clientX - pos[0]) ** 2 + (evt.clientY - pos[1]) ** 2
            if (d > holdDistance) {
                setTimer(null)
                window.clearTimeout(timer)
            }
        }
    }

    function timesup(evt) {
        setTimer(null)
        onHold(evt)
    }

    return (
        <div
            onPointerDown={ onPointerDown }
            onPointerUp={ onPointerUp }
            onPointerMove={ onPointerMove }
            id={ id }
        >
            { children }
        </div>
    )
}