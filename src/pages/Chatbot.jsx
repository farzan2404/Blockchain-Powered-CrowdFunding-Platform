import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: 'b0bacb2c-3109-4a44-8b4a-2e26094eaccd',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: 'b0bacb2c-3109-4a44-8b4a-2e26094eaccd',
      })
    }
  }, [])
 
 
  return <div id="webchat" />
}
 
export default Chatbot