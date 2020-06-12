import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { clearErrors } from '../../actions/errorActions';
import { Text, FlatList, StyleSheet,View, Button,Form,TextInput,  Picker, Image,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import VendorLogout from './LogoutVendor';
import {baseURL} from '../../config/constants.js';
import Img from "../../assets/opener.png";
import DatePicker from "react-native-datepicker";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";

class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items:null,
            item:null,
            base64Flag : 'data:image/png/jpeg/jpg;base64,',
            date:null,
            time:null,
            error:null
            //paymentInfo:null
        }
        this.handleBack=this.handleBack.bind(this);
        // this.handleDate=this.handleDate.bind(this);
        // this.handleTime=this.handleTime.bind(this);
        this.handleAcceptance=this.handleAcceptance.bind(this);
        this.handleRejection=this.handleRejection.bind(this);
        this.handlePurchase=this.handlePurchase.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
      };

      componentDidMount(){
        setTimeout(()=>{
            if(this.props.isAuthenticated){
            // Headers
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            axios.get(baseURL+'/vendor/newsfeed/'+this.props.vendor._id, config)
                .then(response=>{
                    this.setState({
                        items:response.data
                    });
                })
                .catch(error=>{
                    console.log(error);
                })
          }
        },500);
      }
    
    componentDidUpdate()
    {
        if(!this.props.isLoading&&!this.props.isAuthenticated){
            Actions.vendorLogin();
        }
        // if(this.state.paymentInfo){
        //     console.log(this.instance);
        //     this.instance.submit();
        // }
    }
    // handleDate(event){
    //     this.setState({
    //         date:event.target.value
    //         date: date
    //     });
    // }
    handleTime = (time) => {  
        this.setState({ time }) 
        console.log(this.state.time) 
      } 
    handleDate = (date) => {  
        this.setState({date}) 
        console.log(this.state.date) 
      } 




    // handleTime(event){
    //     this.setState({
    //         time:event.target.value
            
    //         this.setState({ time })
    //     });
    // }
    handleBack(){
        this.setState({
            item:null
        })
    }

    handleList(item){
        if(item.imageData){
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(item.imageData.data));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            item.imageData.data= window.btoa(binary);
        }
      this.setState({
          item
      });
  }

  handleAcceptance(item_id){

    console.log("startedsubmit")
    if(this.state.date===""||this.state.time===""||this.state.time===null||this.state.date===null){
        this.setState({
            error:"enter valid date as well as time"
        })
        return;
    }

    const config = {
        headers: {
        'Content-type': 'application/json'
        }
    };
    const body=JSON.stringify({
        item_id,
        date:this.state.date,
        time:this.state.time
    })

    console.log("submit")

    axios.post(baseURL+'/vendor/'+this.props.vendor._id+'/acceptOffer', body ,config)
        .then(response=>{
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            axios.get(baseURL+'/vendor/newsfeed/'+this.props.vendor._id, config)
                .then(response=>{
                    this.setState({
                        items:response.data,
                        item:null
                    });
                })
                .catch(error=>{
                    console.log(error);
                })
        })
        .catch(error=>{
            console.log(error);
        })

        console.log("submitted")
}


