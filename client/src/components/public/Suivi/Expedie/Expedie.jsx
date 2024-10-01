import React from 'react'
import './Expedie.css'
import imgSuivi from './suivi.png'
import { motion } from 'framer-motion'
const Expedie = () => {
  return (
    <div className='expedie'>
      <motion.div className="e-left flexColCenter"
        initial={{ opacity: 0, x: "-5rem" }}
        animate={{ opacity: 1, x: "0" }}
        transition={{ type: "sping", duration: 1.5 }}
      >
        <h2 className="primaryText">Grâce à votre numéro de suivi</h2>
        <p className='secondaryText'>nous pouvons contacter la division pertinente pour répondre à vos interrogations. Une fois votre numéro de colis saisi et soumis, vous pourrez accéder à toutes les informations pertinentes concernant votre expédition</p>
        <div className="btn-container flexSpace">
          <div className="btn left">suivre</div>
          <div className="btn">Expedier</div>
        </div>
      </motion.div>
      <motion.div className="e-right "
        initial={{ x: "10rem" }}
        animate={{ x: "0" }}
        transition={{ type: "sping", duration: 1.5 }}
      >
        <img src={imgSuivi} alt="" className='flexCenter' />
      </motion.div>
    </div>
  )
}

export default Expedie
