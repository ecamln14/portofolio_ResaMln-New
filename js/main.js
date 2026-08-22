// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
                        this.reset();
                        window.location.href = 'Thank-You.html';
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(() => {
                    alert('Sorry, something went wrong sending your message. Please email me directly instead.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }
    
    // Featured project case studies
    const projectData = {
        digimandala: {
            title: { en: 'Mobile Training Administration App with Midtrans Payment Gateway', id: 'Aplikasi Administrasi Pelatihan Berbasis Mobile dengan Payment Gateway Midtrans' },
            meta: 'PT. Digimandala (DTH.ID) - Final Year Thesis Project - Sep 2025 - Dec 2025',
            gallery: [
                { src: 'images/projects/digimandala/admin-dashboard.png', alt: 'Admin dashboard overview' },
                { src: 'images/projects/digimandala/admin-transactions.png', alt: 'Admin transaction verification panel' },
                { src: 'images/projects/digimandala/mobile-payment.png', alt: 'Mobile Midtrans payment screen' },
                { src: 'images/projects/digimandala/mobile-review.png', alt: 'Mobile training review screen' }
            ],
            problem: {
                en: 'DTH.ID is a training company founded in August 2025 with no digital administration system yet. Registration, payment confirmation, attendance, and certificate issuance were all planned to run manually through WhatsApp, spreadsheets, and physical documents, risking data errors, slow payment verification, and poor attendance tracking as the company grew — especially for online sessions.',
                id: 'DTH.ID adalah perusahaan pelatihan yang baru berdiri Agustus 2025 dan belum memiliki sistem administrasi digital. Pendaftaran, konfirmasi pembayaran, absensi, dan penerbitan sertifikat direncanakan berjalan manual lewat WhatsApp, spreadsheet, dan dokumen fisik, yang berisiko menimbulkan kesalahan data, verifikasi pembayaran lambat, dan pemantauan kehadiran yang sulit seiring pertumbuhan perusahaan, khususnya untuk sesi online.'
            },
            contributions: {
                en: [
                    'Designed and built the system solo as a final-year thesis, using an Agile-inspired iterative approach across 8 sprints (requirements, design, implementation, testing) over 17 weeks',
                    'Built the mobile app in Flutter (tested on Android) and a Laravel 11 REST API backend with MySQL, covering 10+ entities (users, roles, training packages, transactions, attendance, certificates, reviews)',
                    'Integrated Midtrans Snap API supporting bank transfer, e-wallet, and QRIS, with automatic payment-status updates driven by webhook notifications',
                    'Implemented Role-Based Access Control (RBAC) distinguishing Super Admin (full technical access) from Operational Admin (daily verification tasks)',
                    'Built a digital attendance module supporting both offline (photo proof) and online (session screenshot) training modes, with admin verification',
                    'Gated certificate downloads and review submission behind attendance completion, and prevented duplicate reviews per participant',
                    'Authenticated users with Laravel Sanctum token-based auth and bcrypt password hashing',
                    'Ran 20 Black Box Testing scenarios (positive and negative cases) covering registration, payment, RBAC, attendance, and certificates — all 20 passed'
                ],
                id: [
                    'Merancang dan membangun sistem seorang diri sebagai Tugas Akhir, menggunakan pendekatan iteratif ala Agile dalam 8 sprint (requirements, design, implementation, testing) selama 17 minggu',
                    'Membangun aplikasi mobile dengan Flutter (diuji di Android) dan backend REST API Laravel 11 dengan MySQL, mencakup 10+ entitas (user, role, paket pelatihan, transaksi, absensi, sertifikat, ulasan)',
                    'Mengintegrasikan Midtrans Snap API yang mendukung transfer bank, e-wallet, dan QRIS, dengan pembaruan status pembayaran otomatis berdasarkan notifikasi webhook',
                    'Menerapkan Role-Based Access Control (RBAC) yang membedakan Super Admin (akses teknis penuh) dan Admin Operasional (tugas verifikasi harian)',
                    'Membangun modul absensi digital untuk mode offline (unggah foto) dan online (screenshot sesi), dengan verifikasi admin',
                    'Membatasi unduhan sertifikat dan pengiriman ulasan sampai syarat kehadiran terpenuhi, serta mencegah ulasan ganda per peserta',
                    'Mengautentikasi pengguna dengan token Laravel Sanctum dan hashing password bcrypt',
                    'Menjalankan 20 skenario Black Box Testing (kasus positif & negatif) mencakup registrasi, pembayaran, RBAC, absensi, dan sertifikat — seluruhnya lolos'
                ]
            },
            tech: ['Flutter', 'Laravel 11', 'MySQL', 'Midtrans Snap API', 'Laravel Sanctum', 'REST API']
        },
        lendeng: {
            title: { en: 'Multi-Chapter Membership Management System (Mobile Admin App)', id: 'Sistem Manajemen Anggota Multi-Chapter (Aplikasi Admin Mobile)' },
            meta: 'Lendeng - Freelance - Feb 2026 - Mar 2026',
            gallery: [
                { src: 'images/projects/lendeng/dashboard.png', alt: 'Admin dashboard overview' },
                { src: 'images/projects/lendeng/member-list.png', alt: 'Member list management' },
                { src: 'images/projects/lendeng/qr-verification.png', alt: 'QR code member verification' },
                { src: 'images/projects/lendeng/pramember-approval.png', alt: 'Pre-member registration approval flow' }
            ],
            problem: {
                en: 'Lendeng needed to manage member registration, approvals, QR-based verification, and rewards/punishment tracking consistently across multiple regional chapters, with different admins only able to see and act on their own chapter\'s data.',
                id: 'Lendeng membutuhkan pengelolaan pendaftaran anggota, persetujuan, verifikasi berbasis QR, dan pencatatan reward/punishment yang konsisten di berbagai chapter daerah, dengan tiap admin chapter hanya bisa melihat dan mengelola data chapter-nya sendiri.'
            },
            contributions: {
                en: [
                    'Primarily built the React Native mobile admin app (with some backend work in Laravel when needed), consuming a Laravel + MySQL REST API covering 18+ entities (members, pre-members, chapters, roles, permissions, rewards, punishments, social activities, mutations)',
                    'Built the member and pre-member registration/approval flow: pre-members go through a 3-month trial period before a central admin approves or rejects them, converting the record into a full member',
                    'Developed a QR code feature for real-time member verification with chapter-based rules — chapter admins scanning a member outside their chapter see a restricted message, while the central admin (chapter "Pentagon") can view any member\'s details',
                    'Implemented Role-Based Access Control (RBAC) with a multi-role scheme (a user can hold more than one role) distinguishing a central admin from chapter admins, with all list views automatically scoped and filtered to the logged-in admin\'s own chapter',
                    'Built document/media handling for ID cards (KTP) and membership cards (KTA) with front/back uploads, a 1-year KTA validity period, and automatic warnings when a card is expired or about to expire',
                    'Added a point-based "activity level" module and reward/punishment tracking linked to individual members and chapter-wide social activities',
                    'Handled 60+ iterative fix and feature-development tasks based on client feedback across weekly cycles — bug fixes, UI/UX revisions, database schema adjustments, and duplicate-data validation',
                    'Localized the entire admin interface into Indonesian and added save/duplicate-entry alerts across all modules'
                ],
                id: [
                    'Membangun aplikasi admin mobile dengan React Native (kadang juga menangani sisi backend Laravel bila diperlukan), mengonsumsi REST API Laravel + MySQL yang mencakup 18+ entitas (member, pra-member, chapter, role, permission, reward, punishment, kegiatan sosial, mutasi anggota)',
                    'Membangun alur pendaftaran dan persetujuan member/pra-member: pra-member melalui masa trial 3 bulan sebelum disetujui atau ditolak admin pusat, lalu datanya dikonversi menjadi member penuh',
                    'Mengembangkan fitur QR code untuk verifikasi anggota secara real-time dengan aturan berbasis chapter — admin chapter yang scan anggota dari chapter lain akan melihat pesan akses dibatasi, sementara admin pusat (chapter "Pentagon") bisa melihat detail anggota manapun',
                    'Mengimplementasikan Role-Based Access Control (RBAC) dengan skema multi-role (satu user bisa punya lebih dari satu role) yang membedakan admin pusat dan admin chapter, dengan semua tampilan data otomatis difilter sesuai chapter admin yang login',
                    'Membangun penanganan dokumen/media untuk KTP dan KTA (kartu tanda anggota) dengan upload depan/belakang, masa berlaku KTA 1 tahun, dan peringatan otomatis saat kartu kedaluwarsa atau mendekati kedaluwarsa',
                    'Menambahkan modul "level keaktifan" berbasis poin serta pencatatan reward/punishment yang terhubung ke masing-masing anggota dan kegiatan sosial per chapter',
                    'Menangani 60+ task perbaikan dan pengembangan fitur secara iteratif berdasarkan feedback klien dalam siklus mingguan — bug fixing, revisi UI/UX, penyesuaian skema database, dan validasi data duplikat',
                    'Melokalisasi seluruh antarmuka admin ke Bahasa Indonesia dan menambahkan alert simpan/data duplikat di semua modul'
                ]
            },
            tech: ['React Native', 'Laravel', 'MySQL', 'QR Code', 'RBAC']
        },
        trackinventori: {
            title: { en: 'Inventory & Point-of-Sale Management System', id: 'Sistem Manajemen Inventori & Kasir (Point-of-Sale)' },
            meta: 'TrackInventori - Personal Project - 2026',
            gallery: [
                { src: 'images/projects/trackinventori/login.png', alt: 'Login page' },
                { src: 'images/projects/trackinventori/dashboard.png', alt: 'Dashboard with stock and transaction chart' },
                { src: 'images/projects/trackinventori/kasir-pos.png', alt: 'Point-of-sale cashier screen with QR scan' },
                { src: 'images/projects/trackinventori/data-barang.png', alt: 'Product/inventory data management' },
                { src: 'images/projects/trackinventori/laporan.png', alt: 'Filterable transaction report with export' }
            ],
            problem: {
                en: 'Small businesses tracking stock and sales manually (or across disconnected spreadsheets) struggle to know real-time stock levels, reconcile incoming vs. outgoing goods, and generate accurate transaction reports for a given period.',
                id: 'Usaha kecil yang mencatat stok dan penjualan secara manual (atau lewat spreadsheet terpisah-pisah) kesulitan mengetahui level stok secara real-time, mencocokkan barang masuk vs keluar, dan menghasilkan laporan transaksi yang akurat untuk periode tertentu.'
            },
            contributions: {
                en: [
                    'Built a full inventory + POS system in PHP and MySQL covering authentication, product/category master data, stock in/out transactions, cashier checkout, and reporting',
                    'Developed a cashier (kasir) module with QR code scanning to add products to cart, cash-payment calculation, and change (kembalian) computation',
                    'Built a dashboard summarizing total products, monthly stock in/out, a 7-day transaction chart, and low-stock alerts',
                    'Implemented an incoming/outgoing goods (barang masuk/keluar) module that groups transactions under a shared transaction number and auto-adjusts product stock',
                    'Built a filterable transaction report (date range, type, product) backed by parameterized queries, plus a CSV export of the filtered report for offline record-keeping',
                    'Fixed a full-day date-range bug in the report filter and closed a SQL-injection gap by moving raw date/string inputs into prepared statements'
                ],
                id: [
                    'Membangun sistem inventori + kasir (POS) lengkap dengan PHP dan MySQL, mencakup autentikasi, master data produk/kategori, transaksi barang masuk/keluar, kasir, dan laporan',
                    'Mengembangkan modul kasir dengan scan QR code untuk menambahkan produk ke keranjang, kalkulasi pembayaran tunai, dan perhitungan kembalian',
                    'Membangun dashboard yang merangkum total produk, barang masuk/keluar bulanan, grafik transaksi 7 hari terakhir, dan peringatan stok menipis',
                    'Mengimplementasikan modul barang masuk/keluar yang mengelompokkan transaksi di bawah satu nomor transaksi dan otomatis menyesuaikan stok produk',
                    'Membangun laporan transaksi dengan filter (rentang tanggal, tipe, produk) berbasis parameterized query, plus fitur unduh CSV dari laporan yang sudah difilter untuk pencatatan offline',
                    'Memperbaiki bug rentang tanggal yang memotong hari terakhir pada filter laporan, serta menutup celah SQL injection dengan memindahkan input tanggal/string mentah ke prepared statement'
                ]
            },
            tech: ['PHP', 'MySQL', 'JavaScript', 'QR Code', 'CSV Export'],
            repo: 'https://github.com/ecamln14/inventory-phpNative-WithScanQR'
        },
        bumdes: {
            title: { en: 'Database Audit & Structural Optimization', id: 'Audit & Optimasi Struktur Database' },
            meta: 'BUMDes (idesa) - Freelance - Apr 2025 - May 2025',
            gallery: [
                { src: 'images/projects/bumdes/db-audit-visual.svg', alt: 'Database audit summary: 66 tables audited, 49 queries optimized, 8 tables validated' }
            ],
            problem: {
                en: 'A village-enterprise (BUMDes) application had grown to 66 data tables with overlapping domains built at different times, needing a structural review to catch redundant designs and fix performance issues before they compounded further.',
                id: 'Aplikasi BUMDes telah berkembang menjadi 66 tabel data dengan beberapa domain yang tumpang tindih karena dibangun di waktu berbeda, sehingga butuh tinjauan struktural untuk menangkap desain yang redundan dan mengatasi masalah performa sebelum makin membesar.'
            },
            contributions: {
                en: [
                    'Audited the database structure across 66 village data tables to identify improvement opportunities',
                    'Optimized 49 custom SQL queries using phpMyAdmin and DBeaver to improve performance and efficiency',
                    'Identified a structural redundancy in the "Village Billing" (Tagihan Desa) feature: it had been built as its own domain (dedicated category and billing tables) even though, per business rules, it is just one product type under the existing Partner Products (Produk Mitra BUMDes) structure — creating two parallel, overlapping data paths for the same billing data',
                    'Coordinated with the lead developer to validate the structure of 8 tables related to this feature and flag the redundant design for consolidation',
                    'Prepared periodic technical documentation of findings and fixes for the lead developer to act on'
                ],
                id: [
                    'Mengaudit struktur database di 66 tabel data desa untuk identifikasi potensi perbaikan',
                    'Mengoptimalkan 49 custom query SQL menggunakan phpMyAdmin & DBeaver untuk meningkatkan performa dan efisiensi',
                    'Menemukan redundansi struktural pada fitur "Tagihan Desa": fitur ini dibangun sebagai domain tersendiri (kategori dan tabel tagihan khusus), padahal secara aturan bisnis seharusnya cuma satu jenis produk di bawah struktur Produk Mitra BUMDes yang sudah ada — menyebabkan dua jalur data paralel yang tumpang tindih untuk data tagihan yang sama',
                    'Berkoordinasi dengan developer utama untuk validasi struktur 8 tabel terkait fitur ini dan menandai desain yang redundan untuk dikonsolidasikan',
                    'Menyusun dokumentasi teknis temuan dan perbaikan secara berkala untuk ditindaklanjuti developer utama'
                ]
            },
            tech: ['MySQL', 'phpMyAdmin', 'DBeaver', 'SQL Optimization']
        }
    };

    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const projectModalClose = document.getElementById('projectModalClose');

    function getCurrentLang() {
        return document.querySelector('.en').style.display === 'none' ? 'id' : 'en';
    }

    function openProjectModal(key) {
        const data = projectData[key];
        if (!data || !projectModalBody) return;
        const lang = getCurrentLang();
        const problemLabel = lang === 'id' ? 'Masalah' : 'The Problem';
        const contribLabel = lang === 'id' ? 'Kontribusi Saya' : 'My Contribution';
        const techLabel = lang === 'id' ? 'Tech Stack' : 'Tech Stack';

        const galleryHtml = data.gallery
            ? `<div class="project-modal-gallery">${data.gallery.map(g => `<img src="${g.src}" alt="${g.alt}">`).join('')}</div>`
            : '';

        const repoLabel = lang === 'id' ? 'Lihat Kode' : 'View Code';
        const repoHtml = data.repo
            ? `<a href="${data.repo}" target="_blank" class="project-link" style="display:inline-flex;align-items:center;gap:6px;margin-top:10px"><i class="fab fa-github"></i> ${repoLabel}</a>`
            : '';

        projectModalBody.innerHTML = `
            <h3>${data.title[lang]}</h3>
            <div class="project-modal-meta">${data.meta}</div>
            ${repoHtml}
            ${galleryHtml}
            <h5>${problemLabel}</h5>
            <p>${data.problem[lang]}</p>
            <h5>${contribLabel}</h5>
            <ul>${data.contributions[lang].map(item => `<li>${item}</li>`).join('')}</ul>
            <h5>${techLabel}</h5>
            <div class="project-tech">${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        `;
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        projectModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.featured-project-card').forEach(card => {
        card.addEventListener('click', function() {
            openProjectModal(this.getAttribute('data-project'));
        });
    });

    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
    
    // Scroll progress bar
    window.addEventListener('scroll', function() {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        document.getElementById('progressBar').style.width = scrollProgress + '%';
    });
});