import {AiOutlineGoogle} from 'react-icons/ai'
import {SiTwitter} from 'react-icons/si'
import {FaFacebook} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <h1 className="footer-heading">Contact Us</h1>
    <div className="footer-icon-container">
      <AiOutlineGoogle className="footer-icon" />
      <SiTwitter className="footer-icon" />
      <FaFacebook className="footer-icon" />
    </div>
  </div>
)

export default Footer
