import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import ReactLoading from 'react-loading';

import Button from './Button';

const Form = props => {
  const [length, setLength] = useState(0);
  const [muse, setMuse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const text = await fetch(process.env.REACT_APP_BACKEND_URL + `generate/${length}`);
    const textData = await text.json();
    setLoading(false);
    nav(textData);
  }

  const nav = (textData) => {
    props.history.push({
      pathname: '/viewText',
      state: {text:textData}
    });
  }
  
  return (
    loading ? (
      <Fade>
        <div style={styles.container}>
          <h1 style={styles.loading}>Loading...</h1>
          <ReactLoading type="spinningBubbles" color="gray" height={100} width={100} />
        </div>
      </Fade>
    ) : (
      <div style={styles.container}>
        <h2 style={styles.question}>Every writer has a muse.</h2>
        <h3 style={styles.subQuestion}>Who is yours?</h3>
        <div style={styles.buttonContainer}>
          <Button text="Dear Blueno" color={muse === 'blueno' ? "#C8E3D6" : "#dbf6e9"} onClick={() => setMuse('blueno')}/>
          {/* <Button text="Dear Blueno" color="#dbf6e9" />
          <Button text="Dear Blueno" color="#dbf6e9" />
          <Button text="Dear Blueno" color="#dbf6e9" /> */}
        </div>
        <h2 style={{ ...styles.question, marginBottom: 20 }}>How long would you like the story to be?</h2>
        <div style={styles.buttonContainer}>
          <Button text="25 words" color={length === 25 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(25)}/>
          <Button text="50 words" color={length === 50 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(50)}/>
          <Button text="100 words" color={length === 100 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(100)}/>
          <Button text="200 words" color={length === 200 ? "#C8E3D6" : "#dbf6e9"} onClick={() => setLength(200)}/>
        </div>
        <Button text="Submit" color='#9DDFD3' onClick={handleSubmit} disabled={length === 0 || muse === null}/>
    </div>
    )
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  question: {
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: 'normal',
    margin: 0
  },
  subQuestion: {
    fontSize: 24,
    letterSpacing: 0.8,
    fontWeight: 'normal',
    margin: 0,
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 30
  },
  loading: {
    letterSpacing: 4, 
    fontSize: 50, 
    fontWeight: 'normal'
  }
}

export default withRouter(Form);