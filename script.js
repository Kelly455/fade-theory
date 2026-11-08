const form = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

// Set the date input's minimum to tomorrow
const dateInput = document.getElementById('date');
if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');

    dateInput.min = `${year}-${month}-${day}`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Clear previous messages and red boxes
    formError.hidden = true;
    formSuccess.hidden = true;
    form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));

    // 2. Validate every field
    const errors = [];

    // NAME
    const nameField = form.elements['name'];
    if (nameField.value.trim().length < 2) {
        nameField.classList.add('invalid');
        errors.push('Enter your full name.');
    }

    // PHONE
    const phoneField = form.elements['phone'];
    const cleanPhone = phoneField.value.replace(/\D/g, '');
    if (cleanPhone.length === 0) {
        phoneField.classList.add('invalid');
        errors.push('Enter your phone number.');
    } else if (cleanPhone.length !== 10) {
        phoneField.classList.add('invalid');
        errors.push(`Phone number must be 10 digits (you entered ${cleanPhone.length}).`);
    }

    // EMAIL (optional, but if typed it must be valid)
    const emailField = form.elements['email'];
    const emailVal = emailField.value.trim();
    if (emailVal !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        emailField.classList.add('invalid');
        errors.push('Enter a valid email address, like name@example.com.');
    }

    // SERVICE
    const serviceField = form.elements['service'];
    if (serviceField.value === '') {
        serviceField.classList.add('invalid');
        errors.push('Choose a service.');
    }

    // DATE
    const dateField = form.elements['date'];
    if (dateField.value === '') {
        dateField.classList.add('invalid');
        errors.push('Choose a date.');
    } else {
        // Split the date string (YYYY-MM-DD) into components to avoid UTC timezone offset shifts
        const parts = dateField.value.split('-');
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        const day = Number(parts[2]);
        const selectedDate = new Date(year, month - 1, day);

        // Rule 1: Past dates check (must be strictly after today at midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            dateField.classList.add('invalid');
            errors.push('Please choose a future date.');
        }
        // Rule 2: Closed days check (Sunday = 0, Monday = 1)
        else {
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 1) {
                dateField.classList.add('invalid');
                errors.push("We're closed Sunday and Monday. Choose Tuesday to Saturday.");
            }
        }
    }

    // TIME
    const timeField = form.elements['time'];
    if (timeField.value === '') {
        timeField.classList.add('invalid');
        errors.push('Choose a time.');
    }

    // 3. THE GUARD: if any check failed, stop here
    if (errors.length > 0) {
        formError.textContent = errors.join(' ');
        formError.hidden = false;
        form.querySelector('.invalid').focus();
        return;
    }

    // 4. Send
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formSuccess.textContent = 'Message sent successfully. We will contact you to confirm your appointment.';
            formSuccess.hidden = false;
            form.reset();
        } else {
            formError.textContent = "Sorry, your request wasn't sent. Please try again.";
            formError.hidden = false;
        }
    } catch (err) {
        console.log(err);
        formError.textContent = 'Network error. Please check your connection and try again.';
        formError.hidden = false;
    } finally {
        submitBtn.disabled = false;
    }
});