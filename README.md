#Proyect Developer, Alejandro Vales Sertage

This application has as objective to create a secure communication using encryption and broadcasting to everyone as the way to deal with messaging decryption.

The main objective is to create a mobile and web application that encrypts the messages that the people is sending over the net by
broadcasting we make more difficult to know who is speaking to who.

This example is explained using a database. But for real usage, the database should not exist and the applications should be the only ones that have the backup of their own messages.

There is only a Database, that has a Message Table, and we don't need any kind of user Table, because the main objective for the application is to keep them anonimous, so that someone that tries to *"sniffer"* the user by reading all the mesages that go to his device is not able to understand anything.

As Example:

The User A, and the User B are communicating,

The User A sends a message *"Hello how are you"* with the password *"U2FsdGVkX18vUVvpskDjgW0PzkrS0TlVVzM9Qvl6R/YDQI2UKLfkUAYn4+ziTeBTnm5xTmcfZJ4PFtmx"* using our aplication

-----------


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

Those tree values will be written in the database and we will have

1 -> U2FsdGVkX1+bdhHYUoYpaJAdP/Ryj7aYcJyv7VYquNmC0eM+UxFTZu39Gyk9kilYmdAkqbRSoEHqTrqnl0bbzA==
2 -> kj12tv12btqfwDAJJDAJAu21bkj2QWTHFWOHWfqwlfhip3d2q634bkj11bkj4rgqi2ohih52oEHqTrqnl0bbzA==
3 -> U2FsdG/qrVkX1%#dhU2FaJAdP125vk1467hj45hlt13rtl1v3tl1t3413b13gligt341tg1r3EHqTrqnl0bbzA==


User B connects to the application and has the *password* from the User A, *"we suppose they know that the password has to be sent by a secure channel"* and has to be as long as they need to make it secure and unique

User B applies AES to each message, and the messages are

1 -> Hello how are you
2 -> ----
3 -> ----

*We assume that something that has been securely communicated is what has been decrypted after spending more than the value that the information is worth* So the communication has been secure. (The expenses in decrypting this are really quite more expensive than what a "Hello World" is worth)

In the end of the message we are putting a Date time-stamp in ISO format, to be able to see it the message has been well decrypted, and to keep track of the order that the messages should appear.

For the password introduction we will use the keyboard and the mouse and we will avoid any kind of problem installing a keylogger in the user's computer. (To be done)

In order to be able to se a historic file of the messages that the user has, we are going to read and write an encripted file, so that the user don't lose the other contacts or conversations that he had in the past (To be done)
