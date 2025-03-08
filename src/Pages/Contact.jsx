import React from 'react'
import Nav from '../componats/Nav'
import Footer from '../componats/Footer'
import "../css/contact.css"

const Contact = () => {
  return (
      <>
          <Nav />
      
      <section className="contact-hero">
        <div>
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </section>

    
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>123 Event Street, Cairo, Egypt</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-content">
                <h3>Phone Number</h3>
                <p>+20 123 456 7890</p>
                <p>+20 098 765 4321</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-content">
                <h3>Email Address</h3>
                <p>info@eventera.com</p>
                <p>support@eventera.com</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>We'd love to hear from you</p>
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27814.54749421954!2d31.24560983955078!3d30.044419899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840b8bc0d3ab3%3A0x5f4fc4c65599b9b5!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1647935908186!5m2!1sen!2sus" allowFullScreen loading="lazy"></iframe>
          </section>
          <Footer />
    </>
  )
}

export default Contact;