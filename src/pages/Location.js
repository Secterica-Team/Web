import React, {Component} from 'react';
import "./Location.css";
import "./Metadata.js";
import LocationContext from '../context/location-context';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import MetadataWindow from "./Metadata";

const colors = {
    good: '#19C519',
    moderate: '#FAFF00',
    unhealthyForSensitive: '#FFC100',
    unhealthy: '#FF0000',
    veryUnhealthy: '#AF0047',
    hazardous: '#AD0002'
};

let color = "";

class Location extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allDayData: null,
            currentDayMetaData: null,
            dateTime: [],
            response: false,
            activeLocation: null
        };
    }

    static contextType = LocationContext;

    setAQIColor = () => {
        if (this.state.currentDayMetaData.aqi <= 50) {
            color = colors.good;
            return require("../AQI_good.svg");
        } else if (this.state.currentDayMetaData.aqi > 50 && this.state.currentDayMetaData.aqi <= 100) {
            color = colors.moderate;
            return require("../AQI_moderate.svg");
        } else if (this.state.currentDayMetaData.aqi > 100 && this.state.currentDayMetaData.aqi <= 150) {
            color = colors.unhealthyForSensitive;
            return require("../AQI_Warning.svg");
        } else if (this.state.currentDayMetaData.aqi > 150 && this.state.currentDayMetaData.aqi <= 200) {
            color = colors.unhealthy;
            return require("../AQI_danger.svg");
        } else if (this.state.currentDayMetaData.aqi > 200 && this.state.currentDayMetaData.aqi <= 300) {
            color = colors.veryUnhealthy;
            return require("../AQI_very_unhealthy.svg");
        } else {
            color = colors.hazardous;
            return require("../AQI_hazardous.svg");
        }
    };

    componentWillMount() {
        this._isMounted = true;
        let currentComponent = this;
        const currentLocationToDisplayId = localStorage.getItem('currentLocationId');
        const currentLocationToDisplayName = localStorage.getItem('currentLocationName');
        const currentLocationToDisplayLatitude = localStorage.getItem('currentLocationLatitude');
        const currentLocationToDisplayLongitude = localStorage.getItem('currentLocationLongitude');
        this.context.putCurrentLocation(currentLocationToDisplayId, currentLocationToDisplayName, currentLocationToDisplayLatitude, currentLocationToDisplayLongitude);
        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(currentLocationToDisplayId)}`)
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())
            .then(
                (result) => {
                    if (this._isMounted) {
                        currentComponent.setState({
                            isLoaded: true,
                            allDayData: result,
                            currentDayMetaData: result[result.length - 1],
                            dateTime: result[result.length - 1].dateTime.split(/[T.]/),
                            response: true
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {error, isLoaded, currentDayMetaData, response} = this.state;
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <div className="my_current_location">
                        <Map className="my_map" center={[this.context.locationLatitude, this.context.locationLongitude]}
                             zoom={8}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {response && (<Marker
                                key={this.context.locationId}
                                position={[this.context.locationLatitude, this.context.locationLongitude]}
                                icon={new Icon({
                                    iconUrl: this.setAQIColor(),
                                    iconSize: [80, 85]
                                })}
                                onMouseOver={() => {
                                    this.setState({
                                        activeLocation: this.context.locationName
                                    });
                                }}

                                onMouseOut={() => {
                                    this.setState({
                                        activeLocation: null
                                    })
                                }}

                                onClick={() => {
                                    this.setState({
                                        activeLocation: this.context.locationName
                                    });
                                }
                                }
                            />)}
                            {this.state.activeLocation && (<Popup
                                position={[
                                    this.context.locationLatitude,
                                    this.context.locationLongitude
                                ]}
                            >
                                <div>
                                    {/*<h3>{this.context.locationName}</h3>*/}
                                    <h2 style={{color: color}} className="aqi_current">{currentDayMetaData.aqi}</h2>
                                    <h3 className="slash" style={{color: '#000000'}}> / </h3>
                                    <h4 className="aqi_max" style={{color: '#AD0002'}}>500</h4>
                                </div>
                            </Popup>)}
                        </Map>
                        <MetadataWindow dayData={this.state.currentDayMetaData} time={this.state.dateTime[1]}/>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Location;