import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog'
import { insertNewTodoList, TodoListSchema, TodoSchema } from '../realm/allSchemas'
import {todoProperties} from '../realm/propertiesInterface'
interface popupComponentRecivePropsType{
    id?:number,
}
const PopupDialogComponent = (props:popupComponentRecivePropsType) => {
    const [id,setId]=useState(0)
    const [name,setName]=useState("")
    const [isAddNew,setIsAddNew]=useState(true)
    const [dialogTitle, setDialogTitle]=useState("")
    const insertTodoHandler=():void=>{
       
        if(name.trim()==""){
            return alert('please write TodoList name')
        }else{

            let properties:todoProperties={
                id:Math.floor(Date.now()/1000),
                name:name,
                createionDate:new Date()
            }
            insertNewTodoList(properties).then()
            
        }
    }
    return (
        <PopupDialog
            dialogTitle={
                <DialogTitle
                    title={dialogTitle}
                    style={{width:0.7,height:180}}
                />
            }
        >
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    placeholder="Enter todoList name"
                    autoCorrect={false}
                    onChangeText={setName}
                    value={name}
                />
                <TouchableOpacity style={styles.button} onPress={insertTodoHandler} >
                    <Text style={styles.textLabel}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

        </PopupDialog>
    )
}

export default PopupDialogComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center'
    },
    textInput:{
        height:40,
        padding:10,
        margin:10,
        borderColor:'gray',
        borderWidth:1
    },
    button:{
        backgroundColor:'steelblue',
        padding:10,
        margin:10
    },
    textLabel:{
        color:'white',
        fontSize:18
    }
})
