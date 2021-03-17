import React from 'react'
import BScroll from '@better-scroll/core'
import './index.styl'

class Scroller extends React.Component {

  constructor(props) {
    super(props)
    this.scrollerContainerRef = React.createRef()
  }

  componentWillReceiveProps(props) {
    if (props.data.length) {
      setTimeout(() => {
        this.scroller.refresh()  
      }, 16);
      
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this._initScroll()  
    }, 16);
  }

  _initScroll () {
    this.scroller = new BScroll(this.scrollerContainerRef.current, {
      probeType: this.props.probeType,
      click: true
    })
    
    if (this.props.listenScroll) {
      this.scroller.on('scroll', pos => {
        setTimeout(() => {
          this.props.listenScroll(pos)  
        }, 16);
      })
    }
  }

  scrollToElement() {
    this.scroller &&	this.scroller.scrollToElement.apply(this.scroller, arguments)
  }

  render() {
    return (
      <div 
        className="scroll-container"
        ref={this.scrollerContainerRef}>
        <div>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
} 

export default Scroller