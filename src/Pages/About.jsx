import React from 'react'
import Nav from '../componats/Nav'
import Footer from '../componats/Footer'
import "../css/about.css"





const About = () => {
  return (
    <>
      <Nav />
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Eventera</h1>
          <p>Creating Unforgettable Moments Since 2020</p>
        </div>
      </section>

      <section className="our-story">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>Founded in 2020, Eventera has grown from a small local events platform to a comprehensive event management solution trusted by thousands of organizers and attendees worldwide. Our journey began with a simple mission: to make event planning and discovery seamless and enjoyable for everyone.</p>
            <p>Today, we're proud to be at the forefront of the events industry, connecting people through meaningful experiences and helping create memories that last a lifetime.</p>
          </div>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Our Story" />
          </div>
        </div>
      </section>

      <section className="our-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-heart"></i>
            <h3>Passion</h3>
            <p>We're passionate about creating exceptional event experiences that bring people together.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-handshake"></i>
            <h3>Trust</h3>
            <p>Building trust through transparency and reliability in every interaction.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovation</h3>
            <p>Constantly innovating to provide cutting-edge solutions for modern events.</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Community</h3>
            <p>Fostering a vibrant community of event organizers and attendees.</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Sarah Johnson" />
            <h3>Sarah Johnson</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Michael Chen" />
            <h3>Michael Chen</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Emily Davis" />
            <h3>Emily Davis</h3>
            <p>Event Director</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <h3>1000+</h3>
          <p>Events Hosted</p>
        </div>
        <div className="stat-item">
          <h3>50K+</h3>
          <p>Happy Attendees</p>
        </div>
        <div className="stat-item">
          <h3>100+</h3>
          <p>Partner Venues</p>
        </div>
        <div className="stat-item">
          <h3>15+</h3>
          <p>Cities Covered</p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About;