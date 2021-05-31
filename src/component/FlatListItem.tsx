import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import {flatListProps} from '../realm/propertiesInterface'

const FlatListItem = (props:flatListProps) => {
   
  
    const item=props.item
    
    const onPressItem=props.onPressItem
    const itemIndex=props.itemIndex
    
    const showDeleteConfirmation=(id:number|undefined):void=>{
        
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text:'No',onPress:()=>{},
                    style:'cancel'
                },
                {
                    text:'Yes', onPress:()=>{

                    }
                }
            ]
        );
    }
    const showEditModal =():void=>{
          
    }
    return (
        <Swipeout 
            right={[
                {
                    text:'Edit',
                    backgroundColor:'#5186e7',
                    onPress:showEditModal
                },
                {
                    text:'Delete',
                    backgroundColor:'#d95040',
                    onPress:()=>showDeleteConfirmation(item?._id)
                }
            ]}
            autoClose={true}
        >
            <TouchableOpacity onPress={onPressItem} >
                <View style={{backgroundColor:itemIndex%2==0?'powderblue':'skyblue'}} >
                    <Text style={{fontWeight:'bold',fontSize:18,margin:10}}>
                        {item?.name}
                    </Text>
                    <Text numberOfLines={2} style={{fontWeight:'bold',fontSize:18,margin:10}}>
                        {item?.creationDate?.toLocaleDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    )
}

export default FlatListItem

const styles = StyleSheet.create({})
