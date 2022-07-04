import Button from "components/lib/Button";
import { useContext, useState } from "react";
import { ConnectionContext } from "../ConnectionContext";

function CallForm() {
  const { callVideo } = useContext(ConnectionContext)
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');

  return <div className="dev">
    <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} placeholder='peer id' />
    <Button onClick={() => callVideo(remotePeerIdValue)}>Call</Button>
  </div>
}

export default CallForm