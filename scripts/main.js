// This file contains the JavaScript code for the website. It handles interactivity and dynamic content on the web page.

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('show') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Video player functionality for Life Coaching page
    const playButton = document.querySelector('.play-button');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (playButton && videoPlaceholder) {
        playButton.addEventListener('click', function() {
            const img = videoPlaceholder.querySelector('img');
            const videoId = 'dQw4w9WgXcQ'; // Sample YouTube video ID - replace with your actual video
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '100%');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            
            videoPlaceholder.innerHTML = '';
            videoPlaceholder.appendChild(iframe);
            videoPlaceholder.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
            videoPlaceholder.style.height = '0';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('show')) {
                        menuToggle.classList.remove('active');
                        nav.classList.remove('show');
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    });

    // Handle contact form submission
    const contactForms = document.querySelectorAll('.contact-form');
    
    if (contactForms.length > 0) {
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple validation
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    return;
                }
                
                // Collect form data
                const formData = new FormData(form);
                const formDataObj = {};
                
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // In a real application, you would send this data to a server
                console.log('Form submitted with data:', formDataObj);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                
                form.innerHTML = '';
                form.appendChild(successMessage);
            });
        });
    }

    // Add a class to header when scrolling down
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Property gallery functionality for real estate page
    const propertyThumbnails = document.querySelectorAll('.property-gallery img');
    
    if (propertyThumbnails.length > 0) {
        propertyThumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const mainImage = this.closest('.property-card').querySelector('.property-main-image img');
                
                if (mainImage) {
                    const mainSrc = mainImage.src;
                    mainImage.src = this.src;
                    this.src = mainSrc;
                    
                    // Add animation class
                    mainImage.classList.add('fade-in');
                    setTimeout(() => {
                        mainImage.classList.remove('fade-in');
                    }, 500);
                }
            });
        });
    }
    
    // Animated counters for security stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateCounter = (element, target) => {
            const numberWithoutSymbol = target.replace(/[^\d.]/g, '');
            const hasSymbol = target !== numberWithoutSymbol;
            const symbol = hasSymbol ? target.replace(numberWithoutSymbol, '') : '';
            const targetNum = parseFloat(numberWithoutSymbol);
            const duration = 1500;
            const step = targetNum / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < targetNum) {
                    if (Number.isInteger(targetNum)) {
                        element.textContent = Math.floor(current) + symbol;
                    } else {
                        element.textContent = current.toFixed(2) + symbol;
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.textContent;
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Portfolio filtering functionality for Web Development page
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = 0;
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Testimonial slider for Web Development page
    const testimonialButtons = document.querySelectorAll('.testimonial-button');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (testimonialButtons.length > 0) {
        testimonialButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get slide index
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                
                // Remove active class from all buttons and slides
                testimonialButtons.forEach(btn => btn.classList.remove('active'));
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                
                // Add active class to clicked button and corresponding slide
                this.classList.add('active');
                testimonialSlides[slideIndex].classList.add('active');
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        let currentSlide = 0;
        const autoRotate = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            
            // Remove active class from all buttons and slides
            testimonialButtons.forEach(btn => btn.classList.remove('active'));
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to next button and slide
            testimonialButtons[currentSlide].classList.add('active');
            testimonialSlides[currentSlide].classList.add('active');
        }, 5000);
        
        // Stop auto-rotation when user interacts with controls
        testimonialButtons.forEach(button => {
            button.addEventListener('click', () => {
                clearInterval(autoRotate);
            });
        });
    }
    
    // Add fade-in animation for portfolio items
    const fadeInElements = document.querySelectorAll('.portfolio-item, .process-step, .tech-icon');
    
    if (fadeInElements.length > 0) {
        const fadeInOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, fadeInOptions);
        
        fadeInElements.forEach(element => {
            element.classList.add('fade-in-element');
            fadeInObserver.observe(element);
        });
    }
});