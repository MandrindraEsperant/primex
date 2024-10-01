import React from 'react'
import Primex from './../../components/public/Apropos/Primex/Primex';

const About = () => {
  return (
    <div className="About">
        <h1 className="primaryText" 
        style={{
          // background: 'rgb(233, 231, 231)',
          textAlign: 'center',
           padding: '1rem'
           }}>A PROPOS DE NOUS</h1>
        <Primex/>
    </div>
  )
}

export default About
