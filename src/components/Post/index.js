import './index.css'

const Post = props => {
  const {userId, title, post} = props
  return (
    <div className="post-container">
      <p className="post-user-id">{`user-id :${userId}`}</p>
      <p className="post-title">{title}</p>
      <p className="post-body">{post}</p>
    </div>
  )
}

export default Post
