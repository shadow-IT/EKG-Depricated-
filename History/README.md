# History :orange_book: 📖

## Purpose
**To provide the historical data about EKG subscribers. This includes recent and historical data of the successes and failures to reach the subscriber.**

## API
| method 	| resource 			| params 				| result 		|
| ---		| ---				| ---					| ---			|
| GET 		| /					| N/a 					| none 			|
| GET 		| /api 				| N/a 					| {result: int} |
| PUT		| /api/:serviceName | serviceName: String 	| none or 400	|

## Usage
As a user of this API 
- I would like to be able to send and recieve information about the health of a subscriber.
- I would like to be able to see the status of a subscriber over time.

## TODO
- Add resource to retrieve all the current service names.
- Add resource to retrieve all the current service data, names and status.
