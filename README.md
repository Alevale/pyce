#Proyect Developer, Alejandro Vales Sertage

The main objective is to create an application that doesn't allow to read the messages that are written by different people in the database

There is only a Database, which is the Message DB, and by the requirements of our application we don't need any kind of database for users, because the main objective for the application is to keep the anonimously of the communication between users for a person that tries to *"sniffer"*  the messages between users


As Example we could put two users communicating in the application.

The User A, and the User B are communicating,

The User A sends a message *"Hello how are you"* with the password *"U2FsdGVkX18vUVvpskDjgW0PzkrS0TlVVzM9Qvl6R/YDQI2UKLfkUAYn4+ziTeBTnm5xTmcfZJ4PFtmx"*


The text being encrypted in the client is (with the algorithm AES 256) -> "U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA=="

Instead of only sending this message around the web, also we send 2 messages with the same length in parallel, in order to create noise (so if you try to know which is the password with *Brute Force* for the message sent you should look for 3 messages instead of only one)

so the sent messages to the Database will be

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


User B connects to the application and has the Pvt password from the User A, *"we suppose they know that the password has to be sent by a secure channel"* and has to be as long as they need to make it secure and unique

User B applies AES to each message, and the messages are  

1 -> Hello how are you

2 -> ----

3 -> ----

So the communication has been secure, * we have to assume that the meaning of secure in informatics means that the information has not been decrypted for less than the amount the information is worth*


In the end of the message we are putting a Date time-stamp in ISO format, to be able to see it the message has been well decrypted, if not, the result is not going to be able to be shown to the user


The first problem that needs to be solved is the amount of passwords that a multi user enviroment will request, the most secure way to store them is in the client side, without sending anything through the web, to not allowing to make any kind of brute force attack to them, for doing this, we are going to use "the same level" of security that a bank uses, which is not only letting the user type the password with his keyboard but combining with mouse introduction of numbers and positions in witch the "numbers" should be putted.


(the main objective of this is to not allow to someone to see what is the password for this "user" installing a key-logger or a trojan that tries to retrieve any important information)


*("For this we are going to use some functions that, request the values of the password putted reverse, straight, numbers first, in between, 2 chars then the numeric, anything that we could imagine to avoid the scenario we defined in the upper case.")* -- no creo que se use --


In order to be able to do this, we are going to read and write a (encripted) file just that the user provides us, or that we generate to the user iff it is the first time he access to the aplicacion, we have to explain him how it works, and how we have to each time he connects to the web page, get all the message that has been crypt in the world.
