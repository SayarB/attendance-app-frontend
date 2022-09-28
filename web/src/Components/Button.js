import React from 'react'

function Button ({ id, onClick, children, className, type, disabled }) {
  return (
    <button
      // disabled={disabled}
      id={id}
      type={type}
      onClick={onClick}
      className={
        `font-sans text-xl m-9 py-5 px-10 ${
          !disabled ? 'bg-primary text-white' : 'bg-transparent text-primary'
        } border-2 border-primary ` + className
      }
    >
      {children}
    </button>
  )
}

export default Button
