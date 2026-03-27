// State Variables
let currentUser = null;
let isDarkMode = true;
let currentPage = 'home';
let userRole = 'Founder / CEO';
let userTone = 'Concise & Executive';

// Initialize Lucide Icons
lucide.createIcons();

// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        rootElement.classList.add('dark');
        document.getElementById('icon-sun').classList.remove('hidden');
        document.getElementById('icon-moon').classList.add('hidden');
    } else {
        rootElement.classList.remove('dark');
        document.getElementById('icon-sun').classList.add('hidden');
        document.getElementById('icon-moon').classList.remove('hidden');
    }
}
themeToggleBtn.addEventListener('click', toggleTheme);

// --- Navigation Logic ---
function navigateTo(pageId) {
    if (pageId === 'dashboard' && !currentUser) {
        pageId = 'login';
    }

    // Hide all pages
    document.querySelectorAll('.page-section').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });

    // Show target page
    const target = document.getElementById(`page-${pageId}`);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }
    currentPage = pageId;
    window.scrollTo(0, 0);

    // Update active nav links
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.target === pageId) {
            btn.className = "nav-btn px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm";
        } else {
            btn.className = "nav-btn px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all text-slate-400 hover:text-indigo-600";
        }
    });
}
// Initialize default page
navigateTo('home');

// --- Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden', 'translate-y-[-20px]', 'opacity-0');
        document.getElementById('icon-menu').classList.add('hidden');
        document.getElementById('icon-close').classList.remove('hidden');
    } else {
        mobileMenu.classList.add('translate-y-[-20px]', 'opacity-0');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        document.getElementById('icon-menu').classList.remove('hidden');
        document.getElementById('icon-close').classList.add('hidden');
    }
}
document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);


// --- Features Logic ---
const featuresData = [
    { icon: 'brain', title: 'Deep Mimicry', desc: 'Analyzes 10k+ data points from your writing history to mirror your specific personality and bias.', details: 'The Deep Mimicry engine utilizes advanced transformer models to analyze your past emails, documents, and messages. It learns your unique vocabulary, sentence structure, and tone. It requires access to your historical data archives and continuous sync with your active communication channels.' },
    { icon: 'shield', title: 'Zero-Knowledge Privacy', desc: 'Your behavioral data is encrypted on-device. Your thoughts remain yours alone.', details: 'We use state-of-the-art end-to-end encryption to ensure that your data never leaves your device in an unencrypted state. Only your local device holds the private keys. Requirements include a device with a secure enclave and biometric authentication enabled.' },
    { icon: 'target', title: 'Predictive Execution', desc: 'Delegated tasks are completed with 99.8% precision, verified against your past decisions.', details: 'This feature anticipates your actions and executes routine tasks automatically. It cross-references context with your historical decision-making patterns to ensure high accuracy. It requires setting up execution permissions and integrating with your task management systems.' },
    { icon: 'zap', title: 'Async Presence', desc: 'Handle 50+ emails and Slack threads simultaneously across different timezones.', details: 'Async Presence allows your digital clone to act as an intelligent auto-responder and scheduler. It categorizes incoming communications by urgency and replies to routine inquiries while escalating important matters. Needs API access to your email provider and team chat apps.' },
    { icon: 'layers', title: 'Multi-Modal Sync', desc: 'Seamlessly connects with Gmail, Slack, Notion, and Discord through native hooks.', details: 'Our unified API integration layer ensures that actions taken in one platform are reflected across all your interconnected tools. It keeps your knowledge base and project trackers up-to-date automatically. Requires OAuth authorization for each connected platform.' },
    { icon: 'refresh-cw', title: 'Iterative Evolution', desc: 'Your clone learns in real-time. Every correction you make strengthens the neural bond.', details: 'By actively observing your corrections and manual overrides, the clone updates its internal weights. This continuous learning feedback loop guarantees that the clone evolves as your communication style changes. Active usage and occasional manual reviews are recommended.' },
];

let selectedFeatureIndex = null;
const featuresGrid = document.getElementById('features-grid');

