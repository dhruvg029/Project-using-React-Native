import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { vendorLogout } from '../../actions/vendorAuthActions';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from "@expo/vector-icons";


export class VendorLogout extends Component {
  static propTypes = {
    vendorLogout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        {/* <Text onPress={this.props.vendorLogout}>
          Logout Vendor
        </Text> */}
        <TouchableOpacity style={{
          width:150,
          backgroundColor:'#ebebed',
          height:35,
          flexDirection:'row',
          justifyContent:'space-around',
          marginLeft:8,
          borderRadius:100,
          borderWidth:0.3,
          marginTop:1
        }} onPress={this.props.vendorLogout}>
        <View style={{
          justifyContent:'center'
        }}>
        <SimpleLineIcons
          name={"logout"}
          size={22}
        />
        </View>
          <Text style={{
            textAlignVertical:'center',
            fontSize:15
          }}>Logout Vendor</Text>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { vendorLogout }
)(VendorLogout);
