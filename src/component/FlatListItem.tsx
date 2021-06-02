import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { completeTodos, deleteTodoList, deleteTodos } from '../realm/allSchemas'
import {flatListProps, todoListProperties, todosProps} from '../realm/propertiesInterface'
import PopupDialogComponent from './PopupDialogComponent'

const FlatListItem = (props:flatListProps) => {
   
    console.log(props)
    const item:todoListProperties=(props.item as todoListProperties)
    
    const itemIndex=props.itemIndex
    //모달 띄우기
    const [showForAdd,setShowForAdd]=useState(false)
    const [insertVisible,setInsertVisible]=useState(false)

    //todos으로 띄울건지 분기처리용 state
    const [whatInsert,setWhatInsert]=useState('')
   
    const showDeleteConfirmation=(id:number|undefined):void=>{
        
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text:'No',onPress:()=>{
                        
                    },
                    style:'cancel'
                },
                {
                    text:'Yes', onPress:()=>{
                        deleteTodoList(item?._id)
                    }
                }
            ]
        );
    }

    //작은 todo 인서드 버튼 노출
    const showInsertTodosButton =()=>{
        setInsertVisible(!insertVisible)
        
    }
    //인서트 todos용 모달 띄우기
    const showInserTodos=()=>{
        console.log(item?.todos,"있는값")
        setWhatInsert('todos')
        setShowForAdd(true)
    }

    const deleteTodosHandler=(_id:number)=>{
        deleteTodos(_id)
    }
    const completeTodosHandler=(_id:number,index:number)=>{
        completeTodos(_id,index)
    }
    return (
        <>
        <Swipeout 
            right={[
                {
                    text:'Edit',
                    backgroundColor:'#5186e7',
                    onPress:()=> {
                        setWhatInsert('edit')
                        setShowForAdd(!showForAdd)
                    }
                },
                {
                    text:'Delete',
                    backgroundColor:'#d95040',
                    onPress:()=>showDeleteConfirmation(item?._id)
                }
            ]}
            autoClose={true}
            
        >
            
            <TouchableOpacity onPress={showInsertTodosButton} >
                
                <View style={{backgroundColor:itemIndex%2==0?'powderblue':'skyblue'}} >
                    <Text style={{fontWeight:'bold',fontSize:18,margin:10}}>
                        {item?.name}
                    </Text>
                    <Text numberOfLines={2} style={{fontWeight:'bold',fontSize:18,margin:10}}>
                        {item?.creationDate?.toLocaleDateString()}, {item?.creationDate?.toLocaleTimeString()}
                    </Text>
                </View>
            </TouchableOpacity>
            
         </Swipeout>
         {
             insertVisible&&
             <>
                {
                    item.todos.length>0&&
                    item.todos.map((value:todosProps,index:number)=>{
                        return(
                            <View key={value._id}>
                            <View style={{width:'100%',alignItems:'center',alignSelf:'flex-end',backgroundColor:itemIndex%2===0?'powderblue':'skyblue',borderColor:'white',borderTopWidth:3,borderBottomWidth:3, minHeight:30,justifyContent:'center'}}>
                                <Text>
                                    {value.name}
                                </Text>
                                <Text>
                                    {value.done?'완료':'미완료'}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',width:'100%',height:30,justifyContent:'space-around',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>deleteTodosHandler(item._id)} style={{width:'50%',backgroundColor:'#e34066',alignSelf:'center',height:"100%",justifyContent:'center',alignItems:'center'}} > 
                                    <Text style={{color:'white',fontWeight:'bold'}} >
                                        지우기
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>completeTodosHandler(item._id,index)} style={{width:'50%',backgroundColor:'#5b40e3',alignSelf:'center',height:"100%",justifyContent:'center',alignItems:'center'}} > 
                                    <Text style={{color:'white',fontWeight:'bold'}} >
                                        완료
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        )
                    })
                }   
                <TouchableOpacity onPress={showInserTodos} style={[styles.littleList,{backgroundColor:itemIndex%2===0?"powderblue":'skyblue'}] }>
                    <Text  style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>
                        insert
                    </Text>
                </TouchableOpacity>
            </>
                  
         }
       

         <PopupDialogComponent
            showForAdd={showForAdd}
            isvisible={()=> setShowForAdd(!showForAdd)}
            id={item?._id}
            whatinsert={whatInsert}
            
         />

         </>
    )
}

export default FlatListItem

const styles = StyleSheet.create({
    littleList:{
        alignSelf:'flex-end',
        width:'100%',
        alignItems:'flex-end',
        minHeight:30,
        justifyContent:'center'
        
        
        
        
    }
})
