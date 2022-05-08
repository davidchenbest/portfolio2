import { useEffect, useContext, useCallback, useState, useRef } from "react";
import { ConnectionContext } from "./ConnectionContext";
import styles from './styles/userVideo.module.css'

import UserVideoControls from "./lib/UserVideoControls";

const userVideoControls = new UserVideoControls()

function Video() {
  console.log('UserVideo');
  const { name, peers, userVideoRef, setError, error, videoReady, setVideoReady } = useContext(ConnectionContext)
  const [videoOn, setVideoOn] = useState(true)
  const [audioOn, setAudioOn] = useState(true)

  const showWebcam = useCallback(async () => {
    try {
      const mediaStream = await userVideoControls.getStream({ video: true, audio: true })
      userVideoRef.current.srcObject = mediaStream;
      userVideoRef.current.play();
      return mediaStream
    } catch (err) {
      setError(err.toString())
    }
  }, [setError, userVideoRef])

  useEffect(() => {
    let mediaStream
    showWebcam().then(stream => mediaStream = stream)
    return () => {
      userVideoControls.stopAudio(mediaStream)
      userVideoControls.stopVideo(mediaStream)
      console.log('cleaned user video: stop video and audio');
    }
  }, [showWebcam])

  // video play eventlistener
  useEffect(() => {
    const videoEventListener = userVideoRef.current.addEventListener('play', (event) => {
      setVideoReady(true)
      console.log('video is playing');
    })
    return videoEventListener?.removeEventListener('play') || console.log('video play event removed');
  }, [userVideoRef, setVideoReady])

  const handleStopVideo = () => userVideoControls.stopVideo(userVideoRef.current.srcObject) || setVideoOn(false)
  const handleStopAudio = () => userVideoControls.stopAudio(userVideoRef.current.srcObject) || setAudioOn(false)


  const handleStartVideo = async () => {
    try {
      const video = userVideoRef.current
      userVideoControls.stopVideo(video.srcObject)
      userVideoControls.removeVideoTrack(video.srcObject)
      const mediaStream = await userVideoControls.getStream({ video: true })
      video.srcObject.addTrack(mediaStream.getVideoTracks()[0])
      console.log(video.srcObject.getTracks());

      if (!peers) return
      for (let i = 0; i < peers.length; i++) {
        const peer = peers[i];
        const { call } = peer
        userVideoControls.broadcastVideo(call, video.srcObject)

      }
      setVideoOn(true)
    } catch (err) {
      setError(err.toString())

    }
  }

  const handleStartAudio = async () => {
    try {
      const video = userVideoRef.current
      userVideoControls.stopAudio(video.srcObject)
      userVideoControls.removeAudioTrack(video.srcObject)
      const mediaStream = await userVideoControls.getStream({ audio: true })
      video.srcObject.addTrack(mediaStream.getAudioTracks()[0])
      console.log(video.srcObject.getTracks());

      if (!peers) return
      for (let i = 0; i < peers.length; i++) {
        const peer = peers[i];
        const { call } = peer
        userVideoControls.broadcastAudio(call, video.srcObject)

      }
      setAudioOn(true)
    } catch (err) {
      setError(err.toString())
    }
  }

  const handleToggleAudio = () => {
    userVideoControls.toggleAudio(userVideoRef.current.srcObject)
    setAudioOn(pre => !pre)
  }

  const handleToggleVideo = () => {
    userVideoControls.toggleVideo(userVideoRef.current.srcObject)
    setVideoOn(pre => !pre)
  }

  return (!error
    ?
    <div className={styles.userVideoCon}>
      <video className={styles.video} ref={userVideoRef} muted />
      <span className={styles.name}>Me: {name}</span>
      {<div className={styles.controls}>
        {
          videoReady ?
            <>
              {videoOn ? <button onClick={handleToggleVideo}> StopVideo</button> : <button onClick={handleToggleVideo}> StartVideo</button>}
              {audioOn ? <button onClick={handleToggleAudio}> StopAudio</button> : <button onClick={handleToggleAudio}> StartAudio</button>}
            </>
            : <span style={{ alignSelf: 'center' }}>Loading</span>
        }

      </div>}
    </div>
    :
    <p>{error}</p>)
}

export default Video;