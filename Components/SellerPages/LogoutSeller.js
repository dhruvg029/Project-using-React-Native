// WHEN THE SELLER IS LOGGING OUT

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import { sellerLogout } from '../../actions/sellerAuthActions';
import PropTypes from 'prop-types';
import { SimpleLineIcons } from "@expo/vector-icons";

export class SellerLogout extends Component {
  static propTypes = {
    // This function is required
    sellerLogout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        {/* <Text onPress={this.props.sellerLogout}>
          Logout Seller
        </Text> */}
                <TouchableOpacity style={{
          width:150,
          backgroundColor:'#ebebed',
          height:35,
          marginLeft:8,
          borderRadius:100,
          justifyContent:'space-around',
          flexDirection: 'row',
          marginTop:1,
          borderWidth:0.3,
        }} onPress={this.props.sellerLogout}>
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
          }}>Logout Seller</Text>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { sellerLogout }
)(SellerLogout);
