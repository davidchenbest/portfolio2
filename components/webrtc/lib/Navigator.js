class Navigator {
    getConnectedDevices = async (type) => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        return devices.filter(device => device.kind === type);

    }

    getSupportedConstraints = () => navigator.mediaDevices.getSupportedConstraints()
}

export default Navigator