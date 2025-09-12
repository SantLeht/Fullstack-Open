```mermaid

sequenceDiagram;

participant Browser
participant Server

Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of Browser: Lähetetään merkintä serverille.
Server-->>-Browser: 201 (created)
Note right of Browser: Selain käsittelee JSON datan ja päivittää sivun dynaamisesti Javascriptin avulla.
```