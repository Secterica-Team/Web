import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Location from './pages/Location';
import MainNavigation from './components/Navigation/MainNavigation';
import LocationContext from './context/location-context';
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";

class App extends React.Component {
    state = {
        locationId: null,
        locationName: null,
        locationLatitude: null,
        locationLongitude: null,
        sideDrawerOpen: false
    };

    putCurrentLocation = (locationId, locationName, locationLatitude, locationLongitude) => {
        this.setState({
            locationId: locationId,
            locationName: locationName,
            locationLatitude: locationLatitude,
            locationLongitude: locationLongitude
        });
    };
    drawerToggleClickHandler = () => {
       this.setState((prevState) => {
           return {sideDrawerOpen: !prevState.sideDrawerOpen};
       })
    };
    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    };
    render() {
        let backdrop;

        if(this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
            <BrowserRouter>
                <React.Fragment>
                    <LocationContext.Provider
                        value={{
                            locationId: this.state.locationId,
                            locationName: this.state.locationName,
                            locationLatitude: this.state.locationLatitude,
                            locationLongitude: this.state.locationLongitude,
                            putCurrentLocation: this.putCurrentLocation
                        }}>
                        <div style={{height: '100%'}}>
                            <MainNavigation drawerClickHandler={this.drawerToggleClickHandler}/>
                            <SideDrawer show={this.state.sideDrawerOpen}/>
                            {backdrop}
                            <main className="main-content">
                                <Switch>
                                    <Redirect from="/" to="/main" exact/>
                                    <Route path="/main" component={MainPage}/>
                                    <Route path="/location" component={Location}/>
                                </Switch>
                            </main>
                        </div>
                    </LocationContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
