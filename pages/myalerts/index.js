import { njtransit } from 'modules/myalert';
import Headers from '../../components/Headers'

export default function MyAlert({ data }) {
    return <>
        {/* <Headers name='myalert' /> */}
        {data.map(({ name, status, detail }) => <div key={name} className='p-3'>
            <h3>{name}</h3>
            <span>{status}</span>
            {/* <p>{detail}</p> */}
        </div>)}
    </>
}

export async function getServerSideProps({ req, res, query }) {
    try {
        const allowed = ['Northeast Corridor', 'North Jersey Coast']
        const data = (await njtransit()).filter(({ name }) => allowed.includes(name))

        return {
            props: { data }
        }
    } catch (error) {
        console.log(error);
        return {
            props: { error: error.message }
        }
    }
}
