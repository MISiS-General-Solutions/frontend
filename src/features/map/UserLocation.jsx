import React from "react"
import PropTypes from "prop-types"
import {Circle, LayerGroup} from "react-leaflet";

const UserLocation = (props) => {
  const {latitude, longitude, accuracy} = props

  if (accuracy > 100) {
    return null
  }

  return (
    <LayerGroup>
      <Circle
        center={[latitude, longitude]}
        pathOptions={{fillColor: "red", color: "red"}}
        radius={accuracy}
      />
      <Circle
        center={[latitude, longitude]}
        pathOptions={{fillColor: "red", color: "white", fillOpacity: 1}}
        radius={5}
      />
    </LayerGroup>
  )
}

UserLocation.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired
}

export default UserLocation
