import React, { useState } from 'react'
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { deleteAllTodoList } from '../realm/allSchemas'
import { headerComponentProps } from '../realm/propertiesInterface'



const HeaderComponent = (props:headerComponentProps) => {
    const [sort,setSort]=useState('asc')
    const {todoList,setTodoList,title,isvisible}=props
    const deleteAll=()=>{
        Alert.alert(
            "DeleteAllTodoList",
            "정말 리스트를 다 지우시겠습니까?",
            [
                {
                    text:'YES',
                    style:'default',
                    onPress:()=>{
                        deleteAllTodoList().then().catch(err=>{
                            console.log(err)
                        })
                    }
                },
                {
                    text:'NO',
                    style:'cancel'
                }
            ]
        )
    }
    
    
    const sorting=()=>{
        if(sort==='asc'){
            setSort('desc')
            
            setTodoList( [...todoList].sort((a:any,b:any)=>b._id-a._id) )
            
        }else{
            setSort('asc')
            setTodoList( [...todoList].sort((a:any,b:any)=>a._id-b._id) )
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                {title}
            </Text>
            <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end'}}>
                <TouchableOpacity style={styles.addButton}  onPress={()=>isvisible()} >
                    <Image style={styles.addButtonImage} source={require('../image/add-icon.png')}  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={sorting} >
                    {
                        sort==='asc'?
                        <Image  style={styles.addButtonImage} source={require('../image/sort-asc-icon.png')} />
                        :
                        <Image style={styles.addButtonImage} source={require('../image/sort-desc-icon.png')}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={deleteAll} >
                    <Image style={styles.addButtonImage} source={require('../image/delete-icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({

    container:{
        width:'100%',
        flexDirection:`column`,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#e05d90',
        height:120,
        paddingBottom:10,
        paddingVertical:5
        
    },
    titleText:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        position:'absolute',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        bottom:0,
        left:0,
        padding:50
    },
    addButton:{
        zIndex:9999,
        marginRight:10,
        marginTop:30,
        flexDirection:'row'
        
        
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white'
    }
})
