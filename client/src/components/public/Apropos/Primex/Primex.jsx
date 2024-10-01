import './Primex.css'
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup'

const Primex = () => {
    const [isVisibleP, setIsVisibleP] = useState(false);
    const [isVisiblePt, setIsVisiblePt] = useState(false);
    const ptsectionRef = useRef(null);
    const psectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Si l'entrée est visible dans le viewport
                if (entries[0].isIntersecting) {
                    setIsVisibleP(true);
                    setIsVisiblePt(true);
                }
            },
            { threshold: 0.5 } // déclenchement lorsque 50% de la section est visible
        );

        if (psectionRef.current) {
            observer.observe(psectionRef.current);
        }
        if (ptsectionRef.current) {
            observer.observe(psectionRef.current);
        }

        // Cleanup de l'observateur
        return () => {
            if (psectionRef.current) {
                observer.unobserve(psectionRef.current);
            }
        };
    }, []);
    return (
        <div >
            <div className="i-container">
                <h1 className="primaryText"> Nos réalisations en chiffres </h1>
                <div className="compteur-down">
                    <div className="img">
                        <div className="compteur">
                            <div className="primaryText"> <span className="orangeText">+</span><CountUp start={200} end={1200} duration={4} />M</div>
                            <div className="libele ">Transport Aérienne</div>
                        </div>
                    </div>
                    <div className="compteur">
                        <div className="primaryText"><span className="orangeText">+</span><CountUp start={5000} end={9000} duration={3} />M</div>
                        <div className="libele">Transport Maritime</div>
                    </div>
                    <div className="compteur">
                        <div className="primaryText"><span className="orangeText">+</span> <CountUp start={8000} end={29000} duration={4} />M</div>
                        <div className="libele">Dédouanement</div>
                    </div>
                </div>

            </div>
            <div className='p-container'>
                <motion.div className="p-left"
                    ref={psectionRef}
                    initial={{ opacity: 0.6, x: -50 }}
                    animate={isVisibleP ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 4 }}
                >
                    <div className="image-container">
                        <img src="./exp.jpg" alt="" />
                    </div>
                </motion.div>
                <motion.div className="p-right"
                    ref={ptsectionRef}
                    initial={{ opacity: 0.6, x: 50 }}
                    animate={isVisiblePt ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 4 }}
                >
                    <h1 className="primaryText">À Propos de PRIMEX LOGISTICS</h1>
                    <p className="secondaryText">C&apos;est une entreprise spécialisée dans le transit international Malagasy situé à
                        Antananarivo, offrant des solutions complètes pour le transport, le dédouanement, et la
                        logistique. <br />
                        Nous nous engageons à simplifier vos opérations avec un service fiable,
                        rapide et conforme aux normes internationales. Notre équipe d&apos;experts travaille pour
                        garantir la satisfaction client grâce à des solutions sur mesure. <br />
                        Avec une expérience solide, nous visons à être le partenaire de confiance pour vos besoins logistiques.</p>
                </motion.div>

            </div>

        </div>

    )
}

export default Primex
