import React from 'react'

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Storyteller</h1>
      <h2 style={styles.subtitle}>A Markov-chain text generator</h2>
      <p style={styles.scroll}>scroll</p>
    </div>
  )
}

let styles = {
  container:{
    
  },
  title: {
    marginTop: '12%',
    marginLeft: '20%',

    fontFamily: 'PT Serif',
    fontSize: 50,
    letterSpacing: 5,
  }, 
  subtitle: {
    marginLeft: '20%',
    fontFamily: 'PT Serif',
    fontSize: 32,
    letterSpacing: 5,
  }, 
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '25%',
    fontFamily: 'PT Serif',
    fontSize: 24,
  }
}

export default Home;