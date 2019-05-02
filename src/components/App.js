import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'


import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${this.state.baseUrl}/posts`).then((res) => {
      this.setState({ posts: res.data })
      console.log('componentDidMount')
    }).catch(err => console.log('compoonentDid Not Mount'))
  }

  updatePost(id, text) {
    axios.put(`${this.state.baseUrl}/posts?id=${id}`, {text} ).then((res) => {
      this.setState({ posts: res.data })
      console.log('updatePost')
    }).catch(err => console.log('did not updatePost'))
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then((res) => {
      this.setState({ posts: res.data })
      console.log('deletePost')
    }).catch(err => console.log('did not deletePost'))
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, {text}).then((res) => {
      this.setState({ posts: res.data })
      console.log('createPost')
    }).catch(err => console.log('creatPost not posted'))
  }

  render() {
    const postMap = this.state.posts.map((post) => {
      return ( <Post key={ post.id }
        id={post.id} 
        text={ post.text }
        date={ post.date }
        updatePostFn={ this.updatePost}
        deletePostFn={this.deletePost}
        /> )
    })
    return (
      <div className="App__parent">

        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
            />
          {postMap}
          
        </section>
      </div>
    );
  }
}

export default App;
