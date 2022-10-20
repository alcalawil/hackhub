import React from 'react';
import { BsGithub } from "react-icons/bs";
import { RiCopyrightLine } from 'react-icons/ri';
// import lens from "../../assets/lens_Icon.jpg"
import EthContribute from '../../assets/eth_contribute.jpg';

const Footer = () => {
  return (
    <footer>
      <div className='d-flex flex-column justify-content-center align-items-center py-4'>
        <h6 className='mb-1'>About Us</h6>
        <div>
          <a href="https://github.com/ethbogota-hackhub/hackhub.git">
            <BsGithub size={35} className="m-2" style={{ color: "#1c1b1b" }} />
          </a>

          <img src="/img/lens.png" alt="lens" width={45} />
        </div>
      </div>

      <div className='d-flex flex-column align-items-center py-4'>
        <h6>Contribute</h6>
        <img src={EthContribute} alt="" width="140px" />
      </div>

      <div className='d-flex justify-content-center my-4'>
        <RiCopyrightLine />
        <p>All rights reserved. <span className='fw-bold'>HackHub</span></p>
      </div>
    </footer>
  )
}

export default Footer