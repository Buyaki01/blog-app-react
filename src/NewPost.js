const NewPost = ({postTitle, setPostTitle, postBody, setPostBody, handleSubmit}) => {
  return (
    <main className="NewPost">
      <h2 className="ml-3 text-2xl">New Post</h2>

      <form className="newPostForm" onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="title">Title:</label>
          <div className="mt-3 border-2 w-50">
            <input 
              id="postTitle"
              type="text"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="m-3">
          <label htmlFor="body"> Body: </label>
          <div className="mt-3 border-2 w-50">
            <textarea
              id="postBody"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-40 m-3 p-2 text-center  bg-gray-500 text-white round border">Submit</button>
        </div>
      </form>
    </main>
  )
}

export default NewPost;