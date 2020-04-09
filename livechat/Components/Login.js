import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import axios from 'axios';
import localStorage from 'react-native-sync-localstorage'



const Login = ({ navigation }) =>{
    const [loading, setLoading] = useState(false)
    const [username, setUserName] = useState("")
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async ()=>{
        setErrorMessage("")
        await setLoading(true);
    
        await axios.post("http://172.20.10.2:8000/token/", {
          headers: {
            'Content-Type': 'application/json'
          },
          username
    
        }).then((response)=>{
              AsyncStorage.multiSet([['token', response.data.token],[ 'user_id', username] ]).then(
                      navigation.push('chat')
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
            <View>
                <TextInput placeholder='Username' onChangeText={(text) => handleUsername(text)}></TextInput>
                <Button
                    title="Go to Chat"
                    onPress={()=>handleSubmit()}
                />
            </View>
        )

}

export default Login;


