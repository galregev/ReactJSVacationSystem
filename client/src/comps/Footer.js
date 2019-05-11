import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

class Footer extends Component {

    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                <div className="row">
                    <div className="col l6 s12 center-mobile">
                    <h5 className="white-text">Footer Content</h5>
                    <p className="grey-text text-lighten-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    </div>
                    <div className="col l4 offset-l2 s12 center-mobile">
                    <h5 className="white-text"><i className="fa fa-sitemap" aria-hidden="true"></i>  Site Map </h5>
                    <ul>
                        <li><Link className="grey-text text-lighten-3" to="/">Main</Link></li>
                        <li><Link className="grey-text text-lighten-3" to="/signin">SignIn</Link></li>
                        <li><Link className="grey-text text-lighten-3" to="/signup">SignUp</Link></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="footer-copyright">
                <div className="container">
                © Develop by galregev - 2019.
                <a className="grey-text text-lighten-4 right" href="https://www.linkedin.com/in/gal-regev-124092135/"><i className="fab fa-linkedin"></i> Linkedin</a>
                </div>
                </div>
                </footer>
        )
    }

}

export default Footer;