import React, { memo, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { queryAllTodoLists,updateTodoList,deleteTodoList, TODOLIST_SCHEMA,databaseOption, findNameTodoList} from "../realm/allSchemas";
import FlatListItem from './FlatListItem'
import HeaderComponent from "./HeaderComponent";
import PopupDialogComponent from "./PopupDialogComponent";
import Realm from '../realm/allSchemas'
import { TextInput } from "react-native-gesture-handler";
import { todoListProperties } from "../realm/propertiesInterface";

// import realmDB from '../realm/allSchemas'

const TodoListComponent = (props: any) => {
  
  const [todoList,setTodoList]=useState<todoListProperties[]>([])
  const [showForAdd,setShowForAdd]=useState(false)
  
 
  useEffect(() => {

    
    reloadTodoList()

    Realm.addListener('change',reloadTodoList)

    return()=>{
      Realm.removeListener('change',reloadTodoList)
    }
  }, [])
  
  const reloadTodoList= ()=>{
    console.log('리스트 로드')
    queryAllTodoLists().then((res:todoListProperties[])=>{
      
      setTodoList(res)  
      
    }).catch(err=>console.log(err))
  }

  const isvisible=()=>{
    setShowForAdd(!showForAdd)
  }
  const search=(t:string)=>{
    
    if(t===""){
      reloadTodoList()
    }else{
      findNameTodoList(t).then(res=>{
        setTodoList(res)
      })
    }
    
  }
  
    
  
  return (
    <View style={styles.container}>
      <HeaderComponent
        title={'Todo List'}
        isvisible={isvisible}
        todoList={todoList}
        setTodoList={setTodoList}
      />
      
      
      <Text>
        해야할일 {todoList.length}개
      </Text>

      <TextInput
        style={{ borderWidth:1,margin:10, width:'90%',height:30, paddingHorizontal:4,paddingVertical:2}}
        placeholder={'search todo'}
        onChangeText={(t)=>search(t)}

      />
  

      {todoList.length>0&&
        <FlatList
          style={styles.flatList}
          data={todoList}
          keyExtractor={(item:any)=>item._id}
          renderItem={({item,index})=><FlatListItem 
                                        key={item._id}
                                        item={item}
                                        itemIndex={index}
                                       
                                        
                                        />}
          
          
        />
      }
    
      <PopupDialogComponent isvisible={isvisible}  showForAdd={showForAdd} whatinsert={'todoList'} />
      
    </View>
  );
};

export default TodoListComponent

const styles = StyleSheet.create({
  container: {
    
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:'center',
    height:'100%'
    
    
  },
  flatList: {
    flex: 1,
    flexDirection: "column",
    width:'100%'
  },
});
