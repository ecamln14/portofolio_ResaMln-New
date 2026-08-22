document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeStyle = document.getElementById('darkModeStyle');
    
    // Fungsi untuk mengaktifkan dark mode
    function enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeStyle.disabled = false;
        localStorage.setItem('theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
    }
    
    // Fungsi untuk menonaktifkan dark mode
    function disableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'light');
        darkModeStyle.disabled = true;
        localStorage.setItem('theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> <span>Dark</span>';
    }
    
    // Cek preferensi yang tersimpan
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Terapkan tema awal
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Toggle dark mode saat tombol diklik
    darkModeToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Dengarkan perubahan preferensi sistem
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
});