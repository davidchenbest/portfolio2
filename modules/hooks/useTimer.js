const { useEffect, useState } = require("react");

export function useTimer(time) {
    const [t, setT] = useState()
    useEffect(() => {
        setT(time)
    }, [time])

    useEffect(() => {
        let interval
        if (t != 0) {
            interval = setInterval(() => {
                setT(pre => pre - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [t])
    return t
}