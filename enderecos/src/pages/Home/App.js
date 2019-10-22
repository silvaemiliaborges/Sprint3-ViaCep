import React, { Component } from 'react';
import '../Home/App.css';


import { Link } from "react-router-dom";
import Rodape from '../../components/Rodape/Rodape';
import Axios from 'axios';



class App extends Component {
  constructor() {
    super();
    this.state = {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      unidade: '',
      ibge: '',
      gia: '',
      erro: ""

    };
  }

  armazenarCep = (event) => {
    this.setState({ cep: event.target.value })
  }

  buscarPorCep = (event) => {
    event.preventDefault();

    Axios.get('http://viacep.com.br/ws/' + this.state.cep + '/json/')

      .then(response => {
        if (response.status === 200) {
          //console.log(response.data.logradouro)
          // this.props.history.push('/viacep');
          this.setState({
            cep: this.state.cep,
            logradouro: response.data.logradouro,
            complemento: response.data.complemento,
            bairro: response.data.bairro,
            localidade: response.data.localidade,
            uf: response.data.uf,
            unidade: response.data.unidade,
            ibge: response.data.ibge,
            gia: response.data.gia,
          })
          console.log(this.state)
        } else {
          console.log("Erro")
        }
      })
      .catch(erro => {
        this.setState({ erro: "CEP Não Encontrado" });
        console.log(erro);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{ textAlign: "center" }} >Enderecos</h1>

          <div className="item">
            <input
              placeholder="CEP"
              type="text"
              name="CEP"
              onChange={this.armazenarCep}
              value={this.state.cep}
            />
            <button onClick={this.buscarPorCep}>Enviar</button>
            <p
              style={{ color: "red", textAlign: "center" }}
            >
              {this.state.erro}
            </p>
          </div>
          <br>
          </br>
          <div className="container" id="conteudoPrincipal-lista" 
          style={{textAlign: 'right' }}>
            <h5>CEP : {this.state.cep}</h5>
            <h5>Logradouro : {this.state.logradouro}</h5>
            <h5>Complemento : {this.state.complemento}</h5>
            <h5>Bairro : {this.state.bairro}</h5>
            <h5>Localidade : {this.state.localidade}</h5>
            <h5>UF : {this.state.uf}</h5>
            <h5>Unidade : {this.state.unidade}</h5>
            <h5>IBGE : {this.state.ibge}</h5>
            <h5>GIA : {this.state.gia}</h5>
 
          </div>          
        </header>
        {/* <Rodape /> */ }
      </div >
    );
  }
}

export default App;