handleRejection(item_id){
    const config = {
        headers: {
        'Content-type': 'application/json'
        }
    };

    const body=JSON.stringify({
        item_id
    })

    axios.post(baseURL+'/vendor/'+this.props.vendor._id+'/rejectOffer', body ,config)
        .then(response=>{
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            axios.get(baseURL+'/vendor/newsfeed/'+this.props.vendor._id, config)
                .then(response=>{
                    this.setState({
                        items:response.data,
                        item:null
                    });
                })
                .catch(error=>{
                    console.log(error);
                })
        })
        .catch(error=>{
            console.log(error);
        })
}
    handlePurchase(){

        // const config = {
        //     headers: {
        //     'Content-type': 'application/json'
        //     }
        // };
        // const body=JSON.stringify({
        //     vendor_id:this.props.vendor._id,
        //     item_id:this.state.item.id
        // })
        // axios.post(baseURL+'/payment/',body,config)
        //     .then(response=>{
        //         this.setState({
        //             paymentInfo:response.data
        //         })
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
    const config = {
          headers: {
          'Content-type': 'application/json'
          }
      };

      const body=JSON.stringify({
          item_id:this.state.item.id
      })
      axios.post(baseURL+'/vendor/'+this.props.vendor._id+'/transaction', body ,config)
          .then(response=>{
              console.log(response.data);
            const config = {
                headers: {
                'Content-type': 'application/json'
                }
            };
            axios.get(baseURL+'/vendor/newsfeed/'+this.props.vendor._id, config)
                .then(response=>{
                    this.setState({
                        items:response.data,
                        item:null
                    });
                })
                .catch(error=>{
                    console.log(error);
                })
          })
          .catch(error=>{
              console.log(error);
          })
    }

    render() {
        // return(
        //     <View>
        //         <Text/><Text/><Text/><Text/>
        //     {/* { this.state.paymentInfo? (
        //            <View>
        //             <Form 
        //             ref={el=>{this.instance=el } } method='POST' 
        //             action={this.state.paymentInfo.TXN_URL}>
        //               </Form> 
        //                 {
        //                     //this.findFields()
        //                     Object.keys(this.state.paymentInfo).map(key=>{
        //                         return <Text name={key}>{this.state.paymentInfo[key]}</Text>
        //                     })
        //                 }
        //               {
        //                 Object.keys(this.state.paymentInfo).map(key=>{
        //                     return(
        //                    <View>
        //                         <Text name={key}>{this.state.paymentInfo[key]}</Text>
        //                     </View>
        //                     )
        //                     })
        //               }
        //             <Text onPress={()=>this.handleclick(this.state.paymentInfo)}>click</Text>
        //            </View>
        //         ) : <View> */}
        //         {this.props.isAuthenticated ? (
        //     <View>
        //     {this.state.item?(
        //          this.state.item.imageData ? (
        //         <View>
        //            <Text onPress={this.handleBack}>Go Back</Text>
        //            <Text> Item Details:</Text>
        //            <Text> category: {this.state.item.cat_id.name}</Text>
        //            <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
        //            <Text> quantity: {this.state.item.quantity}
        //            {this.state.item.sub_cat_id.quantity_type}</Text>
        //            <Text>Date</Text>
        //            <TextInput type="date" onChangeText={this.handleDate} />
        //            <Text>Time</Text>
        //             <TextInput type="time" onChangeText={this.handleTime} />
        //             <Text>{console.log(this.state.item._doc._id)}</Text>
        //             <Button title="Bid for it" onPress={()=>{this.handleAcceptance(this.state.item._doc._id)}}></Button>
        //             <Button title="Reject it"onPress={()=>{this.handleRejection(this.state.item._doc._id)}}></Button>
        //         </View>
        //     ):(
        //         <View>
        //         <Text onPress={this.handleBack}>Go Back</Text>
        //         <Text> Item Details:</Text>
        //         <Text> category: {this.state.item.cat_id.name}</Text>
        //         <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
        //         <Text> quantity: {this.state.item.quantity}
        //         {this.state.item.sub_cat_id.quantity_type}</Text>
        //         <Text>Date</Text>
        //         <TextInput type="date" onChangeText={this.handleDate} />
        //         <Text>Time</Text>
        //          <TextInput type="time" onChangeText={this.handleTime} />
        //          <Text>{console.log(this.state.item)}</Text>
        //          <Button title="Bid for it" onPress={()=>{this.handleAcceptance(this.state.item._id)}}></Button>
        //          <Button title="Reject it" onPress={()=>{this.handleRejection(this.state.item._id)}}></Button>
        //      </View>
        //     )
        //     ):(
        //         <View>
        //         <Text>Here are all the items for sale</Text>
        //           {
        //               this.state.items? this.state.items.map(item=>{
        //                       return (<View key={item.id}>
        //                       <Text>category:{item.cat_id.name}</Text>
        //                       <Text> subcategory:{item.sub_cat_id.name}</Text>
        //                       <Text>quantity:{item.quantity}{item.sub_cat_id.quantity_type}{"\n"}</Text>
        //                       <Text  onPress={()=>this.handleList(item)}>Click</Text>
        //                       </View>)
        //                   }) : (<Text>No Items to display</Text>)
                      
        //           }
        //     </View>
        //     )
        //     }
        //     </View>
        //     ) : (
        //         <Text>Please Login First!</Text>
        //       )}
        //     </View>
        // )
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
   
        var fulldate=date + '-' + month + '-' + year;
        return (
            <View>
              <Text />
              <Text />
              <Text />
              {/* { this.state.paymentInfo? (
                         <View>
                          <Form 
                          ref={el=>{this.instance=el } } method='POST' 
                          action={this.state.paymentInfo.TXN_URL}>
                            </Form> 
                              {
                                  //this.findFields()
                                  Object.keys(this.state.paymentInfo).map(key=>{
                                      return <Text name={key}>{this.state.paymentInfo[key]}</Text>
                                  })
                              }
                            {
                              Object.keys(this.state.paymentInfo).map(key=>{
                                  return(
                                 <View>
                                      <Text name={key}>{this.state.paymentInfo[key]}</Text>
                                  </View>
                                  )
                                  })
                            }
                          <Text onPress={()=>this.handleclick(this.state.paymentInfo)}>click</Text>
                         </View>
                      ) : <View> */}
              {this.props.isAuthenticated ? (
                <View>
                  {this.state.item ? (
                    this.state.item.imageData ? (
                      <View style={styles.container}>
                        <Text onPress={this.handleBack}>Go Back</Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            // fontFamily: "ComicNeuRegBold"
                          }}
                        >
                          {" "}
                          Item Details Goes below:
                        </Text>
                        <Text> category: {this.state.item.cat_id.name}</Text>
                        <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
                        <Text>
                          {" "}
                          quantity: {this.state.item.quantity}
                          {this.state.item.sub_cat_id.quantity_type}
                        </Text>
                        <Text>Date</Text>
                        <TextInput type="date" onChangeText={this.handleDate} />
                        <Text>Time</Text>
                        <TextInput type="time" onChangeText={this.handleTime} />
                        <Text>{console.log(this.state.item._doc._id)}</Text>
                        <Button
                          title="Bid for it"
                          onPress={() => {
                            this.handleAcceptance(this.state.item._doc._id);
                          }}
                        ></Button>
                        <Button
                          title="Reject it"
                          onPress={() => {
                            this.handleRejection(this.state.item._doc._id);
                          }}
                        ></Button>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={styles.GoBackView}
                          onPress={this.handleBack}
                        >
                          <EvilIcons name={"chevron-left"} size={27} />
                          <Text style={styles.GoBack}>Go Back</Text>
                        </TouchableOpacity>
                        {/* <Text
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            //   fontFamily: "ComicNeuRegBold",
                          }}
                        >
                          {" "}
                          Item Details
                        </Text> */}
      
                        <View>
                          <View style={styles.list}>
                            <View style={styles.LogoView}>
                              <Image source={Img} style={styles.LogoImg} />
                            </View>
                            <View style={{ justifyContent: "center", width: "95%" }}>
                              <View style={styles.ListTextCont}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Text style={styles.Heading}>
                                    category: {this.state.item.cat_id.name}
                                  </Text>
                                </View>
                                <Text style={styles.subHeading}>
                                  {" "}
                                  subcategory: {this.state.item.sub_cat_id.name}
                                </Text>
                                <Text style={styles.Quantity}>
                                  {" "}
                                  quantity: {this.state.item.quantity}
                                  {this.state.item.sub_cat_id.quantity_type}
                                </Text>
                              </View>
      
                              <View style={{ flexDirection: "row" }}>
                                <AntDesign
                                  name="calendar"
                                  size={30}
                                  style={{ position: "absolute", top: 4, left: 10 }}
                                />
                                <DatePicker
                                  style={{ width: "90%" }}
                                  date={this.state.date} //initial date from state
                                  mode="date" //The enum of date, datetime and time
                                  placeholder="Select a Date for Bidding"
                                  format="DD-MM-YYYY"
                                  minDate={fulldate}
                                  maxDate="01-01-2025"
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  customStyles={{
                                    dateIcon: {
                                      display: "none",
                                    },
                                    dateInput: {
                                      marginLeft: 0,
                                      borderRadius: 20,
                                      borderColor: "#5cc2f2",
                                      borderWidth: 0.5,
                                      alignItems: "flex-start",
                                      paddingLeft: 60,
                                    },
                                  }}
                                  onDateChange={this.handleDate}
                                />
                              </View>
      
                              {/* <Text>Date</Text>
                              <TextInput type="date" onChangeText={this.handleDate} /> */}
      
                              <View style={{ flexDirection: "row" }}>
                                <Ionicons
                                  name="md-time"
                                  size={30}
                                  style={{ position: "absolute", top: 10, left: 12 }}
                                />
                                <DatePicker
                                  style={{ width: "90%", marginTop: 6 }}
                                  date={this.state.time} //initial date from state
                                  mode="time" //The enum of date, datetime and time
                                  placeholder="Select a Time for Bidding"
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  is24Hour={false}
                                  customStyles={{
                                    dateIcon: {
                                      display: "none",
                                    },
                                    dateInput: {
                                      marginLeft: 0,
                                      borderRadius: 20,
                                      borderColor: "#5cc2f2",
                                      borderWidth: 0.5,
                                      alignItems: "flex-start",
                                      paddingLeft: 60,
                                    },
                                  }}
                                  onDateChange={this.handleTime}
                                />
                              </View>
      
                              {/* <Text>Time</Text>
                              <TextInput type="time" onChangeText={this.handleTime} /> */}
                              <Text>{console.log(this.state.item)}</Text>
      
                              <View style={{ marginTop: 0 }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "80%",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.handleAcceptance(this.state.item._id);
                                    }}
                                  >
                                    <Text style={styles.BidForIt}>Bid For It</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.handleRejection(this.state.item._id);
                                    }}
                                  >
                                    <Text style={styles.RejectIt}>Reject It</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
      
                              {/* <Button
                                title="Bid for it"
                                onPress={() => {
                                  this.handleAcceptance(this.state.item._id);
                                }}
                              ></Button>
                              <Button
                                title="Reject it"
                                onPress={() => {
                                  this.handleRejection(this.state.item._id);
                                }}
                              ></Button> */}
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  ) : (
                    <View>
                      <Text>Here are all the items for sale</Text>
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
                                                      Quantity : {item.quantity}{"\n"}
                                                      {item.sub_cat_id.quantity_type}
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
                                          keyExtractor={(item) => item.id}
                                        />
                        // this.state.items.map((item) => {
                        //   return (
                        //     <View key={item.id}>
                        //       <Text>category:{item.cat_id.name}</Text>
                        //       <Text> subcategory:{item.sub_cat_id.name}</Text>
                        //       <Text>
                        //         quantity:{item.quantity}
                        //         {item.sub_cat_id.quantity_type}
                        //         {"\n"}
                        //       </Text>
                        //       <Text onPress={() => this.handleList(item)}>Click</Text>
                        //     </View>
                        //   );
                        // })
                      ) : (
                        <Text>No Items to display</Text>
                      )}
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


