import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Permission from 'expo-permissions'

export default class MapComponent extends Component {
    constructor() {
        super()
        Permission.askAsync(Permission.LOCATION)
    }

    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {

    }

    render() {
        return <View style={{ flex: 1 }}>
            <MapView
                initialRegion={{
                    latitude: 23.025836,
                    longitude: 72.503349,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }}
                style={{ flex: 1 }}
                showsUserLocation={true}
                onRegionChange={this.onMapRegionChange}
                onMarkerPress={this.onMapMarkerPressed}
            >

                <Polyline
                    strokeWidth={5}
                    strokeColor='gray'
                    coordinates={
                        [
                            {
                                latitude: 23.025734,
                                longitude: 72.503349
                            },
                            {
                                latitude: 23.025802,
                                longitude: 72.512587
                            },
                            {
                                latitude: 23.027712,
                                longitude: 72.522839
                            },
                            {
                                latitude: 23.027387,
                                longitude: 72.497136
                            }
                        ]
                    }
                >

                </Polyline>

                <Marker
                    coordinate={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                    }}
                    title='Solution Analysts'
                >

                </Marker>
            </MapView>
        </View>
    }

    onMapRegionChange = (region) => {
    }

    onMapMarkerPressed = (marker) => {
        console.log(marker);
    }
}