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


In the end of the message we are putting a Date timestamp in ISO format, to be able to see it the message has been well decrypted, if not, the result is not going to be able to be shown to the user


The first problen that needs to be solved is the amount of passwords that a multi user enviroment will request, the most secure way to store them is in the client side, without sending anything thru the web, to not allowing to make any kind of brute force attack to them, for doing this, we are going to use "the same level" of security that a bank uses, which is not only leting the user type the password with his keyboard but combinind with mouse introduction of numbers and positions in witch the "numbers" should be putted.


(the mainn objective of this is to not allow to someone to see what is the password for this "user" installing a keylogger or a trojan that tryes to retrieve any important information)


*("For this we are going to use some functions that, requeste tthe values of the password putted reverse, straight, numbers first, in between, 2 chars then the numeric, anything that we could imagine to avoid the scenario we defined in the upper case.")* -- no creo q se use --


In order to be able to acomplish this, we are going to read and write a (encripted) file just that the user provides us, or that we generate to the user iff it is the first time he access to the aplicacion, we have to explain him how it works, and how we have to each time he connects to the web page, upload the ultimate wersion for descifrating the messages the users send all across the world


