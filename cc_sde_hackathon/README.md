               The proposed “Event Management Tracking System" streamlines the event flow by tackling the above-mentioned problems and enhances the entire field of event management.
•	The system provides the users with “Unique Digital Identifier” at the time of registration. The UDI generated using pseudo-random generator, provides each user with a hash-based “Colour Grid with Embedded Code” that could be scanned during the onboarding to mark the attendance. 
•	Each UDI would be mapped with the user details like name, mail-id, phone number and other detail.
•	These details are stored in a csv file that could be accessed and controlled by the organizers.
•	The system has a check-in system controlled by the organizer, which scans the UDI and marks the attendance.
•	The system would thereby block the scanning of the same UDI ensuring that no double check in happens.
•	Upon checking in, the system tracks all the details regarding the issue of kits, goodies etc to each participant. 
•	In case of event spanning multiple days, the QR code would be regenerated after a specified period.
•	A new QR code would be generated upon checking in, which could be used for collecting the kits. This ensures that attendees cannot collect more than 1 kit.
•	In case of an attendee not collecting a kit, they would be automatically notified regarding this.
•	There would be a built-in admin dashboard which provides the organizers regarding no. of registrations, check-ins, kits distribution etc.
•	Provide the attendees with an option to provide feedback about the event which would directly be sent to the admins who can further reply to that, ensuring a fair feedback mechanism.
•	The system also compiles all the details including the attendance, kit collections, feedback and visualize it through pie charts and bar graphs and provide it to the organizer.
•	We can integrate a notification system using Twilio API, which sends notifications to the users regarding event details.
•	We integrate an event-recommendation system, using AI/ML models which recommends events based on interests, moods and past event details.
•	The feedback provided by the users are used to recommend the events in future based on the ratings. 
•	We use a single admin system (real-time database), which dismisses any sort of ambiguity that arises in case of multiple check-in desks.

Future developments:
•	Integration of blockchain based technology to secure the data of users. This also ensures that the user details and UDI are unique.
•	Bio-metric verification.
•	Integration of chatbots for seamless experience in the system.
•	Providing real-time information regarding the event across the platform to the registered attendees, ensuring that they don’t miss out any important things. 

Tech stack and Services required:
•	React.js
•	Tailwind CSS
•	Chart.js
•	QR code scanner
•	Flask
•	Python
•	SQLite
•	Hosting services
•	Redis
•	Crypto.randomUUID()
•	Twilio API
•	FastAPI
•	OAuth
•	Ethereum (For future)
•	Face API (for future)
•	Llama (for future)
•	Socket.io (for future) 