function renderFeatures() {
    featuresGrid.innerHTML = '';
    featuresData.forEach((f, index) => {
        const isSelected = selectedFeatureIndex === index;
        const cardClass = isSelected
            ? 'border-indigo-600 shadow-lg shadow-indigo-600/20'
            : 'border-slate-200 dark:border-white/5 hover:border-indigo-500/50';

        const content = `
            <div class="bg-white dark:bg-slate-900/80 backdrop-blur-xl border rounded-[2rem] p-8 transition-all cursor-pointer group ${cardClass}" onclick="toggleFeature(${index})">
                <div class="w-16 h-16 bg-indigo-600/10 text-indigo-600 flex items-center justify-center rounded-[1.5rem] mb-8 group-hover:scale-110 transition-transform group-hover:bg-indigo-600 group-hover:text-white">
                    <i data-lucide="${f.icon}" class="w-7 h-7"></i>
                </div>
                <h3 class="text-2xl font-black dark:text-white mb-4 tracking-tight">${f.title}</h3>
                <p class="text-slate-500 leading-relaxed text-sm">${f.desc}</p>
                
                <div class="feature-details ${isSelected ? 'open' : ''}">
                    <div class="pt-4 border-t border-slate-100 dark:border-white/10">
                        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            ${f.details}
                        </p>
                    </div>
                </div>
            </div>
        `;
        featuresGrid.insertAdjacentHTML('beforeend', content);
    });
    lucide.createIcons();
}
function toggleFeature(index) {
    selectedFeatureIndex = selectedFeatureIndex === index ? null : index;
    renderFeatures();
}
renderFeatures();

// --- Auth Onboarding Logic ---
let authStep = 1;

function setAuthStep(step, simulateLoading = false) {
    if (step === 2 && !document.getElementById('auth-input-name').value) {
        return; // require name
    }

    if (simulateLoading) {
        document.getElementById(`auth-step-${authStep}`).classList.add('hidden');
        document.getElementById('auth-loading').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('auth-loading').classList.add('hidden');
            updateStep(step);
        }, 1200);
    } else {
        updateStep(step);
    }
}

function updateStep(step) {
    document.getElementById(`auth-step-${authStep}`).classList.add('hidden');
    authStep = step;

    document.getElementById(`auth-step-${step}`).classList.remove('hidden');
    document.getElementById('auth-progress').style.width = `${(step / 3) * 100}%`;
    document.getElementById('auth-step-badge').innerText = `Step ${step} of 3`;

    if (step === 1) {
        document.getElementById('auth-step-title').innerText = "Identity Sync";
        document.getElementById('auth-step-desc').innerText = "Connect your physical profile to the digital grid.";
    } else if (step === 2) {
        document.getElementById('auth-step-title').innerText = "Personality Matrix";
        document.getElementById('auth-step-desc').innerText = "Define the behavioral resonance of your clone.";
        renderTones();
    } else {
        document.getElementById('auth-step-title').innerText = "Neural Finalization";
        document.getElementById('auth-step-desc').innerText = "Preparing your instance for deployment.";
    }
}

document.getElementById('auth-input-name').addEventListener('input', e => {
    const btn = document.getElementById('auth-btn-1');
    if (e.target.value.trim().length > 0) {
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.onclick = () => setAuthStep(2, true);
    } else {
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btn.onclick = null;
    }
});

const toneOptions = ['Concise & Executive', 'Warm & Empathetic', 'Chaotic Creative', 'Scientific & Cold'];

