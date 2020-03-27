import React , {Component } from 'react'
import { withRouter, Link } from 'react-router-dom';

class CategoriesBar extends Component {
    render(){
        return(
            <div className='categories'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-3 pt-3 pb-2 d-none d-xl-flex'>
                            <span>CATEGORIES</span>
                            <span className=''><i className='fas fa-list-alt'></i></span>
                        </div>
                        <div className='col-12 col-xl-9 pt-3 pb-3'>
                            <ul className='list-inline m-0'>
                                <li className='list-item d-inline-block pr-4'>
                                    <Link to='/'>HOME</Link>
                                </li>
                                <li className='list-item d-inline-block pr-4'>
                                    <Link to='/products'>SHOP</Link>
                                </li>
                                <li className='list-item d-inline-block pr-4'>
                                    <Link to='/products'>WOMEN</Link>
                                </li>
                                <li className='list-item d-inline-block pr-4'>
                                    <Link to='/products'>MEN</Link>
                                </li>
                                <li className='list-item d-inline-block pr-4'>
                                    <Link to='/'>PAGES <i class='fas fa-caret-down'></i></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoriesBar; 