import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { queryAllTodoLists,updateTodoList,deleteTodoList} from "../realm/allSchemas";
import FlatListItem from './FlatListItem'
import PopupDialogComponent from "./PopupDialogComponent";
const TodoListComponent = (props: any) => {
  const [todoList,setTodoList]=useState([])

  useEffect(() => {

    queryAllTodoLists().then((res:any)=>{
      console.log(res)
      setTodoList(res)
      console.log('ddd?')
    }).catch(err=>{
      setTodoList([])
      console.log(err)
    })

  }, [])

  const reloadTodoList=()=>{
    queryAllTodoLists().then((res:any)=>{
      setTodoList(res)
    }).catch(err=>setTodoList([]))
  }

  return (
    <View style={styles.container}>
      <Text>TodoList</Text>
      <FlatList
        style={styles.flatList}
        data={todoList}
        keyExtractor={(item:any)=>item.id}
        renderItem={({item,index})=><FlatListItem 
                                      item={item}
                                      itemIndex={index}
                                      key={item.id}
                                      popupDialogComponent={<PopupDialogComponent/>}
                                      onPressItem={()=>{
                                        alert('press this item')
                                      }}
                                      
                                      />}
        
        
      />

      
    </View>
  );
};

export default TodoListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:'center'
  },
  flatList: {
    flex: 1,
    flexDirection: "column",
  },
});
