import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-message">
          Looking for a dev to merge commits and maybe hearts. ❤️💻
        </p>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} StackMatch. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
