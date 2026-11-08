# Fade Theory Barbers

Booking-request website for a fictional Atlanta barbershop. Built with plain HTML, CSS and JavaScript, with no frameworks or libraries.

**Goal of the page:** let a customer request an appointment, and deliver the request to the shop owner's email.

## Features
- Mobile-first responsive layout (checked at 375px, 800px and 1440px)
- Booking form sending to Formspree, which emails the owner
- Field-by-field validation: name, 10-digit phone, optional email format, service, date, time
- Date rules: future dates only, closed Sunday and Monday
- Specific red messages and highlighted fields on errors, a green message on success, and form data kept on failure
- Honeypot field and a disabled send button while submitting, to block bots and double-sends
- Keyboard-visible focus states and reduced-motion support

## Limits (by design)
- No payments, accounts, admin dashboard, live availability or SMS reminders. See SCOPE.md.
- Two customers can request the same slot. The owner confirms each request by hand.
- Validation in the browser catches honest mistakes. Spam filtering is handled by Formspree and the honeypot.
- Address, hours and reviews are placeholders.

## Credits
- Hero photo: Acton Crawford on Unsplash.
- Form delivery: Formspree.