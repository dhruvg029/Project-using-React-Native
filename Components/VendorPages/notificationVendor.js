import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
  Vibration,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import VendorLogout from "./LogoutVendor";
// import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import axios from "axios";
import { baseURL } from "../../config/constants.js";
import { IfFulfilled } from "react-async";

class vendorNotifications extends Component {
  arr = [];
  id = 0;
  constructor(props) {
    super(props);
    this.state = {
      //   expoPushToken: "",
      notification: {},
      notifs: null,
      text: "",
      item: [{ id: 1, data: "loading" }],
    };
  }
  //   registerForPushNotificationsAsync = async () => {
  //     console.log("asking");
  //     if (Constants.isDevice) {
  //       const { status: existingStatus } = await Permissions.getAsync(
  //         Permissions.NOTIFICATIONS
  //       );
  //       let finalStatus = existingStatus;
  //       console.log(existingStatus);
  //       if (existingStatus !== "granted") {
  //         const { status } = await Permissions.askAsync(
  //           Permissions.NOTIFICATIONS
  //         );
  //         finalStatus = status;
  //       }
  //       if (finalStatus !== "granted") {
  //         alert("Failed to get push token for push notification!");
  //         return;
  //       }
  //       token = await Notifications.getExpoPushTokenAsync();
  //       console.log(token);
  //       this.setState({ expoPushToken: token });
  //     } else {
  //       alert("Must use physical device for Push Notifications");
  //     }

  //     if (Platform.OS === "android") {
  //       Notifications.createChannelAndroidAsync("default", {
  //         name: "default",
  //         sound: true,
  //         priority: "max",
  //         vibrate: [0, 250, 250, 250],
  //       });
  //     }
  //     const config = {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     };
  //     console.log(token);
  //     var data = JSON.stringify({ token });
  //     axios
  //       .post(
  //         baseURL + "/vendor/" + this.props.vendorData._id + "/setToken",
  //         data,
  //         config
  //       )
  //       .then((res) => {
  //         console.log("Item added to the selling list");
  //         this.props.history.push("/vendor/items");
  //       })
  //       .catch((e) => {
  //         console.log("item add request failed.retry later");
  //       });
  //   };
  // BAD ME YAAD SE ASYNC HATA DENA
  async componentDidMount() {
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
    // this.setState({
    //   item: await AsyncStorage.getItem('mykey')
    // })
      if (this.props.isAuthenticated) {
        // Headers
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios
          .get(
            baseURL +
              "/vendor/" +
              this.props.vendorData._id +
              "/getNotifications",
            config
          )
          .then((response) => {
            this.setState({
              notifs: response.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
  }

  //   _handleNotification = (notification) => {
  //     Vibration.vibrate();
  //     console.log(notification);
  //     this.setState({ notification: notification });
  //   };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (
        error.id === "VENDOR_REGISTER_FAIL" ||
        error.id === "VENDOR_LOGIN_FAIL"
      ) {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (!this.props.isAuthenticated) {
      Actions.vendorLogin();
    }
  }

  deletenotifs = (notifid) => {
      if (this.props.isAuthenticated) {
        // Headers
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        // baseURL+'/vendor/'+this.props.vendorData._id+'/getNotifications', config
        // console.log(baseURL+'/vendor/'+this.props.vendorData._id+'/removeNotifications');
        axios
          .delete(
            baseURL +
              "/vendor/" +
              this.props.vendorData._id +
              "/removeNotifications/" +
              notifid,
            config
          )
          .then((res) => {
            // console.log(res);
            this.setState({
              notifs: res.data,
            });
          })
          .catch((err) => {
            console.log("deletetion reques failed", err);
          });
      }
  };
  _storeData = async () => {
    console.log("storing called");
    try {
      this.arr.push({ id: this.id, data: this.state.text });
      this.id++;
      await AsyncStorage.setItem("mylist", JSON.stringify(this.arr));
      this.setState({
        item: JSON.parse(await AsyncStorage.getItem("mylist")),
      });
      console.log(this.state.item);
    } catch (error) {
      console.log(error);
    }
  };
  deleteData = async () => {
    try {
      AsyncStorage.removeItem("mykey", async () => {
        console.log("deleted");
        this.setState({
          item: await AsyncStorage.getItem("mykey"),
        });
      });
    } catch (error) {
      console.log(this.state);
    }
  };

  checkredirect=(title)=>{
    console.log(title);
    if(title=="alert")
    {
      Actions.vendorNewsfeed();
    }
    else
    {
      Actions.vendorViewBuyedItems()
    }
  }
  // printlist(){
  //   this.state.item.map((item)=>{
  //     return (
  //       <View><Text>{item.data}</Text></View>
  //     )
  //   })
  // }

  render() {
    // let renderList = <Text>no items</Text>
    // if(this.state.item.length>0)
    // {
    // renderList=this.state.item.map((item)=>{
    //     return (
    //       <View><Text>{item.data}</Text></View>
    //     )
    //   })

    // }else{
    //   renderList= <Text>Nothing added</Text>
    // }
    // console.log(this.state)
    // console.log(this.state.notifs);

    return (
      <View>
        {this.props.isAuthenticated ? (
          <View>
            <Text />
            <Text />
            <Text />
            <Text />
            <VendorLogout />
            <View>
              <View>
                {this.state.notifs ? (
                  this.state.notifs.map((notif) => {
                    console.log(notif);
                    return (
<View style = {styles.flag} key={notif._id}>
                        <Text>
                          {notif.body}
                          {/* {notif._id} */}
                        </Text>
                        <TouchableOpacity style = {styles.edits2} onPress={(event) => this.checkredirect(notif.title)}>
                        <Text style = {styles.textColor}>Check Notification</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.edits2} onPress={(event) => this.deletenotifs(notif._id)}>
                        <Text style = {styles.textColor}>Delete Notifications</Text>
                        </TouchableOpacity>
                       </View>
                    );
                  })
                ) : (
                  <Text>No Items to display</Text>
                )}
              </View>
              <View></View>
              {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>Origin: {this.state.notification.origin}</Text>
                <Text>
                  Data: {JSON.stringify(this.state.notification.data)}
                </Text>
              </View> */}
              {/* <View>
                <TextInput label="add todo items" value={this.state.text} onChangeText={text=> this.setState({text})}/>
                <Button mode="contained" title="todo" onPress={this._storeData}/>
                <View> */}
              {/* {this.printlist()} */}
              {/* {renderList} */}
              {/* <Text>{this.state.item[0].data}</Text> */}
            </View>
          </View>
        ) : (
          // </View>
          // </View>
          <Text>Please Login First!</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  vendorData: state.vendorAuth.vendor,
  isAuthenticated: state.vendorAuth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, null)(vendorNotifications);


const styles = StyleSheet.create({
  edits2 : {
     padding : 10,
     color : '#333',
   },
   textColor : {
       padding : 10,
       textAlign : 'center',
       backgroundColor : '#5cc2f2',
       borderRadius : 10,
       paddingLeft : 20,
       paddingRight : 20,
       color : '#333',
       letterSpacing : 2,
       alignSelf : 'center',
       width : 320,
       fontWeight : 'bold'
   },
   flag : {
     borderWidth : 1,
     backgroundColor : "#f7f8fa",
     borderRadius : 5,
     margin : 5,
     borderColor : "black" 
   },
});