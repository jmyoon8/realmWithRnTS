import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { headerComponentProps } from '../realm/propertiesInterface'



const HeaderComponent = (props:headerComponentProps) => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton}  onPress={()=>props.isvisible()} >
                <Image style={styles.addButtonImage} source={require('../image/add-icon.png')}  />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({

    container:{
        width:'100%',
        flexDirection:`row`,
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'#e05d90',
        height:Platform.OS===`ios`?100:80,
        paddingBottom:10
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
        
        
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white'
    }
})
