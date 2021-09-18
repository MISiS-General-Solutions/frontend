import React from "react"
import "./Logo.scss"

const Logo = ({style}) => {
  return (
    <div className="Logo" style={style}>
      <div className="Logo__icon"/>
      <div className="Logo__text">
        SafeMap
      </div>
    </div>
  )
}

export default Logo
