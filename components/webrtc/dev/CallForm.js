import { useContext, useState } from "react";
import { ConnectionContext } from "../ConnectionContext";

function CallForm() {
  const { callVideo } = useContext(ConnectionContext)
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');

  return <div className="dev">
    <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} placeholder='peer id' />
    <button onClick={() => callVideo(remotePeerIdValue)}>Call</button>
  </div>
}

export default CallForm