import React from 'react';

export default React.createContext({
    locationId: null,
    locationName: null,
    locationLatitude: null,
    locationLongitude: null,
    putCurrentLocation: (locationId, locationName, locationLatitude, locationLongitude) => {}
});