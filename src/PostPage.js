import { useParams, Link } from "react-router-dom";

const PostPage = ({posts, handleDelete}) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  return (
    <main className="postPage">
      <article className="m-3">
        {post && 
          <>
            <h2 className="postTitle">{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            
            <button 
              onClick={() => handleDelete(post.id)}
              className="m-5 p-3 bg-gray-500 text-white round border"
            >
              Delete Post
            </button>
          </>
        }
        {!post && 
          <>
            <h2 className="missingPage">Post Not Found</h2>
            <p className="missingPage">Well, that's disappointing</p>
            <p className="visitHomePage missingPage">
              <Link to="/"> Visit Our HomePage </Link>
            </p>
          </> 
        }

      </article>
    </main>
  )
}

export default PostPage;