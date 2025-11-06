import { forwardRef, useState, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  // Piilotetaan tai näytetään sisältö tarkoituksen mukaan
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  // Funktio näkyvyyden vaihtamiselle
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, ()=> ({
    toggleVisibility
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>

        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable