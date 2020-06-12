// THE LOGIN PAGE OF THE SELLER === IF ALREADY HAVING AN ACCOUNT

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { sellerLogin } from "../../actions/sellerAuthActions";
import { clearErrors } from "../../actions/errorActions";
import { Actions } from "react-native-router-flux";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/opener.png";
import Icon from "react-native-vector-icons/Octicons";
import IconFe from "react-native-vector-icons/Feather";

class LoginSeller extends Component {
  // Adding constructor, a lifecycle hook
  constructor(props) {
    super(props);

    // setting initial values in the state
    this.state = {
      email: "",
      password: "",
      msg: null,
      hidePassword: true,
    };
  }
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
    // setting the value of hidePassword to false
  };

  // sellerLogin and clearErrors === functions
  // isAuthenticated === boolean value
  // error === an object
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    sellerLogin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  // used when a component is updated
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "SELLER_LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSubmit = async () => {
    const { email, password } = this.state;

    const seller = {
      email,
      password,
    };

    // Attempt to login
    this.props.sellerLogin(seller);
    if (this.props.isAuthenticated) {
      // redux
      Actions.sellerProfile();
    }
  };

  render() {
    // return (
    //     <View>
    //         <Text/><Text/><Text/><Text/>

    //         <Text>NOT A SELLER?</Text>
    //         <Text onPress={() => Actions.vendorLogin()}>Login as vendor!</Text>
    //         <Text>Login as Seller!</Text>
    //         <View >
    //         {this.state.msg ? (
    //             console.log(this.state.msg)
    //             ) : null}
    //             <View>
    //               <Text>Email: </Text>
    //               <TextInput
    //                       value={this.state.email}
    //                       onChangeText={(email) => this.setState({ email })}
    //                       />
    //             </View>
    //             <View>
    //               <Text>Password: </Text>
    //               <TextInput
    //                       value={this.state.password}
    //                       onChangeText={(password) => this.setState({ password })}
    //                       />
    //             </View>

    //             <Text onPress={this.onSubmit} >Login Seller</Text>
    //             <Text>Don't have an account?</Text>
    //             <Text onPress={() => Actions.sellerSignUp()}>Sign Up!</Text>
    //         </View>

    //     </View>

    // )
    return (
      // What will u see in this page
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.Topper}>
            <Text style={styles.LeftF}>Not a Seller?</Text>
            <TouchableOpacity onPress={() => Actions.vendorLogin()}>
              <Text style={styles.RightF}>Login as Vendor</Text>
            </TouchableOpacity>
          </View>
          <Image source={Logo} style={styles.LogoImg} />
          <View>
            <Text style={styles.LoginText}>Login as Seller</Text>
          </View>
          <View>
            {this.state.msg ? console.log(this.state.msg) : null}
            <View>
              <Icon
                name={"person"}
                size={28}
                color={"rgba(255, 255, 255, 0.7)"}
                style={styles.inputIcon}
              />
              <TextInput
                keyboardType="default"
                placeholder="Email "
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                underlineColorAndroid="transparent"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={styles.Input}
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
                style={styles.Input}
                placeholder="Password"
                secureTextEntry={this.state.hidePassword}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                underlineColorAndroid="transparent"
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
          </View>
          <TouchableOpacity style={styles.LoginBtn} onPress={this.onSubmit}>
            <LinearGradient
              colors={["#4c5f7a", "#4c5f7a", "#4c5f7a"]}
              style={{ padding: 10, alignItems: "center", borderRadius: 20 }}
            >
              <Text style={styles.LoginBtnText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.Footer}>
            <Text style={styles.LeftF}>Don't Have an Account</Text>
            <TouchableOpacity onPress={() => Actions.sellerSignUp()}>
              <Text style={styles.RightF}>Sign Up!</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => Actions.ForgotPassword()}>
            <Text style={styles.RightF}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.sellerAuth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { sellerLogin, clearErrors })(
  LoginSeller
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#98d6ea",
    paddingBottom: 100,
  },
  Topper: {
    marginTop: 60,
    marginBottom: 100,
    width: 600,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  LogoImg: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  LoginText: {
    fontSize: 25,
    //opacity: 0.5,
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
    color: "rgba(255, 255, 255, 0.7)",
    // fontFamily: "ComicNeuReg",
  },
  inputIcon: {
    marginTop: 7,
    position: "absolute",
    top: 12,
    left: 37,
    color: "rgba(255, 255, 255, 0.7)",
  },
  inputIconRight: {
    marginTop: 7,
    position: "absolute",
    top: 12,
    right: 37,
    color: "rgba(255, 255, 255, 0.7)",
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
    width: 500,
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
