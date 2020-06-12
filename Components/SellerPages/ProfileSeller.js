// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import {StyleSheet,Text, View, TextInput, Vibration, Platform, Button, TouchableOpacity, ScrollView, TouchableOpacityBase} from "react-native";
// import { Actions } from "react-native-router-flux";
// import SellerLogout from "./LogoutSeller";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
// import Constants from "expo-constants";
// import axios from "axios";
// import { baseURL } from "../../config/constants.js";

// class sellerProfile extends Component {
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
//         baseURL + "/seller/" + this.props.sellerData._id + "/setToken",
//         data,
//         config
//       )
//       .then((res) => {
//         console.log("Item added to the selling list");
//         this.props.history.push("/seller/items");
//       })
//       .catch((e) => {
//         console.log("item add request failed.retry later");
//       });
//   };
//   componentDidMount() {
//     this.registerForPushNotificationsAsync();

//     this._notificationSubscription = Notifications.addListener(this._handleNotification);
//   }

//   _handleNotification = (notification) => {
//     Vibration.vibrate();
//     console.log(notification);
//     this.setState({ notification: notification });
//   };

//   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//   // sendPushNotification = async () => {
//   //   const message = {
//   //     to: this.state.expoPushToken,
//   //     sound: 'default',
//   //     title: 'Original Title',
//   //     body: 'And here is the body!',
//   //     data: { data: 'goes here' },
//   //     _displayInForeground: true,
//   //   };
//   //   const response = await fetch('https://exp.host/--/api/v2/push/send', {
//   //     method: 'POST',
//   //     headers: {
//   //       Accept: 'application/json',
//   //       'Accept-encoding': 'gzip, deflate',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify(message),
//   //   });
//   // };

//   componentDidUpdate(prevProps) {
//     const { error } = this.props;
//     if (error !== prevProps.error) {
//       // Check for register error
//       if (
//         error.id === "SELLER_REGISTER_FAIL" ||
//         error.id === "SELLER_LOGIN_FAIL"
//       ) {
//         this.setState({ msg: error.msg.msg });
//       } else {
//         this.setState({ msg: null });
//       }
//     }
//     if (!this.props.isAuthenticated) {
//       Actions.sellerLogin();
//     }
//   }
//   render() {
//     return (

//       <View style = {styles.container}>
//         <Text/><Text/><Text/><Text/>
//         {this.props.isAuthenticated ? (
//           <ScrollView>
//           <View>

//             <SellerLogout />
//             <View>
//               <Text style={styles.edits1}>welcome {this.props.sellerData.name}</Text>
//               <Text style={styles.edits1}>Here are all the details you entered</Text>
//               <View style = {styles.editing}>
//               <Text style = {styles.edits}>Name:</Text>
//               <Text style = {styles.seller1}>{this.props.sellerData.name}</Text>
//               <Text style = {styles.edits}>Email:</Text>
//               <Text style = {styles.seller1}>{this.props.sellerData.email}</Text>
//               <Text style = {styles.edits}>Contact:</Text>
//               <Text style = {styles.seller1}>{this.props.sellerData.contact}</Text>
//               <Text style = {styles.edits}>Address:</Text>
//               <Text style = {styles.seller1}>{this.props.sellerData.address}</Text>
//               </View>
//               <TouchableOpacity style = {styles.edits2}>
//               <Text style = {styles.textColor}>Edit Details </Text>
//               </TouchableOpacity>
//               <View>
//                 <TouchableOpacity style = {styles.edits3} onPress={() => Actions.sellerNewItem()}>
//                 <Text style = {styles.textColor}>
//                   Add Items For Sale
//                 </Text>
//                 </TouchableOpacity>
//               </View>
//               <View>
//                 <TouchableOpacity style = {styles.edits4} onPress={() => Actions.sellerItems()}>
//                 <Text style = {styles.textColor}>
//                   View All items added by you
//                 </Text>
//                 </TouchableOpacity>
//               </View>
//               <View>
//                 <TouchableOpacity style = {styles.edits4} onPress={() => Actions.sellerSoldItems()}>
//                 <Text style = {styles.textColor}>
//                   View All items added by you
//                 </Text>
//                 </TouchableOpacity>
//               </View>
//               <View>
//                       <TouchableOpacity onPress={() => Actions.sellerNotifications()}>
//                       <Text style = {styles.textColor}>
//                       Notifications
//                       </Text></TouchableOpacity>
//                 </View>
//               {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
//                 <Text>Origin: {this.state.notification.origin}</Text>
//                 <Text>
//                   Data: {JSON.stringify(this.state.notification.data)}
//                 </Text>
//               </View> */}
//               {/* <Button
//                 title={"Press to Send Notification"}
//                 onPress={() => this.sendPushNotification()}
//               /> */}
//             </View>
//           </View>
//           </ScrollView>
//         ) : (
//           <Text>Please Login First!</Text>
//         )}
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   sellerData: state.sellerAuth.seller,
//   isAuthenticated: state.sellerAuth.isAuthenticated,
//   error: state.error,
// });

// export default connect(mapStateToProps, null)(sellerProfile);

