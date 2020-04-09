import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import localStorage from 'react-native-sync-localstorage'

import { API_KEY} from 'react-native-dotenv'
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const ChatScreen = ()=>{
	const [token, setToken] = useState('')
	const [user_id, setUserId] =  useState('')
	const [status, setStatus] = useState(false)
	const [user, setUser] = useState('')
	const isMountedRef = useRef(null);

	const chatClient = new StreamChat(API_KEY);

		useEffect(()=>{
			let isMountedRef = true;
			if(isMountedRef){retrieveData()}
			return () => {
				isMountedRef = false;  // not good
			}
		}, [])

		const retrieveData = async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				if (token !== null) {
					console.log(token)

					// We have data!!
					setToken(token)
				}

				const username = await AsyncStorage.getItem('user_id')

				if (username !== null){
					setUserId(username)
					const user = {
						id: username,
						name: 'Muddy haze',
						image:
							'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
						};

					setUser(user)
				}

			} catch (error) {
			// Error retrieving data
			console.log(error)
			}
		};

		chatClient.setUser(user, token);
		const channel = chatClient.channel("messaging", "muddy-haze-6");
		channel.watch();

	return(
		<SafeAreaView>
        {status && <Chat client={chatClient}>
          <Channel channel={channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
		}
		<Text>Loading...</Text>
      </SafeAreaView>
	)
}

// class ChatScreen extends Component{

// 	state = {
// 		user:'',
// 		token: '',
// 		user_id:'',
// 		status:false,
// 		user: ''
// 	}

// 	constructor(props){
// 		super(props)
// 	}

// 	componentDidMount(){
// 		let mounted = true;

// 		if(mounted){
// 			this.retrieveData()
// 		}

// 		return () => mounted = false;
// 	}


// 	retrieveData = async () => {

// 		try {
// 		  const token = await AsyncStorage.getItem('token');
// 		  if (token !== null) {
// 			console.log(token)

// 			// We have data!!
// 			this.setState({token})
// 		}

// 		const username = await AsyncStorage.getItem('user_id')

// 		if (username !== null){
// 			this.setState({user_id:username})
// 			const user = {
// 				id: username,
// 				name: 'Muddy haze',
// 				image:
// 					'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
// 				};

// 			this.setState({user})
// 		}

// 		} catch (error) {
// 		  // Error retrieving data
// 		  console.log(error)
// 		}
// 	  };



// 	render(){
// 		const chatClient = new StreamChat(API_KEY);
// 		console.log(this.state.user, this.state.token)
// 		chatClient.setUser(this.state.user, this.state.token);
// 		channel = chatClient.channel("messaging", "muddy-haze-6");
// 		channel.watch();

// 		return (
// 			<SafeAreaView>
// 			{status && <Chat client={chatClient}>
// 			  <Channel channel={channel}>
// 				<View style={{ display: "flex", height: "100%" }}>
// 				  <MessageList />
// 				  <MessageInput />
// 				</View>
// 			  </Channel>
// 			</Chat>
// 			}
// 			<Text>Loading...</Text>
// 		  </SafeAreaView>
// 		)
// 	}
// }



export default ChatScreen;