// Dark mode toggle
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    // Update icons
    document.querySelectorAll('#dark-toggle i').forEach(icon => {
        icon.classList.toggle('hidden');
    });
    // Save preference
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// On load, set theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    // Ensure correct icon
    if (document.getElementById('dark-toggle')) {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('#dark-toggle i').forEach(icon => {
            if (icon.classList.contains('dark')) {
                icon.classList.toggle('hidden', !isDark);
            } else {
                icon.classList.toggle('hidden', isDark);
            }
        });
    }
});
// Send a message in the current conversation
function sendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    const chat = conversations.find(c => c.id === currentConversationId);
    if (!chat) return;
    chat.messages.push({ fromMe: true, text, time: 'now' });
    input.value = '';
    renderChat();
}
// Render chat UI for the selected conversation
function renderChat() {
    const chat = conversations.find(c => c.id === currentConversationId);
    if (!chat) return;
    // Header
    document.getElementById('chat-avatar').className = `w-10 h-10 rounded-full flex items-center justify-center font-bold ${chat.user.color} ${chat.user.text}`;
    document.getElementById('chat-avatar').textContent = chat.user.avatar;
    document.getElementById('chat-username').textContent = chat.user.name;
    document.getElementById('chat-status').textContent = chat.user.status;
    // Messages
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    chat.messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex items-end gap-2 ${msg.fromMe ? 'justify-end' : ''}`;
        if (!msg.fromMe) {
            msgDiv.innerHTML = `
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold ${chat.user.color} ${chat.user.text}">${chat.user.avatar}</div>
                <div class="bg-white rounded-lg px-4 py-2 shadow text-sm max-w-xs">${msg.text}</div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="bg-blue-500 text-white rounded-lg px-4 py-2 shadow text-sm max-w-xs">${msg.text}</div>
                <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">SU</div>
            `;
        }
        chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
        // Animated reactions

// Switch conversation
function openConversation(id) {
    currentConversationId = id;
    renderChat();
}

// Render conversation list in sidebar
function renderConversationList() {
    const list = document.getElementById('conversation-list');
    if (!list) return;
    list.innerHTML = '';
    conversations.forEach(conv => {
        const isActive = conv.id === currentConversationId;
        const div = document.createElement('div');
        div.className = `flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 transition ${isActive ? 'bg-gray-200' : ''}`;
        div.onclick = () => openConversation(conv.id);
        div.innerHTML = `
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold ${conv.user.color} ${conv.user.text}">${conv.user.avatar}</div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center">
                    <span class="font-medium truncate">${conv.user.name}</span>
                    <span class="text-xs text-gray-400 ml-2">${conv.messages.length ? conv.messages[conv.messages.length-1].time : ''}</span>
                </div>
                <span class="text-sm text-gray-500 truncate">${conv.messages.length ? conv.messages[conv.messages.length-1].text : ''}</span>
            </div>
        `;
        list.appendChild(div);
    });
}

// Initial render for chat and conversation list
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('messages-page')) {
        renderConversationList();
        renderChat();
    }
});

// Update both chat and conversation list when switching
function openConversation(id) {
    currentConversationId = id;
    renderConversationList();
    renderChat();
}
// Initialize Lucide icons
lucide.createIcons();

// Global state
let currentUser = null;
let posts = [
    {
        id: '1',
        content: 'Looking for help with my calculus homework! Need someone to explain derivatives and integration. Can offer help with programming in return.',
        author: { displayName: 'Sarah Johnson', username: 'sarah_codes', avatar: 'SJ' },
        category: 'mathematics',
        postType: 'exchange',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: { count: 12, icon: '👍' },
        replies: { count: 3, icon: '💬' },
        shares: { count: 1, icon: '🔗' }
    },
    {
        id: '2',
        content: 'Commission available: Need a well-researched essay on climate change impacts. 2000 words, APA format. Serious inquiries only.',
        author: { displayName: 'Mike Chen', username: 'mike_research', avatar: 'MC' },
        category: 'science',
        postType: 'commission',
        budget: '150 Pesos',
        deadline: '2025-02-01',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: { count: 8, icon: '👍' },
        replies: { count: 15, icon: '💬' },
        shares: { count: 2, icon: '🔗' }
    },
    {
        id: '3',
        content: 'Looking for a tutor for organic chemistry. Need help understanding reaction mechanisms. Flexible schedule!',
        author: { displayName: 'Emily Smith', username: 'emily_chem', avatar: 'ES' },
        category: 'science',
        postType: 'commission',
        budget: '100 Pesos',
        deadline: '2025-03-15',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: { count: 5, icon: '👍' },
        replies: { count: 2, icon: '💬' },
        shares: { count: 0, icon: '🔗' }
    },
    {
        id: '4',
        content: 'Need assistance with my literature review on Shakespeare. Looking for detailed analysis and insights.',
        author: { displayName: 'John Doe', username: 'john_lit', avatar: 'JD' },
        category: 'english',
        postType: 'commission',
        budget: '200 Pesos',
        deadline: '2025-05-01',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        likes: { count: 10, icon: '👍' },
        replies: { count: 5, icon: '💬' },
        shares: { count: 1, icon: '🔗' }
    }
];

const categories = [
    { value: 'mathematics', label: 'Mathematics', color: 'badge-blue', description: 'Algebra, Calculus, Statistics, Geometry', posts: 156 },
    { value: 'science', label: 'Science', color: 'badge-green', description: 'Physics, Chemistry, Biology, Environmental Science', posts: 134 },
    { value: 'english', label: 'English', color: 'badge-purple', description: 'Literature, Writing, Grammar, Essays', posts: 98 },
    { value: 'history', label: 'History', color: 'badge-orange', description: 'World History, American History, Ancient Civilizations', posts: 67 },
    { value: 'computer-science', label: 'Computer Science', color: 'badge-indigo', description: 'Programming, Data Structures, Algorithms, Web Development', posts: 189 },
    { value: 'art', label: 'Art & Design', color: 'badge-pink', description: 'Visual Arts, Graphic Design, Photography, Digital Art', posts: 45 },
    { value: 'business', label: 'Business', color: 'badge-yellow', description: 'Economics, Marketing, Management, Finance', posts: 73 },
    { value: 'psychology', label: 'Psychology', color: 'badge-red', description: 'Cognitive Psychology, Social Psychology, Research Methods', posts: 54 }
];

// Authentication functions
function toggleAuthForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

function login(email, displayName, username) {
    currentUser = {
        email,
        displayName,
        username,
        avatar: displayName.split(' ').map(n => n[0]).join('')
    };
    
    // Update UI with user info
    document.getElementById('user-name').textContent = displayName;
    document.getElementById('user-username').textContent = `@${username}`;
    document.getElementById('user-avatar').textContent = currentUser.avatar;
    document.getElementById('create-post-avatar').textContent = currentUser.avatar;
    
    // Show dashboard, hide auth
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Initialize pages
    initializePages();
}

function logout() {
    currentUser = null;

    // Reset forms (optional kasi mare-reset na rin sa reload)
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();

    // Redirect
    window.location.href = "index.html";
}


// Page navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Remove active class and style from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active-nav');
        btn.classList.add('btn-ghost');
        btn.style.background = '';
        btn.style.color = '';
    });

    // Show selected page
    document.getElementById(`${pageName}-page`).classList.remove('hidden');

    // Set active nav button
    const navBtn = document.getElementById(`nav-${pageName}`);
    if (navBtn) {
        navBtn.classList.add('active-nav');
        navBtn.classList.remove('btn-ghost');
        navBtn.style.background = 'var(--primary)';
        navBtn.style.color = 'var(--primary-foreground)';
    }
}


// Preview attachment before posting
let postAttachmentData = null;
function previewAttachment(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('attachment-preview');
    preview.innerHTML = '';
    postAttachmentData = null;
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'h-12 w-12 object-cover rounded border';
                preview.appendChild(img);
                postAttachmentData = { type: 'image', name: file.name, data: e.target.result };
            };
            reader.readAsDataURL(file);
        } else {
            const icon = document.createElement('i');
            icon.className = 'w-6 h-6 text-gray-500';
            icon.setAttribute('data-lucide', 'file');
            preview.appendChild(icon);
            const span = document.createElement('span');
            span.textContent = file.name;
            preview.appendChild(span);
            postAttachmentData = { type: 'file', name: file.name };
            if (window.lucide) lucide.createIcons();
        }
    }
}

function createPost() {
    const content = document.getElementById('post-content').value.trim();
    const postType = document.getElementById('post-type').value;
    const category = document.getElementById('post-category').value;
    const budget = document.getElementById('post-budget').value;
    const deadline = document.getElementById('post-deadline').value;
    
    if (!content || !postType || !category) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newPost = {
        id: Date.now().toString(),
        content,
        author: currentUser,
        category,
        postType,
        budget: budget || null,
        deadline: deadline || null,
        timestamp: new Date(),
        likes: { count: 0, icon: '👍' },
        replies: { count: 0, icon: '💬' },
        shares: { count: 0, icon: '🔗' },
        attachment: postAttachmentData ? { ...postAttachmentData } : null
    };

    posts.unshift(newPost);
    
    // Clear form
    document.getElementById('post-content').value = '';
    document.getElementById('post-type').value = '';
    document.getElementById('post-category').value = '';
    document.getElementById('post-budget').value = '';
    document.getElementById('post-deadline').value = '';
    document.getElementById('commission-fields').classList.add('hidden');
    document.getElementById('attachment-preview').innerHTML = '';
    document.getElementById('post-attachment').value = '';
    postAttachmentData = null;
    
    renderFeed();
}

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    
    posts.forEach(post => {
        const categoryData = categories.find(cat => cat.value === post.category);
        const postElement = createPostElement(post, categoryData);
        feed.appendChild(postElement);
    });
}

function createPostElement(post, categoryData) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    const timeAgo = formatTimeAgo(post.timestamp);
    let attachmentHTML = '';
    if (post.attachment) {
        if (post.attachment.type === 'image') {
            attachmentHTML = `<div class="mt-2"><img src="${post.attachment.data}" alt="attachment" class="max-h-48 rounded border"></div>`;
        } else if (post.attachment.type === 'file') {
            attachmentHTML = `<div class="mt-2 flex items-center gap-2"><i data-lucide="file" class="w-5 h-5 text-gray-500"></i><span>${post.attachment.name}</span></div>`;
        }
    }
    postDiv.innerHTML = `
        <div class="flex space-x-3">
            <div class="avatar">
                <span>${post.author.avatar}</span>
            </div>
            <div class="flex-1 space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="font-semibold">${post.author.displayName}</span>
                    <span class="text-gray-500">@${post.author.username}</span>
                    <span class="text-gray-500">·</span>
                    <span class="text-gray-500">${timeAgo}</span>
                </div>
                <div class="flex items-center space-x-2 mb-2">
                    <span class="badge ${categoryData ? categoryData.color : 'badge-blue'}">
                        ${categoryData ? categoryData.label : post.category}
                    </span>
                </div>
                <p class="whitespace-pre-wrap">${post.content}</p>
                ${attachmentHTML}
                ${post.budget || post.deadline ? `
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        ${post.budget ? `<span>💰 ${post.budget}</span>` : ''}
                        ${post.deadline ? `<span>⏰ Due: ${new Date(post.deadline).toLocaleDateString()}</span>` : ''}
                    </div>
                ` : ''}
                <div class="flex items-center space-x-8 pt-3 text-gray-500">
                    <button class="btn-ghost text-sm flex items-center space-x-1">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                        <span>${post.replies.icon} ${post.replies.count}</span>
                    </button>
                    <button class="btn-ghost text-sm flex items-center space-x-1 reaction-btn" onclick="toggleLike('${post.id}', this)">
                        <span class="reaction-icon" id="likes-${post.id}">${post.likes.icon} ${post.likes.count}</span>
                    </button>
                    <button class="btn-ghost text-sm flex items-center space-x-1">
                        <i data-lucide="share" class="w-4 h-4"></i>
                        <span>${post.shares.icon} ${post.shares.count}</span>
                    </button>
                    <button class="btn-ghost text-sm">
                        <i data-lucide="bookmark" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
    return postDiv;
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes.count += 1;
        document.getElementById(`likes-${postId}`).textContent = `${post.likes.icon} ${post.likes.count}`;
    }
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'card cursor-pointer hover:shadow-md transition-shadow';
        categoryDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <div>
                    <h3 class="text-lg font-semibold">${category.label}</h3>
                    <p class="text-sm text-gray-600 mt-1">${category.description}</p>
                </div>
                <span class="badge badge-blue">${category.posts} posts</span>
            </div>
            <span class="badge ${category.color}">${category.label}</span>
        `;
        grid.appendChild(categoryDiv);
    });
}

function renderCommissionFeed() {
    const commissionFeed = document.getElementById('commission-feed');
    const commissionPosts = posts.filter(post => post.postType === 'commission');
    
    commissionFeed.innerHTML = '';
    
    if (commissionPosts.length === 0) {
        commissionFeed.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <p>No commission posts available yet.</p>
            </div>
        `;
        return;
    }
    
    commissionPosts.forEach(post => {
        const categoryData = categories.find(cat => cat.value === post.category);
        const postElement = createPostElement(post, categoryData);
        commissionFeed.appendChild(postElement);
    });
}

