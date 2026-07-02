/**
 * OZEIS CAFE - INTERACTIVE JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();

    // --- 2. Mobile Nav Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        // Toggle bars to times icon
        const icon = navToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // --- 3. Interactive Menu Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to current button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Reset animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.classList.remove('hide');
                        // Re-trigger visual entry transition
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        }, 50);
                    } else {
                        item.classList.add('hide');
                    }
                }, 200);
            });
        });
    });

    // --- 4. Scroll Reveal Animation using IntersectionObserver ---
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-fade');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // offset slightly from bottom
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4, // trigger when 40% of the section is visible
        rootMargin: '-80px 0px -40% 0px' // adjust for nav bar height
    });

    sections.forEach(sec => {
        activeLinkObserver.observe(sec);
    });
});
