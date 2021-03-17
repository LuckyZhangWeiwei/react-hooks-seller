import './index.styl'

const SupportIco = props => {
  const iconCls = () => {
    const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    return `icon-${props.size} ${classMap[props.type]}`
  }
  return (
    <span className={`support-ico ${iconCls()}`} {...props}/>
  )
}

export default SupportIco