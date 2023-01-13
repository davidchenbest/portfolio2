import Headers from '../../components/Headers';

import App from "../../components/countdown/App";

export default function Split({ data, error }) {
    return <>
        <Headers name='countdown' />
        <App />
    </>
}

// export async function getServerSideProps({ req, res, query }) {
//     try {
//         return {
//             props: {}
//         }
//     } catch (error) {
//         console.log(error);
//         return {
//             props: { error: error.message }
//         }
//     }
// }