import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { clearErrors } from '../../actions/errorActions';
import { Text, FlatList, StyleSheet,View, Button,   Image,TouchableOpacity, TouchableWithoutFeedback,Dimensions, } from 'react-native';
import SellerLogout from './LogoutSeller';
import {baseURL} from '../../config/constants.js';
// import StarRatingComponent from 'react-star-rating-component';
import { Actions } from 'react-native-router-flux';
import StarRatingComponent from "react-native-star-rating";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import Img from "../../assets/opener.png";

class ViewItem extends Component {

    constructor(props) {
      // adding a constructor for the props
        super(props);
        this.state = {
            items:null,
            item:null,
            vendor:null,
            msg:null
        }
        this.handleBack=this.handleBack.bind(this);
        this.handleAccept=this.handleAccept.bind(this);
        this.handleReject=this.handleReject.bind(this);
    }

    componentDidMount(){
      // Fetching data from an external API
        setTimeout(()=>{
            // Headers
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            axios.get(baseURL+'/seller/'+this.props.seller._id+'/viewItem', config)
                .then(response=>{
                    console.log(response);
                    this.setState({
                        items:response.data
                    })
                })
                .catch(error=>{
                    console.log(error);
                })
        },500)
    }

    componentDidUpdate(prevProps,prevState)
    {
      // component is updated
        if(!this.props.isLoading&&!this.props.isAuthenticated){
            this.props.history.push('/seller/login');
        }
        if(prevState.item!==this.state.item&&this.state.item!==null){
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            const body=JSON.stringify({
                item_id:this.state.item._id
            })
            axios.post(baseURL+'/seller/'+this.props.seller._id+'/getVendors',body, config)
                .then(response=>{
                    var body=response.data;
                    if(body.status&&body.status==='fail'){
                        this.setState({
                            msg:body.msg,
                            vendor:null
                        })
                    }else{
                        this.setState({
                            vendors:body,
                            msg:null
                        })
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }

    handleAccept(quote_id){
      const config = {
        //Accepting the response
            headers: {
            'Content-type': 'application/json'
            }
        };
        const body=JSON.stringify({
          // changing into strings
            item_id:this.state.item._id,
            quote_id
        })
        // posting a request
        axios.post(baseURL+'/seller/'+this.props.seller._id+'/vendorAccept',body, config)
            .then(response=>{
                axios.get(baseURL+'/seller/'+this.props.seller._id+'/viewItem', config)
                    .then(response2=>{
                        this.setState({
                            items:response2.data,
                            item:null,
                            vendor:null
                        })
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            })
            .catch(error=>{
                console.log(error);
            })
    }

    // Rejecting the request
    handleReject(quote_id){
        const config = {
            headers: {
            'Content-type': 'application/json'
            }
        };
        const body=JSON.stringify({
            item_id:this.state.item._id,
            quote_id
        })
        axios.post(baseURL+'/seller/'+this.props.seller._id+'/vendorReject',body, config)
            .then(response=>{
                var body=response.data;
                if(body.status&&body.status==='fail'){
                    this.setState({
                        msg:body.msg,
                        vendors:null
                    })
                }else{
                    this.setState({
                        vendors:body,
                        msg:null
                    })
                }
            })
            .catch(error=>{
                console.log(error);
            })
            this.forceUpdate();
    }

    handleBack(){
        this.setState({
            item:null
        })
    }

    handleList(item){
        this.setState({
            item
        });
    }

    render() {
        console.log(this.state.items)
        // return(
        //     <View>
        //          {this.props.isAuthenticated ? (
        //     <View>
        //         <SellerLogout/>
        //     {
        //         this.state.item?(
        //         <View>
        //              <Text/><Text/><Text/><Text/>
        //            <Text onPress={this.handleBack}>Go Back</Text>
        //            <Text> Item Details:</Text>
        //            <Text> category: {this.state.item.cat_id.name}</Text>
        //            <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
        //            <Text> quantity: {this.state.item.quantity} {this.state.item.sub_cat_id.quantity_type}</Text>
        //            {
        //                 this.state.vendors?(
        //                     <View>
        //                     <View>
        //                         <Text>hello?</Text>
        //                     </View>
        //                     {
            
        //                         this.state.vendors.map(vendor=>{
        //                             return(
        //                             <View key={vendor.quote_id}>
        //                                 {console.log(vendor.name)}
        //                             <Text>vendor</Text>
        //                             <Text>Name :{vendor.name}</Text>
        //                             <Text>Quoted price :{vendor.price} {this.state.item.sub_cat_id.quantity_type}</Text>
        //                             <Text>Distance :{vendor.distance}</Text>
        //                             <Text>Date of arrival :{vendor.date}</Text>
        //                             <Text>Time of arrival :{vendor.time}</Text>
        //                             <View>
        //                             <StarRatingComponent name="rate2"  starCount={5} value={Math.round(vendor.rating/vendor.votes)} height='10px' editing={false}/>
        //                             <Text>{vendor.votes} votes</Text>
        //                             </View>
                                    
        //                             <Text onPress={()=>{this.handleAccept(vendor.quote_id)}}>Accept</Text>
        //                             <Text onPress={()=>{this.handleReject(vendor.quote_id)}}>Reject</Text>
        //                             </View>
        //                             )
        //                         })
        //                     }
        //                     </View>

        //                 ):(
        //                     <Text>msg:{this.state.msg}</Text>
        //                 )
        //             }
        //         </View>
        //     ):(
        //     <View>
                
        //          <Text/><Text/><Text/><Text/>
        //         <Text>Here are all the items for sale</Text>
        //        {this.state.items? this.state.items.map(item=>{
        //                         return (<View key={item._id} >
        //                             <Text>category:{item.cat_id.name}</Text>
        //                             <Text> subcategory:{item.sub_cat_id.name}</Text>
        //                             <Text>quantity:{item.quantity}{item.sub_cat_id.quantity_type} {"\n"}</Text>
        //                             <Button title="details" onPress={()=>{this.handleList(item)}}/>
        //                         </View>)
        //                     }) : (<Text>No Items to display</Text>)}
        //     </View>
        //     )
        //     }
        //     </View>): (
        //         <Text>Please Login First!</Text>
        //       )}
        //     </View>
        // )
        return (
            <View>
              {this.props.isAuthenticated ? (
                <View>
      
                <Text />
                  <Text />
                  <Text />
                  {this.state.item ? (
                    <View>
                      <TouchableOpacity
                        style={styles.GoBackView}
                        onPress={this.handleBack}
                      >
                        <EvilIcons name={"chevron-left"} size={27} />
                        <Text style={styles.GoBack}>Go Back</Text>
                      </TouchableOpacity>
                      <View style={styles.list}>
                        <View style={styles.LogoView}>
                          <Image source={Img} style={styles.LogoImg} />
                        </View>
                        <View style={styles.ListTextCont}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={styles.Heading}>
                              {this.state.item.cat_id.name}
                            </Text>
                            <StarRating
                              starSize={28}
                              disabled={false}
                              emptyStar={"ios-star-outline"}
                              fullStar={"ios-star"}
                              halfStar={"ios-star-half"}
                              iconSet={"Ionicons"}
                              maxStars={5}
                              rating={3.5} ///////////////////Rating Goes Here/////////////////////////
                              // selectedStar={(rating) => onStarRatingPress(rating)}
                              fullStarColor={"#5cc2f2"}
                            />
                          </View>
                          <Text style={styles.subHeading}>
                            Subcategory: {this.state.item.sub_cat_id.name}
                          </Text>
                          <Text style={styles.Quantity}>
                            {""}
                            Quantity: {this.state.item.quantity}{" "}
                            {this.state.item.sub_cat_id.quantity_type}
                          </Text>
                        </View>
                      </View>
      
                      {/* <TouchableOpacity style={styles.UserInfo}>
                        <View>
                          <Text
                            style={{
                              fontSize: 70,
                              width: 70,
                              textAlign: "center",
                              backgroundColor: "#5cc2f2",
                              borderRadius: 100,
                              color: "#333",
                            }}
                          >
                            V
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.UserVal}>
                            Name{"\n"}
                            Quoted Price{"\n"}
                            Distance{"\n"}
                            Date of Arrival{"\n"}
                            Time of Arrival
                          </Text>
                          <Text style={{ marginLeft: 10 }}>
                            vendor.name{"\n"} vendor.price{"\n"} vendor.distance{"\n"}{" "}
                            vendor.date{"\n"} vendor.time
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: "37%",
                            top: "85%",
                            padding: 15,
                          }}
                        >
                          <Text
                            onPress={() => {
                              this.handleReject(vendor.quote_id);
                            }}
                          >
                            Reject
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: "67%",
                            top: "85%",
                            padding: 15,
                          }}
                        >
                          <Text
                            onPress={() => {
                              this.handleAccept(vendor.quote_id);
                            }}
                          >
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </TouchableOpacity> */}
      
                      {this.state.vendors ? (
                        <View>
                          {/* <View>
                            <Text>hello</Text>
                          </View> */}
                          {this.state.vendors.map((vendor) => {
                            return (
                              <View>
                                <View key={vendor.quote_id}>
                                  <TouchableOpacity style={styles.UserInfo}>
                                    <View>
                                      {console.log(vendor.name)}
                                      <Text
                                        style={{
                                          fontSize: 60,
                                          width: 70,
                                          textAlign: "center",
                                          backgroundColor: "#5cc2f2",
                                          borderRadius: 100,
                                          color: "#333",
                                          paddingBottom: 10,
                                          textAlignVertical: "center",
                                        }}
                                      >
                                        {vendor.name[0]}
                                      </Text>
                                    </View>

                                    <View style={{ flexDirection: "row" }}>
                                      <Text style={styles.UserVal}>
                                        Name{"\n"}
                                        Quoted Price{"\n"}
                                        Distance{"\n"}
                                        Date of Arrival{"\n"}
                                        Time of Arrival
                                      </Text>
                                      <Text style={{ marginLeft: 10 }}>
                                        {vendor.name}
                                        {"\n"} {vendor.price}
                                        {"\n"} {vendor.distance}
                                        {"\n"} {vendor.date}
                                        {"\n"} {vendor.time}
                                      </Text>
                                    </View>
                                    <TouchableOpacity
                                      style={{
                                        position: "absolute",
                                        right: "37%",
                                        top: "85%",
                                        padding: 15,
                                      }}
                                    ></TouchableOpacity>
                                    {/* <Text>Name :{vendor.name}</Text>
                                  <Text>
                                    Quoted price :{vendor.price}{" "}
                                    {this.state.item.sub_cat_id.quantity_type}
                                  </Text>
                                  <Text>Distance :{vendor.distance}</Text>
                                  <Text>Date of arrival :{vendor.date}</Text>
                                  <Text>Time of arrival :{vendor.time}</Text> */}
                                    {/* <View>
                                  <StarRatingComponent
                                    name="rate2"
                                    starCount={5}
                                    value={Math.round(vendor.rating / vendor.votes)}
                                    height="10px"
                                    editing={false}
                                  />
                                  <Text>{vendor.votes} votes</Text>
                                </View> */}
      
                                    <TouchableOpacity
                                      style={{
                                        position: "absolute",
                                        right: "37%",
                                        top: "85%",
                                        padding: 15,
                                      }}
                                    >
                                      <Text
                                        onPress={() => {
                                          this.handleReject(vendor.quote_id);
                                        }}
                                        style={{
                                          color: "#F08080",
                                        }}
                                      >
                                        Reject
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      style={{
                                        position: "absolute",
                                        right: "67%",
                                        top: "85%",
                                        padding: 15,
                                      }}
                                    >
                                      <Text
                                        onPress={() => {
                                          this.handleAccept(vendor.quote_id);
                                        }}
                                        style={{
                                          color: "#5cc2f2",
                                        }}
                                      >
                                        Accept
                                      </Text>
                                    </TouchableOpacity>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      ) : (
                        <Text>msg:{this.state.msg}</Text>
                      )}
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontFamily: "sans-serif",
                          letterSpacing: 2,
                          fontSize: 20,
                        }}
                      >
                        Here are all the items for sale
                      </Text>
      
                      {this.state.items ? (
                        <FlatList
                          data={this.state.items}
                          numColumns={2}
                          renderItem={({ item }) => (
                            <TouchableWithoutFeedback>
                              <View style={styles.list1}>
                                <View style={styles.item1}>
                                  <Image source={Img} style={styles.LogoImg1} />
                                  <View style={styles.DetText1}>
                                    <Text style={styles.Heading1}>
                                      {item.cat_id.name}
                                    </Text>
                                    <Text style={styles.subHeading1}>
                                      subcategory:{item.sub_cat_id.name}
                                    </Text>
                                    <Text style={styles.Quantity1}>
                                      Quantity : {item.quantity}
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() => {
                                        this.handleList(item);
                                      }}
                                    >
                                      <Text style={styles.TouchBtnText1}>
                                        Details
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
                          keyExtractor={(item) => item._id}
                        />
                      ) : (
                        <Text>No Items to display</Text>
                      )}
                      {/* {this.state.items ? (
                        this.state.items.map((item) => {
                          return (
                            <View key={item._id}>
                              <Text>category:{item.cat_id.name}</Text>
                              <Text> subcategory:{item.sub_cat_id.name}</Text>
                              <Text>
                                quantity:{item.quantity}
                                {item.sub_cat_id.quantity_type} {"\n"}
                              </Text>
                              <Button
                                title="details"
                                onPress={() => {
                                  this.handleList(item);
                                }}
                              />
                            </View>
                          );
                        })
                      ) : (
                        <Text>No Items to display</Text>
                      )} */}
                    </View>
                  )}
                </View>
              ) : (
                <Text>Please Login First!</Text>
              )}
            </View>
          );
    }
}
const styles = StyleSheet.create({
    list1: {
      flex: 1,
    },
    item1: {
      backgroundColor: "#f7f8fa",
      padding: 16,
      borderColor: "#bbb",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 1,
      alignItems: "center",
      borderRadius: 10,
      margin: 2,
      width: "99%",
    },
    DetText1: {
      alignItems: "center",
    },
    LogoImg1: {
      width: 100,
      height: 100,
      alignItems: "center",
    },
    Heading1: {
      fontFamily: "notoserif",
      letterSpacing: 0,
      height: 50,
      textAlignVertical: "center",
      fontSize: 20,
      textAlign: "center",
    },
    subHeading1: {
      fontFamily: "notoserif",
      letterSpacing: 2,
      fontSize: 15,
      textAlign: "center",
    },
    Quantity1: {
      fontFamily: "notoserif",
      letterSpacing: 0.5,
      fontSize: 15,
      textAlign: "center",
    },
    TouchBtn1: {
      padding: 10,
      color: "#333",
    },
    TouchBtnText1: {
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
    content: {
      padding: 5,
      flex: 1,
      alignItems: "center",
    },
    list: {
      width: "100%",
      paddingTop: 10,
      justifyContent: "space-around",
    },
    GoBackView: {
      width: 100,
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "#f7f8fa",
      paddingLeft: 10,
      paddingVertical: 7,
      paddingRight: 7,
      paddingRight: 20,
      borderRadius: 10,
      marginTop: 3,
      borderWidth: 0.1,
    },
    GoBack: {
      textAlign: "center",
      alignItems: "flex-start",
      letterSpacing: 2,
    },
    LogoView: {
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      backgroundColor: "#f7f8fa",
      alignItems: "center",
      width: "100%",
    },
    LogoImg: {
      width: 300,
      height: 200,
      alignItems: "center",
    },
    ListTextCont: {
      padding: 10,
    },
    Heading: {
      // fontFamily: "ComicNeuRegBold",
      letterSpacing: 0,
      fontSize: 27,
      width: 250,
    },
    subHeading: {
      // fontFamily: "ComicNeuReg",
      letterSpacing: 2,
      fontSize: 16,
      marginTop: 10,
    },
    Desc: {
      width: 300,
    },
    Quantity: {
      // fontFamily: "ComicNeuReg",
      letterSpacing: 0.5,
      fontSize: 16,
      marginTop: 2,
    },
    UserInfo: {
      backgroundColor: "#f7f8fa",
      padding: 16,
      marginTop: 16,
      borderColor: "#bbb",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 7,
      width: "100%",
      flexDirection: "row",
      height: 150,
    },
    UserVal: {
      // fontFamily: "ComicNeuRegBold",
      paddingLeft: 25,
    },
  });
const mapStateToProps = state => ({
    token:state.sellerAuth.token,
    seller:state.sellerAuth.seller,
    isAuthenticated: state.sellerAuth.isAuthenticated,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    { clearErrors }
  )(ViewItem);
