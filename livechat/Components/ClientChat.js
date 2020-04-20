import React from 'react';
import { View, SafeAreaView, AsyncStorage } from 'react-native';
import { API_KEY} from 'react-native-dotenv';

import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const chatClient = new StreamChat(API_KEY);

class ChannelScreen extends React.Component {

state = {
	id:'',
	token:'',
	status: false,
	channel: ''
}
getUserToken = async ()=>{
	await AsyncStorage.getItem("token").then((token)=>{
		this.setState({token});
	})

}

getUserId = async ()=>{
	await AsyncStorage.getItem("user_id").then((user_id)=>{
		this.setState({id:user_id});
	})
}

async componentDidMount(){

	await this.getUserId();
	await this.getUserToken();

	chatClient.setUser({
		id: this.state.id,
		name: this.state.id,
		image:
			'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
		},
		this.state.token
		);
		this.setState({channel: chatClient.channel("messaging", "", {
				members:["eze", "admin"]
		})})
			await this.state.channel.watch();
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

export default ChannelScreen;