function renderTones() {
    const container = document.getElementById('auth-tones-container');
    container.innerHTML = '';

    toneOptions.forEach(tone => {
        const isSelected = tone === userTone;
        const colorClass = isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg shadow-indigo-500/10' : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-800';
        const textClass = isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'dark:text-white';
        const iconHTML = isSelected ? `<i data-lucide="check-circle" class="w-6 h-6 text-indigo-600"></i>` : '';

        const html = `
            <button onclick="setTone('${tone}')" class="group p-5 text-left rounded-3xl border-2 transition-all flex items-center justify-between ${colorClass}">
                <div>
                    <span class="font-bold block transition-colors ${textClass}">${tone}</span>
                    <span class="text-xs text-slate-400">Calibration Profile #${Math.floor(Math.random() * 900) + 100}</span>
                </div>
                ${iconHTML}
            </button>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
    lucide.createIcons();
}

function setTone(tone) {
    userTone = tone;
    renderTones();
}

function completeLogin() {
    currentUser = {
        name: document.getElementById('auth-input-name').value,
        email: document.getElementById('auth-input-email').value,
        role: document.getElementById('auth-input-role').value,
        tone: userTone
    };

    // Update headers and dashboard
    document.getElementById('nav-btn-login').classList.add('hidden');
    document.getElementById('nav-user-profile').classList.remove('hidden');
    document.getElementById('nav-user-profile').classList.add('flex');
    document.getElementById('nav-user-name').innerText = currentUser.name.split(' ')[0];
    document.getElementById('nav-user-initial').innerText = currentUser.name.charAt(0).toUpperCase();

    document.getElementById('nav-btn-dashboard').style.display = 'block';
    document.getElementById('mobile-nav-dashboard').classList.remove('hidden');
    document.getElementById('mobile-nav-start').classList.add('hidden');

    // Dashboard values
    document.getElementById('dash-user-name').innerText = currentUser.name;
    document.getElementById('dash-user-initial').innerText = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('dash-user-role').innerText = currentUser.role;
    document.getElementById('dash-user-tone').innerText = currentUser.tone;

    // Add to chat
    addMessage('ai', `Hey ${currentUser.name}! I was just waiting for you. Ready to make some magic happen with your clone today?`);
    navigateTo('dashboard');
}

function handleLogout() {
    currentUser = null;
    document.getElementById('nav-btn-login').classList.remove('hidden');
    document.getElementById('nav-user-profile').classList.add('hidden');
    document.getElementById('nav-user-profile').classList.remove('flex');
    document.getElementById('nav-btn-dashboard').style.display = 'none';

    // Reset Auth
    setAuthStep(1, false);
    document.getElementById('auth-input-name').value = '';
    document.getElementById('mobile-nav-dashboard').classList.add('hidden');
    document.getElementById('mobile-nav-start').classList.remove('hidden');

    chatMessages = [chatMessages[0]]; // Reset chat to first message
    renderChat();

    navigateTo('home');
}

// --- Dashboard Schedule ---
let tasks = [
    { id: 1, time: '09:00 AM', title: 'Deep Work: Product Strategy', status: 'Mimic Active', icon: 'target' },
    { id: 2, time: '11:30 AM', title: 'Email Triage: Investor Relations', status: 'Autonomously Drafted', icon: 'mail' },
    { id: 3, time: '02:00 PM', title: 'Design Review: Anukriti Mobile', status: 'Queued', icon: 'layers' }
];

function renderSchedule() {
    const list = document.getElementById('schedule-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const html = `
            <div class="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all group shadow-sm fade-in-up">
                <div class="flex items-center gap-5">
                    <div class="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-white/5">
                        <i data-lucide="${task.icon}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <p class="font-bold text-slate-900 dark:text-white">${task.title}</p>
                        <div class="flex items-center gap-3 mt-1">
                            <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md">${task.time}</span>
                            <span class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">${task.status}</span>
                        </div>
                    </div>
                </div>
                <button onclick="deleteTask(${task.id})" class="opacity-0 group-hover:opacity-100 p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    });
    lucide.createIcons();
}

function addTask() {
    const titleInput = document.getElementById('task-title');
    const timeInput = document.getElementById('task-time');

    if (!titleInput.value || !timeInput.value) return;

    tasks.push({
        id: Date.now(),
        time: timeInput.value,
        title: titleInput.value,
        status: 'Syncing',
        icon: 'zap'
    });

    titleInput.value = '';
    timeInput.value = '';
    renderSchedule();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderSchedule();
}
renderSchedule();

// -- Activity Log --
const logs = [
    { time: '2m ago', action: 'Replied to budget proposal.', type: 'Draft' },
    { time: '45m ago', action: 'Declined 3 meetings (Out of Sync).', type: 'Action' },
    { time: '2h ago', action: 'Aggregated industry news for you.', type: 'Brief' },
    { time: 'Yesterday', action: 'Optimized morning flow.', type: 'Logic' },
];

const logContainer = document.getElementById('activity-log');
logs.forEach(log => {
    logContainer.insertAdjacentHTML('beforeend', `
        <div class="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-indigo-600 before:rounded-full before:shadow-[0_0_10px_rgba(79,70,229,0.8)]">
            <div class="flex justify-between items-center mb-1">
                <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">${log.time}</p>
                <span class="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">${log.type}</span>
            </div>
            <p class="text-sm font-semibold dark:text-slate-200">${log.action}</p>
        </div>
    `);
});


// --- Global Chat Logic ---
let isChatOpen = false;
let isBotTyping = false;
let chatMessages = [
    { role: 'ai', text: "Hi there! I'm Anukriti. I'm not just code—I'm your digital twin in the making. Want to see how we can handle life together?" }
];

function toggleChat() {
    isChatOpen = !isChatOpen;
    const windowEl = document.getElementById('chat-window');
    const iconOpen = document.getElementById('icon-chat-open');
    const iconClose = document.getElementById('icon-chat-close');

    if (isChatOpen) {
        windowEl.classList.remove('hidden');
        // allow small delay so transition triggers
        setTimeout(() => {
            windowEl.classList.remove('scale-95', 'opacity-0');
        }, 10);
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        renderChat();
    } else {
        windowEl.classList.add('scale-95', 'opacity-0');
        setTimeout(() => windowEl.classList.add('hidden'), 300);
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }
}

const API_KEY = ""; // Set your key here if applicable
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

async function askGemini(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    const nameStr = currentUser ? currentUser.name.split(' ')[0] : 'there';

    // Local intent matching for simulated responses
    if (lowerPrompt.includes('hi') || lowerPrompt.includes('hello') || lowerPrompt.includes('hey')) {
        return new Promise(resolve => {
            setTimeout(() => resolve(`Hello ${nameStr}! I'm Anukriti, your digital twin in the making. How can I help you today?`), 600);
        });
    }

    if (lowerPrompt.includes('schedule') || lowerPrompt.includes('task') || lowerPrompt.includes('work') || lowerPrompt.includes('meeting')) {
        return new Promise(resolve => {
            setTimeout(() => resolve(`I've analyzed your usual workflow. I can schedule your deep work sessions and autonomously manage your emails. Would you like me to deploy these tasks to your Neural Schedule?`), 800);
        });
    }

    // If no key is set or no internet, simulate offline bot
    if (!navigator.onLine || !API_KEY) {
        return new Promise(resolve => {
            setTimeout(() => resolve("The AI chat bot is currently in local mode. I can handle basic tasks offline until the full neural link connects!"), 800);
        });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;
    const fullNameStr = currentUser ? currentUser.name : 'Guest';
    const roleStr = currentUser ? currentUser.role : 'Guest';
    const systemPrompt = `You are Anukriti, a fun, witty, and super human-like digital companion. Talk to the user like a real human friend would. Name: ${fullNameStr}. Role: ${roleStr}.`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
    } catch (err) {
        return "The AI chat bot is under construction, but it can do all your further tasks and all the things!";
    }
}

function addMessage(role, text) {
    chatMessages.push({ role, text });
    renderChat();
}

function renderChat() {
    const chatBox = document.getElementById('chat-messages');
    chatBox.innerHTML = '';

    chatMessages.forEach(m => {
        const isUser = m.role === 'user';
        const justify = isUser ? 'justify-end' : 'justify-start';
        const color = isUser
            ? 'bg-indigo-600 text-white rounded-tr-none'
            : 'bg-slate-100 dark:bg-slate-800 dark:text-white rounded-tl-none border border-black/5 dark:border-white/5';

        chatBox.insertAdjacentHTML('beforeend', `
            <div class="flex ${justify}">
                <div class="max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${color}">
                    ${m.text}
                </div>
            </div>
        `);
    });

    if (isBotTyping) {
        chatBox.insertAdjacentHTML('beforeend', `
            <div class="flex justify-start">
                <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none flex gap-1 typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSendChat(e) {
    e.preventDefault();
    const inputField = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-submit-btn');
    const text = inputField.value.trim();

    if (!text || isBotTyping) return;

    inputField.value = '';
    addMessage('user', text);

    isBotTyping = true;
    inputField.disabled = true;
    sendBtn.disabled = true;
    renderChat();

    const responseText = await askGemini(text);

    isBotTyping = false;
    inputField.disabled = false;
    sendBtn.disabled = false;
    addMessage('ai', responseText);
    inputField.focus();
}
