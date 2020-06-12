import React, { Component } from "react";
// import { store } from 'react-notifications-component';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Picker,
} from "react-native";
import { baseURL } from "../../config/constants";
import axios from "axios";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRole = this.handleRole.bind(this);

    this.state = {
      email: "",
      msg: null,
      role: "seller",
    };
  }

  onChangeEmail(mail) {
    this.setState({
      email: mail,
    });
  }

  //   handleRole(val) {
  //     console.log(val);
  //     this.setState({
  //       role: val,
  //     });
  //   }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({
        msg: "enter a valid email",
      });
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    var data = JSON.stringify({
      email: this.state.email,
    });

    var url;
    if (this.state.role === "seller") {
      url = baseURL + "/seller/forgotPassword";
    } else {
      url = "http://localhost:4000" + "/vendor/forgotPassword";
    }
    console.log(url);
    console.log(data);
    axios
      .post(url, data, config)
      .then((res) => {
        // store.addNotification({
        //     title: "success",
        //     message: res.data.msg,
        //     type: "success",
        //     insert: "top",
        //     container: "top-right",
        //     animationIn: ["animated", "fadeIn"],
        //     animationOut: ["animated", "fadeOut"],
        //     dismiss: {
        //       duration: 5000,
        //       onScreen: true,
        //       pauseOnHover: true,
        //       showIcon:true
        //     }
        //   });
      })
      .catch((e) => {
        // console.log("afvaf");
        console.log(e);
      });
  }

  render() {
    // console.log(this.state.role);
    return (
      <View>
        <Text />
        <Text />
        <Text />
        <Text />
        <View>
          {this.state.msg ? console.log(this.state.msg) : null}

          <View>
            <Text> Role: </Text>
            {/* <Picker
              SelectedValue={this.state.role}
              //   onValueChange={this.handleRole}
              onValueChange={(value) => {
                console.log(value);
                // this.setState({ role: value });
              }}
            >
              <Picker.Item label="Seller" value="seller" />
              <Picker.Item label="Vendor" value="vendor" />
            </Picker> */}
            <Picker
              selectedValue={this.state.role}
              style={{ height: 50 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ role: itemValue })
              }
            >
              <Picker.Item label="Seller" value="seller" />
              <Picker.Item label="Vendor" value="vendor" />
            </Picker>
          </View>

          <View>
            <Text>Enter Your Email address</Text>
            <TextInput
              //   style={styles.input}
              type="email"
              value={this.state.email}
              onChangeText={this.onChangeEmail}
            />
            <Text id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </Text>
          </View>
          <Button title="Send link" onPress={this.onSubmit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ecf0f1",
  },
});

export default ForgotPassword;