function initializePages() {
    renderFeed();
    renderCategories();
    renderCommissionFeed();
}

// Event listeners
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Mock login
    login(email, 'Sample User', email.split('@')[0]);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const displayName = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    
    // Mock signup
    login(email, displayName, username);
});

document.getElementById('post-content').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('char-count').textContent = count;
});

document.getElementById('post-type').addEventListener('change', function() {
    const commissionFields = document.getElementById('commission-fields');
    if (this.value === 'commission') {
        commissionFields.classList.remove('hidden');
    } else {
        commissionFields.classList.add('hidden');
    }
});

// Initialize icons after content loads
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Messaging app state
let conversations = [
    {
        id: '1',
        user: { name: 'John Doe', avatar: 'JD', status: 'Online', color: 'bg-blue-200', text: 'text-blue-700' },
        messages: [
            { fromMe: false, text: "Hey, how's it going?", time: '2h' },
            { fromMe: true, text: "I'm good! How about you?", time: '2h' },
        ]
    },
    {
        id: '2',
        user: { name: 'Jane Smith', avatar: 'JS', status: 'Offline', color: 'bg-pink-200', text: 'text-pink-700' },
        messages: [
            { fromMe: false, text: "Are we still on for the meeting?", time: '5h' },
            { fromMe: true, text: "Yes! See you at 3pm.", time: '5h' },
        ]
    }
];
let currentConversationId = '1';

