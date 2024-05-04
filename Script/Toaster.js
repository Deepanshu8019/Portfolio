const notifications = document.querySelector(".notifications"),
      buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Success: Message sent Successfully.',
    },
    error: {
        icon: 'fa-circle-xmark',
        text: 'Error: This is an error toast.',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning: This is a warning toast.',
    },
    info: {
        icon: 'fa-circle-info',
        text: 'Info: This is an information toast.',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

const createToast = (id) => {
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Function to check form validity and create toast
const sendEmail = () => {
    const form = document.querySelector('.form');
    if (form.checkValidity()) {
        createToast('success');
        Email.send({
            SecureToken: "05615ec9-6cd2-4d5e-8493-a3a5538980c0",
            To: 'deepanshushukla9585@gmail.com',
            From: 'deepanshushukla9585@gmail.com',
            Subject: "Message from Portfolio",
            Body: "Name: " + document.getElementById("Name").value
              + "<br> Email: " + document.getElementById("Email").value
              + "<br> Subject: " + document.getElementById("Subject").value
              + "<br> Meassage: " + document.getElementById("Message").value
          })
        form.reset(); // Assuming reset is a function to clear the form fields
        
        // Disable the submit button to prevent multiple submissions
        // document.querySelector('.form .btn').setAttribute('disabled', 'true');
    } else {
        createToast('error');
    }
}

// Adding a submit event listener to the form
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    sendEmail(); // Calling the function to send email
});
