import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditPost = ({posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody}) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if(post){
      setEditTitle(post.title)
      setEditBody(post.body)
    }

  }, [post, setEditTitle, setEditBody])

  return (
    <main className="EditPost">
      {editTitle && 
        <>
          <h2 className="ml-3 text-2xl">Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault}>
            <div className="m-3">
              <label htmlFor="title">Title:</label>
              <div className="mt-3 border-2 w-50">
                <input 
                  id="editTitle"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="m-3">
              <label htmlFor="body"> Body: </label>
              <div className="mt-3 border-2 w-50">
                <textarea
                  id="editBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" onClick={() => handleEdit(post.id)} className="w-40 m-3 p-2 text-center  bg-gray-500 text-white round border">Submit</button>
            </div>
          </form>
        </>
      }
      {!editTitle && 
        <>
          <h2 className="missingPage">Post Not Found</h2>
          <p className="missingPage">Well, that's disappointing</p>
          <p className="visitHomePage missingPage">
            <Link to="/"> Visit Our HomePage </Link>
          </p>
        </>
      }
    </main>
  )
}

export default EditPost
