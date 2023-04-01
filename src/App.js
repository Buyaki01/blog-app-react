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
import apiRequest from "./apiRequest";
import { DataProvider } from "./context/DataContext";

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
    const fetchPosts = async () => {
      try{
        const response = await apiRequest.get('/posts')
        setPosts(response.data)
      }catch(err){
        if(err.response){
          //Not in the 200 response range
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else{
          //Response is undefined. No response at all or a 404 Error
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body:  postBody}
    try{
      const response = await apiRequest.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts);
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await apiRequest.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => (post.id === id ? response.data : post)));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };  

  const handleDelete = async (id) => {
    try{
      await apiRequest.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div className="App">
      <DataProvider>
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
      </DataProvider>
    </div>
  );
}

export default App;
