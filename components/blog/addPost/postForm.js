import React, { Component } from 'react';


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            content: this.props.content,
            error: ''
        };

    }
    submit = (event) => {
        event.preventDefault();
        if (this.state.title.trim() && this.state.content.trim()) {
            this.props.submitPost(this.state.title, this.state.content)
        }
        else {
            this.setState({ error: 'Not Complete' })
        }

    }



    render() {
        return (
            <form autoComplete="off">
                <input id='post-form-title' placeholder='Title' type='text' onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title}></input>
                <textarea id='post-form-ta' onChange={(e) => this.setState({ content: e.target.value })} value={this.state.content}></textarea>
                <div id='post-form-btn-con'>
                    <span id='post-form-error'>{this.state.error}</span>
                    <button onClick={this.submit} >Post</button>
                </div>
            </form>
        );
    }
}



export default PostForm;