const mapStateToProps = state => ({
    token:state.vendorAuth.token,
    vendor:state.vendorAuth.vendor,
    isAuthenticated: state.vendorAuth.isAuthenticated,
    error: state.error
  });

  export default connect(
    mapStateToProps,
    { clearErrors }
  )(NewsFeed);


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
      letterSpacing: 0,
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
    container: {
      flex: 1,
      backgroundColor: "#fff",
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
    list: {
      width: "100%",
      paddingTop: 8,
      alignItems: "center",
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
      height: 300,
    },
    ListTextCont: {
      padding: 10,
    },
    Heading: {
      //   fontFamily: "ComicNeuRegBold",
      letterSpacing: 5,
      fontSize: 25,
    },
    subHeading: {
      //   fontFamily: "ComicNeuReg",
      letterSpacing: 2,
      fontSize: 15,
    },
    Desc: {
      width: 300,
    },
    Quantity: {
      //   fontFamily: "ComicNeuReg",
      letterSpacing: 0.5,
      fontSize: 15,
    },
    BidForIt: {
      marginLeft: 10,
      padding: 12,
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: "#5cc2f2",
      borderRadius: 15,
    },
    RejectIt: {
      marginRight: -30,
      padding: 12,
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: "#5cc2f2",
      borderRadius: 15,
    },
  });