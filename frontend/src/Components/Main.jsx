import React from 'react'
import Adminnav from './Adminnav'
import Footer from './Footer'

const Main = (props) => {

  return (
    <div>
        <Adminnav/>
        
        {props.child}
        <Footer/>
    </div>
  )
}

export default Main