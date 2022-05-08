const getCurrentLocation = async () => {
    try {
        if (navigator.geolocation) {
            const position = new Promise((resolve, reject) => {
                const success = pos => resolve(pos.coords)
                const fail = err => reject(err.message)
                navigator.geolocation.getCurrentPosition(success, fail);
            })
            const { longitude, latitude } = await position
            return { lon: longitude, lat: latitude }
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    } catch (error) {
        alert(error)
    }
}

export { getCurrentLocation }