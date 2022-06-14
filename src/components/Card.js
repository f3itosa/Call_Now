
import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {Button, } from 'react-native-paper'


import CallNowDatabase from '../Database/CallNowDatabase'



export default class Card extends Component {

// hello
  Remover = (id) => {
    const banco = new CallNowDatabase();
    banco.Remover(id)
    this.Listar()
  }


  Atualizar = (item) => {
    const banco = new CallNowDatabase();
    banco.Atualizar(item)
    this.Listar()
  }

  render() {

    isConcluid = () => {
      this.props.assumir(this.props.item)
      console.log("Botão pressionado")
  }
    return (

      <View>
        <View style={estilo.inputbg}>
          <View style={estilo.resultado}>
        
            <Text style={estilo.input}>Solicitante:  {this.props.solicitante}</Text>
            <Text style={estilo.input}>Telefone:  {this.props.telefone}</Text>
            <Text style={estilo.input}>Categoria:  {this.props.categoria}</Text>
            <Text style={estilo.input}>Item:  {this.props.objeto}</Text>
            <Text style={estilo.input}>Status:  {this.props.status}</Text>
            <Text style={estilo.input}>descrição:  {this.props.descricao}</Text>
          </View>
        </View>



        <View style={estilo.areaBotao}>
        

          <Button mode="contained"  style={estilo.botao} onPress={() => this.props.assumir(this.props.item)} >
            Resolver 
          </Button>



          <Button mode="contained"  style={estilo.botao} onPress={() => this.props.deletar(this.props.id)} >
            Apagar 
          </Button>



        </View>
      </View>

    )
  }
}

const estilo = StyleSheet.create({

  botao: {
    width: 140,
    height: 45,
    backgroundColor: '#fa2303',
    //alignItems: 'center',
    //justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: 'white'
  },
  titulo: {
    fontSize: 18,
    margin: 5,
    

  },

  botao2: {
    width: 100,
    backgroundColor: '#fa2303',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: 'white'
  },

  inputbg: {
    backgroundColor: '#ffffff',
    width: 320,
    borderRadius: 10,
    marginBottom: 5,
    height: 170,
    marginTop: 5,
    margin: 2,
    borderColor: '#fa2303',
    borderWidth: 2,
  },

  input: {
    margin: 5,
    marginTop: 2,
    

  },

  resultado: {
    marginTop:10,
    marginBottom:10,
    margin: 9 
  },

  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  }
})