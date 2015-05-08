#Proyect Develop by Alejandro Vales sertage

The main objective is to create an aplication that doesn't allow to read the messages that are written by different people in the database

There is only a Database, which is the Message DB, and by the requirements of our application we dond't need any kind of database for users, because the main objective for the application is to keep the anonimously of the comunication between users for a person that try's to *"sniffer"*  the messages between users


As Example we could put two users comunicating in the application.

The User A, and the User B are communicating,

The User A sends a message *"Hello how are you"* with the password *"U2FsdGVkX18vUVvpskDjgW0PzkrS0TlVVzM9Qvl6R/YDQI2UKLfkUAYn4+ziTeBTnm5xTmcfZJ4PFtmx"*


The text beeing encripted in the client is (with the algorithm AES 256) -> "U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA=="

Instead of only sending this message around the web, also we send 2 messages with the same length in paralel, in order to create noise (so if you try to know which is the password with *Brute Force* for the message sended you should look for 3 messages instead of only one)

so the sended messages to the Database will be

-----------
U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA==

-----------
kj12tv12btqfwDAJJDAJAu21bkj2QWTHFWOHWfqwlfhip3d2q634bkj11bkj4rgqi2ohih52oEHqTrqnl0bbzA==

-----------
U2FsdG/qrVkX1%#dhU2FaJAdP125vk1467hj45hlt13rtl1v3tl1t3413b13gligt341tg1r3EHqTrqnl0bbzA==

-----------

Those tree values will be written in the database so the database will have


1 -> U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA==

2 -> kj12tv12btqfwDAJJDAJAu21bkj2QWTHFWOHWfqwlfhip3d2q634bkj11bkj4rgqi2ohih52oEHqTrqnl0bbzA==

3 -> U2FsdG/qrVkX1%#dhU2FaJAdP125vk1467hj45hlt13rtl1v3tl1t3413b13gligt341tg1r3EHqTrqnl0bbzA==


User B connects to the application and has the Pvt password from the User A, *"we supose they know that the password has to be sended by a secure channel"* and has to be as long as they need to make it secure and unic

User B applyes AES to each message, and the messages are  

1 -> Hello how are you

2 -> ----

3 -> ----

So the communication has been secure, * we have to assume that the mening of secure in informatics means that the information has not been decrypted for less than the amount the information is worth*
