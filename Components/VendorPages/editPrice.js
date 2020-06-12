import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View,TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import VendorLogout from './LogoutVendor';
import axios from 'axios';
import {baseURL} from '../../config/constants.js';

class editPrice extends Component {
  constructor(props)
  {
      super(props);
      this.state={
          price:0,
          items:[]
      }
  }

  componentDidMount(){
      setTimeout(()=>{
          const config = {
              headers: {
              'Content-type': 'application/json'
              }
          };
          axios.get(baseURL+'/vendor/selections/'+this.props.vendorData.selection_id,config)
              .then(res=>{
                  this.setState({
                      items:res.data,
                  })
              })
              .catch(e=>{
                  console.log(e);
              })
      },500);
  }

  componentDidUpdate(prevProps) {
      if(!this.props.isLoading&&!this.props.isAuthenticated){
        Actions.vendorProfile()
      }
      const { error } = this.props;
      if (error !== prevProps.error) {
        // Check for register error
        if (error.id === 'VENDOR_REGISTER_FAIL') {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }
    }

    deleteHandler(event,id){
      event.preventDefault();
      if(this.props.isAuthenticated){

          var body=JSON.stringify({
              ...this.state
          })
            // Headers
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
          axios.put(baseURL+'/vendor/selections/'+this.props.vendorData.selection_id,body,config)
            .then(res=>{
                return axios.delete( baseURL+'/vendor/selections/'+id,config);
            })
            .then(res => {
                this.setState({
                  items:res.data
                })
            })
            .catch(err=>{
              console.log("category add request failed.retry later",err)
            })
      }
    }

    
    handlePriceChange(event,index){
      var items=this.state.items.map(item=>{
          return {...item}
      });
      items[index].price=this.state.price;
      this.setState({
          items:items
      })
  }

    submitForm(event)
    {
        event.preventDefault();

        var body=JSON.stringify({
            ...this.state
        })
          // Headers
          const config = {
              headers: {
              'Content-type': 'application/json'
              }
          };
        axios.put(baseURL+'/vendor/selections/'+this.props.vendorData.selection_id,body,config)
          .then(res=>{
              Actions.vendorProfile()
          })
          .catch(err=>{
              console.log(err);
          })
    }

  // static propTypes = {
  //     vendorData:PropTypes.isRequired,
  //     isAuthenticated: PropTypes.bool,


      render(){
          return (
            <ScrollView>
            <View style = {styles.container}>
            <Text/><Text/><Text/><Text/>

              {this.props.isAuthenticated ? (
            <View>
              <VendorLogout/>
              <View>
                    {this.state.items&&this.state.items.length ?(
                        <View>
                          {
                             this.state.items.map((selected,index)=>(
                              <View key={selected._id} style = {styles.align}> 
                              <View style = {styles.view}>
                                <Text style = { styles.size }>Category</Text>
                                <Text style = {styles.view1}>{selected.subcat_id.cat_id.name}</Text>
                              </View>
                              <View style = {styles.view}>
                                <Text style = { styles.size }>Sub-category</Text>
                                <Text style = {styles.view1}>{selected.subcat_id.name}</Text>
                              </View>
                              <View style = {styles.view}>
                                <Text style = { styles.size }>Price</Text>
                                <Text style = {styles.view1}>{selected.price} {selected.subcat_id.quantity_type}</Text>
                              </View>
                              <View style = {styles.view}>
                                <Text style = { styles.size }>Enter New Price</Text>
                                <TextInput 
                                style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Price"
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                onChangeText={(price) => this.setState({ price })}
                                >{selected.price}</TextInput>
                                </View>
                                <View style = { styles.row }>
                                <TouchableOpacity style = {styles.button} onPress={(event)=>this.handlePriceChange(event,index)}>
                                <Text>Change</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.button} onPress={(event)=>this.deleteHandler(event,selected._id)}>
                                <Text>Delete</Text>
                                </TouchableOpacity>
                                </View>
                              </View>
                            ))

                            /* {
                            this.state.items.map((selected,index)=>(
                              <View key={selected._id}>
                                <Text>Category:{selected.subcat_id.cat_id.name}</Text>
                                <Text>Sub-category:{selected.subcat_id.name}</Text>
                                <Text>Price:{selected.price} {selected.subcat_id.quantity_type}</Text>
                                <Text>Enter New Price:</Text>
                                <TextInput 
                                onChangeText={(price) => this.setState({ price })}
                                >{selected.price}</TextInput>
                                <Text onPress={(event)=>this.handlePriceChange(event,index)} >Change</Text>
                                <Text onPress={(event)=>this.deleteHandler(event,selected._id)}>Delete</Text>
                              </View> }*/
                            // ))
                          }
                        </View>
                      ):(
                        <Text>You have selected no prefered category</Text>
                      )
                    }
                </View>
                <TouchableOpacity style = {styles.edits2} onPress={(event)=>this.submitForm(event)}>
                <Text style = {styles.textColor}>Save changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.edits2} onPress={() => Actions.vendorProfile()}>
                <Text style = {styles.textColor}>Go to Profile Page!</Text>
                </TouchableOpacity>
                {/* <Text onPress={(event)=>this.submitForm(event)}>save changes</Text>
                <Text onPress={() => Actions.vendorProfile()}>Go to profile page!</Text> */}
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
  container : {
      flex : 1,
      margin : 10,
      backgroundColor : '#fffafa'
  },
  align : {
      borderColor : 'black',
      borderWidth : 1,
      marginBottom : 2,
      borderRadius : 10,
      padding : 10,
      marginTop : 20,
      backgroundColor : '#f7f8fa',
      margin : 10
  },
  row : {
    marginTop : 10, 
    flexDirection : 'row',  
    justifyContent : 'space-between'
  },
  button : {
    borderWidth : 1,
    borderColor : '#5cc2f2',
    backgroundColor : '#5cc2f2',
    padding : 10,
    borderRadius : 5,
    marginBottom : 10,
  },
  size : {
      fontSize : 18,
      fontWeight : 'bold'
  },
  view : {
      flexDirection : 'row',
      justifyContent : 'space-between',
  },
  view1 : {
       fontSize : 18   
  },
  text : {
      fontFamily : 'BoldText',
      fontSize : 17,
      color : 'black'
  },
  edits2 : {
      borderWidth : 1,
      width : 300,
      backgroundColor : '#5cc2f2',
      textAlign : 'center',
      padding : 15,
      paddingLeft : 97,
      margin : 10,
      marginLeft : 40,
      borderRadius : 8,
      borderColor : '#5cc2f2'
  },
  textColor : {
      color : 'black',
      fontSize : 18
  }, 
  input: {
      marginTop : 5,
      borderColor: '#7a42f4',
      height : 30,
      borderWidth: 1,
      backgroundColor : 'white',
      paddingLeft : 10,
      borderRadius : 10,
      width : 70,
      fontSize : 18
   },  
});
const mapStateToProps = state => ({
    token:state.vendorAuth.token,
    vendorData:state.vendorAuth.vendor,
    isAuthenticated: state.vendorAuth.isAuthenticated,
    error: state.error
  });

export default connect(mapStateToProps,null)(editPrice);