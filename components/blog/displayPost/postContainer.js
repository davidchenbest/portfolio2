import React, { Component } from 'react'
import EachPost from './eachPost'
import fetchGraphQL from '../../../modules/fetchGraphQL'
import { postsQuery } from '../../../queries/queries'
import secToDate from '../../../modules/secToDate'
import Loading from '../../Loading'


class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fetch: false
        };

    }

    async componentDidMount() {
        const data = this.props.data.posts
        this.setState({ data })
        this.setState({ fetch: true })
    }

    getData = async () => {

    }

    render() {
        return (
            < div className='postContainer'>

                {this.state.fetch ?
                    this.state.data.map((d, index) => (
                        <EachPost key={index} id={d.id} title={d.title} content={d.content} first={d.author.first} last={d.author.last} date={secToDate(d.date)} comments={d.comments}></EachPost>
                    ))
                    : <Loading />
                }


            </div>
        );
    }
}

export default PostContainer