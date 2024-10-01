import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from './accordion'
import './Mission.css'
// import { FiChevronDown } from 'react-icons/fi';

const Mission = () => {
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
    <div>
      <div className="paddings innerWidth  flexCenter c-container">
        {/* Left side */}
        <div className="flexColCenter c-left">
          <span className='orangeText'>Nos missions</span>
          <span className='primaryText'>Value we Give to You</span>
          <span className='secondaryText'>We always ready to help by providing the best services for you <br />
            We beleive a good blace to live can make your life better</span>
          <div>
            {
              data.map((item) => {
                return (
                  
                    <Accordion key={item.id} className='accordion'>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='head-accordion'
                      >
                        {/* Icône + Titre dans l'entête */}
                        <div className="flexCenter icon">
                          {item.icon}
                        </div>
                        {/* <Typography> */}
                          <span className='primaryText'>
                            {item.heading}
                          </span>
                        {/* </Typography> */}

                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="secondaryText">                          
                            {item.detail}                      
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                
                )
              }
              )
            }

          </div>
        </div>
        {/* rigth side */} 
        <motion.div className="flexCenter c-right"
             ref={sectionRef}
             initial={{ opacity: 0.6, x: 50 }}
             animate={isVisible ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 3 }}
        >
          <div className=" image-container ">
            <img src="./mission.jpg" alt="" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Mission
