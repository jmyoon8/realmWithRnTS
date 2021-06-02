import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TodoListComponent from "./src/component/TodoListComponent";
import Realm from 'realm'
//https://www.youtube.com/watch?v=2sI64vaHF98&t=115s realm 튜토리얼


export default function App() {
  Realm.open({}).then(realm=>{
    console.log(realm.path)
    
  })
 
  return (
    <SafeAreaView>
      <TodoListComponent/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
