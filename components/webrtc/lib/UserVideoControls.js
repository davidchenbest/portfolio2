import Connection from "./VideoControls"

class UserConnection extends Connection {

  getStream = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints)
  }

  hideVideo = (srcObject) => {
    srcObject.getVideoTracks()[0].enabled = false
  }

  stopAudio = (srcObject) => {
    srcObject.getTracks().forEach(track => track.kind === 'audio' && track.stop())
  }

  stopVideo = (srcObject) => {
    srcObject.getTracks().forEach(track => track.kind === 'video' && track.stop())
  }

  removeVideoTrack = (srcObject) => {
    srcObject.getTracks().forEach(track => track.kind === 'video' && srcObject.removeTrack(track))
  }

  removeAudioTrack = (srcObject) => {
    srcObject.getTracks().forEach(track => track.kind === 'audio' && srcObject.removeTrack(track))
  }

  replaceSendersTrack = (call, track) => {
    call.peerConnection.getSenders().forEach(sender => sender.replaceTrack(track))
  }

  broadcastVideo = (call, mediaStream) => {
    if (call) {
      const senders = call.peerConnection.getSenders()
      for (const sender of senders) {
        if (sender.track.kind === 'video') return sender.replaceTrack(mediaStream.getVideoTracks()[0])
      }
    }
  }

  broadcastAudio = (call, mediaStream) => {
    if (call) {
      const senders = call.peerConnection.getSenders()
      for (const sender of senders) {
        if (sender.track.kind === 'audio') {
          // call.peerConnection.removeTrack(sender)
          // call.peerConnection.addTrack(mediaStream.getAudioTracks()[0])
          return sender.replaceTrack(mediaStream.getAudioTracks()[0])
        }
      }
    }
  }

}


export default UserConnection