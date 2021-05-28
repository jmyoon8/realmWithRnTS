import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TodoListComponent from "./src/component/TodoListComponent";
//https://www.youtube.com/watch?v=2sI64vaHF98&t=115s realm 튜토리얼
import Realm from 'realm';

export default function App() {
  
  Realm.open({}).then((realm) => {
    console.log('Realm is located at: ' + realm.path);
    console.log(`default path : ${Realm.defaultPath}`)
  });
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
