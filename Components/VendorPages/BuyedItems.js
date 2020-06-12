// import React, { Component } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import { clearErrors } from "../../actions/errorActions";
// import VendorLogout from "./LogoutVendor";
// import { StyleSheet, Text, View, TextInput, Button } from "react-native";
// import { Actions } from "react-native-router-flux";
// import { baseURL } from "../../config/constants.js";

// class ViewBuyedItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: null,
//       item: null,
//       paymentInfo: null,
//       msg: null,
//       quantity_taken: null,
//       reason: true,
//       reasonDesc: null,
//     };
//     this.handleBack = this.handleBack.bind(this);
//     this.handlePurchase = this.handlePurchase.bind(this);
//     this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
//     this.handleQuantityTaken = this.handleQuantityTaken.bind(this);
//     this.handleQuantityTakenSubmit = this.handleQuantityTakenSubmit.bind(this);
//     this.handleReason = this.handleReason.bind(this);
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       if (this.props.isAuthenticated) {
//         // Headers
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//           },
//         };
//         axios
//           .get(
//             baseURL + "/vendor/" + this.props.vendor._id + "/viewBuyedItem",
//             config
//           )
//           .then((response) => {
//             this.setState({
//               items: response.data,
//             });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }, 500);
//   }

//   componentDidUpdate() {
//     if (!this.props.isLoading && !this.props.isAuthenticated) {
//       this.props.history.push("/vendor/login");
//     }
//     if (this.state.paymentInfo) {
//       console.log(this.instance);
//       this.instance.submit();
//     }
//   }

//   handleBack() {
//     this.setState({
//       item: null,
//       msg: null,
//     });
//   }

//   handleList(item) {
//     this.setState({
//       item,
//       msg: null,
//     });
//   }

//   handlePurchase() {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };
//     const body = JSON.stringify({
//       vendor_id: this.props.vendor._id,
//       item_id: this.state.item._id,
//     });
//     axios
//       .post(baseURL + "/payment/", body, config)
//       .then((response) => {
//         this.setState({
//           paymentInfo: response.data,
//           msg: null,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   handlePaymentMethod(method) {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };
//     const body = JSON.stringify({
//       item_id: this.state.item._id,
//       method,
//     });
//     axios
//       .post(
//         baseURL + "/vendor/" + this.props.vendor._id + "/paymentMethod",
//         body,
//         config
//       )
//       .then((response) => {
//         this.setState({
//           msg: response.data.msg,
//         });
//         axios
//           .get(
//             baseURL + "/vendor/" + this.props.vendor._id + "/viewBuyedItem",
//             config
//           )
//           .then((response) => {
//             this.setState({
//               items: response.data,
//               item: null,
//             });
//             return;
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     console.log("payment method handled");
//   }

//   handleQuantityTaken = (quantity_taken) => {
//     this.setState({ quantity_taken });
//     // if(this.state.item.quantity!==parseInt(quantity_taken,10)){
//     //     this.setState({
//     //         reason:true
//     //     })
//     // }else{
//     //     this.setState({
//     //         reason:false
//     //     })
//     // }
//     console.log(quantity_taken);
//     // console.log(reason)
//   };

//   handleQuantityTakenSubmit() {
//     console.log("attempted to submit");
//     var quantity_taken = parseInt(this.state.quantity_taken, 10);
//     if (quantity_taken === null) {
//       return;
//     }
//     if (quantity_taken > this.state.item.quantity) {
//       return;
//     }
//     if (
//       quantity_taken !== this.state.item.quantity &&
//       (this.state.reasonDesc === null || this.state.reasonDesc === "")
//     ) {
//       return;
//     }
//     console.log("all clear");
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//       },
//     };
//     var body;
//     if (this.state.reason) {
//       body = JSON.stringify({
//         quantity_taken: quantity_taken,
//         reason: this.state.reasonDesc,
//         item_id: this.state.item._id,
//       });
//     } else {
//       body = JSON.stringify({
//         quantity_taken: quantity_taken,
//         item_id: this.state.item._id,
//       });
//     }
//     axios
//       .post(
//         baseURL + "/vendor/" + this.props.vendor._id + "/quantityTaken",
//         body,
//         config
//       )
//       .then((response) => {
//         this.setState({
//           item: response.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   handleReason = (reasonDesc) => {
//     this.setState({
//       reasonDesc,
//     });

//     console.log(reasonDesc);
//   };

//   render() {
//     return (
//       <View>
//         {this.state.msg ? <Text>{this.state.msg}</Text> : null}
//         {this.state.paymentInfo ? (
//           <View>
//             {/* <form ref={el=>{this.instance=el } } method='POST' action={this.state.paymentInfo.TXN_URL}>
//                     {
//                         //this.findFields()
//                         Object.keys(this.state.paymentInfo).map(key=>{
//                             return <input type='hidden' name={key} value={this.state.paymentInfo[key]} />
//                         })
//                     }
//                 </form> */}
//             <Text>Do not refresh. redirecting you to payment page</Text>
//           </View>
//         ) : (
//           <View>
//             {this.props.isAuthenticated ? (
//               <View>
//                 <VendorLogout />
//                 {this.state.item ? (
//                   <View>
//                     <Text onPress={this.handleBack}>Go Back</Text>
//                     <Text> Item Details:</Text>
//                     <Text> category: {this.state.item.cat_id.name}</Text>
//                     <Text> subcategory: {this.state.item.sub_cat_id.name}</Text>
//                     <Text>
//                       {" "}
//                       quantity: {this.state.item.quantity}{" "}
//                       {this.state.item.sub_cat_id.quantity_type}
//                     </Text>
//                     {this.state.item.transaction_id.status ? (
//                       <View>
//                         <Text>the seller rejected the offer</Text>
//                         <Text>
//                           Reason :{this.state.item.transaction_id.reason}
//                         </Text>
//                       </View>
//                     ) : this.state.item.status === "PAYMENT" ? (
//                       !this.state.item.transaction_id.quantity_taken ? (
//                         <View>
//                           <TextInput
//                             type="text"
//                             onChangeText={this.handleQuantityTaken}
//                             placeholder="quantity taken from seller"
//                           />
//                           {this.state.reason ? (
//                             <TextInput
//                               onChangeText={this.handleReason}
//                               placeholder="If not taking full quantity, state the proper reason"
//                               value={this.state.reasonDesc}
//                             />
//                           ) : null}
//                           <Button
//                             title="submit"
//                             onPress={this.handleQuantityTakenSubmit}
//                           ></Button>
//                         </View>
//                       ) : !this.state.item.transaction_id.method ? (
//                         <View>
//                           <Text>Choose a payment Method</Text>
//                           <Text
//                             onPress={() => {
//                               this.handlePaymentMethod("COD");
//                             }}
//                           >
//                             Cash On Delivery
//                           </Text>
//                           <Text
//                             onPress={() => {
//                               this.handlePaymentMethod("ONLINE");
//                             }}
//                           >
//                             Online Methods
//                           </Text>
//                         </View>
//                       ) : this.state.item.transaction_id.method === "ONLINE" ? (
//                         <View>
//                           <Text onClick={this.handlePurchase}>
//                             Make Online Payment
//                           </Text>
//                         </View>
//                       ) : (
//                         <View>
//                           <Text>Cash On Delivery Payment Method Selected</Text>
//                         </View>
//                       )
//                     ) : (
//                       <View>
//                         <Text>Item Purchased</Text>
//                       </View>
//                     )}
//                   </View>
//                 ) : (
//                   <View>
//                     <Text>Here are all the items you purchased</Text>
//                     <View>
//                       {this.state.items ? (
//                         this.state.items.map((item) => {
//                           return (
//                             <View key={item._id}>
//                               <Text>category:{item.cat_id.name}</Text>
//                               <Text> subcategory:{item.sub_cat_id.name}</Text>
//                               <Text>
//                                 quantity:{item.quantity}
//                                 {item.sub_cat_id.quantity_type}
//                               </Text>
//                               <Button
//                                 title="details"
//                                 onPress={() => this.handleList(item)}
//                               />
//                             </View>
//                           );
//                         })
//                       ) : (
//                         <Text>No Items to display</Text>
//                       )}
//                     </View>
//                   </View>
//                 )}
//                 <View>
//                   <Text onPress={() => Actions.vendorNewsfeed()}>
//                     Purchase new Item
//                   </Text>
//                 </View>
//                 <View>
//                   <Text onPress={() => Actions.vendorNewWasteType()}>
//                     Request for new category or sub-category
//                   </Text>
//                 </View>
//               </View>
//             ) : (
//               <Text>Please Login First!</Text>
//             )}
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   token: state.vendorAuth.token,
//   vendor: state.vendorAuth.vendor,
//   isAuthenticated: state.vendorAuth.isAuthenticated,
//   error: state.error,
// });

// export default connect(mapStateToProps, { clearErrors })(ViewBuyedItem);
import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {clearErrors} from "../../actions/errorActions";
import VendorLogout from "./LogoutVendor";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {Actions} from "react-native-router-flux";
import {baseURL} from "../../config/constants.js";
import {EvilIcons, Ionicons} from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import Img from "../../assets/opener.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class ViewBuyedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            item: null,
            paymentInfo: null,
            msg: null,
            quantity_taken: null,
            reason: true,
            reasonDesc: null,
        };
        this.handleBack = this.handleBack.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
        this.handleQuantityTaken = this.handleQuantityTaken.bind(this);
        this.handleQuantityTakenSubmit = this.handleQuantityTakenSubmit.bind(this);
        this.handleReason = this.handleReason.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.isAuthenticated) {
                // Headers
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                axios
                    .get(
                        baseURL + "/vendor/" + this.props.vendor._id + "/viewBuyedItem",
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
        }, 500);
    }

    componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isAuthenticated) {
            this.props.history.push("/vendor/login");
        }
        if (this.state.paymentInfo) {
            console.log(this.instance);
            this.instance.submit();
        }
    }

    handleBack() {
        this.setState({
            item: null,
            msg: null,
        });
    }

    handleList(item) {
        this.setState({
            item,
            msg: null,
        });
    }

    handlePurchase() {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const body = JSON.stringify({
            vendor_id: this.props.vendor._id,
            item_id: this.state.item._id,
        });
        axios
            .post(baseURL + "/payment/", body, config)
            .then((response) => {
                this.setState({
                    paymentInfo: response.data,
                    msg: null,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handlePaymentMethod(method) {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const body = JSON.stringify({
            item_id: this.state.item._id,
            method,
        });
        axios
            .post(
                baseURL + "/vendor/" + this.props.vendor._id + "/paymentMethod",
                body,
                config
            )
            .then((response) => {
                this.setState({
                    msg: response.data.msg,
                });
                axios
                    .get(
                        baseURL + "/vendor/" + this.props.vendor._id + "/viewBuyedItem",
                        config
                    )
                    .then((response) => {
                        this.setState({
                            items: response.data,
                            item: null,
                        });
                        return;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

        console.log("payment method handled");
    }

    handleQuantityTaken = (quantity_taken) => {
        this.setState({quantity_taken});
        // if(this.state.item.quantity!==parseInt(quantity_taken,10)){
        //     this.setState({
        //         reason:true
        //     })
        // }else{
        //     this.setState({
        //         reason:false
        //     })
        // }
        console.log(quantity_taken);
        // console.log(reason)
    };

    handleQuantityTakenSubmit() {
        console.log("attempted to submit");
        var quantity_taken = parseInt(this.state.quantity_taken, 10);
        if (quantity_taken === null) {
            return;
        }
        if (quantity_taken > this.state.item.quantity) {
            return;
        }
        if (
            quantity_taken !== this.state.item.quantity &&
            (this.state.reasonDesc === null || this.state.reasonDesc === "")
        ) {
            return;
        }
        console.log("all clear");
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        var body;
        if (this.state.reason) {
            body = JSON.stringify({
                quantity_taken: quantity_taken,
                reason: this.state.reasonDesc,
                item_id: this.state.item._id,
            });
        } else {
            body = JSON.stringify({
                quantity_taken: quantity_taken,
                item_id: this.state.item._id,
            });
        }
        axios
            .post(
                baseURL + "/vendor/" + this.props.vendor._id + "/quantityTaken",
                body,
                config
            )
            .then((response) => {
                this.setState({
                    item: response.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleReason = (reasonDesc) => {
        this.setState({
            reasonDesc,
        });

        console.log(reasonDesc);
    };

    render() {
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
            <View>
                <Text/>
                <Text/>
                <Text/>
                {this.state.msg ? <Text>{this.state.msg}</Text> : null}
                {this.state.paymentInfo ? (
                    <View>
                        {/* <form ref={el=>{this.instance=el } } method='POST' action={this.state.paymentInfo.TXN_URL}>
                    {
                        //this.findFields()
                        Object.keys(this.state.paymentInfo).map(key=>{
                            return <input type='hidden' name={key} value={this.state.paymentInfo[key]} />
                        })
                    }
                </form> */}
                        <Text>Do not refresh. redirecting you to payment page</Text>
                    </View>
                ) : (
                    <View>
                        {this.props.isAuthenticated ? (
                            <View>
                                {this.state.item ? (
                                    <ScrollView>
                                        <KeyboardAvoidingView styles={styles.container} behavior="position" keyboardVerticalOffset={-550}>
                                            <TouchableOpacity
                                                style={styles.GoBackView}
                                                onPress={this.handleBack}
                                            >
                                                <EvilIcons name={"chevron-left"} size={27}/>
                                                <Text style={styles.GoBack}>Go Back</Text>
                                            </TouchableOpacity>


                                            <View style={{justifyContent: 'center'}}>
                                                <View style={styles.list}>
                                                    <View style={styles.LogoView}>
                                                        <Image source={Img} style={styles.LogoImg}/>
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

                                                {this.state.item.transaction_id.status ? (
                                                    <View>
                                                        <Text>the seller rejected the offer</Text>
                                                        <Text>
                                                            Reason :{this.state.item.transaction_id.reason}
                                                        </Text>
                                                    </View>
                                                ) : this.state.item.status === "PAYMENT" ? (
                                                    !this.state.item.transaction_id.quantity_taken ? (
                                                        <View style={{
                                                            alignItems: 'center',
                                                        }}>
                                                            <View style={{
                                                                width: '95%'
                                                            }}>
                                                                <TextInput
                                                                    type="text"
                                                                    onChangeText={this.handleQuantityTaken}
                                                                    placeholder="Quantity taken from seller"
                                                                    style={{
                                                                        borderRadius: 20,
                                                                        borderColor: "#5cc2f2",
                                                                        borderWidth: 0.5,
                                                                        alignItems: "flex-start",
                                                                        paddingLeft: 15,
                                                                        paddingVertical: 6,
                                                                    }}
                                                                />
                                                                {this.state.reason ? (
                                                                    <TextInput
                                                                        onChangeText={this.handleReason}
                                                                        placeholder="If not taking full quantity, state the proper reason"
                                                                        value={this.state.reasonDesc}
                                                                        style={{
                                                                            borderRadius: 20,
                                                                            borderColor: "#5cc2f2",
                                                                            borderWidth: 0.5,
                                                                            alignItems: "flex-start",
                                                                            paddingLeft: 15,
                                                                            paddingVertical: 6,
                                                                            marginBottom: 10,
                                                                            marginTop: 10
                                                                        }}
                                                                    />
                                                                ) : null}
                                                                <View style={{
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <TouchableOpacity
                                                                        onPress={this.handleQuantityTakenSubmit}
                                                                        style={{
                                                                            width: '50%'
                                                                        }}
                                                                    >
                                                                        <Text style={styles.BidForIt}>Submit</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>

                                                    ) : !this.state.item.transaction_id.method ? (
                                                        <View>
                                                            <Text>Choose a payment Method</Text>
                                                            <Text
                                                                onPress={() => {
                                                                    this.handlePaymentMethod("COD");
                                                                }}
                                                            >
                                                                Cash On Delivery
                                                            </Text>
                                                            <Text
                                                                onPress={() => {
                                                                    this.handlePaymentMethod("ONLINE");
                                                                }}
                                                            >
                                                                Online Methods
                                                            </Text>
                                                        </View>
                                                    ) : this.state.item.transaction_id.method === "ONLINE" ? (
                                                        <View>
                                                            <Text onClick={this.handlePurchase}>
                                                                Make Online Payment
                                                            </Text>
                                                        </View>
                                                    ) : (
                                                        <View>
                                                            <Text>Cash On Delivery Payment Method Selected</Text>
                                                        </View>
                                                    )
                                                ) : (
                                                    <View>
                                                        <Text>Item Purchased</Text>
                                                    </View>
                                                )}
                                            </View>
                                        </KeyboardAvoidingView>
                                    </ScrollView>
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
                                            Here are all the items you purchased
                                        </Text>
                                        <View>
                                            {this.state.items ? (
                                                <FlatList
                                                    data={this.state.items}
                                                    numColumns={2}
                                                    renderItem={({item}) => (
                                                        <TouchableWithoutFeedback>
                                                            <View style={styles.list1}>
                                                                <View style={styles.item1}>
                                                                    <Image source={Img} style={styles.LogoImg1}/>
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
                                                    keyExtractor={(item) => item._id}
                                                />
                                            ) : (
                                                <Text>No Items to display</Text>
                                            )}
                                        </View>
                                    </View>
                                )}
                                <View style={{
                                    alignItems: 'center',
                                    padding: 8,

                                }}>
                                    <Text style={{
                                        width: 200,
                                        backgroundColor: '#ebebed',
                                        textAlign: "center",
                                        padding: 8,
                                        borderRadius: 100,
                                        borderWidth: 0.01
                                    }} onPress={() => Actions.vendorNewsfeed()}>
                                        Purchase new Item
                                    </Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    padding: 1,

                                }}>
                                    <Text style={{
                                        width: 300,
                                        backgroundColor: '#ebebed',
                                        textAlign: "center",
                                        padding: 8,
                                        borderRadius: 100,
                                        borderWidth: 0.02
                                    }} onPress={() => Actions.vendorNewWasteType()}>
                                        Request for new category or sub-category
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <Text>Please Login First!</Text>
                        )}
                    </View>
                )}
            </View>
                </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.vendorAuth.token,
    vendor: state.vendorAuth.vendor,
    isAuthenticated: state.vendorAuth.isAuthenticated,
    error: state.error,
});

export default connect(mapStateToProps, {clearErrors})(ViewBuyedItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    list1: {
        flex: 1,
        justifyContent: 'center'
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
    list: {
        width: "100%",
        paddingTop: 10,
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
    GoBackView: {
        width: 100,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f7f8fa",
        paddingLeft: 10,
        paddingVertical: 7,
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
    BidForIt: {
        marginLeft: 10,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: "#5cc2f2",
        borderRadius: 15,
        textAlign: 'center',
        letterSpacing: 4
    },
});