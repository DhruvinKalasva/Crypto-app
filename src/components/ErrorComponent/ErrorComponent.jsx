import React from 'react'
import "./ErrorComponent.css"
const ErrorComponent = ({message}) => {
  return (
    <div>
        <h1 className='error-section'>
        {message}
        </h1>
    </div>
  )
}

export default ErrorComponent