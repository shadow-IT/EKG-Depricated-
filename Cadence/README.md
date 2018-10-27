# Cadence ⏰ :timer_clock:

## Purpose
**To activate the EKG services for the subscribers, based on their individual configuration. Ensures the subscribers are tested on a custom cadence.**

## API
| method 	| resource 			| params 				| result 		|
| ---		| ---				| ---					| ---			|
| GET 		| /					| N/a 					| TODO 			|
| GET 		| /health			| N/a 					| TODO			|
TODO

## Usage
As a user of this API 
- I would like to set an interval where my subscription will be activated.
- I would like to update the interval.

## TODO
- Add a redis DB to keep the custom cadence in memory.
- Have the service update its cadence from the Subscription service, where the cadence is stored and updated.
