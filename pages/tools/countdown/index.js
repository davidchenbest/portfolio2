import Headers from '../../../components/Headers';

import App from "components/countdown/App";

export default function Split({ data, error }) {
    return <div className='px-5'>
        <Headers name='countdown' />
        <App />
    </div>
}