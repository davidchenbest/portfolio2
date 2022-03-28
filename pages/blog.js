import AddPostForm from '../components/blog/addPost/AddPostForm'
import PostContainer from '../components/blog/displayPost/postContainer'
import { postsQuery } from "../queries/queries";
import fetchGraphQL from "../modules/fetchGraphQL";

export default function BlogPage({ data }) {
    return <>
        <AddPostForm />
        <PostContainer data={data} />
    </>
}

export async function getStaticProps(context) {
    const query = postsQuery()
    const posts = (await fetchGraphQL(query)).data

    return {
        props: { data: posts }
    }
}