// Profile settings
function saveProfileSettings() {
    const name = document.getElementById('profile-name').value.trim();
    const username = document.getElementById('profile-username').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const password = document.getElementById('profile-password').value.trim();
    const confirmPassword = document.getElementById('profile-confirm-password').value.trim();

    // Simple validation
    if (password && password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Here you would typically send this data to the server
    console.log('Profile updated:', { name, username, email, password });
    
    alert("Profile settings saved successfully!");
}

function cancelProfileSettings() {
    // Clear the input fields
    document.getElementById('profile-settings-form').reset();
    // Optionally, you can redirect to another page or close the settings
}

// Token purchase modal
function openModal() {
    document.getElementById('buy-token-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('buy-token-modal').classList.add('hidden');
}


// Payment method and amount selection logic for Add Funds modal
let selectedPaymentMethod = null;
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    // Remove highlight from all
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });
    // Highlight selected
    const btn = document.querySelector(`.pay-method-btn[data-method="${method}"]`);
    if (btn) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
    }
    // Hide all fields
    document.querySelectorAll('.payment-fields').forEach(f => f.classList.add('hidden'));
    // Show relevant field
    if (method === 'gcash') document.getElementById('gcash-fields').classList.remove('hidden');
    if (method === 'paymaya') document.getElementById('paymaya-fields').classList.remove('hidden');
    if (method === 'paypal') document.getElementById('paypal-fields').classList.remove('hidden');
    if (method === 'credit-card') document.getElementById('credit-card-fields').classList.remove('hidden');
}

