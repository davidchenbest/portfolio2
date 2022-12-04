class Connection {

    hideVideo = (srcObject) => {
        srcObject.getVideoTracks()[0].enabled = false
    }

    toggleVideo = (srcObject) => {
        const video = srcObject.getVideoTracks()[0]
        if (video) video.enabled = !video.enabled
    }

    toggleAudio = (srcObject) => {
        const audio = srcObject.getAudioTracks()[0]
        if (audio) audio.enabled = !audio.enabled
    }


}


export default Connection