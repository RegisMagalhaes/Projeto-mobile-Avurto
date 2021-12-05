
import React, {Component} from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import api from './src/services/api';

//Função que renderizará o aplicativo na tela

export default class App extends Component{
  //construtor
  constructor(props) {
    super(props);
    this.state = {
      listaCursos: [],
    }
  }
  //Método que busca os cursos através da importação da API
  buscarCursos = async ()=> {
    const resposta = await api.get('/course');
    const dadosApi = resposta.data.data;
    this.setState({
      listaCursos:dadosApi
    });
  }

  componenentDidMount(){
    //realiza a chamada da api
    this.buscarCursos();
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>{'Cursos'.toUpperCase()}</Text>
        <View>
          <FlatList
          contentContainerStyle={styles.mainBodyConteudo}
          data={this.state.listaCursos}
          keyExtractor  = {(item) => item.nomeCurso}
          renderItem={this.renderizaItem}/>
        </View>
      </View>
    );
  }

}

renderizaItem = ({item}) => (
  <View style={styles.flatItemLinha}>
    <View style={styles.flatItemLinha}>
      <Text>{item.nomeCurso}</Text>
      <Text>{item.descrição}</Text>
      <Text>{item.dataCurso}</Text>
    </View>
  </View>
)
//Método que aplica a estilização à estrutura
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'gray',
    alignItems:'center',
    justifyContent: 'center',
  },

  // conteúdo da lista

  mainBodyConteudo:{
    paddingTop:30,
    paddingRight:50,
    paddingLeft:50
  },

  flatItemLinha:{
    flexDirection:'row',
    borderBottomWidth:0.9,
    borderBottomColor:'#red',
  },
});
