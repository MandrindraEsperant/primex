// import React from 'react'
import './Page1.css'
import { motion } from 'framer-motion';

const Page1 = () => {
  return (
    <div>
      <section className="container-section">
        <div className="page1">
          <div className="content">
            <motion.h3
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 4,
                type: "spring"
              }}
            >
              Simplifiez vos opérations internationales</motion.h3>
            <motion.h1
              initial={{ x: "8rem" }}
              animate={{ x: 0 }}
              transition={{
                duration: 3,
                type: "spring"
              }}
            >Nous transportons vos marchandises </motion.h1> <h3>en toute <span>sécurité et dans les délais</span></h3>
            <p> votre partenaire
              de confiance en transit et logistique. Nous offrons des solutions personnalisées et
              efficaces pour le transport maritime et aérien, avec une technologie de pointe pour
              suivre vos envois en temps réel et optimiser votre chaîne d&apos;approvisionnement.</p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Page1
