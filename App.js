import Routes from "./Routers/HomeRoutes.js";
import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import { loadSeller } from "./actions/sellerAuthActions";
import { loadVendor } from "./actions/vendorAuthActions";
import {Platform} from "react-native";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadSeller());
    store.dispatch(loadVendor());
  }
//   componentWillMount(){
//     // get expo push token
//    const token =Expo.Notifications.getExpoPushTokenAsync();
//  fetch('https://exp.host/--/api/v2/push/send', {       
//           method: 'POST', 
//           headers: {
//                 Accept: 'application/json',  
//                'Content-Type': 'application/json', 
//                'accept-encoding': 'gzip, deflate',   
//                'host': 'exp.host'      
//            }, 
//          body: JSON.stringify({                 
//                to: token,                        
//                title: 'New Notification',                  
//                body: 'The notification worked!',             
//                priority: "high",            
//                sound:"default",              
//                channelId:"default",   
//                    }),        
//        }).then((response) => response.json())   
//                 .then((responseJson) => {  })
//                        .catch((error) => { console.log(error) });
//  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
export default App;
AppRegistry.registerComponent("task", () => App);
