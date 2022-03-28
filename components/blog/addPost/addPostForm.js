import React, { Component } from 'react';
import PostForm from './postForm'
import CheckEmail from './checkEmail'
import ReviewScreen from './reviewScreen'
import { addReviewPost } from '../../queries/queries'
import fetchGraphQL from '../../modules/fetchGraphQL'



class AddPostForm extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            reviewScreen: false,
            submit: false,
            showForm: false,
            title: '',
            content: ''
        };
    }
    componentDidMount() {

    }

    // async fetchGraphQL(query) {
    //     const url = '/graphql'
    //     const opts = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ query })
    //     };
    //     const res = await fetch(url, opts)
    //     const data = await res.json();
    //     return data
    // }

    submitPost = (title, content) => {
        if (title.trim() && content.trim()) {
            console.log(title, content);
            this.setState({ title, content, submit: !this.state.submit })
        }
    }

    goBack = () => {



        this.setState({ submit: false })
    }

    checkEmail = async (id) => {
        if (id && this.state.title && this.state.content) {
            const query = addReviewPost(id, this.state.title, this.state.content)
            const reviewPost = await fetchGraphQL(query)
            const reviewPostId = reviewPost.data.addReviewPost.title
            this.setState({ reviewScreen: true, title: '', content: '', message: `${reviewPostId} submitted for review` })
            setTimeout(() => { this.setState({ message: '' }) }, 3000)
            this.setState({ submit: false })
        }
        else {
            this.setState({ message: 'there was an error' })
            setTimeout(() => { this.setState({ message: '' }) }, 3000)
        }

    }

    setReviewScreen = () => {
        this.setState({ reviewScreen: false })
    }

    display = () => {
        if (!this.state.showForm) return (
            <button id='add-post' onClick={() => this.setState({ showForm: !this.state.showForm })} >Post</button>
        )
        if (this.state.reviewScreen) {
            return (<ReviewScreen goBack={this.setReviewScreen} type='post' title={this.state.title}></ReviewScreen>)
        }
        if (this.state.submit) return (
            <CheckEmail checkEmail={this.checkEmail} goBack={this.goBack}></CheckEmail>
        )
        return (
            <>
                <p>{this.state.message}</p>
                <PostForm title={this.state.title} content={this.state.content} submitPost={this.submitPost} ></PostForm>
            </>
        )
    }

    render() {
        return (
            <div id='post-form' className='maxWidth'>
                {this.display()}


            </div>

        );
    }
}



export default AddPostForm;