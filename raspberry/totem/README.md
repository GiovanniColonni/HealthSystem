# Totem

Ogni raspberry hosta un server flask per il backend e un server per il front-end.
Il front-end è diffirente da quello creato per i client stanrdard, in particolare permette di trasmettere le misure al broker MQTT.

Il totem è sempre e solo publisher del broker, il server centrare invece è l'unico subscriber del broker.

Il totem si autentica al broker tramite le stesse credenziali che utilizza l'utente per fare l'accesso al sistema in modo da poter avere una corrispondenza, questo per ogni misura che viene inviata al broker.

L'idea è che il raspberry non abbia un database ma sia una sorta di "super-client" del server centrale.


TODO : 

- togliere DBConnection e integrare SQLAlchemy