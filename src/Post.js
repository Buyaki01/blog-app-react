import { Link } from "react-router-dom"

const Post = ({post}) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2 className="mb-3">{post.title}</h2> 
        <p className="postDate mb-3">{post.datetime}</p>
      </Link>
      <p className="postBody mb-3">{
        (post.body).length <= 25 
          ? post.body
          : `${(post.body).slice(0, 25)}....`
        }
      </p>
      <hr />
    </article>
  )
}

export default Post