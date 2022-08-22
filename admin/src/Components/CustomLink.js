import React from 'react'
import { Link } from 'react-router-dom'
function CustomLink ({ path, children, className }) {
  return (
    <Link
      to={path}
      className={
        'font-sans text-xl m-9 py-5 px-10 bg-primary text-white ' + className
      }
    >
      {children}
    </Link>
  )
}

export default CustomLink