function selectAmount(amount) {
    document.getElementById('wallet-amount').value = amount;
    // Remove highlight from all
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('btn-primary'));
    // Highlight selected
    document.querySelectorAll('.amount-btn').forEach(btn => {
        if (btn.textContent.replace(/[^\d]/g, '') === String(amount)) {
            btn.classList.add('btn-primary');
        }
    });
}

function purchaseTokens() {
    const amount = document.getElementById('token-amount').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (amount > 0) {
        // Handle the purchase logic here (e.g., API call to process payment)
        alert(`Purchased ${amount} tokens via ${paymentMethod}.`);
        closeModal();
    } else {
        alert('Please enter a valid amount of tokens.');
    }
}
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('search-results');
    
    // For demonstration, simply display the search query
    resultsDiv.innerHTML = `<p>Searching for: <strong>${query}</strong></p>`;
    
    // Here you could implement actual search logic against your data
});

function addFunds() {
    const amount = parseFloat(document.getElementById('wallet-amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please select or enter a valid amount.");
        return;
    }
    if (!selectedPaymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    // Validate required fields for each method
    if (selectedPaymentMethod === 'gcash') {
        const num = document.getElementById('gcash-number').value.trim();
        if (!num) { alert('Enter your GCash number.'); return; }
    }
    if (selectedPaymentMethod === 'paymaya') {
        const num = document.getElementById('paymaya-number').value.trim();
        if (!num) { alert('Enter your PayMaya number.'); return; }
    }
    if (selectedPaymentMethod === 'paypal') {
        const email = document.getElementById('paypal-email').value.trim();
        if (!email) { alert('Enter your PayPal email.'); return; }
    }
    if (selectedPaymentMethod === 'credit-card') {
        const cc = document.getElementById('credit-card-number').value.trim();
        const exp = document.getElementById('card-expiry').value.trim();
        const cvc = document.getElementById('card-cvc').value.trim();
        const name = document.getElementById('card-name').value.trim();
        if (!cc || !exp || !cvc || !name) { alert('Fill in all credit card details.'); return; }
    }
    // Update balance (example, should be saved in DB)
    const balanceEl = document.getElementById('wallet-balance');
    const currentBalance = parseFloat(balanceEl.innerText.replace('₱','')) || 0;
    balanceEl.innerText = `₱${(currentBalance + amount).toFixed(2)}`;
    closeModal();
    alert(`₱${amount.toFixed(2)} added to your e-wallet via ${selectedPaymentMethod.replace('-', ' ')}!`);
    // Reset form
    document.getElementById('add-funds-form').reset();
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('btn-primary'));
    document.querySelectorAll('.pay-method-btn').forEach(btn => btn.classList.remove('btn-primary'));
    selectedPaymentMethod = null;
    document.querySelectorAll('.payment-fields').forEach(f => f.classList.add('hidden'));
}

