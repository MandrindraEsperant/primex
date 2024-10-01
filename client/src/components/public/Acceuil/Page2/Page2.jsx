// import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import SlideService from "../../Slide-service/slideService";
import { MdSendTimeExtension } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { motion } from 'framer-motion';

const Page2 = () => {
  return (
    <div>

<section >
<div className="page2">
  <motion.div className="box"
    initial={{ opacity: 0,y:0 }}
    animate={ { opacity: 1, y:-70 }}
    transition={{ duration: 1.5 }}
  >
    {/* item de card box */}
    <div className="card-box">
      <div className=" item"  >
        <div className="img-bloc">
          <GrServices className='icon' />
          <span>Service</span>
        </div>
        <span className="separation"></span>
        <div className="text-bloc"><h3>Découvrez nos service</h3></div>
        <div className="btn-bloc btn">Transpart aérienne</div>
      </div>
      <div className="item">
        <div className="img-bloc">
          <MdSendTimeExtension
            className='icon' />
          <span>Expédiez maintenant</span>
        </div>
        <span className="separation"></span>
        <div className="text-bloc"><h3>Découvrez nos service</h3></div>
        <div className="btn-bloc btn">Transpart maritime</div>
      </div>
      <div className="item">
        <div className="img-bloc">
          <BiSearchAlt className='icon' />
          <span>
            Rechercher
          </span>
        </div>
        <span className="separation"></span>
        <div className="text-bloc"><h3>Découvrez nos service</h3></div>
        <div className="btn-bloc btn">Déclaration douaniére</div>
      </div>
    </div>
  </motion.div>
  <div className="content-service">
    <h1 className='primaryText' style={{textAlign:'center'}}>Nos service</h1>
    <div className="service">
      <SlideService />
    </div>
  </div>

</div>
</section>
    </div>
  )
}

export default Page2
