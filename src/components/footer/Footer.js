import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <footer>
        <div class="container">
            <div class="box">
                <h3>About us</h3>
                <p> This is Project of crypto app.
                    </p>
                <button class="btn btn-secondary">Read More</button>
            </div>
            <div class="box">
                <h3>Quik Links</h3>
                <ul>
                    <li>
                    <Link  to="/">Home</Link>
                    </li>
                    <li>
                    <Link  to="/coins">Coins</Link>
                    </li>
                    <li>
                    <Link  to="/exchanges">Exchanges</Link>
                    </li>
                    

                </ul>
            </div>
            <div class="box">
                <h3>Follow Us</h3>
                <div>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com">
                                <img src="./icon/facebook.svg" alt="" />
                                <span>Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com">
                                <img src="./icon/twitter.svg" alt="" />
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com">
                                <img src="./icon/instagram.svg" alt="" />
                                <span>Instagram</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </footer>
    <footer class="copyright">
        <div>
           
            Copyright © 2020 .All rights reserved by <Link  to="/">KryptoN</Link>.
            
        </div>
    </footer>
    </div>
  )
}

export default Footer