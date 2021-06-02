import React, {  memo, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { insertNewTodoList, insertTodos2TodosList, TodoListSchema, TodoSchema, updateTodoList } from '../realm/allSchemas'
import {popupComponentRecivePropsType, todoListProperties,todosProps } from '../realm/propertiesInterface'
import Modal from 'react-native-modal'


const PopupDialogComponent = (props:popupComponentRecivePropsType)=> {
    
    
    const [name,setName]=useState("")

    const insertTodoHandler=():void=>{

        if(name.trim()==""){
            return alert('please write TodoList name')
        }else{
            let newTodoList:todoListProperties={
                _id:Math.floor(Date.now()/1000),
                name:name,
                creationDate:new Date()
            }
            //todos입력할떄
            if(props.whatinsert==="todos"){

                let todosProps:todosProps={
                    _id:Math.floor(Date.now()/1000),
                    name:name,
                    done:false
                }
                insertTodos2TodosList(props.id,todosProps).then(res=>{
                    console.log(res,"인서트 성공")
                    props.isvisible()
                    setName("")
                }).catch(err=>{
                    console.log(err)
                })
                console.log('asd')
            }else if(props.whatinsert==="todoList"){
                insertNewTodoList(newTodoList).then(res=>{
                    console.log(res,"인서트")
                    props.isvisible()
                    setName("")
                }).catch(err=>{
                    alert(`error 에러남 ㅡㅡ ${err}`)
                })
            }else if(props.whatinsert==="edit"){
                    //아이디가 있으면 에딧
                    let updateTodoListProps:todoListProperties={
                        _id:props.id,
                        name:name,
                    }

                    updateTodoList(updateTodoListProps).then().catch(err=>{
                        console.log(err)
                    })

                    setName("")
                    props.isvisible()
            }
         

        }
    }
    
    const cancel =()=>{
        props.isvisible()
    }
    return (
        <Modal
            isVisible={props.showForAdd}
            style={{alignItems:'center'}}
        >

            <View style={styles.container}>
                <Text style={{alignSelf:'center',marginBottom:10}} >
                    Insert todoList
                </Text>
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

        </Modal>
    )
}

export default  PopupDialogComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        width:'80%',
        height:200,
        backgroundColor:'#fff',
        borderRadius:20

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
