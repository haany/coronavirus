import React, { Component } from 'react'
import { View, Text, StatusBar, ActivityIndicator, Modal, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import MapView from 'react-native-maps'
import Styles from './style'
import { PHARMA_LINK } from '../../../../utils/const'

const markerImageSize = {
    x: 42 + 3,
    y: 53 + 4
}

class BoxMarker extends React.Component {
    state = {
        loaded: false,
        isLoading: true,
        dataSource: null,

    }

    render() {
        const { box, onPress, selected } = this.props

        return (
            <MapView.Marker
                key={`${this.state.loaded}`}
                coordinate={{ latitude: box.latitude, longitude: box.longitude }}
                onPress={e => {
                    return (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={true}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View >
                                <View >
                                    <Text>Hello World!</Text>

                                    <TouchableHighlight
                                        onPress={() => {

                                        }}
                                    >
                                        <Text >Hide Modal</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                    )
                }}
                centerOffset={{ x: 0, y: -markerImageSize.y / 2 }}
                anchor={{ x: 0.5, y: 1 }}
                style={{
                    zIndex: selected ? 1 : undefined,
                    paddingHorizontal: 1
                }}
            />
        )
    }
}


class ZonesScreen extends Component {

    state = {
        location: null,
        getLocation: false,
        L1: null,
        L2: null,
        staticData: [
            {
                name: 'Pharmacie Allouane',
                num: '021 67 49 37',
                latitude: 36.7458033,
                longitude: 3.0657315,
            },
            {
                name: 'Pharmacie N.BOUZENADA',
                num: ' ',
                latitude: 36.7157397,
                longitude: 3.1884599,
            },
            {
                name: 'Pharmacie Coopérative Yasmine',
                num: ' ',
                latitude: 36.7165847,
                longitude: 3.1973165,
            },
            {
                name: 'Pharmacie DJIDI',
                num: '',
                latitude: 36.7279771,
                longitude: 3.1476447,
            },
            {
                name: 'Pharmacie Belhadj',
                num: '',
                latitude: 36.7254919,
                longitude: 3.0953765,
            },
            {
                name: 'Pharmacie MEZIANE',
                num: ' ',
                latitude: 36.7233743,
                longitude: 3.0600008,
            },
            {
                name: 'Pharmacie Les Asphodeles',
                num: '021 91 11 21',
                latitude: 36.7605754,
                longitude: 3.0137005,
            },
            {
                name: 'Pharmacie',
                num: '',
                latitude: 36.8131243,
                longitude: 2.9901588,
            },
            {
                name: 'Pharmacie Des Bains - KIBBOUA. M.',
                num: '021 95 92 03',
                latitude: 36.8136568,
                longitude: 2.9741943,
            },
            {
                name: 'The Center Pharmacy',
                num: '021 63 69 24',
                latitude: 36.7721073,
                longitude: 3.0580294,
            },

        ],

        isLoading: true,
        dataSource: null,
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({
                    L1: position.coords.latitude,
                    L2: position.coords.longitude
                })

                this.setState({ location });
                this.setState({
                    getLocation: true
                })
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    componentDidMount() {
        this.findCoordinates();

        //  return(
        //      fetch(PHARMA_LINK)
        //      .then((response)=>response.json())
        //      .then((responseJson)=>{

        //         this.setState({
        //             dataSource:responseJson,
        //             isLoading:false
        //         })
        //             console.log(this.state.dataSource);

        //      })
        //  )


    }

    render() {

        if (!this.state.getLocation)
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        return (
            <View>

                <MapView
                    style={Styles.mapStyle}
                    initialRegion={{
                        latitude: this.state.L1,
                        longitude: this.state.L2,
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5

                    }}
                    mapType="standard"


                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}
                >



                    {
                        this.state.staticData.map((item, index) => {
                            return (
                                <BoxMarker
                                    key={index}
                                    box={{
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }}
                                />
                            )
                        })
                    }

                </MapView>
            </View>
        )
    }
}

export default withNavigation(ZonesScreen);