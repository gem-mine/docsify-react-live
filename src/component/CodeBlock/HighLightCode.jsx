import React, { Fragment } from 'react'
import Highlight, { Prism } from 'prism-react-renderer'
import palenightTheme from '../../constants/palenight'

export default function HighLightCode({
  code,
  theme
}) {
  return (
    <Highlight
      Prism={Prism}
      code={code}
      theme={theme || palenightTheme}
      language="css"
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  )
}