// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { StyleSheet, Text, View,TextInput, Platform, Button, Vibration, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import VendorLogout from './LogoutVendor';
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
// import Constants from "expo-constants";
// import axios from "axios";
// import { baseURL } from "../../config/constants.js";

// class vendorProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       expoPushToken: "",
//       notification: {},
//     };
//   }
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
//   // BAD ME YAAD SE ASYNC HATA DENA
//   async componentDidMount() {
//     this.registerForPushNotificationsAsync();

//     this._notificationSubscription = Notifications.addListener(
//       this._handleNotification
//     );
//     this.setState({
//       item: await AsyncStorage.getItem('mykey')
//     })
//   }

//   _handleNotification = (notification) => {
//     Vibration.vibrate();
//     console.log(notification);
//     this.setState({ notification: notification });
//   };
//     componentDidUpdate(prevProps) {
//         const { error } = this.props;
//         if (error !== prevProps.error) {
//           // Check for register error
//           if (error.id === 'VENDOR_REGISTER_FAIL' || error.id === 'VENDOR_LOGIN_FAIL') {
//             this.setState({ msg: error.msg.msg });
//           } else {
//             this.setState({ msg: null });
//           }
//         }
//         if(!this.props.isAuthenticated){
//           Actions.vendorLogin();
//         }
//       }
//       _storeData = async () => {
//         try {
//           await AsyncStorage.setItem('mykey', 'I like to save it.');
//           this.setState({
//             item: await AsyncStorage.getItem('mykey')
//           })
//         } catch (error) {
//           console.log(error);
//         }
//         console.log.this.state;
//       };
//       deleteData = async () => {
//         try {
//           AsyncStorage.removeItem('mykey',async ()=>{
//             console.log("deleted");
//             this.setState({
//               item: await AsyncStorage.getItem('mykey')
//             })
//           });
//         } catch (error) {
//           console.log(this.state);
//         }
//       };

//       render(){
//           return (
//             <View>
//                 {this.props.isAuthenticated ? (
//               <View>
//                 <Text/><Text/><Text/><Text/>
//                 <VendorLogout/>
//             <View>
//                 <Text style = {styles.edits1}>Welcome {this.props.vendorData.name} !</Text>
//                 <Text style = {styles.edits1}>Here are all the details you entered</Text>
//                 <View style = {styles.editing}>
//                   <Text style = {styles.edits}>Name:</Text>
//                   <Text style = {styles.seller1}>{this.props.vendorData.name}</Text>
//                   <Text style = {styles.edits}>Email:</Text>
//                   <Text style = {styles.seller1}>{this.props.vendorData.email}</Text>
//                   <Text style = {styles.edits}>Contact:</Text>
//                   <Text style = {styles.seller1}>{this.props.vendorData.contact}</Text>
//                   <Text style = {styles.edits}>Address:</Text>
//                  <Text style = {styles.seller1}>{this.props.vendorData.address}</Text>
//                 </View>
//                 <TouchableOpacity style = {styles.edits2}>
//                 <Text style = {styles.textColor}>Edit Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style = {styles.edits3} onPress={() => Actions.vendorNewsfeed()}>
//                    <Text style = {styles.textColor}>View Items For Sale</Text>
//                    </TouchableOpacity>
//                 <View>
//                     <Text onPress={() => Actions.vendorViewBuyedItems()}>View All items purchased by you</Text>
//                 </View>
//                 <View>
//                       <Text onPress={() => Actions.vendorNewWasteType()}>Request for new category or sub-category</Text>
//                 </View>
//                 <View>
//                       <Text onPress={() => Actions.vendorChooseCat()}>choose categories to quote for</Text>
//                 </View>
//                 <View>
//                       <Text onPress={() => Actions.vendorEditPrice()}>edit quoted price for items</Text>
//                 </View>
//                 <View>
//                       <Text onPress={() => Actions.vendorNotifications()}>Notifications</Text>
//                 </View>
//                 <View style={{ alignItems: "center", justifyContent: "center" }}>
//                 <Text>Origin: {this.state.notification.origin}</Text>
//                 <Text>
//                   Data: {JSON.stringify(this.state.notification.data)}
//                 </Text>
//               </View>
//               {/* <View>
//                 <Button title="store it" onPress={this._storeData}></Button>
//                 <Text>{this.state.item}</Text>
//                 <Button title="store it" onPress={this.deleteData}></Button>
//               </View> */}

