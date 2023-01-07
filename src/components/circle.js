


import * as React from "react"
import "./circle.scss"


const Circle = ({ value }) => {
    return (
        <div className={`circle ${value == 1 ? "player1" : value == 2 ? "player2" : ""}`}></div>
    )
}

export default Circle
