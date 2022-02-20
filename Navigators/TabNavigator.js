import React, { Component } from 'react'
import Cadastro from '../Screens/Cadastro'
import Lista from '../Screens/Lista'

import EIcon from 'react-native-vector-icons/Ionicons';
import BIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Feather';


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default class TabNavigator extends Component {
    render() {
    return(
        <Tab.Navigator screenOptions={{headerShown: false, tabBaricon:({ focused, color, size }) => {
            let iconName; 
        
            if (route.name === "Cadastro") {
              iconName = focused
              ? 'add'
              : 'add-outline'
            }else if (route.name === "Lista"){
              iconName = focused 
              ? 'phone-forwarded'
              :'phone-forwarded-outline'
        
              return <Icon name={iconName} size={size} color={color} />
            }
            tabBarActiveTintColor: '#fa2303'
        
          }  }} >

            <Tab.Screen  component={Cadastro} name="Iniciar novo chamado"/>
            <Tab.Screen component={Lista} name="Ver chamados abertos"/>
        </Tab.Navigator>
    )
    }
}