import React, { Component } from 'react'
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import CallNowDatabase from '../src/Database/CallNowDatabase'
import CallNow from '../src/Models/CallNow'
import Card from '../src/components/Card'

export default class Cadastro extends Component {

  constructor(props) {
    super(props)
    this.state = {
      solicitante: "",
      telefone: "",
      categoria: "",
      objeto: "",
      descricao: "",
      status: "Em fila",
      lista: []
      

    }

    this.Listar()
  }

  

  // TIPO O CONTROLLER, MAS SEM O MVC
  Listar = () => {
    const banco = new CallNowDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }

  Cadastrar = (solicitante, telefone, categoria, item, descricao, status) => {
    const chamadoNovo = new CallNow(solicitante, telefone, categoria, item, descricao, status);
    const banco = new CallNowDatabase();
    banco.Inserir(chamadoNovo)
    this.Listar()
  }

  render() {
    return (
      
      <ScrollView style={estilo.bgcolor}>
        
        {/* Cadastro de chamadas */}
        <View style={estilo.linha1}>
          <Text style={estilo.titulo}>Iniciar novo chamado</Text>
          <TextInput placeholderTextColor={'#686868'} onChangeText={(valorDigitado) => { this.setState({ solicitante: valorDigitado }) }} placeholder='  Solicitante' style={estilo.entradasDeDados} />
          <TextInput placeholderTextColor={'#686868'} onChangeText={(valorDigitado) => { this.setState({ telefone: valorDigitado }) }} placeholder='  Telefone' style={estilo.entradasDeDados} />
          <TextInput placeholderTextColor={'#686868'} onChangeText={(valorDigitado) => { this.setState({ categoria: valorDigitado }) }} placeholder='  Categoria' style={estilo.entradasDeDados} />
          <TextInput placeholderTextColor={'#686868'} onChangeText={(valorDigitado) => { this.setState({ item: valorDigitado }) }} placeholder='  Item' style={estilo.entradasDeDados} />
          <TextInput placeholderTextColor={'#686868'} onChangeText={(valorDigitado) => { this.setState({ descricao: valorDigitado }) }} placeholder='  Descrição' style={estilo.entradasDeDados} />
          <View style={estilo.areaBotao}>
            <TouchableOpacity style={estilo.botao} onPress={() => this.Cadastrar(this.state.solicitante, this.state.telefone, this.state.categoria, this.state.item, this.state.descricao, this.state.status)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Submeter</Text>
            </TouchableOpacity>
          </View>
        </View>


        
      </ScrollView>



    )
  }

}

const
 estilo = StyleSheet.create({
  entradasDeDados: {
    borderRadius: 10,
    borderColor: '#fa2303',
    borderWidth: 2,
    margin: 15,
    height: 40, width: 300,
    textAlign: 'left',
    placeholderTextColor: 'black',

    
  },
  entradasDeDadosDescricao: {
    borderRadius: 5,
    borderColor: '#fa2303',
    borderWidth: 2,
    margin: 15,
    height: 100, width: 300,
    textAlign: 'left'
    
  
  },
  titulo: {
    fontSize: 25,
    margin: 5,
    marginTop: 20,
    color: 'black'
  },
  botao: {
    width: 150,
    backgroundColor: '#fa2303',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    margin: 5,
    color: 'white'
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  linha1: {
    alignItems: 'center',
    justifyContent: "center"
  },
  bgcolor: {
    backgroundColor: 'white'
  },

 
})