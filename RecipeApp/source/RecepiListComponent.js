import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, RefreshControl, ActivityIndicator, ImageBackground, Image, Button } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { connect } from 'react-redux'


 class RecepiListComponent extends Component {

    constructor() {
        super()
        this.state = {
            //token: null,
            isLoading: true,
            recipeInfoList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
         this.getRecepeList(this.props.token)
        this.setState({ token:this.props.token})

    }


    addRecepie = () => {

    }

    onRefresh = () => {
     
        this.setState({ isFetching: true }, function () { this.getRecepeList(this.props.token) });
    }

    recepieDetailNavigate(item) {
        console.log('Item :', item);
    }

    getRecepeList (token)  {
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
            {
                method: 'GET',
                headers: {
                   // 'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'// 'Bearer ' + this.props.navigation.getParam('token')
                    'Authorization' : 'Bearer ' + token
                }
            }).then((response) => { return response.json() })
            .then((responseJson) => {
                this.setState({ isLoading: false, isFetching: false })
                if (responseJson.error != null) {
                    Alert.error('ERROR', responseJson.error)
                }
                else {
                    console.log(responseJson);
                    this.setState({ recipeInfoList: responseJson })
                }
            }).catch((error) => {
                this.setState({ isLoading: false })
                Alert.alert('ERROR', error)
            })
    }

    addCardView = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.recepieDetailNavigate(item)}>
                <View style={styles.recipeView}>
                    <View style={styles.recipeImageView}>
                        <Image source={this.getImageUrl(item.photo)} style={styles.recipeCardImage} />
                    </View>
                    <View style={styles.textContentView}>
                        <Text style={styles.recepieName}>{item.name} </Text>
                        <Text style={styles.recepieMadebyName}>🥪 👨‍🍳  {item.firstName + ' ' + item.lastName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    getImageUrl(url) {
        console.log(url)

        if (url == null) {
        } else {
            return { uri: url }
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'rgba(240, 240, 246, 1)', flex: 1 }}>
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    {this.state.isLoading ? <ActivityIndicator color='black' size='large' style={{ backgroundColor: 'rgba(240, 240, 246, 1)', width: '100%', height: '100%' }} /> :
                        <FlatList
                            data={this.state.recipeInfoList}
                            renderItem={this.addCardView}
                            keyExtractor={(item, index) => index}
                            key={(item, index) => index}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={() => this.onRefresh()}
                                    refreshing={this.state.isFetching}
                                />
                            }
                        />}
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 240, 246, 1)'
    },
    recepieName: {
        color: '#454545',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 8
    },
    recepieMadebyName: {
        color: '#7d8082',
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'TimesNewRomanPSMT',
        padding: 8
    },
    receipeNavigtionTitle: {
        fontFamily: 'TimesNewRomanPS-BoldMT',
        color: 'black',
        fontSize: 30,
        padding: 8
    },
    receipeNavView: {
        backgroundColor: 'rgba(240, 240, 246, 1)',
        height: 60,
    },
    recipeView: {
        flex: 1,
        borderRadius: 5,
        margin: 8,
        height: 200,
        width: '96%',
        backgroundColor: '#f7f8fa',
        padding: 10,
        paddingLeft: 12,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    recipeCardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    recipeImageView: {
        height: 100,
        width: '100%',
        backgroundColor: 'rgba(240, 240, 246, 1)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContentView: {
        flexDirection: 'column',
        padding: 5,
    },
    addButtonStyleNavigation: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 25,
        padding: 8
    },
    navigationTtile: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRomanPS-BoldMT',
        fontSize: 30,
        textAlign: 'center',
        paddingLeft: 50,
        flex: 1,
    },
    navigationButton: {
        color: 'blue',
        fontFamily: 'TimesNewRomanPSMT',
        fontSize: 18,
    }
});

const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(RecepiListComponent)
