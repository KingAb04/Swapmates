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
        likes: { count: 12, icon: '👍' }, // Like icon
        replies: { count: 3, icon: '💬' }, // Reply icon
        shares: { count: 1, icon: '🔗' } // Share icon
    },
    {
        id: '2',
        content: 'Commission available: Need a well-researched essay on climate change impacts. 2000 words, APA format. Serious inquiries only.',
        author: { displayName: 'Mike Chen', username: 'mike_research', avatar: 'MC' },
        category: 'science',
        postType: 'commission',
        budget: '150 tokens',
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
        budget: '100 tokens',
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
        budget: '200 tokens',
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
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('auth-page').classList.remove('hidden');
            
            // Reset forms
            document.getElementById('loginForm').reset();
            document.getElementById('signupForm').reset();
        }

        // Page navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Remove active class from all nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active-nav');
                btn.classList.add('btn-ghost');
            });
            
            // Show selected page
            document.getElementById(`${pageName}-page`).classList.remove('hidden');
            
            // Update active nav button
            event.target.closest('.nav-btn').classList.add('active-nav');
            event.target.closest('.nav-btn').classList.remove('btn-ghost');
        }

        // Post functions
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
    shares: { count: 0, icon: '🔗' }
};

            
            posts.unshift(newPost);
            
            // Clear form
            document.getElementById('post-content').value = '';
            document.getElementById('post-type').value = '';
            document.getElementById('post-category').value = '';
            document.getElementById('post-budget').value = '';
            document.getElementById('post-deadline').value = '';
            document.getElementById('commission-fields').classList.add('hidden');
            
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
                    <button class="btn-ghost text-sm flex items-center space-x-1" onclick="toggleLike('${post.id}')">
                        <i data-lucide="heart" class="w-4 h-4"></i>
                        <span id="likes-${post.id}">${post.likes.icon} ${post.likes.count}</span>
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
    </script>
    <script>
        const messages = {
    '1': { sender: 'John Doe', content: 'Hey, how\'s it going?', timestamp: '2 hours ago' },
    '2': { sender: 'Jane Smith', content: 'Are we still on for the meeting?', timestamp: '5 hours ago' },
};

function openMessageModal(id) {
    const message = messages[id];
    const openedMessage = document.getElementById('opened-message');
    const chatReplies = document.getElementById('chat-replies');

    // Clear previous replies
    chatReplies.innerHTML = '';

    openedMessage.innerHTML = `
        <p class="font-medium">${message.sender}: ${message.content}</p>
        <span class="text-sm text-gray-500">${message.timestamp}</span>
    `;
    
    // Show the modal
    document.getElementById('message-modal').classList.remove('hidden');
}

function closeMessageModal() {
    document.getElementById('message-modal').classList.add('hidden');
}

document.getElementById('send-reply').addEventListener('click', function() {
    const replyInput = document.getElementById('reply-input');
    const replyContent = replyInput.value.trim();

    if (replyContent) {
        const chatReplies = document.getElementById('chat-replies');

        const newReply = document.createElement('div');
        newReply.className = 'message-item py-2';
        newReply.innerHTML = `
            <p class="font-medium">You: ${replyContent}</p>
            <span class="text-sm text-gray-500">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        `;
        
        // Append the new reply to the chat replies section
        chatReplies.appendChild(newReply);
        replyInput.value = ''; // Clear the input field
    }
});
    </script>
    <script>
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
