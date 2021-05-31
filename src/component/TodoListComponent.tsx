import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { queryAllTodoLists,updateTodoList,deleteTodoList} from "../realm/allSchemas";
import FlatListItem from './FlatListItem'
import HeaderComponent from "./HeaderComponent";
import PopupDialogComponent from "./PopupDialogComponent";
import realm from '../realm/allSchemas'

const TodoListComponent = (props: any) => {
  const [todoList,setTodoList]=useState([])
  const [showForAdd,setShowForAdd]=useState(false)
  
  
  useEffect(() => {
    
    reloadTodoList()

    realm.addListener('change',()=>{
      reloadTodoList()
    })
    return ()=>realm.removeAllListeners()
  }, [])

  const reloadTodoList=()=>{
    queryAllTodoLists().then((res:any)=>{
      console.log(res)
      // setTodoList(res)
    }).catch(err=>{
      console.log(`불러오기 실패 ${err}`)
      setTodoList([])
    })
  }
  const isvisible=()=>{
    setShowForAdd(!showForAdd)
    
  }
  return (
    <View style={styles.container}>

     
      <HeaderComponent
        title={'Todo List'}
        isvisible={isvisible}
      />
      {todoList.length>0&&
        <FlatList
          style={styles.flatList}
          data={todoList}
          keyExtractor={(item:any)=>item.id}
          renderItem={({item,index})=><FlatListItem 
                                        item={item}
                                        itemIndex={index}
                                        key={item._id}
                                        onPressItem={()=>{
                                          alert('press this item')
                                        }}
                                        
                                        />}
          
          
        />
      }
      <PopupDialogComponent isvisible={isvisible}  showForAdd={showForAdd} />
      
    </View>
  );
};

export default TodoListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:'center',
    
    
  },
  flatList: {
    flex: 1,
    flexDirection: "column",
  },
});
