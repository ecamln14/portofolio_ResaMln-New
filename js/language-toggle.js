// Language Toggle
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    
    // Check for saved preference
    const savedLang = localStorage.getItem('language') || 'en';
    if (savedLang === 'id') {
        toggleLanguage();
        languageToggle.querySelector('span').textContent = 'EN';
    }
    
    // Toggle language
    languageToggle.addEventListener('click', function() {
        toggleLanguage();
        
        const currentLang = this.querySelector('span').textContent;
        const newLang = currentLang === 'EN' ? 'ID' : 'EN';
        this.querySelector('span').textContent = newLang;
        localStorage.setItem('language', newLang === 'EN' ? 'en' : 'id');
    });
    
    function toggleLanguage() {
        const englishElements = document.querySelectorAll('.en');
        const indonesianElements = document.querySelectorAll('.id');
        
        englishElements.forEach(el => {
            el.style.display = el.style.display === 'none' ? 'inline' : 'none';
        });
        
        indonesianElements.forEach(el => {
            el.style.display = el.style.display === 'none' ? 'inline' : 'none';
        });
    }
});