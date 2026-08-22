// Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#skills');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Profile image modal
    const profileImage = document.getElementById('profileImage');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Scroll reveal animations
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});