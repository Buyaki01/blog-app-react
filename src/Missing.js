import { Link } from "react-router-dom"; 

const Missing = () => {
  return (
    <main className="Missing ml-3">
      <h2 className="missingPage">Page Not Found</h2>
      <p className="missingPage">Well, that's disappointing</p>
      <p className="visitHomePage missingPage">
        <Link to="/"> Visit Our HomePage </Link>
      </p>
    </main>
  )
}

export default Missing;