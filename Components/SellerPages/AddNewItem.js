import { Text,Picker,TextInput, View, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';;
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import { Actions } from 'react-native-router-flux';
import SellerLogout from './LogoutSeller';
import {baseURL} from '../../config/constants.js';
import axios from 'axios';

class ItemForm extends Component
{
    // Adding a constructor for props
    constructor(props)
    {
        super(props);
        // stating the initial values
        this.state={
            category_id:null,
            subcat_id:null,
            quantity:null,
            quantity_type:null,
            formIsValid:false,
            categories:null,
            subcategories:null
        }
        this.handleCategory=this.handleCategory.bind(this);
        this.handleQuantity=this.handleQuantity.bind(this);
        this.handleSubcategory=this.handleSubcategory.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
        // checking for authentication
        if(this.props.isAuthenticated){
            // asking for HTTP requests
            axios.get(baseURL+'/categories')
                .then((response)=>{
                    this.setState({
                        categories:response.data
                    });
                    if(this.state.categories && this.state.categories.length){
                        axios.get(baseURL+'/categories/'+this.state.categories[0].key+'/subcat')
                            .then((response2)=>{
                                this.setState({
                                    subcategories:response2.data,
                                    category_id:this.state.categories[0].key,
                                    subcat_id:response2.data[0].key
                                })
                            })
                            // and catching errors (if any)
                            .catch((error)=>{
                                console.log(error);
                            })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }

    componentDidUpdate()
    {
        // after a component is updated
        if(!this.props.isAuthenticated){
            // redux
            Actions.sellerLogin();
        }
    }

    // handleCategory === for choosing the category of the items posted by the vendor
    handleCategory(){
        let curid=this.state.category_id;
        axios.get(baseURL+'/categories/'+curid+'/subcat')
            .then((response)=>{
                if(response.data&&response.data.length){
                    this.setState({
                        subcategories:response.data ,
                        category_id:curid,
                        subcat_id:response.data[0].key
                    });
                }else{
                    this.setState({
                        subcategories:response.data ,
                        category_id:curid,
                        subcat_id:null
                    });
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    // handleSubcategory === for choosing the Subcategory under the category
    handleSubcategory(){
        let curid=this.state.subcat_id;
        this.setState({
            subcat_id:curid,
        });
        
    }
    
    // handleQuantity === for writing the quantity wanted by the seller 
    handleQuantity(event){
        this.setState({
            quantity:event.target.value
        });
    }
    
    // submitHandler === for submitting the response
    submitHandler(event){
        event.preventDefault();
        if(this.props.isAuthenticated){
            // Headers
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const item =JSON.stringify ({
                cust_id:this.props.seller._id,
                cat_id:this.state.category_id,
                sub_cat_id:this.state.subcat_id,
                quantity:this.state.quantity
            })
            console.log(item)
            axios.post( baseURL+'/seller/' + this.props.seller._id + '/items', item ,config)
            .then(res => {
                console.log("Item added to the selling list")
            })
            .catch(e=>{
                console.log("item add request failed.retry later")
            });
        }
    }
    
    
    render()
    {
        return (
        <ScrollView>
            <View>
                <Text/><Text/><Text/><Text/>
              {this.props.isAuthenticated ? (
                <View>
                    <SellerLogout/>
            {
                this.state.categories ? (
                <View >
                    <Picker 
                     selectedValue={this.state.category_id} 
                     onValueChange={(itemValue, itemIndex) => this.setState({category_id: itemValue})}>
                        {
                            this.state.categories.map(category=>{
                                return(
                                    <Picker.Item label={category.name} value={category.id} key={category.name}/>
                                    );
                                })
                            }
                    </Picker>
                    <Button title="Click Here To Get Picker Selected Value" onPress={ this.handleCategory } />
                    {
                        this.state.subcategories ?(
                            <Picker 
                            onValueChange={(itemValue, itemIndex) => this.setState({subcat_id: itemValue})} 
                            selectedValue={this.state.subcat_id}>
                                {
                                    this.state.subcategories.map(subcategory=>{
                                        return(
                                            <Picker.Item label={subcategory.name} value={subcategory.id} key={subcategory.name}/>);
                                        })
                                    }
                        </Picker>)
                            :<Text>No sub-category</Text>
                        }
                    <View>
                        <Text style = {styles.Quantity}>Quantity:</Text>
                        <TextInput
                                style = {styles.input}
                                underlineColorAndroid = "transparent"
                                placeholder = "Quantity"
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"
                                keyboardType = 'numeric'
                                value={this.state.quantity}
                                onChangeText={(quantity) => this.setState({ quantity })}
                                />
                    </View>

                    <TouchableOpacity  style = {styles.addItem1} onPress={this.submitHandler} ><Text style = {styles.textColor}>Add new item</Text></TouchableOpacity>
                </View> ) : (<Text>Sorry No vendor available</Text>)
            }
                <View>
                <TouchableOpacity style = {styles.addItem1} onPress={() => Actions.sellerItems()}>
                    <Text style = {styles.textColor}>View All the sold items by you</Text>
                    </TouchableOpacity>
                </View>
            </View>
            ) : (
                <Text>Please Login First!</Text>
              )}
            </View>
            </ScrollView>
        );
    }
};

const mapStateToProps = state => ({
    token:state.sellerAuth.token,
    seller:state.sellerAuth.seller,
    isAuthenticated: state.sellerAuth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { clearErrors }
    )(ItemForm);
    const styles = StyleSheet.create({
        container : {
        flex : 1,
        backgroundColor : 'white',
    },
    input: {
        marginLeft: 15,
        marginRight : 15,
        marginTop : 5,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        backgroundColor : 'white',
        paddingLeft : 10,
        marginBottom : 20,
        borderRadius : 10,
        marginTop : 10,
    },
    addItem : {
        borderWidth : 1,
        width : 325,
        backgroundColor : '#5cc2f2',
        borderColor : '#5cc2f2',
        textAlign : 'center',
        padding : 15,
        paddingLeft : 95,
        margin : 10,
        borderRadius : 8,
        marginLeft : 37,
    },
    addItem1 : {
        borderWidth : 1,
        width : 325,
        backgroundColor : '#5cc2f2',
        borderColor : '#5cc2f2',
        textAlign : 'center',
        padding : 15,
        // paddingLeft : 30,
        margin : 10,
        borderRadius : 8,
        // marginLeft : 37,
    },
    textColor : {
        color : 'black',
        fontSize : 20
    },
    
    Quantity : {
        marginLeft : 15,
        fontSize : 20,
        marginBottom : 1,
        marginTop : 10,
    },
    edits2: {
        padding: 10,
        color: "#333",
    },
});
