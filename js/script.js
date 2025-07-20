// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Show custom amount field when selected
const customAmountRadio = document.getElementById('amount-custom');
const customAmountGroup = document.getElementById('custom-amount-group');

customAmountRadio.addEventListener('change', () => {
    if (customAmountRadio.checked) {
        customAmountGroup.style.display = 'block';
    } else {
        customAmountGroup.style.display = 'none';
    }
});

// Animate progress bars when they come into view
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        
        if (isVisible && !bar.style.transition) {
            bar.style.transition = 'width 1.5s ease';
            // Force reflow to trigger the animation
            void bar.offsetWidth;
            bar.style.width = bar.style.width; // This will use the inline style width we set earlier
        }
    });
};

// Initial check and then on scroll
animateProgressBars();
window.addEventListener('scroll', animateProgressBars);

// Form submission with EmailJS
const donateForm = document.getElementById('donateForm');
donateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    let amount = document.getElementById('amount-custom').checked 
        ? document.getElementById('custom-amount').value 
        : document.querySelector('input[name="amount"]:checked').value;

    // Generate random transaction ID
    const transactionId = 'TXN' + Math.floor(Math.random() * 1000000);

    try {
        // Send email via EmailJS
        await emailjs.send('service_rymk7de', 'template_r3s2vhm', {
            name: name,
            email: email,
            amount: '₹' + amount,
            random_id: transactionId,
            today_date: new Date().toLocaleDateString('en-IN')
        });

        // Show success message
        alert(`Thank you, ${name}! A confirmation for your ₹${amount} donation has been sent to ${email}.\nTransaction ID: ${transactionId}`);
        
        // Reset form
        donateForm.reset();
        customAmountGroup.style.display = 'none';
        document.getElementById('amount25').checked = true;

    } catch (error) {
        console.error('Email failed:', error);
        alert('Confirmation email failed to send. Please check your email address or try again later.');
    }
});

// Simple animation for map markers
document.querySelectorAll('.location-marker').forEach(marker => {
    marker.addEventListener('mouseenter', () => {
        marker.querySelector('.marker-dot').style.transform = 'scale(1.5)';
    });
    marker.addEventListener('mouseleave', () => {
        marker.querySelector('.marker-dot').style.transform = 'scale(1)';
    });
});