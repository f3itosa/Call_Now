import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, button, ScrollView } from 'react-native'


import CallNowDatabase from '../src/Database/CallNowDatabase'
import Card from '../src/components/Card'
import CallNow from '../src/Models/CallNow'




export default class Lista extends Component {

  constructor(props) {
    super(props)
    this.state = {
      solicitante: "",
      telefone: "",
      categoria: "",
      objeto: "",
      descricao: "",
      status: "",
      lista: []


    }

    this.Listar()
  }


  /*trocaSituacao = () => {
       if (this.state.situacao === 0){
         this.setState({status: "Em andamento"})
         this.setState({situacao: 1})
       }else if (this.state.situacao === 1){
         this.setState({ status: "Resolvido"})
         this.setState({situacao: 2 })
       }
       this.Atualizar
}

trocaSituacao= (item) => {
   const banco = new CallNowDatabase();
   banco.trocaSituacao(item)
   this.Listar()
   this.Atualizar(item)
   
 }*/

  Atualizar = (item) => {
    const banco = new CallNowDatabase();
    banco.Atualizar(item)
    this.Listar()
  }

  // TIPO O CONTROLLER, MAS SEM O MVC oficial
  Listar = () => {
    const banco = new CallNowDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }



  /*trocaSituacao = (item) => {
     const banco = new CallNowDatabase();
     banco.trocaSituacao(item)
     this.Listar()
   }*/

  Remover = (id) => {
    const banco = new CallNowDatabase();
    banco.Remover(id)
    this.Listar()
  }

  isConcluid = () => {
    this.props.assumir(this.props.item)
    console.log("Botão pressionado")
  }


  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>

        <View style={estilo.linha1}>
          <Text style={estilo.titulo}>Chamados abertos </Text>
          {
            this.state.lista.map(
              item => (
                <Card
                  key={item.id}
                  item={item}
                  id={item.id}
                  solicitante={item.solicitante}
                  telefone={item.telefone}
                  categoria={item.categoria}
                  objeto={item.objeto} /*Vai ter que mudar o nome desse state, o app vai confundir qual [e pra chamar e vai dar erro*/
                  descricao={item.descricao}
                  status={item.status}
                  assumir={this.Atualizar}
                  deletar={this.Remover} // Aqui tem que colocar a funcao Remover, era pra estar nessa tela e náo na outra
                />
              )
            )
          }
        </View>
      </ScrollView>

    )

  }
}

const estilo = StyleSheet.create({

  titulo: {
    fontSize: 25,
    margin: 5,
    color: 'black',
    marginTop: 20
  },

  linha1: {
    alignItems: 'center',
    justifyContent: "center"
  },



})

