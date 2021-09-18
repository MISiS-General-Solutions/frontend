import React from "react"
import {MapContainer, TileLayer, MapConsumer, Marker, Popup, Polyline} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import "./CameraMap.scss"
import Logo from "../../common/components/Logo"
import Button from "../../common/components/Button"
import UserLocation from "./UserLocation"
import OverlayButton from "./OverlayButton"
import GPSIcon from "../../assets/img/gps.svg"
import EventHandler from "./EventHandler";
import {IconRed} from "./Icons";

const centerCords = [55.75222, 37.6155]

class CameraMap extends React.Component {
  constructor(props) {
    super(props);

    this.geoWatcher = null
    this.currentMap = null
    this.state = {
      userPosition: null,
      showMenu: false,
      targets: [],
      waitingClick: false,
      route: null
    }
  }

  watchPosition() {
    const options = {
      enableHighAccuracy: false,
      maximumAge: 0
    }

    if (this.geoWatcher === null) {
      this.geoWatcher = navigator.geolocation.watchPosition(
        (pos) => {
          if (this.state.userPosition == null) {
            const latLng = [pos.coords.latitude, pos.coords.longitude]
            this.currentMap.flyTo(latLng, 16)
          }
          this.setState({userPosition: pos.coords})
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.setState({userPosition: null})
            navigator.geolocation.clearWatch(this.geoWatcher);
            this.geoWatcher = null
          }
        },
        options
      )
    }
  }

  handleMapClick(event) {
    const {targets, waitingClick} = this.state
    if (waitingClick) {
      this.setState({
        targets: [...targets, {
          coords: [event.latlng.lat, event.latlng.lng]
        }],
        route: null,
        waitingClick: false
      })
    }
  }

  buildRoute() {
    // TODO: Api
    const {targets} = this.state
    if (this.state.targets.length >= 2) {
      this.setState({
        targets: [],
        route: targets.map(e => e.coords)
      })
    }
  }

  render() {
    const {userPosition, showMenu, targets, route} = this.state

    return <div className="CameraMap">
      <MapContainer
        center={centerCords}
        zoom={13}
        scrollWheelZoom={true}
        style={{height: "100%", flexGrow: 1}}
      >
        <TileLayer
          attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
        <EventHandler
          events={{
            click: (e) => this.handleMapClick(e)
          }}
        />
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
        {
          targets.map((current, i) => (
            <Marker key={`marker-${i}`} position={current.coords}/>
          ))
        }
        {
          route &&
            <>
              <Polyline
                pathOptions={{color: "red", opacity: 0.8}}
                positions={route}
              />
              <Marker position={route[0]} icon={IconRed}/>
              <Marker position={route[route.length - 1]} icon={IconRed}/>
            </>
        }
      </MapContainer>
      {showMenu &&
        <div className="CameraMap__menu">
          <Button
            mode="primary"
            style={{marginRight: 15}}
            onClick={() => this.setState({waitingClick: true})}
          >
            Добавить точку
          </Button>
          <Button
            mode="primary"
            style={{marginRight: 15, width: 150}}
            onClick={() => this.setState({targets: []})}
          >
            Очистить
          </Button>
          <Button
            mode="primary"
            style={{marginRight: 15, width: 150}}
            onClick={() => this.buildRoute()}
          >
            Построить
          </Button>
        </div>
      }
      <div className="CameraMap__control">
        <Logo style={{marginLeft: 15}}/>
        <Button
          mode="primary"
          style={{marginRight: 15, width: 100}}
          onClick={() => this.setState({showMenu: !showMenu})}
        >
          Меню
        </Button>
      </div>
    </div>
  }
}

export default CameraMap