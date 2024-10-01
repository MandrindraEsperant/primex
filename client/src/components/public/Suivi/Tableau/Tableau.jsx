import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa'
import './Tableau.css'
import Expedie from '../Expedie/Expedie'
const Tableau = () => {

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Si l'entrée est visible dans le viewport
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 } // déclenchement lorsque 50% de la section est visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Cleanup de l'observateur
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className='tableau'>
            <div className="div1 flexSpace">
                <div className="flexColStart primaryText">Suivi des expéditions</div>
                <div className="rechercher">
                    <input type="text" className=' txt-input' placeholder='Entrez votre numéro de suivi' />
                    <button type='button' className='btn'>Suivre</button>
                </div>
            </div>
            <Expedie />
            <motion.div className="box-cum flexColCenter"
                    ref={sectionRef}
                    initial={{ opacity: 0.6, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 2}}
            >
                <div className="bloc dessous flexColCenter">
                    <div className="icon"> <FaGlobe size={50} /> </div>
                    <h2 className="primaryText">Expédiez maintenant</h2>
                    <p className='secondaryText'>Sélectionner le service correspondant à
                        la dimension de votre envoi</p>
                </div>
            </motion.div>
        </div>
    )
}

export default Tableau
