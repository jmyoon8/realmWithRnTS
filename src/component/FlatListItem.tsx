import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Swipeout from 'react-native-swipeout'

interface FlatListProps{
    item?:any,
    itemIndex?:number,
    popupDialogComponent?:any,
    onPressItem?:any
}
const FlatListItem = (props:FlatListProps) => {
   
    const { item:{id,name,createDate},onPressItem,itemIndex ,popupDialogComponent }=props
    

    const showDeleteConfirmation=(id:number):void=>{
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
                    onPress:()=>showDeleteConfirmation(id)
                }
            ]}
            autoClose={true}
        >

        </Swipeout>
    )
}

export default FlatListItem

const styles = StyleSheet.create({})
