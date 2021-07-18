/* eslint-disable react/jsx-props-no-spreading */

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Post from '../Post'
import './index.css'

class Posts extends Component {
  state = {
    isLoading: true,
    errorMessage: '',
    postsData: [],
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://financepeer-node.herokuapp.com/post/${userDetails.id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok === true) {
      this.setState({isLoading: false, postsData: responseData.post_data})
    } else {
      this.setState({isLoading: false, errorMessage: responseData.error_msg})
    }
  }

  goToUpload = () => {
    const {history} = this.props
    history.push('/upload')
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height={35} color="#6c63ff" />
    </div>
  )

  renderPosts = () => {
    const {postsData} = this.state
    return postsData.length === 0 ? (
      <div className="no-posts-container">
        <h1 className="no-posts">There are no posts yet</h1>
      </div>
    ) : (
      <div className="all-posts-container">
        <h1 className="all-posts-heading">All Posts</h1>
        {postsData.map(postElement => {
          const userId = postElement.user_id
          const {id, title, body} = postElement
          return <Post key={id} userId={userId} title={title} post={body} />
        })}
      </div>
    )
  }

  renderPostsData = () => {
    const {errorMessage} = this.state
    return errorMessage ? <p>{errorMessage}</p> : this.renderPosts()
  }

  renderData = () => {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderPostsData()
  }

  render() {
    return (
      <div className="home-bg">
        <Header />
        {this.renderData()}
      </div>
    )
  }
}

export default Posts
