import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { API_KEY, API_TOKEN } from 'react-native-dotenv'

import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const chatClient = new StreamChat(API_KEY);

class AdminChannelScreen extends React.Component {

state = {
	id:'',
	token:'',
	status: false,
	channel: ''
}
getUserToken = async ()=>{
	await AsyncStorage.getItem("token").then((value)=>{
		console.log(value)
		this.setState({token:value})
	})

}

getUserId = async ()=>{
	await AsyncStorage.getItem("user_id").then((value)=>{
		console.log(value)
		this.setState({id:value})
	})
}

	async componentDidMount(){

		await this.getUserId()
		await this.getUserToken()
		// if (this.state.status===true)
		chatClient.setUser({
			id: this.state.id,
			name: this.state.id,
			image:
			  'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
			},
			this.state.token
		)

		this.setState({channel:chatClient.channel("messaging", "", {members:["client", 'admin']})})
		await this.state.channel.watch()
	}

  render() {
    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <Channel channel={this.state.channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}



export default class App extends React.Component {
  render() {
    return <AdminChannelScreen />;
  }
}