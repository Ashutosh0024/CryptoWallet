import React from 'react'

import Nav from '../Nav'
import Coins from './Coins'
import Tiara from './Tiara'

import './Hero.scss'
const Hero = () => {
    return (
        <div className="Hero">
            <div className="container">
                <Tiara />
                <Nav />
                <div className="HeroText">
                    <Coins />
                </div>
            </div>
        </div>
    )
}

export default Hero
