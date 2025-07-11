import React from 'react'

const Underline = () => {
  return (
    <div className='relative block border'  >
        <svg
    className="absolute left-1/2 top-[-5px] -translate-x-1/2"
    width="300"
    height="30"
    viewBox="0 0 120 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 15 Q 60 25, 110 15" stroke="var(--lightBlue)" strokeWidth="3" fill="transparent" />
  </svg>
    </div>
  )
}

export default Underline