const Nav = ({search, setSearch}) => {
    return (
      <nav className="Nav">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="sr-only">Search Posts</label>
          <input
            className="searchInputField"
            id="search" 
            type="text" 
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </nav>
    )
  }
  
  export default Nav;