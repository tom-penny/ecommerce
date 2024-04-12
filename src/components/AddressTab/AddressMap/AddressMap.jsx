import { useState, useRef, useCallback } from 'react'
import { GoogleMap, Autocomplete, Marker, useJsApiLoader } from '@react-google-maps/api'

import './AddressMap.scss'

const getComponent = (components, type) =>
    components.find(c => c.types.includes(type))?.long_name ?? ''

const AddressMap = ({ onSelectAddress }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-maps-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ['places']
    })

    const [coordinates, setCoordinates] = useState(null)

    const mapInstance = useRef(null)
    const autocomplete = useRef(null)

    const onLoadMap = useCallback((instance) => {
        mapInstance.current = instance
    }, [])


    const onLoadAutocomplete = useCallback((instance) => {
        autocomplete.current = instance
    }, [])

    const onPlaceChanged = () => {

        if (!autocomplete.current) return

        const place = autocomplete.current.getPlace()

        const bounds = new window.google.maps.LatLngBounds()

        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
        }
        else {
            bounds.extend(place.geometry.location)
        }

        if (mapInstance.current) {
            mapInstance.current.fitBounds(bounds)

            const newCoordinates = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }

            setCoordinates(newCoordinates)
        }

        onSelectAddress({
            street: place.name,
            city: getComponent(place.address_components, 'locality'),
            country: getComponent(place.address_components, 'country'),
            postCode: getComponent(place.address_components, 'postal_code')
        })
    }

    if (!isLoaded) return <></>

    return <div className='address-map'>
        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
            <input className='address-map__input' type='text' placeholder='Search address'/>
        </Autocomplete>
        <GoogleMap onLoad={onLoadMap} center={{ lat: 54.5260, lng: -3.3086 }} zoom={5} mapContainerStyle={{ width: "100%", height: "100%" }}>
            {coordinates && <Marker position={coordinates}/>}
        </GoogleMap>
    </div>
}

export default AddressMap