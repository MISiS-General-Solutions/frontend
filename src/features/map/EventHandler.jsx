import React from "react"
import {useMapEvents} from "react-leaflet";

const EventHandler = (props) => {
  // TODO: refactor
  const {events} = props
  useMapEvents(events)
  return null
}

export default EventHandler