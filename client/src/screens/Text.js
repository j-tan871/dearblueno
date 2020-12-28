import React from 'react';
import { withRouter } from 'react-router-dom';

const Text = props => {

  const nav = () => {
    props.history.push('/');
  }

  const text = props.history.location.state.text;
  const muse = props.history.location.state.muse;
  console.log(text);

  return (
    <div style={styles.screen}>
      <div style={styles.container}>
        <div style={muse === 'blueno' ? styles.text : styles.smallText}>{text.text}</div>
        <button style={styles.button} onClick={nav}>Tell me another story</button>
      </div>
    </div>
  )
};

const styles = {
  screen: {
    width: '100%',
    display: 'flex',
    height: window.innerHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    fontSize: 24, 
    marginBottom: 30
  }, 
  smallText: {
    fontSize: 16, 
    marginBottom: 30
  },
  button: {
    backgroundColor:"#9DDFD3", 
    border: 'none', 
    fontFamily: 'PT Serif',
    width: 241, 
    height: 48, 
    fontSize: 20, 
    borderRadius: 10
  }
}

export default withRouter(Text);