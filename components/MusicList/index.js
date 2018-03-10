import React, { PropTypes } from "react"
import { withStyles } from 'material-ui/styles'
import MusicItem from './MusicItem'

const styles = theme => ({
    list: {
      padding: 30,
      paddingTop: 0
    }
  })

const MusicList = (props) => {
    const  musicList = props.musics
    const  { classes } = props

    if (!musicList || musicList.length == 0)
        return <div>Carregando...</div>

    const items = musicList.map(music => {
        return (
            <MusicItem 
                key={music.id} 
                music={music} 
                onSave={props.onSave} />
        )
    })

    return (
        <ul className={classes.list}>
            {items}            
        </ul>
    )
}

MusicList.propTypes = {
    musics: PropTypes.array.isRequired
}

export default withStyles(styles)(MusicList)
