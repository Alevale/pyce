#Proyecto desarrollado por Alejandro Vales Sertage

El objetivo principal de a aplicacion es proveer un servicio de comunicacion para los usuarios de la aplicacion en el que se encripten los mensajes, de forma que no se sepa quien se esta comunicando con quien.

Para ello solo utilizaremos una Base de datos, que sera la de *mensajes*, y por los requerimientos de nuestra aplicacion no necesitamos ninguna de usuarios, puesto que precisamente seria lo que estamos intentando ocultar de cara al exterior.

El problema principal que se pretende resolver, es el *anonimato* de cara al exterior que no tenemos con aplicaciones de mensajeria, puesto que en la gran mayoria de casos se sabe quien es el "destinatario" y quien es el "creador"


Pondremos ahora un ejemplo del funcionamiento de la aplicacion.

El usuario A se va a comunicar con el usuario B

El usuario A envia un mensaje *"Hola quien eres"* con la contrasenia *"U2FsdGVkX18vUVvpskDjgW0PzkrS0TlVVzM9Qvl6R/YDQI2UKLfkUAYn4+ziTeBTnm5xTmcfZJ4PFtmx"*


El texto sera encriptado en el cliente, usando el algoritmo AES 256, y se convertira en -> "U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA=="

En vez de solo enviar ese mensaje al backend, enviaremos ademas 2 mensajes similarmente parecidos a lo que seria un texto encriptado con AES, por lo que de cara a un 3 usuario que este viendo las respuestas que se reciben en el servidor no se sabria claramente cual seria el mensaje enviado por el usuario, y se tendria que perder tiempo descifrando los 3 mensajes, hasta ver cual de ellos tiene un cierto contenido legible, por lo que en cuestion de descifrado, estariamos incrementando por 1,5 como minimo el gasto que supone desencriptar los mensajes que se transmiten.

Finalemente los mensajes transmitidos a la base de datos quedan del siguiente modo

-----------
U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA==

-----------
kj12tv12btqfwDAJJDAJAu21bkj2QWTHFWOHWfqwlfhip3d2q634bkj11bkj4rgqi2ohih52oEHqTrqnl0bbzA==

-----------
U2FsdG/qrVkX1%#dhU2FaJAdP125vk1467hj45hlt13rtl1v3tl1t3413b13gligt341tg1r3EHqTrqnl0bbzA==

-----------

Los tres valores que seran escritos en la BBDD seran


1 -> U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA==

2 -> kj12tv12btqfwDAJJDAJAu21bkj2QWTHFWOHWfqwlfhip3d2q634bkj11bkj4rgqi2ohih52oEHqTrqnl0bbzA==

3 -> U2FsdG/qrVkX1%#dhU2FaJAdP125vk1467hj45hlt13rtl1v3tl1t3413b13gligt341tg1r3EHqTrqnl0bbzA==


El usuario B se contecta a la aplicacion y tiene la contrasenia privada con la que emitira el usuario A, *"suponemos que la transmision del mensaje ha sido por canal seguro"* (Entendiendose por canal seguro la comunicacion de las claves en persona) (Para ello proveeremos en el futuro la oportunidad de cifrar las conversaciones usando una clave autogenerada por codigo qr)

El usuario B entonces ya se dispone a desencriptar los mensajes que ha recogido de la base de datos.

1 -> Hola quien eres

2 -> ----

3 -> ----


Los requisitos que damos para argumentar que una comunicacion ha sido segura es que el contenido no valga mas que el dinero invertido para desencriptarlo, y que haya sobrevivido un tiempo suficientemente largo como para que la informacion una vez desencriptada deje de ser de tipo sensible


Para comprobar si el mensaje que hemos desencriptado ha sido de forma satisfactoria, pondremos una marca de tiempo en formato ISO, de forma que la probabilidad de encontrar algo legible despues de haber aplicado la desencriptacion al texto RANDOM, no sea demasiado alta.

El primer problema al que nos enfrentamos es la cantidad de contrase;as que podrian ser utilizadas en nuestra aplicacion, para esto lo mas seguro es guardarlas en el cliente, y bajo ningun concepto enviarlas por la web.
Para ello las guardaremos en un archivo de texto el cual encriptaremos previamente con los datos que nos provea el usuario, obviamente la introduccion sera una combinacion de caracteres introducidos con el teclado y raton.
(esto se hace para evitar el acceso a las claves utilizando un keylogger o un visor de pantalla)


Para hacer esto lo que haremos sera leer y escribir un archivo encriptrado que nos proporcionara el usuario, y cuando la genere por primera vez le explicaremos como funciona de forma que pueda enviar y descifrar archivos en todo el mundo
