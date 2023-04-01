import { Link } from "react-router-dom";
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
        <ul className="list-none flex navLinks mt-2 text-2xl">
          <li className="navItem mr-5"> <Link to="/"> Home </Link></li>
          <li className="navItem mr-5"> <Link to="/post"> Post </Link></li>
          <li className="navItem"> <Link to="/about"> About </Link></li>
        </ul>
      </nav>
    )
  }
  
  export default Nav;