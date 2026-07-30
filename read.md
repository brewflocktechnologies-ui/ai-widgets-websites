1. chat widget components modular and testable and externalized configs as json 
2. client websites will use config from json to render configured chatwidgets 
3. chat widget customization will be used to provide values to externalized json of chatwidget components , preview and update the configs for given clinet or web page 
4. E2E test for chatwidget and chatwidget customization using playwright 


CLIENT SIDE production grade
1. chatwidget 
2. chatwidget_components 
3. chatwidget_customization
4. client_websites  [script --> cdn --> configapi vercel --> mongo]
5. quality : unittest , e2e , performance , minifying , webstandards, A11y 
6. js cdn vercel / config api nextjs api with mongo vercel


SERVER SIDE 