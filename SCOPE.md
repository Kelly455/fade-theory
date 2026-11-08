# Fade Theory Barbers: Scope

## Site shows
Services and prices (Haircut $30, Beard Trim $15, Both $40), hours, location, one booking form.

## Booking form collects
Name (required), phone (required), email (optional), service, preferred date, preferred time.

## On submit
JS validates, then sends to Formspree, which emails Marcus. Success: green message “Request sent. Marcus will confirm by text or email.” Failure: red message, form data kept so the customer doesn't retype. A honeypot field blocks bots.

## Not building
Payments, accounts/login, admin dashboard, live availability, reviews, SMS reminders.
Known limitation: two customers can request the same slot. Marcus resolves manually.

## Assumption (until Marcus answers)
Open Tue–Sat 9am–6pm, hourly slots. Closed Sun and Mon.

## Question for Marcus
What are your opening and closing times, Tuesday through Saturday?