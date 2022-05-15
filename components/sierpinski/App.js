import { useEffect, useRef, useState } from "react"
import Cord from "./Cord"
import Direction from "./Direction"
import styles from './styles/app.module.css'

const WIDTH = 600
const HEIGHT = WIDTH
const PLOT_SIZE = 2

const triangleCord = [[WIDTH / 2, 10], [WIDTH - 50, HEIGHT - 10], [50, HEIGHT - 10]]

function findMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2]
}

function plotMidpoint(ctx, currentPoint, vertexPoint) {
    const midpoint = findMidpoint(...currentPoint, ...vertexPoint)
    plot(ctx, ...midpoint)
    return midpoint
}

function init(ctx, triangleCord, currentPoint) {
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = .5;
    plot(ctx, ...currentPoint)
}

function findRandomPoint() {
    const x = Math.floor(Math.random() * WIDTH);
    const y = Math.floor(Math.random() * HEIGHT);
    return [x, y]
}

function findRandomVertex(cords) {
    const index = Math.floor(Math.random() * cords.length)
    return cords[index]
}

function plot(ctx, x, y) {
    ctx.fillRect(x, y, PLOT_SIZE, PLOT_SIZE)
}

function drawTriangle(ctx, cord) {
    if (cord.length !== 3) throw 'must provide 3 cordinates to draw triangle'
    ctx.moveTo(...cord[0]);
    ctx.lineTo(...cord[1]);
    ctx.lineTo(...cord[2]);
    ctx.closePath();
    ctx.stroke();
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

export default function App() {
    const [currentPoint, setCurrentPoint] = useState()
    const [mouseCord, setMouseCord] = useState()
    const canvas = useRef()
    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        drawTriangle(ctx, triangleCord)
        if (!currentPoint) return
        init(ctx, triangleCord, currentPoint)
    }, [currentPoint])


    const plotRandom = () => {
        const ctx = canvas.current.getContext("2d");
        const vertexPoint = findRandomVertex(triangleCord)
        const midpoint = plotMidpoint(ctx, currentPoint, vertexPoint)
        currentPoint = midpoint

    }
    const reset = () => {
        const ctx = canvas.current.getContext("2d");
        clearCanvas(ctx)
        setCurrentPoint()
        drawTriangle(ctx, triangleCord)
    }

    const automatePlot = () => {
        for (let i = 0; i < 1000; i++) {
            plotRandom()
        }
    }

    const calculateCord = (e) => {
        const rect = canvas.current.getBoundingClientRect()
        const x = Math.floor(e.clientX - rect.left)
        const y = Math.floor(e.clientY - rect.top)
        setMouseCord([x, y])
    }
    const canvasClick = () => {
        if (currentPoint) return
        setCurrentPoint(mouseCord)
    }
    return <div className={styles.container}>

        <span className={styles.canvas}>
            <Cord cord={mouseCord} point={currentPoint} />
            <Direction point={currentPoint} />
            <canvas onMouseMove={calculateCord} onClick={canvasClick} ref={canvas} width={WIDTH} height={HEIGHT}
                style={{ border: '1px solid #d3d3d3' }}>
                Your browser does not support the canvas element.
            </canvas>
        </span>
        <div>
            {currentPoint && <>
                <button onClick={plotRandom}>plot</button>
                <button onClick={automatePlot}>automate</button>
                <button onClick={reset}>reset</button>
            </>}
        </div>
    </div>
}