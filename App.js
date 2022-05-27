import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './Navigators/TabNavigator';
import { Notification } from './src/NotificationManager'

const Tab = createBottomTabNavigator();

import EIcon from 'react-native-vector-icons/Ionicons';
import BIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Feather';

import { createStackNavigator } from '@react-navigation/stack';


import Lista from './Screens/Lista';

import Logo from './Icons/Logo';

import { View } from 'react-native';
import Cadastro from './Screens/Cadastro';


const notificador = Notification;

const Stack = createStackNavigator();


export default class App extends Component {



  componentDidMount() {
    //notificador.configure();
    notificador.createChannel();
    notificador.agendarNotificacoes();

  }


  //criar notificacao
  /*mandarNotificacao = () => {
    notificador.showNotification(
      1,
      "#",
      "#",
      {}, // data
      {} // options
    )

   
  }*/



  cancelar = () => {
    notificador.cancelAllLocalNotification()
  }






  render() {
    return (

      <>
        <Logo />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
        
      </>
    )
  }
}

/*creenOptions={({route}) => ({
  tabBaricon: ({ focused, color, size }) => {
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
     // tabBarActiveTintColor: '#fa2303' ////

  }
})
}*/
