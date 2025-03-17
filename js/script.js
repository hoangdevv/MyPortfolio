// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
    });
    
    // Xử lý sự kiện click cho các liên kết trong dự án
    const projectLinks = document.querySelectorAll('.project-link, .project-overlay a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Nếu là liên kết nội bộ (không phải external link)
            if (!this.getAttribute('target')) {
                e.preventDefault();
                const href = this.getAttribute('href');
                window.location.href = href;
            }
        });
    });
    
    // Xử lý sự kiện click cho các hình ảnh dự án
    const projectImages = document.querySelectorAll('.project-image-container');
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            const link = this.querySelector('a') || this.parentElement.querySelector('.project-link:last-child');
            if (link) {
                const href = link.getAttribute('href');
                if (!link.getAttribute('target')) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank');
                }
            }
        });
    });
});

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const mainNav = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 100) {
        mainNav.classList.add('navbar-scrolled');
        backToTop.classList.add('active');
    } else {
        mainNav.classList.remove('navbar-scrolled');
        backToTop.classList.remove('active');
    }
});

// Back to top button functionality
document.getElementById('backToTop').addEventListener('click', function(e) {
        e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link, .hero-buttons a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash !== '') {
        e.preventDefault();
            const hash = this.hash;
            
            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Typing animation for code
const codeContainer = document.querySelector('.code-container code');
if (codeContainer) {
    const codeLines = codeContainer.textContent;
    codeContainer.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
        if (i < codeLines.length) {
            codeContainer.textContent += codeLines.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Initialize particles.js
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4CAF50'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4CAF50',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Khởi tạo EmailJS - Thay thế bằng Public Key của bạn
    (function() {
        emailjs.init("wDNvmUiyS4ozh3MMY"); 
    })();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Kiểm tra form hợp lệ
        if (!this.checkValidity()) {
            this.classList.add('was-validated');
            return;
        }
        
        // Hiển thị trạng thái đang gửi
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';
        
        // Lấy dữ liệu từ form
        const formData = {
            from_name: document.getElementById('name').value,
            reply_to: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Gửi email sử dụng EmailJS
        emailjs.send("service_portfolio", "template_u4btc4b", formData) // Thay thế bằng Service ID và Template ID thật của bạn
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Hiển thị thông báo thành công
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success mt-3';
                successAlert.innerHTML = 'Cảm ơn bạn đã liên hệ! Tin nhắn của bạn đã được gửi thành công.';
                contactForm.appendChild(successAlert);
                
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Xóa thông báo sau 5 giây
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                
                // Hiển thị thông báo lỗi
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-danger mt-3';
                errorAlert.innerHTML = 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.';
                contactForm.appendChild(errorAlert);
                
                // Xóa thông báo sau 5 giây
                setTimeout(() => {
                    errorAlert.remove();
                }, 5000);
            })
            .finally(() => {
                // Khôi phục nút gửi
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

// Animate skill bars when scrolled into view
function animateSkillBars() {
    document.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = progress.style.width;
    });
}

// Kích hoạt animation khi scroll đến phần kỹ năng
const skillsSection = document.getElementById('ky-nang');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
}

// CV Download Button
const cvDownloadBtn = document.querySelector('a[download]');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function(e) {
        // Thêm hiệu ứng khi nhấp vào nút tải
        const btnText = this.textContent.trim();
        
        // Thêm class để tạo hiệu ứng
        this.classList.add('btn-downloading');
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang tải...';
        
        // Sau 1 giây, khôi phục nút về trạng thái ban đầu
        setTimeout(() => {
            this.classList.remove('btn-downloading');
            this.innerHTML = 'Tải CV <i class="fas fa-download ms-1"></i>';
            
            // Hiển thị thông báo đã tải thành công
            const downloadAlert = document.createElement('div');
            downloadAlert.className = 'cv-download-alert';
            downloadAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i>CV đã được tải xuống!';
            document.body.appendChild(downloadAlert);
            
            // Xóa thông báo sau 3 giây
            setTimeout(() => {
                downloadAlert.classList.add('fade-out');
                setTimeout(() => {
                    downloadAlert.remove();
                }, 500);
            }, 3000);
        }, 1000);
    });
}