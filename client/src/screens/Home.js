import React from 'react';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import Form from '../components/Form';

const screenHeight = window.innerHeight;

const Home = props => {

  return (
    <React.Fragment>
      <Fade>
        <div style={styles.screen}>
          <div style={styles.container}>
            <h1 style={styles.header}>Storyteller</h1>
            <p style={styles.subheader}>A Markov-chain text generator</p>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div style={styles.screen}>
          <h1 style={styles.header}>Let me tell you a story...</h1>
        </div>
      </Fade>
      <Fade bottom>
        <div style={styles.screen}>
          <Form history={props.history}/>
        </div>
      </Fade>
    </React.Fragment>
  )
}

const styles = {
  screen: {
    width: '100%',
    height: screenHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    fontSize: 50,
    fontWeight: 'normal',
    letterSpacing: 3,
    marginBottom: 10
  },
  subheader: {
    margin: 0,
    fontSize: 32,
    letterSpacing: 1.5
  }
}

export default withRouter(Home);