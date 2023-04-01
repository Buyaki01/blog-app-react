import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body:  postBody}
    const allPosts = [...posts, newPost]
    setPosts(allPosts);
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id, title: editTitle, datetime, body:  editBody}
    const allUpdatedPosts = [...posts, updatedPost]
    setPosts(posts.map(post => post.id === id ? allUpdatedPosts : post));
    setEditTitle('')
    setEditBody('')
    window.location.href='http://localhost:3000/'
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id)
    setPosts(postsList)
    navigate('/')
  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch}/>

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
    
        <Route path="/post" element={<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />} />

        <Route path="/edit/:id" element={<EditPost 
          posts={posts}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />} />
      
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
      
        <Route path="/about" element={<About />}/>
      
        <Route path="*" element={<Missing />}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
