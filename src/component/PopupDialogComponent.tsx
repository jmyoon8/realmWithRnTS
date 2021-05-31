import React, {  memo, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog'
import { insertNewTodoList, TodoListSchema, TodoSchema } from '../realm/allSchemas'
import {popupComponentRecivePropsType, todoProperties} from '../realm/propertiesInterface'



const PopupDialogComponent = (props:popupComponentRecivePropsType)=> {
    
 
    const [name,setName]=useState("")

    const insertTodoHandler=():void=>{
        if(name.trim()==""){
            return alert('please write TodoList name')
        }else{
            let newTodoList:todoProperties={
                _id:Math.floor(Date.now()/1000),
                name:name,
                creationDate:new Date()
            }
            console.log(newTodoList)
            
            insertNewTodoList(newTodoList).then(res=>{
                console.log(res,"인서트")
                props.isvisible()
            }).catch(err=>{
                alert(`error 에러남 ㅡㅡ ${err}`)
            })
        }
    }
    
    const cancel =()=>{
        props.isvisible()
    }
    return (
        <PopupDialog
          
            dialogTitle={
                <DialogTitle
                    title={'Add a new TodoList'}
                />
            }
            visible={props.showForAdd}
            
        >
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    placeholder="Enter todoList name"
                    autoCorrect={false}
                    onChangeText={setName}
                    value={name}
                />
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.button} onPress={insertTodoHandler} >
                        <Text style={styles.textLabel}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={cancel} > 
                        <Text style={styles.textLabel} >Cancel</Text>
                    </TouchableOpacity>
                </View>
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
