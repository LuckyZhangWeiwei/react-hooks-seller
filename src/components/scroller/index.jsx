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
      this.scroller.refresh()  
    }
  }

  componentDidMount() {
    this._initScroll()  
  }

  _initScroll () {
    this.scroller = new BScroll(this.scrollerContainerRef.current, {
      probeType: this.props.probeType ? this.props.probeType : 0,
      click: true
    })
    
    if (this.props.listenScroll) {
      this.scroller.on('scroll', pos => {
        this.props.listenScroll(pos)  
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
        style={this.props.myStyle}
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