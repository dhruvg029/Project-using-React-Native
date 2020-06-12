// THIS IS THE SIGNUP PAGE OF A SELLER, THE FIRST PAGE OF THE APP

import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { signupSeller } from '../../actions/sellerAuthActions';
import { clearErrors } from '../../actions/errorActions';
import { Actions } from 'react-native-router-flux';
import FetchLocation from '../commonComponents/FetchLocation';
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Octicons";
import IconFe from "react-native-vector-icons/Feather";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";

class SignUpSeller extends Component {
  // Adding a constructor for props
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.redirectit = this.redirectit.bind(this);

        // taking initial values in the state
        this.state = {
            name: '',
            email: '',
            contact: '',
            address: '',
            password: '',
            place: null,
            msg: null,
            latitude:null,
            longitude:null,
            locationEnabled:false,
            hidePassword: true,
        }
    }

    // propTypes are used here
    // isAuthenticated === takes only boolean value i.e True and false
    // error === is an object
    // signupseller and clearerrors === they are functions
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        signupSeller: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
      };
      // This function is to show password or not
      managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
        // setting value of hidePassword to false
      };
      // Another LifeCycle hook used === this is called when a component is updated
      componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'SELLER_REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
      }

    onSubmit(e) {
        e.preventDefault();

        const { name, email, contact, address, password, latitude, longitude } = this.state;
        // Create user object
        const newSeller = {
        name,
        email,
        contact,
        address,
        password,
        latitude,
        longitude
        };

        this.props.signupSeller(newSeller);
    }
 
    redirectit=()=>{
        if(this.props.isAuthenticated)
        {
          // redux
          Actions.sellerProfile()
        }
        
    }

    // this shows the current location of the seller 
    setCoord(long,lat){
        this.setState({
            longitude:long,
            latitude:lat
        });
    }

    render() {
        // return (
        //     <View>
        //       <Text/><Text/><Text/><Text/>
        //       {this.redirectit()}
        //         <Text>Register Yourself as Seller!</Text>
        //         <View>
        //             <View>
        //               <Text>Name: </Text>
        //               <TextInput  type="text"
        //                       value={this.state.name}
        //                       onChangeText={(name) => this.setState({ name })}
        //                       />
                              
        //             </View>
        //             <View>
        //               <Text>Email: </Text>
        //               <TextInput  type="email"
        //                       value={this.state.email}
        //                       onChangeText={(email) => this.setState({ email })}
        //                       />
        //             </View>
        //             <View>
        //               <Text>Contact </Text>
        //               <TextInput  type="number"
        //                       value={this.state.contact}
        //                       onChangeText={(contact) => this.setState({ contact })}
        //                       />
        //             </View>
        //             <View>
        //               <Text>Address: </Text>
        //               <TextInput
        //                       value={this.state.address}
        //                       onChangeText={(address) => this.setState({ address })}
        //                       />
        //             </View>
        //             <View>
        //               <Text>Password: </Text>
        //               <TextInput
        //                       value={this.state.password}
        //                       onChangeText={(password) => this.setState({ password })}
        //                       />
        //             </View>
        //             <FetchLocation setCoords={(long,lat)=>{this.setCoord(long,lat)}} />
        //             <Text>{this.state.latitude}</Text>
        //             <Button title="Register" onPress={this.onSubmit}/>
        //             <Text>Already have an account?</Text>
        //             <Text onPress={() => Actions.sellerLogin()}>Login!</Text>
        //         </View>
        //     </View>
        // );
        return (
          // Current view of the page
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <Text />
              <Text />
              <Text />
              <Text />
              <View>
                <Text style={styles.LoginText}>Signup Form</Text>
              </View>
              {this.redirectit()}
              <Text style={styles.JunkText}>Register Yourself as Seller!</Text>
              <View>
                <View>
                  <Icon
                    name={"person"}
                    size={28}
                    color={"rgba(255, 255, 255, 0.7)"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    underlineColorAndroid="transparent"
                    style={styles.Input}
                    type="text"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                  />
                </View>
                <View>
                  <IconEntypo
                    name={"email"}
                    size={28}
                    color={"rgba(255, 255, 255, 0.7)"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    keyboardType="email-address"
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    underlineColorAndroid="transparent"
                    style={styles.Input}
                    type="email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                </View>
                <View>
                  <IconAnt
                    name={"contacts"}
                    size={28}
                    color={"rgba(255, 255, 255, 0.7)"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="Contact"
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    underlineColorAndroid="transparent"
                    style={styles.Input}
                    type="number"
                    value={this.state.contact}
                    onChangeText={(contact) => this.setState({ contact })}
                  />
                </View>
                <View>
                  <IconEntypo
                    name={"address"}
                    size={28}
                    color={"rgba(255, 255, 255, 0.7)"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    underlineColorAndroid="transparent"
                    style={styles.Input}
                    value={this.state.address}
                    onChangeText={(address) => this.setState({ address })}
                  />
                </View>
                <View>
                  <Icon
                    name={"key"}
                    size={28}
                    color={"rgba(255, 255, 255, 0.7)"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    keyboardType="default"
                    keyboardAppearance="dark"
                    placeholder="Password"
                    secureTextEntry={this.state.hidePassword}
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    underlineColorAndroid="transparent"
                    style={styles.Input}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                  <TouchableOpacity style={styles.inputIconRight}>
                    <IconFe
                      name={"eye-off"}
                      size={28}
                      color={"rgba(255, 255, 255, 0.7)"}
                      onPress={this.managePasswordVisibility}
                    />
                  </TouchableOpacity>
                </View>
                <FetchLocation
                  setCoords={(long, lat) => {
                    this.setCoord(long, lat);
                  }}
                />
                {/* <Text>{this.state.latitude}</Text> */}
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity style={styles.LoginBtn} onPress={this.onSubmit}>
                    <LinearGradient
                      colors={["#5cc2f2", "#5cc2f2", "#5cc2f2"]}
                      style={{
                        padding: 10,
                        alignItems: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text style={styles.LoginBtnText}>Register</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.Footer}>
                  <Text style={styles.LeftF}>Already Have an Account</Text>
                  <TouchableOpacity onPress={() => Actions.sellerLogin()}>
                    <Text style={styles.RightF}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.sellerAuth.isAuthenticated,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    { signupSeller, clearErrors }
  )(SignUpSeller);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      alignItems: "center",
      justifyContent: "center",
      resizeMode: "cover",
      backgroundColor: "#98d6ea",
    },
    LoginText: {
      fontSize: 25,
      //opacity: 0.5,
      marginBottom: 8,
      // fontFamily: "ComicNeuRegBold",
    },
    JunkText: {
      opacity: 0.5,
      marginBottom: 8,
      // fontFamily: "ComicNeuRegBold",
    },
    Input: {
      borderWidth: 1,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      width: 300,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: "rgba(0,0,0,0.35)",
      marginHorizontal: 25,
      color: "rgba(255, 255, 255, 0.8)",
      // fontFamily: "ComicNeuReg",
    },
    inputIcon: {
      marginTop: 7,
      position: "absolute",
      top: 12,
      left: 37,
      color: "rgba(255, 255, 255, 0.5)",
    },
    inputIconRight: {
      marginTop: 7,
      position: "absolute",
      top: 12,
      right: 37,
      color: "rgba(255, 255, 255, 0.5)",
    },
    Coords: {
      position: "relative",
      right: 75,
      marginBottom: 10,
    },
    CoordsText: {
      // fontFamily: "",
      opacity: 0.8,
      color: "#512b58",
    },
    LoginBtn: {
      width: 300,
      marginTop: 2,
    },
    LoginBtnText: {
      color: "black",
      fontSize: 16,
    },
    Footer: {
      marginTop: 20,
      //width: 500,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    LeftF: {
      color: "#333",
      opacity: 0.9,
      // fontFamily: "ComicNeuRegLight",
    },
    RightF: {
      color: "#424874",
      borderBottomWidth: 0.5,
      borderBottomColor: "#424874",
      // fontFamily: "ComicNeuReg",
    },
  });