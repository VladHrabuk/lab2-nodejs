# Lab 2

## Task

Build small http server with router without using any framework. Use ESM modules for project. Server should include
simple router, write it yourself. Please add 3-6 routes.

### Requirements

- change default loader to ECMAScript module loader.
- support different HTTP Methods (POST, GET, OPTIONS) for one route
- support 2+ different content types (json, xml, formdata, urlencode)
- follow specification for JSON
- handle graceful shutdown

## Answer on questions

- Why we have separate http and https?
  - HTTP is used for unsecured communication over the internet, while HTTPS is a secure version that uses encryption
    (SSL/TLS) to protect data during transmission.
- Is it good idea to parse urls with REGEX?
  - It is not recommended. Parsing URLs with regular expressions can be error-prone and complex due to the varied
    URL structures.
