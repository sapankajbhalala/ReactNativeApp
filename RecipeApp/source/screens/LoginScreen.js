import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {connect} from 'react-redux';

class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = { isLoading: false, email: 'jm1@example.com', password: 'jay@123' }

  }


   onLoginPressed = () => {
        this.setState({ isLoading: true })
        //Note:- Provide valid URL
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {

                }

                this.setState({ isLoading: false })
            }).then((responseJSON) => {
                // console.log(responseJSON);
                // Alert.alert('Success', 'Logged in', [
                //     {
                //         text: 'Ok',
                //         style: 'destructive',
                //         onPress: () => {
                          this.props.token(responseJSON.token)
                          this.props.navigation.navigate('RecipeList')
                //         }
                //     },
                // ])

                this.setState({ isLoading: false })
            }).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                this.setState({ isLoading: false })
            })

  };

  render() {
  return (
    <Background>


      <Header>Welcome</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={this.state.email}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={this.state.password}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={this.onLoginPressed}>
        Login
      </Button>

    </Background>
  );
  }
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});


function mapDispatchToProps(dispatch) {
  return {
      token: (value) => dispatch({
          type: 'Token',
          token: value
      })
  }
}

const mapStatetoProps = (state) =>{
  return  {
      token : state.token
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(LoginScreen)