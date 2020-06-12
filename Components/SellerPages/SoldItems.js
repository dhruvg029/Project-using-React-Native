// import React, { Component } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import { clearErrors } from "../../actions/errorActions";
// import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableWithoutFeedback, TouchableOpacity,Image, ScrollView } from "react-native";
// import { Actions } from "react-native-router-flux";
// import SellerLogout from "./LogoutSeller";
// import StarRatingComponent from "react-native-star-rating";
// import { baseURL } from "../../config/constants.js";
// import Img from "../../assets/opener.png";
// import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";

// class ViewSelledItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: null,
//       item: null,
//       rating: 1,
//       reason:false,
//       reasonDesc:null
//     };
//     this.handleBack=this.handleBack.bind(this);
//     this.handleReason=this.handleReason.bind(this);
//     this.vendorReport=this.vendorReport.bind(this);
//     this.handleSaveBack=this.handleSaveBack.bind(this);
//     this.onStarClick=this.onStarClick.bind(this);
//     this.handleRecievedCash=this.handleRecievedCash.bind(this);
//   }

//   componentDidMount() {
//     if (this.props.isAuthenticated) {
//       // Headers
//       const config = {
//         headers: {
//           "Content-type": "application/json"
//         }
//       };
//       axios
//         .get(
//           baseURL + "/seller/" + this.props.seller._id + "/viewSelledItem",
//           config
//         )
//         .then(response => {
//           this.setState({
//             items: response.data
//           });
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   }

//   componentDidUpdate() {
//     if (!this.props.isAuthenticated) {
//       Actions.sellerLogin();
//     }
//   }
//   handleList(item) {
//     this.setState({
//       item
//     });
//   }

//   handleReason(reasonDesc) {
//     this.setState({reasonDesc});
//   }

//   handleBack() {
//     this.setState({
//       item: null,
//       rating: 1
//     });
//   }

//   handleByStatus() {
//     // PAYMENT STATUS PENDING
//     if(this.state.item.status==='PAYMENT'){
//       return(
//            <View>
//                <Text>Data of the Vendor selected for the current bid is</Text>
//                <Text>Name: {this.state.item.transaction_id.vendor.name}</Text>
//                <Text>Phone no: {this.state.item.transaction_id.vendor.contact}</Text>
//               { 
                  
//                   this.state.item.transaction_id.quantity_taken?(
//                   <View><Text>Quantity collected by vendor {this.state.item.transaction_id.quantity_taken}</Text></View>):( <View><Text>quantity taken by vendor not yet updated</Text></View>)
                  
            
//               }
//                {
//                    this.state.item.transaction_id.method?this.state.item.transaction_id.method==='COD'?(
//                       <View>
//                           <Text>Method of payment selected: Cash on delivery</Text>
//                           <Text>Amount to be collected: {this.state.item.transaction_id.quantity_taken*this.state.item.transaction_id.price}</Text>
//                           <Button title="received cash" onPress={this.handleRecievedCash}></Button>
//                       </View>
                      
//                   ):(<Text>Method of payment selected Online</Text>): (<Text>method of payment not yet updated not yet updated</Text>)
//               }
//               {
//                   this.state.reason?(<TextInput onChangeText={this.handleReason} rows='25' cols='10' placeholder="state the reason for rejecting the vendor" >{this.state.reasonDesc}</TextInput>):null
//               }
//               {
//                   <Button title="Report the vendor for the item" onPress={ this.vendorReport }/>
//                }
//           </View>
//       )
//   }else if (this.state.item.status === "RATING") {
//       return (
//         <View>
//           <StarRatingComponent
//             name="rate1"
//             maxStars={5}
//             rating={this.state.rating}
//             height="10px"
//             selectedStar={this.onStarClick}
//           />
//           <Text onPress={this.handleSaveBack}>Save and Go Back</Text>
//         </View>
//       );
//     } else if (this.state.item.status === "DONE") {
//       return (
//         <View>
//           <StarRatingComponent
//             name="rate2"
//             maxStars={5}
//             rating={this.state.item.transaction_id.rating}
//             height="10px"
//             disabled={false}
//             selectedStar={this.onStarClick}
//           />
//         </View>
//       );
//     } else {
//       return null;
//     }
//   }
//   handleSaveBack(){
//     const token = this.props.token;

