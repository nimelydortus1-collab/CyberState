// Course data
const courses = [
    {
        id: 1,
        title: "Python Programming",
        description: "Learn Python from basics to advanced. Perfect for beginners and intermediate programmers.",
        price: 99.99,
        image: "./images/image-10.png"
    },
    {
        id: 2,
        title: "Computer Networking",
        description: "Master networking concepts, protocols, and practical applications.",
        price: 89.99,
        image: "./images/image-4.jpg"
    },
    {
        id: 3,
        title: "Virtual Reality Development",
        description: "Create immersive VR experiences using modern tools and techniques.",
        price: 149.99,
        image: "./images/image-2.jpg"
    },
    {
        id: 4,
        title: "JavaScript Fundamentals",
        description: "Comprehensive JavaScript course covering ES6+ features and modern web development.",
        price: 79.99,
        image: "./images/image-8.png"
    },
    {
        id: 5,
        title: "Cybersecurity Essentials",
        description: "Learn to protect systems and data from cyber threats.",
        price: 119.99,
        image: "./images/image-3.jpg"
    },
    {
        id: 6,
        title: "Ethical Hacking",
        description: "Discover vulnerabilities and learn ethical hacking techniques.",
        price: 129.99,
        image: "./images/image-1.jpg"
    },
    {
        id: 7,
        title: "PHP Web Development",
        description: "Build dynamic websites with PHP and MySQL.",
        price: 89.99,
        image: "./images/image-9.png"
    },
    {
        id: 8,
        title: "Deep Web Monitoring",
        description: "Learn to monitor and analyze activities on the deep web for security purposes.",
        price: 159.99,
        image: "./images/image-11.jpg"
    },
    {
        id: 9,
        title: "Dark Web Monitoring",
        description: "Advanced techniques for monitoring dark web marketplaces and threats.",
        price: 179.99,
        image: "./images/image-7.png"
    },
    {
        id: 10,
        title: "Digital Forensics",
        description: "Master digital evidence collection, analysis, and preservation techniques.",
        price: 149.99,
        image: "./images/image-5.jpg"
    },
    {
        id: 11,
        title: "Cyber Crime Investigation",
        description: "Comprehensive course on investigating cyber crimes and building cases.",
        price: 169.99,
        image: "./images/image-6.png"
    },
    {
        id: 12,
        title: "Big Data in Cybersecurity",
        description: "Use big data analytics to detect and prevent cyber threats.",
        price: 189.99,
        image: "./images/image-4.jpg"
    },
    {
        id: 13,
        title: "Advanced Ethical Hacking",
        description: "Advanced penetration testing and ethical hacking methodologies.",
        price: 199.99,
        image: "./images/image-3.jpg"
    },
    {
        id: 14,
        title: "Network Security Fundamentals",
        description: "Learn to secure networks against modern cyber threats.",
        price: 139.99,
        image: "./images/image-2.jpg"
    },
    {
        id: 15,
        title: "Incident Response and Management",
        description: "Develop skills to respond effectively to cybersecurity incidents.",
        price: 159.99,
        image: "./images/image-1.jpg"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load courses
function loadCourses() {
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = courses.map(course => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <p class="card-text fw-bold text-primary">$${course.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${course.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(courseId) {
    const course = courses.find(c => c.id === courseId);
    const existingItem = cart.find(item => item.id === courseId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...course, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${course.title} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Load cart items
function loadCartItems() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = `
        ${cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h6>${item.title}</h6>
                    <p>$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('')}
        <hr>
        <h5>Total: $${total.toFixed(2)}</h5>
    `;
}

// Remove from cart
function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // For demo purposes, show a message
    // In a real application, this would integrate with Stripe
    alert('Checkout functionality would be implemented here with Stripe payment processing.');
    
    // Clear cart after "checkout"
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    updateCartCount();
    
    document.getElementById('cart-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadCartItems();
        const modal = new bootstrap.Modal(document.getElementById('cartModal'));
        modal.show();
    });
    
    document.getElementById('checkout-btn').addEventListener('click', checkout);
});