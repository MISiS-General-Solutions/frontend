import React, {createRef} from "react"
import {MapContainer, TileLayer, MapConsumer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import "./Map.scss"
import Logo from "../../common/components/Logo";
import Button from "../../common/components/Button";
import UserLocation from "./UserLocation";
import OverlayButton from "./OverlayButton";
import GPSIcon from "../../assets/img/gps.svg"

const centerCords = [55.75222, 37.6155]

class CameraMap extends React.Component {
  constructor(props) {
    super(props);

    this.geoWatcher = null
    this.currentMap = null
    this.state = {
      userPosition: null,
    }
  }

  watchPosition() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }

    if (this.geoWatcher === null) {
      this.geoWatcher = navigator.geolocation.watchPosition(
        (pos) => {
          this.setState({userPosition: pos.coords})
          const latLng = [pos.coords.latitude, pos.coords.longitude]
          this.currentMap.flyTo(latLng, 16)
        },
        (error) => console.log(error),
        options
      )
    }
  }

  render() {
    const {userPosition} = this.state

    return <div className="CameraMap">
      <MapContainer
        center={centerCords}
        zoom={13}
        scrollWheelZoom={true}
        style={{height: "100%", flexGrow: 1}}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          id="mapbox/dark-v10"
          accessToken="pk.eyJ1IjoiZWdlc2hhIiwiYSI6ImNrdG9oczJ1ZTBjeTgyeGw0Y2h0eW02OW8ifQ.MwY9X05BLX-4fhw5DAVUMA"
          trackUserLocation={true}
          showUserHeading={true}
        />
        <MapConsumer>
          {(map) => {
            this.currentMap = map
            return null
          }}
        </MapConsumer>
        <OverlayButton
          position="bottomLeft"
          icon={GPSIcon}
          onClick={() => this.watchPosition()}
        />
        {userPosition &&
          <UserLocation
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            accuracy={userPosition.accuracy}
          />
        }
      </MapContainer>
      <div className="CameraMap__control">
        <Logo style={{marginLeft: 15}}/>
        <Button
          mode="primary"
          style={{marginRight: 15, width: 100}}
        >
          Добавить
        </Button>
      </div>
    </div>
  }
}

export default CameraMap