// const styles = StyleSheet.create({
//   container : {
//       flex : 1,
//       backgroundColor : 'white',
//       margin : 10
//   },
//   edits : {
//        marginTop : 10,
//        fontSize : 20,
//        marginLeft : 10,
//        color : 'red'
//    },
//    edits2 : {
//        borderWidth : 1,
//        width : 290,
//        backgroundColor : '#5cc2f2',
//        textAlign : 'center',
//        padding : 15,
//        paddingLeft : 100,
//        margin : 10,
//        borderRadius : 8,
//        marginLeft : 45,
//        borderColor : '#5cc2f2'
//    },
//    textColor : {
//        color : 'black',
//        fontSize : 18
//    },
//    edits3 : {
//        borderWidth : 1,
//        width : 290,
//        backgroundColor : '#5cc2f2',
//        textAlign : 'center',
//        padding : 15,
//        paddingLeft : 72,
//        margin : 10,
//        borderRadius : 8,
//        marginLeft : 45,
//        borderColor : '#5cc2f2'
//    },
//    edits4 : {
//        borderWidth : 1,
//        width : 290,
//        backgroundColor : '#5cc2f2',
//        textAlign : 'center',
//        padding : 15,
//        paddingLeft : 36,
//        margin : 10,
//        borderRadius : 8,
//        marginLeft : 45,
//        borderColor : '#5cc2f2'
//    },
//    seller1 : {
//       borderRadius : 20,
//       borderWidth : 1,
//       borderColor: '#000000',
//       color: '#fff',
//       backgroundColor : 'white',
//       padding : 10,
//       paddingLeft : 15,
//       fontSize: 15,
//       textAlign: 'left',
//       margin: 5,
//       color : 'black',
//       width : 330,
//       marginBottom : 20
//     },
//     editing : {
//        borderWidth : 1,
//        borderColor : 'black',
//        padding : 5,
//        margin : 10,
//        borderRadius : 10,
//        backgroundColor : '#f7f8fa'
//    },
//    edits1 : {
//        textAlign : 'center',
//        fontSize : 22,
//        marginBottom : 6
//    },
// })
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Vibration,
  Platform,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import SellerLogout from "./LogoutSeller";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import axios from "axios";
import { baseURL } from "../../config/constants.js";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

class sellerProfile extends Component {
  // Adding constructor for the props
  constructor(props) {
    super(props);
    this.state = {
      expoPushToken: "",
      notification: {},
    };
  }
  // This is for register
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
    // JSON.stringify({}) === converting the data object into a string
    var data = JSON.stringify({ token });
    axios
    // using interceptors
    .post(
      // 13428709 
        baseURL + "/seller/" + this.props.sellerData._id + "/setToken",
        data,
        config
      )
      .then((res) => {
        console.log("Item added to the selling list");
        this.props.history.push("/seller/items");
      })
      // if any errors catch() can be used
      .catch((e) => {
        console.log("item add request failed.retry later");
      });
  };

  componentDidMount() {
    // This is used to fetch data from external API or perform unique operations
    this.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    // for vibrating the phone
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  // sendPushNotification = async () => {
  //   const message = {
  //     to: this.state.expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { data: 'goes here' },
  //     _displayInForeground: true,
  //   };
  //   const response = await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // };

  componentDidUpdate(prevProps) {
    // when the component is updated
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (
        error.id === "SELLER_REGISTER_FAIL" ||
        error.id === "SELLER_LOGIN_FAIL"
      ) {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (!this.props.isAuthenticated) {
      Actions.sellerLogin();
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
      // converting the data into the string
      email: this.props.sellerData.email,
    });
    console.log(data);
    // posting a request using axios
    axios
      .post(baseURL + "/seller/resendToken", data, config)
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
  // This is the main part === for where the page design starts
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
                    <SellerLogout />
                    <FontAwesome
                      onPress={() => Actions.sellerNotifications()}
                      name={"bell-o"}
                      size={28}
                      style={{
                        marginRight: 10,
                        textAlignVertical: "center",
                      }}
                    />
                  </View>
                  <Text style={styles.edits1}>
                    Welcome {this.props.sellerData.name} !
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
                          {this.props.sellerData.name[0]}
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
                            {this.props.sellerData.name} Sebastian
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
                              {this.props.sellerData.address}, Ontario, Canada
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
                          {this.props.sellerData.email}
                        </Text>
                        <Text>{this.props.sellerData.contact}</Text>
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
                          onPress={() => Actions.sellerNewItem()}
                        >
                          <Text style={styles.EditDetText}>
                            Add Items For Sale
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {!this.props.sellerData.isVerified ? (
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
                      onPress={() => Actions.sellerItems()}
                    >
                      <Text style={styles.textColor}>
                        View All items added by you
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.edits2}
                      onPress={() => Actions.sellerSoldItems()}
                    >
                      <Text style={styles.textColor}>
                        View All items sold by you
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

const mapStateToProps = (state) => ({
  sellerData: state.sellerAuth.seller,
  isAuthenticated: state.sellerAuth.isAuthenticated,
  error: state.error,
});

// StyleSheet is for styling the page 
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

export default connect(mapStateToProps, null)(sellerProfile);