//             </View>
//             </View>
//             ) : (
//               <Text>Please Login First!</Text>
//             )}
//             </View>

//           );
//       }
// }

// const mapStateToProps = state => ({
//     vendorData:state.vendorAuth.vendor,
//     isAuthenticated: state.vendorAuth.isAuthenticated,
//     error: state.error
//   });

// export default connect(mapStateToProps,null)(vendorProfile);
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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
import VendorLogout from "./LogoutVendor";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import axios from "axios";
import { baseURL } from "../../config/constants.js";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

class vendorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expoPushToken: "",
      notification: {},
    };
  }

  registerForPushNotificationsAsync = async () => {
    console.log("asking");
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      console.log(existingStatus);
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(token);
    var data = JSON.stringify({ token });
    axios
      .post(
        baseURL + "/vendor/" + this.props.vendorData._id + "/setToken",
        data,
        config
      )
      .then((res) => {
        console.log("Item added to the selling list");
        this.props.history.push("/vendor/items");
      })
      .catch((e) => {
        console.log("item add request failed.retry later");
      });
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

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
  resend(e) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    // {
    //   console.log(this.props);
    // }
    var data = JSON.stringify({
      email: this.props.vendorData.email,
    });
    console.log(data);
    axios
      .post(baseURL + "/vendor/resendToken", data, config)
      .then((res) => {
        // store.addNotification({
        //   title: "success",
        //   message: res.data.msg,
        //   type: "success",
        //   insert: "top",
        //   container: "top-right",
        //   animationIn: ["animated", "fadeIn"],
        //   animationOut: ["animated", "fadeOut"],
        //   dismiss: {
        //     duration: 5000,
        //     onScreen: true,
        //     pauseOnHover: true,
        //     showIcon: true,
        //   },
        // });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.isAuthenticated ? (
            <View>
              <Text />
              <Text />
              <Text />
              <View>
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <VendorLogout />
                    {/* <View ></View> */}
                    <FontAwesome
                      onPress={() => Actions.vendorNotifications()}
                      name={"bell-o"}
                      size={28}
                      style={{
                        marginRight: 10,
                        textAlignVertical: "center",
                      }}
                    />
                  </View>
                  <Text style={styles.edits1}>
                    Welcome {this.props.vendorData.name} !
                  </Text>
                  <View
                    style={{
                      zIndex: 10,
                    }}
                  >
                    <View style={styles.editing}>
                      {/*<Text style={styles.edits1}>*/}
                      {/*    Here are all the details you entered.*/}
                      {/*</Text>*/}
                      <View
                        style={{
                          alignItems: "center",
                          marginTop: 20,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 60,
                            backgroundColor: "#5cc2f2",
                            borderRadius: 100,
                            width: 90,
                            paddingBottom: 9,
                            textAlignVertical: "center",
                          }}
                        >
                          {this.props.vendorData.name[0]}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        {/*<Text>*/}
                        {/*    Name:{"\n"}*/}
                        {/*    Email:{"\n"}*/}
                        {/*    Contact:{"\n"}*/}
                        {/*    Address:{"\n"}*/}
                        {/*</Text>*/}
                        <View>
                          <Text style={styles.NameHead}>
                            {this.props.vendorData.name} Sebastian
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItem: "center",
                              width: 200,
                              marginTop: 5,
                            }}
                          >
                            <EvilIcons
                              name={"location"}
                              size={20}
                              style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                              }}
                            />
                            <Text style={styles.AddressHead}>
                              {this.props.vendorData.address}, Ontario, Canada
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginTop: 5,
                          marginHorizontal: 3,
                        }}
                      >
                        <Text style={{ fontStyle: "italic" }}>
                          {this.props.vendorData.email}
                        </Text>
                        <Text>{this.props.vendorData.contact}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity style={styles.EditDet}>
                          <Text style={styles.EditDetText}>Edit Details </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.EditDet}
                          onPress={() => Actions.vendorNewsfeed()}
                        >
                          <Text style={styles.EditDetText}>
                            View Items For Sale
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {!this.props.vendorData.isVerified ? (
                      <View>
                        <Text>
                          Your email has still not been verified. If you have
                          not recieved mail, click here
                        </Text>
                        <Button
                          onPress={this.resend.bind(this)}
                          title="Resend"
                        />
                      </View>
                    ) : null}
                  </View>
                </View>

                <View
                  style={{
                    marginTop: -90,
                    zIndex: -1,
                    backgroundColor: "white",
                  }}
                >
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <Text />
                  <View>
                    <TouchableOpacity
                      style={styles.edits2}
                      onPress={() => Actions.vendorNewWasteType()}
                    >
                      <Text style={styles.textColor}>
                        Request for new category or sub-category
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.edits2}
                      onPress={() => Actions.vendorViewBuyedItems()}
                    >
                      <Text style={styles.textColor}>
                        View All items purchased by you
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.edits2}
                      onPress={() => Actions.vendorChooseCat()}
                    >
                      <Text style={styles.textColor}>
                        Choose categories to quote for
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.edits2}
                      onPress={() => Actions.vendorEditPrice()}
                    >
                      <Text style={styles.textColor}>
                        Edit quoted price for items
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/*<View*/}
                  {/*    style={{alignItems: "center", justifyContent: "center"}}*/}
                  {/*>*/}
                  {/*    <Text>Origin: {this.state.notification.origin}</Text>*/}
                  {/*    <Text>*/}
                  {/*        Data: {JSON.stringify(this.state.notification.data)}*/}
                  {/*    </Text>*/}
                  {/*</View>*/}
                  {/*<Button*/}
                  {/*    title={"Press to Send Notification"}*/}
                  {/*    onPress={() => this.sendPushNotification()}*/}
                  {/*/>*/}
                </View>
              </View>
            </View>
          ) : (
            <Text>Please Login First!</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc2f2",
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  edits: {
    fontSize: 15,
    marginLeft: 10,
    color: "black",
  },
  edits2: {
    padding: 10,
    color: "#333",
    paddingVertical: 4,
  },
  textColor: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#5cc2f2",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#333",
    letterSpacing: 4,
    alignSelf: "center",
    width: "100%",
  },
  edits3: {
    borderWidth: 1,
    width: 352,
    backgroundColor: "#5cc2f2",
    textAlign: "center",
    padding: 3,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 10,
    borderColor: "#5cc2f2",
  },
  edits4: {
    borderWidth: 1,
    width: 352,
    backgroundColor: "#5cc2f2",
    textAlign: "center",
    padding: 3,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: "#5cc2f2",
  },
  seller1: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 15,
    fontSize: 15,
    textAlign: "left",
    margin: 5,
    color: "black",
    width: 330,
    marginBottom: 20,
  },
  editing: {
    borderWidth: 0.4,
    borderColor: "black",
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#f7f8fa",
    zIndex: 10,
    marginHorizontal: 10,
  },
  edits1: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 6,
  },
  EditDet: {
    padding: 10,
    color: "#333",
  },
  EditDetText: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "#5cc2f2",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#333",
    alignSelf: "center",
    width: 170,
  },
  NameHead: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  AddressHead: {
    textAlign: "center",
    color: "#5f5f5f",
  },
});

const mapStateToProps = (state) => ({
  vendorData: state.vendorAuth.vendor,
  isAuthenticated: state.vendorAuth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, null)(vendorProfile);
