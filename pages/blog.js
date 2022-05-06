import AddPostForm from '../components/blog/addPost/AddPostForm'
import PostContainer from '../components/blog/displayPost/postContainer'
import { postsQuery } from "../queries/queries";
import fetchGraphQL from "../modules/fetchGraphQL";
import Head from 'next/head'

export default function BlogPage({ data }) {
    return <>
        <Head>
            <title>Blog by {process.env.TITLE_NAME}</title>
        </Head>
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