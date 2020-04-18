import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, TouchableHighlight, Alert, AsyncStorage} from 'react-native';
import axios from 'axios';
import localStorage from 'react-native-sync-localstorage'



const Login = ({ navigation }) =>{
    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async ()=>{
        setErrorMessage("")
        await setLoading(true);

        
    
        axios.post("http://172.20.10.2:8000/token", {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            crossorigin:true 
          },
          username
    
        }).then((response)=>{
              AsyncStorage.multiSet([['token', response.data.token],[ 'user_id', username] ]).then(
                  
                ()=>{
                  if(username !== 'admin'){
                    navigation.push('chat')
                  }else{
                    navigation.push('admin')

                  }
                }

                  )
          }).catch((err)=>{
            setLoading(false);
            setErrorMessage("Your registration wasn't successful, please, try again.")
            console.log("error", JSON.stringify(err))
        })
        setLoading(false);
    }

    const handleUsername = text => {
        setUserName(text);
      };


        return (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style={styles.inputs}
                    placeholder="Username"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => handleUsername(text)}/>
              </View>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>handleSubmit()}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>
            </View>
        )

  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default Login;


