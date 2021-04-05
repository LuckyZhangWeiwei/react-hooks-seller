import './index.styl'

import ModelLayer from './../model-layer'

const Dialog = props => {
  const {
    title
  } = props
  return (
    <ModelLayer style={{zIndex: 999}}>
      <div className="dialog-main">
        <div className="content">
          {title}
        </div>
        <div>
          <a 
            href="javascript:;" 
            className="btn" 
            onClick={
              e => {
                e.stopPropagation()
                  props.hideDialog()  
                } 
              }>
            取消
          </a>
          <a 
            href="javascript:;" 
            className="btn hightlight" 
            onClick={
              e => {
                e.stopPropagation()
                props.ClearCart()
                }
            }>
            确定
          </a>
        </div>
      </div>
    </ModelLayer>
  )
}

export default Dialog