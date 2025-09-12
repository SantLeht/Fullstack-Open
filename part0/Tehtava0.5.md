```mermaid

sequenceDiagram;

participant Browser
participant Server

Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
Server-->>-Browser: HTML document

Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->>-Browser: css file

Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Server-->>-Browser: javascript file

Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->>-Browser: JSON data
Note right of Browser: Selain käsittelee JSON datan ja renderöi sen selaimeen.```


