# Web Services and APIs Intro

- [Web Services and APIs Intro](#web-services-and-apis-intro)
  - [Overview](#overview)
  - [Web Services](#web-services)
    - [Benefits of Web Services](#benefits-of-web-services)
    - [Web Services vs. APIs vs. Microservices](#web-services-vs-apis-vs-microservices)
      - [APIs](#apis)
      - [Microservices](#microservices)

## Overview

- Web services, APIs, and microservices all have a similar premise.
  - Allow you to share data between two separate systems.
  - Seamless integration between systems.
- Web services communicate between systems, rather than with users.

## Web Services

- A way to share data between two disparate systems.
- Designed to communicate with other applications, rather than with users.
- Often used to integrate systems for seamless data sharing.
- Communication typically happens between a client and a server.
  - The client makes the request.
  - The server responds to the request.
- Web services work by using standardized communication protocols, such as HTTP.
  - This allows communication between systems that are writen in different programming languages.
- Data is also shared through a standardized method, such as XML or JSON.

### Benefits of Web Services

- Reusability
  - Web services allow you to reuse the same data in multiple systems.
- Usability
  - An easy way to expose business logic and data to a wide range of audiences and platforms.
  - Hopefully in a secure manner.

### Web Services vs. APIs vs. Microservices

- APIs and microservices are evolutions of the web service.

#### APIs

- APIs allow data sharing across systems.
- APIs are more dynamic than web services.
  - Replaces SOAP with REST.
  - More lightweight and streamlined.
  - Web services typically have more overhead to work with.
- The primary difference is the amount of work it takes consumers and providers to work with the system.
  - Web services take more work.
- Here's a [big list](https://github.com/public-apis/public-apis/blob/master/README.md) of public APIs.

#### Microservices

- Similar to APIs.
- Fully contained components that communicate with each other and clients.
  - This means that it contains both the access layer and data layer in the same package.
  - So, a location microservice contains not only the access method, but also the location data.
- Modeled around a specific business domain.
