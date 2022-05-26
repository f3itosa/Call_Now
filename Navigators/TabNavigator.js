import React, { Component } from 'react'
import Cadastro from '../Screens/Cadastro'
import Lista from '../Screens/Lista'

import EIcon from 'react-native-vector-icons/Ionicons';



import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default class TabNavigator extends Component {
    render() {
    return(
        <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: '#fa2303',  }} >
            	
        
            <Tab.Screen component={Cadastro}
             options={{ tabBarIcon: ({color, size })=> (<Icon name ="add" color={color} size={35} /> )}} name="Iniciar novo chamado"/>


            <Tab.Screen style={{color: 'red'}} component={Lista}
            options={{ tabBarIcon: ({color, size })=> (<Icon name ="ios-call-sharp" color={color} size={25} /> )}} name="Ver chamados abertos"/>



        </Tab.Navigator>
    )
    }
}