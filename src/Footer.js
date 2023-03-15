const Footer = () => {
  const today = new Date()
  return (
    <footer className="Footer p-3">
      <p>Copyright &copy; {today.getFullYear()} </p>
    </footer>
  )
}

export default Footer;