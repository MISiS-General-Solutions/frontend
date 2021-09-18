import React from "react"
import PropTypes from "prop-types"
import "./OverlayButton.scss"

const POSITION_CLASSES = {
  bottomLeft: 'leaflet-bottom leaflet-left',
  bottomRight: 'leaflet-bottom leaflet-right',
  topLeft: 'leaflet-top leaflet-left',
  topRight: 'leaflet-top leaflet-right',
}

const OverlayButton = (props) => {
  const {icon, onClick, position, className, ...restProps} = props

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topRight
  const classNames = ["OverlayButton", "leaflet-control", "leaflet-bar", className]

  return (
    <div className={positionClass}>
      <div className={classNames.join(" ")} onClick={onClick} {...restProps}>
        <img src={icon} alt="+" style={{width: 16, height: 16}}/>
      </div>
    </div>
  )
}

OverlayButton.propTyps = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(
    ["bottomLeft", "bottomRight", "topLeft", "topRight"]
  )
}

export default OverlayButton
