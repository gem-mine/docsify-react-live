import React, { Fragment } from 'react'
import Highlight, { Prism } from 'prism-react-renderer'

export default function HighLightCode({
  code,
}) {
  return (
    <Highlight
      Prism={Prism}
      code={code}
      language="css"
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  )
}
