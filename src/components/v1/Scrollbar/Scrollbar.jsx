import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types'

function Scrollbar({ style, autoHide, children, autoHeight, ...rest }) {
  return (
    <>
      {!autoHeight ?
        <Scrollbars
          {...rest}
          autoHeight={autoHeight}
          style={style}
          autoHide={autoHide}
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{
              ...style, backgroundColor: "#707070", width: '6px', opacity: '0.5', borderRadius: "4px"
            }} />}
          renderThumbHorizontal={({ style, ...props }) =>
            <div {...props} style={{
              ...style, backgroundColor: "#707070", height: '6px', opacity: '0.5', borderRadius: "4px"
            }} />}
        >
          {children}
        </Scrollbars>
        :
        <Scrollbars
          {...rest}
          autoHeight={autoHeight}
          style={style}
          autoHide={autoHide}
        >
          {children}
        </Scrollbars>
      }
    </>
  )
}

Scrollbar.propTypes = {
  style: PropTypes.object,
  autoHide: PropTypes.bool
}

Scrollbar.defaultTypes = {
  autoHide: true
}

export default Scrollbar

