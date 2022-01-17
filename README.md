## Please follow the following:

`npm install`

## To run the app with input:

Example input:
`npm start 10 5 "1 0 1" "2 0 1" "3 0 1" "4 0 1" "4 1 1" "5 1 1" "6 1 1" "7 1 1"`

Output:

```
> cab-allocation-system-task@1.0.0 start
> node index.js "10" "5" "1 0 1" "2 0 1" "3 0 1" "4 0 1" "4 1 1" "5 1 1" "6 1 1" "7 1 1"

Employee-1 booked the cab-1 for slot-0.
Employee-3 booked the cab-3 for slot-0.
** Sorry cannot allocate for slot 0 at the moment. Please check different slot or try later **
Employee-4 booked the cab-4 for slot-1.
Employee-5 booked the cab-5 for slot-1.
** No cabs available at the moment. Please wait... **
Booking for Employee-1 for the cab-1 is finished.
Employee-6 booked the cab-1 for slot-1.
** No cabs available at the moment. Please wait... **
Booking for Employee-2 for the cab-2 is finished.
Booking for Employee-3 for the cab-3 is finished.
Booking for Employee-4 for the cab-4 is finished.
Booking for Employee-5 for the cab-5 is finished.
Employee-7 booked the cab-2 for slot-1.
Booking for Employee-6 for the cab-1 is finished.
Booking for Employee-7 for the cab-2 is finished.
```
