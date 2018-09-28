# History Service

## Purpose
**Provide data to requesters about services.**

## API
| method 	| resource 			| params 	| result 		|
| ---		| ---				| ---		| ---			|
| GET 		| /					| N/a 		| none 			|
| GET 		| /api 				| N/a 		| {result: int} |
| PUT		| /api/:serviceName | url 		| none || 400	|

### TODO
* Add resource to retrieve all the current service names.
* Add resource to retrieve all the current service data, names and status.
