
// This is the file responsible to render the view and the data 
// (which is shared from the backend - decoupled) when dealing with getting the single feed in the application.
// GET a single feed -> REST API (http://localhost:8080/feeds/posts) -> 

import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphqlGetPostById = {
      query: `{
      getPostById(id: "${postId}")
      {
        title
        content
        iamgeUrl
        creator {
          name
        }
        createdAt
        } 
      }`
    };
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlGetPostById)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if(resData.errors){
          throw new Error('Fetching Single Post failed.');
        }
        this.setState({
          title: resData.data.post.title,
          author: resData.data.post.creator.name,
          image: 'http://localhost:8080/' + resData.data.post.imageUrl,
          date: new Date(resData.data.post.createdAt).toLocaleDateString('en-US'),
          content: resData.data.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
