import { useEffect, useRef, useState } from "react"
import HoverButton from "../HoverButton"
import Cord from "./Cord"
import Direction from "./Direction"
import styles from './styles/app.module.css'

const WIDTH = 600
const HEIGHT = WIDTH
const PLOT_SIZE = 3
const AUTOMATE = 1000
const NUMBER_VERTEX = 3

const SAMPLE_CORDS = [[WIDTH / 2, 10], [WIDTH - 50, HEIGHT - 10], [50, HEIGHT - 10]]

function findMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2]
}

function plotMidpoint(ctx, currentPoint, vertexPoint) {
    const midpoint = findMidpoint(...currentPoint, ...vertexPoint)
    plot(ctx, ...midpoint)
    return midpoint
}

function init(ctx, currentPoint) {
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

function drawShape(ctx, cord) {
    if (cord.length !== NUMBER_VERTEX) return `must provide ${NUMBER_VERTEX} cordinates to draw`
    ctx.moveTo(...cord[0]);
    for (let i = 1; i < cord.length; i++) {
        ctx.lineTo(...cord[i]);
    }
    ctx.closePath();
    ctx.stroke();
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
}

export default function App() {
    const [CORDS, setCORDS] = useState([])
    const [currentPoint, setCurrentPoint] = useState()
    const [mouseCord, setMouseCord] = useState()
    const canvas = useRef()
    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        if (CORDS.length === NUMBER_VERTEX) drawShape(ctx, CORDS)
        if (currentPoint) init(ctx, currentPoint)
    }, [currentPoint, CORDS])


    const plotRandom = () => {
        const ctx = canvas.current.getContext("2d");
        const vertexPoint = findRandomVertex(CORDS)
        const midpoint = plotMidpoint(ctx, currentPoint, vertexPoint)
        currentPoint = midpoint

    }
    const reset = () => {
        const ctx = canvas.current.getContext("2d");
        clearCanvas(ctx)
        setCurrentPoint()
        setCORDS([])
    }

    const automatePlot = () => {
        for (let i = 0; i < AUTOMATE; i++) {
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
        if (CORDS.length < NUMBER_VERTEX) {
            const ctx = canvas.current.getContext("2d");
            plot(ctx, ...mouseCord)
            setCORDS(pre => [...pre, mouseCord])
        }
        else if (!currentPoint) setCurrentPoint(mouseCord)

    }

    const setDefaultVertex = () => reset() || setCORDS(SAMPLE_CORDS)
    return <div className={styles.container}>

        <span className={styles.canvas}>
            <Cord cord={mouseCord} point={currentPoint} />
            <Direction CORDS={CORDS} NUMBER_VERTEX={NUMBER_VERTEX} point={currentPoint} />
            <canvas onMouseMove={calculateCord} onClick={canvasClick} ref={canvas} width={WIDTH} height={HEIGHT}
                style={{ border: '1px solid #d3d3d3' }}>
                Your browser does not support the canvas element.
            </canvas>
        </span>
        <div className={styles.buttons}>
            {CORDS.length !== NUMBER_VERTEX && <button onClick={setDefaultVertex}>Default vertex</button>}
            {currentPoint && <>
                <button onClick={plotRandom}>Plot</button>
                <HoverButton onClick={automatePlot} name='Automate' text={`automate ${AUTOMATE} points`} />
                <button onClick={reset}>Reset</button>
            </>}
        </div>
    </div>
}