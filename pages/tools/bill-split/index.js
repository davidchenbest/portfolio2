import Headers from '../../../components/Headers';

import App from "../../../components/billSplit/App";

export default function Split({ data, error }) {
    return <>
        <Headers name='bill-split' />
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