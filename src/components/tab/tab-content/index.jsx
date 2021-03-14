import { useEffect, useRef } from 'react'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import './index.styl'
const TabContent = props => {
  const sliderRef = useRef(null)
  const scroll = useRef(null)

  useEffect(() => {
    if (!props.data) return 
    _initTab()
    window.addEventListener('resize', () => {
      if (scroll.current) {
        _setTabWidth()
        scroll.current.refresh()
      }
    })

    scroll.current.on('slidePageChanged', page => {
      props.onPageChanged(page)
    })
    
    scroll.current.on('scroll', pos => {
      const transformScala = -pos.x / sliderRef.current.clientWidth
      props.onScroll(transformScala)
    })
  }, [props.data])

  useEffect(() => {
    if (props.data && scroll.current) {
      scroll.current.goToPage(props.currentIndex, 0, 200)
    }
  }, [props.currentIndex, props.data])

  const _initTab = () => {
    if (!props.data) return
    _setTabWidth()
    _initScroll()
  }

  const _initScroll = () => {
    if (!sliderRef.current) return
    BScroll.use(Slide)
    scroll.current = new BScroll(sliderRef.current, {
      scrollX: true,
      scrollY: false,
      slide: {
        threshold: 100,
        loop: false,
        autoplay: false
      },
      useTransition: false,
      momentum: false,
      bounce: false,
      stopPropagation: true,
      probeType: 3
    })
  }
  const _setTabWidth = () =>{
    let tabItems = document.querySelectorAll('.slide-page')
    if (!tabItems) return
    let tabItemWidth = sliderRef.current.clientWidth
    for (let tabItem of tabItems) {
      tabItem.style.width = `${tabItemWidth}px`
    }
    let totalWidth = tabItems.length * tabItemWidth
    document.querySelector('.slide-banner-content').style.width = `${totalWidth}px`
  }
  return (
    <>
    {
    props.data &&
      <div className="slide-fullpage">
        <div className="banner-wrapper">
          <div className="slide-banner-wrapper" ref={sliderRef}>
            <div className="slide-banner-content">
              {
                props.data.map((tab, index) => {
                  return (
                    <div key={index} className="slide-page">
                      <tab.component />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}
export default TabContent