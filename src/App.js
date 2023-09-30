import { useState } from "react"

const App = () => {
    const [positions, setPositions] = useState([])
    const [oldPositions, setOldPositions] = useState([])

    const clickHandler = (e) => {
        const positionX = e.clientX
        const positionY = e.clientY
        setPositions([...positions, {left: positionX, top: positionY}])
    }

    const undoHandler = () => {
        const newPositions = [...positions]
        const lastPosition = newPositions[newPositions.length - 1]
        newPositions.pop()

        setPositions(newPositions)
        setOldPositions([...oldPositions, lastPosition])
    }

    const redoHandler = () => {
        const tmpOldPositions = [...oldPositions]
        const lastOldPosition = tmpOldPositions[tmpOldPositions.length - 1]
        tmpOldPositions.pop()

        setPositions([...positions, lastOldPosition])
        setOldPositions(tmpOldPositions)
    }

    return (
        <>
            <button onClick={undoHandler}>UNDO</button>
            <button onClick={redoHandler}>REDO</button>
            <div 
                className="main-wrapper"
                onClick={clickHandler}
            >
                {
                    positions.map( (position, index) => {
                        return(
                            <div 
                                key={index} 
                                className="point" 
                                style={{left: position.left, top: position.top}}>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default App