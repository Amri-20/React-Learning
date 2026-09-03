import React, { Children } from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='',
    ...props
}) {
     
  return (
    <button className={`ps-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button