//     // Headers
//     const config = {
//         headers: {
//         'Content-type': 'application/json'
//         }
//     };

//     var sitem={
//         transaction_id:this.state.item.transaction_id,
//         rating:this.state.rating
//     }
//     // If token, add to headers
//     if (token) {
//         config.headers['x-auth-seller-token'] = token;
//     }
//     axios.post(baseURL+'/seller/'+this.props.seller._id+'/saveRating',sitem, config)
//         .then(response=>{
//             this.setState({
//                 item:null,
//                 rating:1
//             })
//         })
//         .catch(error=>{
//             console.log(error);
//         })
// }
//   vendorReport() {
//     if (!this.state.reason) {
//       this.setState({
//         reason: true
//       });
//       return;
//     }
//     if (this.state.reasonDesc === null || this.state.reasonDesc === "") {
//       return;
//     }
//     const config = {
//       headers: {
//         "Content-type": "application/json"
//       }
//     };

//     const body = JSON.stringify({
//       item_id: this.state.item._id
//     });

//     axios
//       .post(
//         baseURL + "/seller/" + this.props.seller._id + "/vendorReport",
//         body,
//         config
//       )
//       .then(response => {
//         console.log(response.data);
//         const config = {
//           headers: {
//             "Content-type": "application/json"
//           }
//         };
//         axios
//           .get(
//             baseURL + "/seller/" + this.props.seller._id + "/viewSelledItem",
//             config
//           )
//           .then(response => {
//             this.setState({
//               items: response.data,
//               item: null
//             });
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   handleSaveBack() {
//     const token = this.props.token;

//     // Headers
//     const config = {
//       headers: {
//         "Content-type": "application/json"
//       }
//     };

//     var sitem = {
//       transaction_id: this.state.item.transaction_id,
//       rating: this.state.rating
//     };
//     // If token, add to headers
//     if (token) {
//       config.headers["x-auth-seller-token"] = token;
//     }
//     axios
//       .post(
//         baseURL + "/seller/" + this.props.seller._id + "/saveRating",
//         sitem,
//         config
//       )
//       .then(response => {
//         this.setState({
//           item: null,
//           rating: 1
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   onStarClick(nextValue, prevValue, name) {
//     this.setState({ rating: nextValue });
//   }

//   handleRecievedCash() {
//     // Headers
//     console.log("cashed");
//     const config = {
//       headers: {
//         "Content-type": "application/json"
//       }
//     };

//     var body = {
//       item_id: this.state.item._id
//     };

//     axios
//       .post(
//         baseURL + "/seller/" + this.props.seller._id + "/cashRecieved",
//         body,
//         config
//       )
//       .then(response => {
//         this.setState({
//           item:null
//       })
//       })
//       .catch(error => {
//         console.log(error);
//       });

//       console.log(this.state.item.status);
//   }

//   render() {
//     return (
//       <ScrollView>
//       <View>
//         {this.props.isAuthenticated ? (
//           <View>
//             <Text/><Text/><Text/><Text/>
//             <SellerLogout />
//             {this.state.item ? (
//               <View>
//                  <Text/><Text/><Text/><Text/>
                 
//                 <Text onPress={this.handleBack}>Go Back</Text>
//                 <Text> Item Details:</Text>
//                 <Text> category: {this.state.item.cat_id.name}</Text>
//                 <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
//                 <Text> quantity: {this.state.item.quantity} {this.state.item.sub_cat_id.quantity_type}</Text>
                
//                 {this.handleByStatus()}
//               </View>
//             ) : (
//               // <View>
//               //    <Text/><Text/><Text/><Text/>
//               //   <Text>Here are all your items that are sold</Text>
//               //   <View>
//               //     {this.state.items ? (
//               //       this.state.items.map(item => {
//               //         return (
//               //           <View key={item._id}>
//               //             <Text>category:{item.cat_id.name}</Text>
//               //             <Text> subcategory:{item.sub_cat_id.name}</Text>
//               //             <Text>
//               //               quantity:{item.quantity}
//               //               {item.sub_cat_id.quantity_type}
//               //             </Text>
//               //             <Button title="details" onPress={()=>{this.handleList(item)}}/>
//               //           </View>
//               //         );
//               //       })
//               //     ) : (
//               //       <Text>No Items to display</Text>
//               //     )}
//               //   </View>
//               // </View>
//               <View>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontFamily: "sans-serif",
//                   letterSpacing: 2,
//                   fontSize: 20,
//                 }}
//               >
//                 Here are all your Items that are Sold
//               </Text>
//               <View>
//                 {this.state.items ? (
//                   <View>
//                     {/* this.state.items.map((item) => {
//                     return (
//                       <View key={item._id}>
//                         <Text>category:{item.cat_id.name}</Text>
//                         <Text> subcategory:{item.sub_cat_id.name}</Text>
//                         <Text>
//                           quantity:{item.quantity}
//                           {item.sub_cat_id.quantity_type}
//                         </Text>
//                         <Button
//                           title="details"
//                           onPress={() => {
//                             this.handleList(item);
//                           }}
//                         />
//                       </View>
//                     );
//                   }) */}
//                     <FlatList
//                       data={this.state.items}
//                       numColumns={2}
//                       renderItem={({ item }) => (
//                         <TouchableWithoutFeedback>
//                           <View style={styles.list1}>
//                             <View style={styles.item1}>
//                               <Image source={Img} style={styles.LogoImg1} />
//                               <View style={styles.DetText1}>
//                                 <Text style={styles.Heading1}>
//                                   {item.cat_id.name}
//                                 </Text>
//                                 <Text style={styles.subHeading1}>
//                                   subcategory:{item.sub_cat_id.name}
//                                 </Text>
//                                 <Text style={styles.Quantity1}>
//                                   Quantity : {item.quantity}
//                                 </Text>
//                                 <TouchableOpacity
//                                   onPress={() => {
//                                     this.handleList(item);
//                                   }}
//                                 >
//                                   <Text style={styles.TouchBtnText1}>
//                                     Details
//                                   </Text>
//                                 </TouchableOpacity>
//                               </View>
//                             </View>
//                           </View>
//                         </TouchableWithoutFeedback>
//                       )}
//                       keyExtractor={(item) => item._id}
//                     />
//                   </View>
//                 ) : (
//                   <Text>No Items to display</Text>
//                 )}
//               </View>
//             </View>
//             )}
//             {/* <View>
//               <Text onPress={() => Actions.sellerNewItem()}>Add new Item</Text>
//             </View> */}
//              <TouchableOpacity
//               style={{
//                 alignItems: "center",
//                 marginTop: 10,
//                 borderRadius: 10,
//                 borderWidth: 0.3,
//               }}
//               onPress={() => Actions.sellerNewItem()}
//             >
//               <Text
//                 style={{
//                   fontWeight: "bold",
//                   letterSpacing: 2,
//                   padding: 10,
//                   paddingLeft: 20,
//                   paddingRight: 20,
//                 }}
//               >
//                 Add new Item
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <Text>Please Login First!</Text>
//         )}

//       </View>
//       </ScrollView>
//     );

//     // return (
//     //   <View style={{
//     //     flex:1,
//     //     justifyContent:'flex-start'
//     //   }}>
//     //     {this.props.isAuthenticated ? (
//     //       <View>
//     //         <Text />
//     //         <Text />
//     //         <Text />
//     //         {/* <SellerLogout /> */}
//     //         {this.state.item ? (
//     //           <View>
//     //             <TouchableOpacity
//     //               style={styles.GoBackView}
//     //               onPress={this.handleBack}
//     //             >
//     //               <EvilIcons name={"chevron-left"} size={27} />
//     //               <Text style={styles.GoBack}>Go Back</Text>
//     //             </TouchableOpacity>
//     //             {/* {console.log(this.state.item)} */}
//     //             <View style={styles.list}>
//     //               <View style={styles.LogoView}>
//     //                 <Image source={Img} style={styles.LogoImg} />
//     //               </View>

//     //               <View style={styles.ListTextCont}>
//     //                 <View
//     //                   style={{
//     //                     flexDirection: "row",
//     //                     justifyContent: "space-between",
//     //                   }}
//     //                 >
//     //                   <Text style={styles.Heading}>
//     //                     name::{this.state.item.cat_id.name}
//     //                   </Text>
//     //                   <StarRatingComponent
//     //                     starSize={28}
//     //                     disabled={false}
//     //                     emptyStar={"ios-star-outline"}
//     //                     fullStar={"ios-star"}
//     //                     halfStar={"ios-star-half"}
//     //                     iconSet={"Ionicons"}
//     //                     maxStars={5}
//     //                     rating={3.5}
//     //                     // selectedStar={(rating) => onStarRatingPress(rating)}
//     //                     fullStarColor={"#5cc2f2"}
//     //                   />
//     //                 </View>

//     //                 <Text style={styles.subHeading}>
//     //                   Subcategory: {this.state.item.sub_cat_id.name}
//     //                 </Text>
//     //                 <Text style={styles.Quantity}>
//     //                   {""}
//     //                   Quantity: {this.state.item.quantity}{" "}
//     //                   {this.state.item.sub_cat_id.quantity_type}
//     //                 </Text>
//     //               </View>
//     //             </View>

//     //             {this.handleByStatus()}
//     //           </View>
//     //         ) : (
//     //           <View>
//     //             <Text
//     //               style={{
//     //                 textAlign: "center",
//     //                 fontFamily: "sans-serif",
//     //                 letterSpacing: 2,
//     //                 fontSize: 20,
//     //               }}
//     //             >
//     //               Here are all your Items that are Sold
//     //             </Text>
//     //             <View>
//     //               {this.state.items ? (
//     //                 <View>
//     //                   {/* this.state.items.map((item) => {
//     //                   return (
//     //                     <View key={item._id}>
//     //                       <Text>category:{item.cat_id.name}</Text>
//     //                       <Text> subcategory:{item.sub_cat_id.name}</Text>
//     //                       <Text>
//     //                         quantity:{item.quantity}
//     //                         {item.sub_cat_id.quantity_type}
//     //                       </Text>
//     //                       <Button
//     //                         title="details"
//     //                         onPress={() => {
//     //                           this.handleList(item);
//     //                         }}
//     //                       />
//     //                     </View>
//     //                   );
//     //                 }) */}
//     //                   <FlatList
//     //                     data={this.state.items}
//     //                     numColumns={2}
//     //                     renderItem={({ item }) => (
//     //                       <TouchableWithoutFeedback>
//     //                         <View style={styles.list1}>
//     //                           <View style={styles.item1}>
//     //                             <Image source={Img} style={styles.LogoImg1} />
//     //                             <View style={styles.DetText1}>
//     //                               <Text style={styles.Heading1}>
//     //                                 {item.cat_id.name}
//     //                               </Text>
//     //                               <Text style={styles.subHeading1}>
//     //                                 subcategory:{item.sub_cat_id.name}
//     //                               </Text>
//     //                               <Text style={styles.Quantity1}>
//     //                                 Quantity : {item.quantity}
//     //                               </Text>
//     //                               <TouchableOpacity
//     //                                 onPress={() => {
//     //                                   this.handleList(item);
//     //                                 }}
//     //                               >
//     //                                 <Text style={styles.TouchBtnText1}>
//     //                                   Details
//     //                                 </Text>
//     //                               </TouchableOpacity>
//     //                             </View>
//     //                           </View>
//     //                         </View>
//     //                       </TouchableWithoutFeedback>
//     //                     )}
//     //                     keyExtractor={(item) => item._id}
//     //                   />
//     //                 </View>
//     //               ) : (
//     //                 <Text>No Items to display</Text>
//     //               )}
//     //             </View>
//     //           </View>
//     //         )}
//     //         <TouchableOpacity
//     //           style={{
//     //             alignItems: "center",
//     //             marginTop: 10,
//     //             borderRadius: 10,
//     //             borderWidth: 0.3,
//     //           }}
//     //           onPress={() => Actions.sellerNewItem()}
//     //         >
//     //           <Text
//     //             style={{
//     //               fontWeight: "bold",
//     //               letterSpacing: 2,
//     //               padding: 10,
//     //               paddingLeft: 20,
//     //               paddingRight: 20,
//     //             }}
//     //           >
//     //             Add new Item
//     //           </Text>
//     //         </TouchableOpacity>
//     //       </View>
//     //     ) : (
//     //       <Text>Please Login First!</Text>
//     //     )}
//     //   </View>
//     // );
//   }
// }

// const mapStateToProps = state => ({
//   token: state.sellerAuth.token,
//   seller: state.sellerAuth.seller,
//   isAuthenticated: state.sellerAuth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps, { clearErrors })(ViewSelledItem);

// const styles = StyleSheet.create({
//   list1: {
//     flex: 1,
//   },
//   item1: {
//     backgroundColor: "#f7f8fa",
//     padding: 16,
//     borderColor: "#bbb",
//     borderWidth: 1,
//     borderStyle: "solid",
//     borderRadius: 1,
//     alignItems: "center",
//     borderRadius: 10,
//     margin: 2,
//     width: "99%",
//   },
//   DetText1: {
//     alignItems: "center",
//   },
//   LogoImg1: {
//     width: 100,
//     height: 100,
//     alignItems: "center",
//   },
//   Heading1: {
//     fontFamily: "notoserif",
//     letterSpacing: 0,
//     height: 50,
//     textAlignVertical: "center",
//     fontSize: 20,
//     textAlign: "center",
//   },
//   subHeading1: {
//     fontFamily: "notoserif",
//     letterSpacing: 2,
//     fontSize: 15,
//     textAlign: "center",
//   },
//   Quantity1: {
//     fontFamily: "notoserif",
//     letterSpacing: 0.5,
//     fontSize: 15,
//     textAlign: "center",
//   },
//   TouchBtn1: {
//     padding: 10,
//     color: "#333",
//   },
//   TouchBtnText1: {
//     padding: 10,
//     textAlign: "center",
//     backgroundColor: "#5cc2f2",
//     borderRadius: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     color: "#333",
//     letterSpacing: 4,
//     alignSelf: "center",
//     width: "100%",
//   },
// });
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { clearErrors } from "../../actions/errorActions";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import SellerLogout from "./LogoutSeller";
import StarRatingComponent from "react-native-star-rating";
import { baseURL } from "../../config/constants.js";
import Img from "../../assets/opener.png";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";

class ViewSelledItem extends Component {
  // adding a constructor for the props
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      item: null,
      rating: 1,
      reason: false,
      reasonDesc: null,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.vendorReport = this.vendorReport.bind(this);
    this.handleSaveBack = this.handleSaveBack.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.handleRecievedCash = this.handleRecievedCash.bind(this);
  }

  componentDidMount() {
    // for fetching the data from an external API
    if (this.props.isAuthenticated) {
      // Headers
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .get(
          baseURL + "/seller/" + this.props.seller._id + "/viewSelledItem",
          config
        )
        .then((response) => {
          this.setState({
            items: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidUpdate() {
    // when a component is updated
    if (!this.props.isAuthenticated) {
      Actions.sellerLogin();
    }
  }
  handleList(item) {
    this.setState({
      item,
    });
  }

  handleReason(reasonDesc) {
    this.setState({ reasonDesc });
  }

  handleBack() {
    this.setState({
      item: null,
      rating: 1,
    });
  }

  handleByStatus() {
    // PAYMENT STATUS PENDING
    if (this.state.item.status === "PAYMENT") {
      return (
        <View style={styles.UserInfo}>
          {/* <Text>Data of the Vendor selected for the current bid is</Text> */}
          <View
          >
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
                marginTop: 2,
              }}
            >
              {this.state.item.transaction_id.vendor.name[0]}
            </Text>
            <StarRatingComponent
              starSize={15}
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={3.5}
              // selectedStar={(rating) => onStarRatingPress(rating)}
              fullStarColor={"#5cc2f2"}
            />
          </View>

          <View
            style={{
              marginLeft: 15,
              width: 300,
            }}
          >
            <Text style={{ fontStyle: "italic" }}>
              <Text style={styles.UserVal}>Name:</Text>{" "}
              {this.state.item.transaction_id.vendor.name}
            </Text>
            <Text style={{ fontStyle: "italic" }}>
              <Text style={styles.UserVal}>Phone no:</Text>{" "}
              {this.state.item.transaction_id.vendor.contact}
            </Text>
            {this.state.item.transaction_id.quantity_taken ? (
              <View>
                <Text style={{ fontStyle: "italic" }}>
                  <Text style={styles.UserVal}>
                    Quantity collected by vendor{" "}
                  </Text>
                  {this.state.item.transaction_id.quantity_taken}
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: "#6b6b6b",
                    fontStyle: "italic",
                  }}
                >
                  quantity taken by vendor not yet updated
                </Text>
              </View>
            )}
            {this.state.item.transaction_id.method ? (
              this.state.item.transaction_id.method === "COD" ? (
                <View>
                  <Text style={{ fontStyle: "italic" }}>
                    <Text style={styles.UserVal}>
                      Method of payment selected:
                    </Text>{" "}
                    Cash on delivery
                  </Text>
                  <Text style={{ fontStyle: "italic" }}>
                    <Text style={styles.UserVal}>Amount to be collected: </Text>
                    {this.state.item.transaction_id.quantity_taken *
                      this.state.item.transaction_id.price}
                  </Text>
                  <Button
                    title="received cash"
                    onPress={this.handleRecievedCash}
                  ></Button>
                </View>
              ) : (
                <Text
                  style={{
                    color: "#6b6b6b",
                    fontStyle: "italic",
                  }}
                >
                  Method of payment selected Online
                </Text>
              )
            ) : (
              <Text
                style={{
                  color: "#6b6b6b",
                  fontStyle: "italic",
                }}
              >
                method of payment not yet updated
              </Text>
            )}
            {this.state.reason ? (
              <View
                style={{
                  borderBottomWidth: 0.5,
                }}
              >
                <TextInput
                  onChangeText={this.handleReason}
                  rows="25"
                  cols="10"
                  placeholder="State the reason for rejecting the Vendor"
                >
                  {this.state.reasonDesc}
                </TextInput>
              </View>
            ) : null}
            {
              <TouchableOpacity
                onPress={this.vendorReport}
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: "#F08080",
                  }}
                >
                  Report the veendor for the item"
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      );
    } else if (this.state.item.status === "RATING") {
      return (
        <View>
          <StarRatingComponent
            name="rate1"
            maxStars={5}
            rating={this.state.rating}
            height="10px"
            selectedStar={this.onStarClick}
          />
          <Text onPress={this.handleSaveBack}>Save and Go Back</Text>
        </View>
      );
    } else if (this.state.item.status === "DONE") {
      return (
        <View>
          <StarRatingComponent
            name="rate2"
            maxStars={5}
            rating={this.state.item.transaction_id.rating}
            height="10px"
            disabled={false}
            selectedStar={this.onStarClick}
          />
        </View>
      );
    } else {
      return null;
    }
  }
  handleSaveBack() {
    const token = this.props.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    var sitem = {
      transaction_id: this.state.item.transaction_id,
      rating: this.state.rating,
    };
    // If token, add to headers
    if (token) {
      config.headers["x-auth-seller-token"] = token;
    }
    axios
      .post(
        baseURL + "/seller/" + this.props.seller._id + "/saveRating",
        sitem,
        config
      )
      .then((response) => {
        this.setState({
          item: null,
          rating: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  vendorReport() {
    if (!this.state.reason) {
      this.setState({
        reason: true,
      });
      return;
    }
    if (this.state.reasonDesc === null || this.state.reasonDesc === "") {
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      item_id: this.state.item._id,
    });

    axios
      .post(
        baseURL + "/seller/" + this.props.seller._id + "/vendorReport",
        body,
        config
      )
      .then((response) => {
        console.log(response.data);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios
          .get(
            baseURL + "/seller/" + this.props.seller._id + "/viewSelledItem",
            config
          )
          .then((response) => {
            this.setState({
              items: response.data,
              item: null,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSaveBack() {
    const token = this.props.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    var sitem = {
      transaction_id: this.state.item.transaction_id,
      rating: this.state.rating,
    };
    // If token, add to headers
    if (token) {
      config.headers["x-auth-seller-token"] = token;
    }
    axios
      .post(
        baseURL + "/seller/" + this.props.seller._id + "/saveRating",
        sitem,
        config
      )
      .then((response) => {
        this.setState({
          item: null,
          rating: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleRecievedCash() {
    // Headers
    console.log("cashed");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    var body = {
      item_id: this.state.item._id,
    };

    axios
      .post(
        baseURL + "/seller/" + this.props.seller._id + "/cashRecieved",
        body,
        config
      )
      .then((response) => {
        this.setState({
          item: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.state.item.status);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {this.props.isAuthenticated ? (
          <View>
            <Text />
            <Text />
            <Text />
            {/* <SellerLogout /> */}
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

                {this.handleByStatus()}
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
                  Here are all your Items that are Sold
                </Text>
                <View>
                  {this.state.items ? (
                    <View>
                      {/* this.state.items.map((item) => {
                      return (
                        <View key={item._id}>
                          <Text>category:{item.cat_id.name}</Text>
                          <Text> subcategory:{item.sub_cat_id.name}</Text>
                          <Text>
                            quantity:{item.quantity}
                            {item.sub_cat_id.quantity_type}
                          </Text>
                          <Button
                            title="details"
                            onPress={() => {
                              this.handleList(item);
                            }}
                          />
                        </View>
                      );
                    }) */}
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
                    </View>
                  ) : (
                    <Text>No Items to display</Text>
                  )}
                </View>
              </View>
            )}
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 0.3,
              }}
              onPress={() => Actions.sellerNewItem()}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  letterSpacing: 2,
                  padding: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                Add new Item
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Please Login First!</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.sellerAuth.token,
  seller: state.sellerAuth.seller,
  isAuthenticated: state.sellerAuth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { clearErrors })(ViewSelledItem);

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
    borderWidth: 0.3,
    marginLeft: 10,
  },
  GoBack: {
    textAlign: "center",
    alignItems: "flex-start",
    letterSpacing: 2,
    textAlignVertical: "center",
    paddingLeft: 2,
  },
  list: {
    width: "100%",
    paddingTop: 0,
    justifyContent: "space-around",
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
    height: 250,
  },
  ListTextCont: {
    padding: 10,
    paddingTop: 9,
  },
  Heading: {
    // fontFamily: "ComicNeuRegBold",
    letterSpacing: 0,
    fontSize: 27,
  },
  subHeading: {
    // fontFamily: "ComicNeuReg",
    letterSpacing: 2,
    fontSize: 16,
    marginTop: 5,
  },
  Desc: {
    width: 300,
  },
  Quantity: {
    letterSpacing: 0.5,
    fontSize: 16,
    marginTop: 2,
  },
  UserInfo: {
    backgroundColor: "#f7f8fa",
    padding: 10,
    marginTop: 3,
    paddingTop: 7,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 7,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  VendorData: {
    position: "absolute",
    top: -30,
    justifyContent: "center",
  },
  UserVal: {
    // fontFamily: "ComicNeuRegBold",
    paddingLeft: 10,
    fontStyle: "normal",
    fontFamily: "sans-serif",
  },
});