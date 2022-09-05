// import Headers from '../../components/Headers';

import Playlists from "components/spotify/Playlists"
import { SpotifyAPI } from "modules/SpotifyAPI"

export default function PlaylistPage({ data, error }) {
    return <>
        {/* <Headers name='blog' /> */}
        <Playlists data={data} error={error} />

    </>
}

export async function getServerSideProps({ req, res, query }) {
    try {
        const spotify = new SpotifyAPI(req)
        const { id } = await spotify.getUser()
        const data = await spotify.listPlaylists(id)

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