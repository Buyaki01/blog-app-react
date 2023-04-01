import Feed from "./Feed";

const Home = ({posts}) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) :(
        <p className="mt-8 text-center text-2xl"> 
          No posts to display
        </p>
      )}
    </main>
  )
}

export default Home;