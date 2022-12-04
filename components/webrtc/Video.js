import { useRef, useEffect, useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import styles from './styles/video.module.css'
import VideoControls from "./lib/VideoControls";
import Button from "components/lib/Button";

const videoControls = new VideoControls()

function Video({ srcObject, id, call, name, socketId }) {
  const videoRef = useRef(null)
  const { removePeer } = useContext(ConnectionContext)
  const [videoReady, setVideoReady] = useState()


  useEffect(() => {
    videoRef.current.srcObject = srcObject
    console.log('playing video', srcObject);
    videoRef.current.play()
  }, [srcObject])


  useEffect(() => {
    const videoEventListener = videoRef.current.addEventListener('play', (event) => {
      setVideoReady(true)
    })
    return videoEventListener?.removeEventListener('play')
  }, [videoRef, setVideoReady])

  const toggleVideo = () => {
    videoControls.toggleVideo(videoRef.current.srcObject)
  }

  const toggleAudio = () => {
    videoControls.toggleAudio(videoRef.current.srcObject)
  }

  const handleRemoveUser = () => {
    removePeer(id)
  }


  return (
    <div className={styles.peerVideoCon}>
      <span className={styles.name}>{name}</span>
      <div className={styles.peerVideoControls}>
        {videoReady ?
          <>
            <Button onClick={toggleVideo}>video</Button>
            <Button onClick={toggleAudio}>audio</Button>
            <Button onClick={handleRemoveUser}>X</Button>
          </>
          : <span>Loading</span>
        }
      </div>
      <video className={styles.video} ref={videoRef} preload="none" />
    </div>
  );
}

export default Video;