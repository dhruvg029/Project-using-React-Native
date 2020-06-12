import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { clearErrors } from "../../actions/errorActions";
import VendorLogout from "./LogoutVendor";
import { baseURL } from "../../config/constants.js";
import { Actions } from "react-native-router-flux";

class vendorRequest extends Component {
  constructor(props) {
    super(props);
    this.onChangecat_name = this.onChangecat_name.bind(this);
    this.onChangesub_cat_name = this.onChangesub_cat_name.bind(this);
    this.onChangequantity_type = this.onChangequantity_type.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cat_name: "",
      sub_cat_name: "",
      quantity_type: "",
    };
  }

  // componentDidUpdate()
  // {
  //     if(!this.props.isLoading&&!this.props.isAuthenticated){
  //         this.props.history.push('/vendor/login');
  //     }
  // }

  onChangecat_name(e) {
    this.setState({
      cat_name: e.target.value,
    });
  }

  onChangesub_cat_name(e) {
    this.setState({
      sub_cat_name: e.target.value,
    });
  }

  onChangequantity_type(e) {
    this.setState({
      quantity_type: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newTypeWaste = {
      cat_name: this.state.cat_name,
      sub_cat_name: this.state.sub_cat_name,
      quantity_type: this.state.quantity_type,
      status: "Approved",
    };
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify(newTypeWaste);
    axios
      .post(baseURL + "/vendor/newWasteType", body, config)
      .then((res) => Actions.vendorProfile())
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text />
        <Text />
        <Text />
        <Text />
        <View style={styles.editing}>
          <Text style={styles.request}>
            Request for a new Category of Waste!
          </Text>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Category"
              placeholderTextColor="grey"
              autoCapitalize="none"
              type="text"
              value={this.state.cat_name}
              onChangeText={(cat_name) => this.setState({ cat_name })}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Sub-Category"
              placeholderTextColor="grey"
              autoCapitalize="none"
              type="text"
              value={this.state.sub_cat_name}
              onChangeText={(sub_cat_name) => this.setState({ sub_cat_name })}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Quantity"
              placeholderTextColor="grey"
              autoCapitalize="none"
              type="text"
              value={this.state.quantity_type}
              onChangeText={(quantity_type) => this.setState({ quantity_type })}
            />
          </View>
          <TouchableOpacity style={styles.edits2} onPress={this.onSubmit}>
            <Text style={styles.textColor}>Add a new type of waste</Text>
          </TouchableOpacity>
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
    backgroundColor: "#5cc2f2",
  },
  input: {
    marginTop: 5,
    borderColor: "grey",
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: "#f7f8fa",
    paddingLeft: 5,
    borderRadius: 4,
    fontSize: 15,
    marginBottom: 10,
    width: "100%",
  },
  editing: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#f7f8fa",
    overflow: "hidden",
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
    letterSpacing: 3,
    alignSelf: "center",
    width: 300,
    fontWeight: "bold",
  },
  size: {
    fontSize: 18,
    marginBottom: 6,
    marginTop: 5,
    color: "black",
  },
  request: {
    fontSize: 20,
    marginBottom: 9,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default vendorRequest;
