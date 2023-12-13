import React from 'react'
import Navbar from '../../components/navbar/navbar.jsx'
import Header from '../../components/header/Header.jsx'
import Featured from '../../components/featured/featured.jsx'
import './home.css';
import PropertyList from '../../components/PropertyList/PropertyList.jsx';
import FeaturedProperties from '../../components/featuredProperties/featuredProperties.jsx';
import MailList from '../../components/mailList/mailList.jsx';
import Footer from '../../components/footer/Footer.jsx';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured />
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Featured Properties</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
