import Playlist from "components/spotify/Playlist"
import { SpotifyAPI } from "modules/SpotifyAPI"

export default function PlaylistPage({ error, data }) {
    return <>
        {/* <Headers name='blog' /> */}
        <Playlist data={data} error={error} />

    </>
}

export async function getServerSideProps({ req, params }) {
    try {
        let { id } = params
        const spotify = new SpotifyAPI(req)
        const data = await spotify.getPlaylist(id)
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            props: { error: error.message }
        }
    }
}