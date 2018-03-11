import React, { Component, PropTypes } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import theme from '../src/material_ui_raw_theme_file'
import Header from '../components/Header';
import MusicList from '../components/MusicList';
import musicBuilder from '../services/music-builder'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: []
    }

    this.loadMusics('');
  }

  loadMusics = (term) => {
    setTimeout(() => {
      //TODO: get dataq from api
      var musicList = [{
        id: '1',
        name: 'Faz chover',
        lyrics: 'Assim como a corsa\nAnseia por água',
        youtube: 'https://www.youtube.com/watch?v=f097WHc7h3g',
        hasTransparency: true,
        times: 15
      },
      {
        id: '2',
        name: 'Fico feliz',
        lyrics: 'Fico feliz em vir em Sua casa\nErguer minhas mãos e cantar, Aleluia!',
        youtube: 'https://www.youtube.com/watch?v=4P-kQrmj6k8',
        hasTransparency: false,
        times: 5
      }]

      this.setState({
        musics: musicList,
        filteredMusic: musicList
      });
    }, 500);
  }

  addMusic = (music) => {
    this.setState({
      musics: this.state.musics.concat(
        Object.assign({},
          musicBuilder(music),
          { id: this.state.musics.length + 1 })
      )
    })
  }

  editMusic = (music) => {
    this.setState({
      musics: this.state.musics.map(item =>
        item.id === music.id
          ? Object.assign({}, item, musicBuilder(music))
          : item)
    })
  }

  filterMusicList = (term) => {
    console.log(term)
    const lowerTerm = (term || '').toLowerCase()

    this.setState({
      filteredMusic: this.state.musics.filter(music =>
        (music.name || '').toLowerCase().indexOf(lowerTerm) > -1 
        || (music.lyrics || '').toLowerCase().indexOf(lowerTerm) > -1)
    })
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header onSave={this.addMusic} onSearch={this.filterMusicList} />
            <MusicList musics={this.state.filteredMusic || []} onSave={this.editMusic} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
