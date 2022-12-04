export default function Versions(props) {
    return (
        <>
            {JSON.stringify({ ...props })}
        </>
    )
}

export async function getStaticProps(context) {
    return {
        props: { date: new Date().toString() }
    }
}