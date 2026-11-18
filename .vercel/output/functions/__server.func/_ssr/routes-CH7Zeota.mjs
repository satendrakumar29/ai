import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleHelp, C as Image$1, D as Columns2, E as Copy, F as Brain, I as ArrowUp, L as ALargeSmall, M as ChevronLeft, N as Check, O as Code, P as Camera, S as Info, T as Database, _ as Mic, a as Telescope, b as Mail, c as Shield, d as RotateCcw, f as Presentation, g as Moon, h as Paperclip, j as ChevronRight, k as Clapperboard, l as Settings, m as Pin, n as Volume2, o as Square, p as Plus, r as UserRound, s as Sparkles, t as X, u as Search, v as MessageSquare, w as Globe, x as LogOut, y as Menu } from "../_libs/lucide-react.mjs";
import { a as findModel, c as APP_NAME, i as MODEL_GROUPS, l as APP_VERSION, n as DEFAULT_COMPARE_ID, o as modelsname, r as DEFAULT_MODEL_ID, s as shortModelName } from "./router-POfSlbQG.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CH7Zeota.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function inline(text) {
	return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((bit, index) => {
		if (bit.startsWith("**") && bit.endsWith("**") && bit.length > 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-semibold",
			children: bit.slice(2, -2)
		}, index);
		if (bit.startsWith("`") && bit.endsWith("`") && bit.length > 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-md bg-subtle px-1 py-0.5 font-mono text-sm",
			children: bit.slice(1, -1)
		}, index);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bit }, index);
	});
}
function blocks(text) {
	const lines = text.split("\n");
	const out = [];
	let i = 0;
	let key = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		if (!line.trim()) {
			i += 1;
			continue;
		}
		if (line.startsWith("### ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-base font-semibold first:mt-0",
				children: inline(line.slice(4))
			}, key));
			key += 1;
			i += 1;
			continue;
		}
		if (line.startsWith("## ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-lg font-semibold first:mt-0",
				children: inline(line.slice(3))
			}, key));
			key += 1;
			i += 1;
			continue;
		}
		if (line.startsWith("# ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-lg font-semibold first:mt-0",
				children: inline(line.slice(2))
			}, key));
			key += 1;
			i += 1;
			continue;
		}
		if (line.startsWith("- ") || line.startsWith("* ")) {
			const items = [];
			while (i < lines.length && (lines[i]?.startsWith("- ") || lines[i]?.startsWith("* "))) {
				items.push((lines[i] ?? "").slice(2));
				i += 1;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-2 list-disc space-y-1 pl-5",
				children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(item) }, index))
			}, key));
			key += 1;
			continue;
		}
		const para = [];
		while (i < lines.length && lines[i]?.trim() && !lines[i]?.startsWith("#") && !lines[i]?.startsWith("- ") && !lines[i]?.startsWith("* ")) {
			para.push(lines[i] ?? "");
			i += 1;
		}
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "my-2 first:mt-0 last:mb-0",
			children: inline(para.join(" "))
		}, key));
		key += 1;
	}
	return out;
}
function RichText({ text }) {
	const chunks = text.split("```");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-base leading-relaxed",
		children: chunks.map((chunk, index) => {
			if (index % 2 === 1) {
				const nl = chunk.indexOf("\n");
				const code = nl === -1 ? chunk : chunk.slice(nl + 1);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "my-2 overflow-x-auto rounded-xl bg-subtle p-3 font-mono text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code.replace(/\n$/, "") })
				}, index);
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: blocks(chunk) }, index);
		})
	});
}
function Sectioned({ text }) {
	const parts = text.split(/\n(?=## )/);
	if (parts.filter((part) => part.startsWith("## ")).length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: part.startsWith("## ") ? "rounded-2xl bg-elevated p-4" : "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: part })
		}, index))
	});
}
function compressImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", .72));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
		};
		img.src = url;
	});
}
async function readTextFile(file) {
	return (await file.text()).slice(0, 12e3);
}
var en = {
	welcomeTitle: "Welcome to Vela",
	welcomeSub: "Choose how you would like to begin",
	name: "Your name",
	namePh: "What should I call you?",
	email: "Email",
	emailPh: "Optional · stays on this device",
	continue: "Continue",
	key: "OpenRouter API key",
	keyPh: "Paste your key",
	keyHint: "Saved in this browser only. If this is empty, Vela uses OPENROUTER_API_KEY from the server environment.",
	addKey: "Add API key",
	hideKey: "Hide API key",
	privacy: "Privacy",
	terms: "Terms",
	greeting: "Hi {name}, how can I help you today?",
	ask: "Ask me anything…",
	compare: "Compare",
	research: "Deep Research",
	videos: "Videos",
	slides: "Slides",
	images: "Images",
	newChat: "New chat",
	searchChats: "Search chat content…",
	pinned: "Pinned",
	today: "Today",
	yesterday: "Yesterday",
	week: "7 days",
	older: "Older",
	noChats: "No chats yet",
	settings: "Settings",
	profile: "Profile",
	account: "Account settings",
	data: "Data controls",
	app: "App",
	language: "Language",
	appearance: "Appearance",
	fontSize: "Font size",
	personalization: "Personalization",
	audio: "Audio",
	mainLang: "Main language",
	voice: "Voice",
	voiceHint: "Select the primary language you use for voice input.",
	about: "About",
	help: "Help & feedback",
	logout: "Log out",
	deleteAccount: "Delete local data",
	bound: "Saved",
	notSet: "Not set",
	serverKeyOn: "Active",
	serverKeyOff: "Not set",
	usingBrowser: "Requests use the key saved in this browser.",
	usingServer: "Requests use the server environment key.",
	chooseModel: "Choose default model",
	chooseModelSub: "Select one model for your chat",
	searchModel: "Search model…",
	daily: "Daily",
	thinking: "Thinking",
	code: "Code",
	vision: "Vision",
	send: "Send",
	stop: "Stop",
	mic: "Voice input",
	attach: "Attach",
	camera: "Camera",
	photos: "Photos",
	files: "Files",
	modes: "Modes",
	think: "Think harder",
	copy: "Copy",
	copied: "Copied",
	speak: "Read aloud",
	retry: "Retry",
	needKey: "Add an OpenRouter key to send messages.",
	clearKey: "Clear saved key",
	back: "Back",
	exportChats: "Export chats",
	clearChats: "Clear all chats",
	confirmClear: "Clear every chat on this device?",
	confirmDelete: "This removes your name, key, and chats from this browser.",
	cancel: "Cancel",
	fontSm: "Small",
	fontMd: "Default",
	fontLg: "Large",
	previewLine: "The quick brown fox jumps over the lazy dog.",
	english: "English",
	hindi: "हिंदी",
	helpBody: "Vela sends your messages to the model you pick, through OpenRouter. Your key is used only to authorize that request. Chats stay on this device.",
	aboutBody: "Vela is a multi-model desk. Model names and OpenRouter ids live in the modelsname catalog.",
	privacyBody: "Your name, key, and chats are stored in this browser. The key is sent only to Vela’s server so it can call OpenRouter. There is no shared database.",
	termsBody: "Models are subject to OpenRouter’s terms. Don’t send secrets you wouldn’t share with the model provider. Answers can be wrong — check anything important.",
	personalNote: "Your name is used in the greeting and as context for the model.",
	clearMode: "Clear mode",
	pin: "Pin",
	unpin: "Unpin",
	emptySearch: "No matching chats",
	listening: "Listening…",
	voiceUnsupported: "Voice input isn’t available in this browser.",
	noModels: "No models match",
	describeImage: "Describe this image.",
	imageFail: "Couldn’t read that image.",
	fileBig: "That file is too large.",
	needVision: "This model can’t see images. Pick a vision model or remove the image.",
	free: "Free",
	showKey: "Show key",
	browserKey: "Browser key",
	serverKey: "Server key",
	noVoices: "No voices are available in this browser yet.",
	delete: "Delete",
	attached: "Attached",
	remove: "Remove",
	reasoning: "Reasoning",
	compareModel: "Compare model",
	defaultModel: "Default model",
	close: "Close",
	menu: "Menu",
	versionLabel: "Version",
	systemVoice: "System default",
	emptyReply: "No response from the model.",
	couldNotCopy: "Couldn’t copy"
};
var hi = {
	welcomeTitle: "वेला में स्वागत है",
	welcomeSub: "शुरू करने का तरीका चुनें",
	name: "आपका नाम",
	namePh: "मैं आपको क्या बुलाऊँ?",
	email: "ईमेल",
	emailPh: "वैकल्पिक · सिर्फ़ इस डिवाइस पर",
	continue: "आगे बढ़ें",
	key: "OpenRouter API कुंजी",
	keyPh: "अपनी कुंजी चिपकाएँ",
	keyHint: "यह कुंजी सिर्फ़ इस ब्राउज़र में रहती है। खाली छोड़ें तो सर्वर की OPENROUTER_API_KEY इस्तेमाल होगी।",
	addKey: "API कुंजी जोड़ें",
	hideKey: "API कुंजी छिपाएँ",
	privacy: "गोपनीयता",
	terms: "शर्तें",
	greeting: "नमस्ते {name}, आज मैं आपकी कैसे मदद करूँ?",
	ask: "कुछ भी पूछें…",
	compare: "तुलना",
	research: "गहरी खोज",
	videos: "वीडियो",
	slides: "स्लाइड",
	images: "चित्र",
	newChat: "नई बातचीत",
	searchChats: "बातचीत खोजें…",
	pinned: "पिन की हुई",
	today: "आज",
	yesterday: "कल",
	week: "7 दिन",
	older: "पुरानी",
	noChats: "अभी कोई बातचीत नहीं",
	settings: "सेटिंग्स",
	profile: "प्रोफ़ाइल",
	account: "खाता सेटिंग्स",
	data: "डेटा नियंत्रण",
	app: "ऐप",
	language: "भाषा",
	appearance: "रूप",
	fontSize: "फ़ॉन्ट आकार",
	personalization: "निजीकरण",
	audio: "ऑडियो",
	mainLang: "मुख्य भाषा",
	voice: "आवाज़",
	voiceHint: "बोलकर लिखने के लिए अपनी मुख्य भाषा चुनें।",
	about: "परिचय",
	help: "मदद",
	logout: "लॉग आउट",
	deleteAccount: "लोकल डेटा मिटाएँ",
	bound: "सहेजी गई",
	notSet: "सेट नहीं",
	serverKeyOn: "सक्रिय",
	serverKeyOff: "सेट नहीं",
	usingBrowser: "अनुरोध इस ब्राउज़र की कुंजी से जाएँगे।",
	usingServer: "अनुरोध सर्वर की कुंजी से जाएँगे।",
	chooseModel: "डिफ़ॉल्ट मॉडल चुनें",
	chooseModelSub: "बातचीत के लिए एक मॉडल चुनें",
	searchModel: "मॉडल खोजें…",
	daily: "रोज़मर्रा",
	thinking: "सोच",
	code: "कोड",
	vision: "दृश्य",
	send: "भेजें",
	stop: "रोकें",
	mic: "आवाज़ से लिखें",
	attach: "संलग्न करें",
	camera: "कैमरा",
	photos: "फ़ोटो",
	files: "फ़ाइलें",
	modes: "मोड",
	think: "और गहरा सोचें",
	copy: "कॉपी",
	copied: "कॉपी हो गया",
	speak: "पढ़कर सुनाएँ",
	retry: "फिर से",
	needKey: "संदेश भेजने के लिए OpenRouter कुंजी जोड़ें।",
	clearKey: "सहेजी कुंजी हटाएँ",
	back: "पीछे",
	exportChats: "बातचीत निर्यात करें",
	clearChats: "सारी बातचीत मिटाएँ",
	confirmClear: "इस डिवाइस की हर बातचीत मिटाएँ?",
	confirmDelete: "इससे नाम, कुंजी और बातचीत इस ब्राउज़र से हट जाएँगी।",
	cancel: "रद्द करें",
	fontSm: "छोटा",
	fontMd: "सामान्य",
	fontLg: "बड़ा",
	previewLine: "यह देखें कि पढ़ने में आकार कैसा लगता है।",
	english: "English",
	hindi: "हिंदी",
	helpBody: "वेला आपके संदेश चुने हुए मॉडल को OpenRouter के ज़रिए भेजता है। कुंजी सिर्फ़ उस अनुरोध को अधिकृत करने के लिए जाती है। बातचीत इसी डिवाइस पर रहती है।",
	aboutBody: "वेला एक मल्टी-मॉडल डेस्क है। मॉडल के नाम modelsname सूची में रखे गए हैं।",
	privacyBody: "नाम, कुंजी और बातचीत इसी ब्राउज़र में सहेजे जाते हैं। कुंजी सिर्फ़ OpenRouter को कॉल करने के लिए वेला के सर्वर तक जाती है। कोई साझा डेटाबेस नहीं है।",
	termsBody: "मॉडल OpenRouter की शर्तों के अधीन हैं। जो राज़ आप मॉडल प्रदाता को नहीं देना चाहेंगे, वो न भेजें। जवाब गलत हो सकते हैं — ज़रूरी बात जाँच लें।",
	personalNote: "आपका नाम अभिवादन में और मॉडल के संदर्भ में इस्तेमाल होता है।",
	clearMode: "मोड हटाएँ",
	pin: "पिन",
	unpin: "अनपिन",
	emptySearch: "कोई मेल नहीं",
	listening: "सुन रहा हूँ…",
	voiceUnsupported: "इस ब्राउज़र में आवाज़ इनपुट नहीं है।",
	noModels: "कोई मॉडल नहीं मिला",
	describeImage: "इस चित्र का वर्णन करें।",
	imageFail: "यह चित्र नहीं पढ़ सका।",
	fileBig: "फ़ाइल बहुत बड़ी है।",
	needVision: "यह मॉडल चित्र नहीं देख सकता। दृश्य मॉडल चुनें या चित्र हटाएँ।",
	free: "मुफ़्त",
	showKey: "कुंजी दिखाएँ",
	browserKey: "ब्राउज़र कुंजी",
	serverKey: "सर्वर कुंजी",
	noVoices: "इस ब्राउज़र में अभी कोई आवाज़ उपलब्ध नहीं।",
	delete: "मिटाएँ",
	attached: "संलग्न",
	remove: "हटाएँ",
	reasoning: "तर्क",
	compareModel: "तुलना मॉडल",
	defaultModel: "डिफ़ॉल्ट मॉडल",
	close: "बंद करें",
	menu: "मेनू",
	versionLabel: "संस्करण",
	systemVoice: "सिस्टम डिफ़ॉल्ट",
	emptyReply: "मॉडल से कोई उत्तर नहीं आया।",
	couldNotCopy: "कॉपी नहीं हो सका"
};
function t(lang, key, vars) {
	const raw = (lang === "hi" ? hi[key] : en[key]) || en[key];
	if (!vars) return raw;
	return raw.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}
var MODES = [
	"compare",
	"research",
	"videos",
	"slides",
	"images"
];
function systemPrompt(mode, name, think) {
	const who = `You are Vela, a precise assistant talking with ${name || "the user"}. Write in the user's language. Use markdown when it helps. Never invent citations, URLs, or files you did not create.`;
	const extra = {
		chat: "Be concise unless the user asks for depth.",
		compare: "Answer independently and concretely. Do not mention other models.",
		research: "Go deep. Use ## headings. Separate what is established from what is uncertain. Never fabricate sources.",
		videos: "Produce a short video plan with 4 to 6 sections. Every section heading must start with '## Scene'. Under each, write a Visual line and a Voiceover line.",
		slides: "Produce 6 sections. Every heading must start with '## Slide'. Under each, write a one-line title and exactly 3 bullet points.",
		images: "Turn the request into a tight visual brief: subject, setting, light, palette, framing, and mood. Then offer two alternative directions. Do not claim an image file was created."
	};
	const thinkLine = think ? "Think carefully. Put a short ## Reasoning section first, then ## Answer." : "";
	return [
		who,
		extra[mode],
		thinkLine
	].filter(Boolean).join("\n\n");
}
function temperatureFor(mode, think) {
	if (think || mode === "research") return .4;
	if (mode === "images") return .8;
	return .7;
}
function maxTokensFor(mode) {
	return mode === "chat" ? 1800 : 3200;
}
function starterFor(mode, lang) {
	const hi = lang === "hi";
	switch (mode) {
		case "compare": return hi ? "इन विकल्पों की तुलना करें: " : "Compare these options: ";
		case "research": return hi ? "इस पर गहराई से लिखें: " : "Research this: ";
		case "videos": return hi ? "इस पर एक छोटा वीडियो प्लान बनाएँ: " : "Plan a short video about ";
		case "slides": return hi ? "इस पर स्लाइड आउटलाइन बनाएँ: " : "Outline slides about ";
		case "images": return hi ? "इसका दृश्य ब्रीफ़ बनाएँ: " : "Visual brief for ";
		default: return "";
	}
}
async function streamCompletion(opts) {
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			model: opts.model,
			messages: opts.messages,
			apiKey: opts.apiKey || void 0,
			temperature: opts.temperature,
			maxTokens: opts.maxTokens
		}),
		signal: opts.signal
	});
	const ctype = res.headers.get("content-type") ?? "";
	if (!res.ok || ctype.includes("application/json")) {
		let message = `Request failed (${res.status})`;
		try {
			const data = await res.json();
			if (data.error) message = data.error;
		} catch {}
		throw new Error(message);
	}
	if (!res.body) throw new Error("Empty response");
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";
		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed.startsWith("data:")) continue;
			const data = trimmed.slice(5).trim();
			if (!data || data === "[DONE]") continue;
			let json;
			try {
				json = JSON.parse(data);
			} catch {
				continue;
			}
			if (json.error?.message) throw new Error(json.error.message);
			const delta = json.choices?.[0]?.delta;
			if (!delta) continue;
			if (typeof delta.content === "string" && delta.content) opts.onText(delta.content);
			const reason = delta.reasoning || delta.reasoning_content;
			if (typeof reason === "string" && reason) opts.onReasoning(reason);
		}
	}
}
function isAbortError(error) {
	return error instanceof Error && error.name === "AbortError";
}
var IMAGE_MARKER = "[Image attached]";
var NEW_CHAT = "New chat";
var defaultSettings = () => ({
	modelId: DEFAULT_MODEL_ID,
	compareModelId: DEFAULT_COMPARE_ID,
	backgroundId: "ink",
	fontScale: "md",
	language: "en",
	voiceLang: "en-US",
	voiceURI: "",
	thinkHarder: false,
	mode: "chat",
	name: "",
	email: "",
	apiKey: "",
	onboarded: false
});
function titleFrom(content) {
	const clean = content.replace(IMAGE_MARKER, "").replace(/\s+/g, " ").trim();
	if (!clean) return NEW_CHAT;
	if (clean.length <= 42) return clean;
	return `${clean.slice(0, 41)}…`;
}
function touch(chat, messages, title) {
	return {
		...chat,
		title: title ?? chat.title,
		messages,
		updatedAt: Date.now()
	};
}
var useDesk = create()(persist((set, get) => ({
	settings: defaultSettings(),
	chats: [],
	activeId: null,
	patchSettings: (patch) => set((state) => ({ settings: {
		...state.settings,
		...patch
	} })),
	logout: () => set((state) => ({ settings: {
		...state.settings,
		onboarded: false
	} })),
	wipe: () => set({
		settings: defaultSettings(),
		chats: [],
		activeId: null
	}),
	newChat: () => {
		const state = get();
		const current = state.chats.find((chat) => chat.id === state.activeId);
		if (current && current.messages.length === 0) return current.id;
		const id = crypto.randomUUID();
		const now = Date.now();
		set({
			activeId: id,
			chats: [{
				id,
				title: NEW_CHAT,
				pinned: false,
				createdAt: now,
				updatedAt: now,
				messages: []
			}, ...state.chats]
		});
		return id;
	},
	setActive: (id) => set({ activeId: id }),
	togglePin: (id) => set((state) => ({ chats: state.chats.map((chat) => chat.id === id ? {
		...chat,
		pinned: !chat.pinned
	} : chat) })),
	removeChat: (id) => set((state) => {
		const chats = state.chats.filter((chat) => chat.id !== id);
		return {
			chats,
			activeId: state.activeId === id ? chats[0]?.id ?? null : state.activeId
		};
	}),
	clearChats: () => set({
		chats: [],
		activeId: null
	}),
	appendUser: (chatId, content) => set((state) => ({ chats: state.chats.map((chat) => {
		if (chat.id !== chatId) return chat;
		const msg = {
			id: crypto.randomUUID(),
			role: "user",
			content
		};
		const title = chat.title === "New chat" ? titleFrom(content) : chat.title;
		return touch(chat, [...chat.messages, msg], title);
	}) })),
	beginAssistant: (chatId, modelId, columnIds) => {
		const id = crypto.randomUUID();
		set((state) => ({ chats: state.chats.map((chat) => {
			if (chat.id !== chatId) return chat;
			const msg = {
				id,
				role: "assistant",
				content: "",
				modelId,
				reasoning: "",
				columns: columnIds?.map((columnModel) => ({
					modelId: columnModel,
					content: "",
					reasoning: ""
				}))
			};
			return touch(chat, [...chat.messages, msg]);
		}) }));
		return id;
	},
	appendDelta: (chatId, msgId, delta, columnIndex, reasoning) => set((state) => ({ chats: state.chats.map((chat) => {
		if (chat.id !== chatId) return chat;
		const messages = chat.messages.map((msg) => {
			if (msg.id !== msgId) return msg;
			if (columnIndex == null) return reasoning ? {
				...msg,
				reasoning: (msg.reasoning ?? "") + delta
			} : {
				...msg,
				content: msg.content + delta
			};
			const columns = msg.columns?.map((column, index) => {
				if (index !== columnIndex) return column;
				return reasoning ? {
					...column,
					reasoning: column.reasoning + delta
				} : {
					...column,
					content: column.content + delta
				};
			});
			return {
				...msg,
				columns
			};
		});
		return {
			...chat,
			messages,
			updatedAt: chat.updatedAt
		};
	}) })),
	dropLast: (chatId) => set((state) => ({ chats: state.chats.map((chat) => chat.id === chatId ? {
		...chat,
		messages: chat.messages.slice(0, -1)
	} : chat) }))
}), {
	name: "vela-desk",
	skipHydration: true,
	partialize: (state) => ({
		settings: state.settings,
		chats: state.chats,
		activeId: state.activeId
	})
}));
var MODE_ICON = {
	compare: Columns2,
	research: Telescope,
	videos: Clapperboard,
	slides: Presentation,
	images: Image$1
};
var MODE_KEY = {
	compare: "compare",
	research: "research",
	videos: "videos",
	slides: "slides",
	images: "images"
};
function plain(msg) {
	if (msg.columns?.length) return msg.columns.map((column) => column.content).filter(Boolean).join("\n\n");
	return msg.content.replace(IMAGE_MARKER, "").trim();
}
function ChatView({ envKey, onOpenNav, onOpenModels, onNeedKey }) {
	const settings = useDesk((s) => s.settings);
	const patch = useDesk((s) => s.patchSettings);
	const chats = useDesk((s) => s.chats);
	const activeId = useDesk((s) => s.activeId);
	const chat = chats.find((item) => item.id === activeId) ?? null;
	const lang = settings.language;
	const hasKey = envKey || settings.apiKey.trim().length > 0;
	const [draft, setDraft] = (0, import_react.useState)("");
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [listening, setListening] = (0, import_react.useState)(false);
	const [copiedId, setCopiedId] = (0, import_react.useState)("");
	const abortRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const endRef = (0, import_react.useRef)(null);
	const photoRef = (0, import_react.useRef)(null);
	const cameraRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const boxRef = (0, import_react.useRef)(null);
	const activeMode = settings.mode === "chat" ? null : settings.mode;
	const empty = !chat || chat.messages.length === 0;
	const tail = chat?.messages[chat.messages.length - 1];
	const tailMark = `${tail?.content ?? ""}${tail?.columns?.map((column) => column.content).join("") ?? ""}`;
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [tailMark, busy]);
	(0, import_react.useEffect)(() => () => abortRef.current?.abort(), []);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const close = () => setMenuOpen(false);
		window.addEventListener("pointerdown", close);
		return () => window.removeEventListener("pointerdown", close);
	}, [menuOpen]);
	function grow(el) {
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
	}
	async function takeImage(file) {
		if (!file) return;
		try {
			const payload = await compressImage(file);
			setAttachment({
				name: file.name || "image",
				kind: "image",
				payload
			});
			setError("");
		} catch {
			setError(t(lang, "imageFail"));
		}
	}
	async function takeFile(file) {
		if (!file) return;
		if (file.size > 15e5) {
			setError(t(lang, "fileBig"));
			return;
		}
		if (file.type.startsWith("image/")) {
			await takeImage(file);
			return;
		}
		const payload = await readTextFile(file);
		setAttachment({
			name: file.name,
			kind: "file",
			payload
		});
		setError("");
	}
	function messagesFor(chatId, imagePayload) {
		const fresh = useDesk.getState();
		const current = fresh.chats.find((item) => item.id === chatId);
		const msgs = [{
			role: "system",
			content: systemPrompt(fresh.settings.mode, fresh.settings.name, fresh.settings.thinkHarder)
		}];
		const history = current?.messages ?? [];
		history.forEach((msg, index) => {
			const text = plain(msg);
			if (!text) return;
			const last = index === history.length - 1;
			if (msg.role === "user" && last && imagePayload) {
				msgs.push({
					role: "user",
					content: [{
						type: "text",
						text
					}, {
						type: "image_url",
						image_url: { url: imagePayload }
					}]
				});
				return;
			}
			msgs.push({
				role: msg.role,
				content: text
			});
		});
		return msgs;
	}
	async function run(chatId, imagePayload) {
		const snap = useDesk.getState().settings;
		const controller = new AbortController();
		abortRef.current = controller;
		setBusy(true);
		setError("");
		const compare = snap.mode === "compare";
		const models = compare ? [snap.modelId, snap.compareModelId] : [snap.modelId];
		const messages = messagesFor(chatId, imagePayload);
		const msgId = useDesk.getState().beginAssistant(chatId, snap.modelId, compare ? [...models] : void 0);
		let any = false;
		try {
			await Promise.all(models.map(async (model, index) => {
				const column = compare ? index : null;
				try {
					let got = false;
					await streamCompletion({
						model,
						messages,
						apiKey: snap.apiKey.trim(),
						temperature: temperatureFor(snap.mode, snap.thinkHarder),
						maxTokens: maxTokensFor(snap.mode),
						signal: controller.signal,
						onText: (delta) => {
							got = true;
							any = true;
							useDesk.getState().appendDelta(chatId, msgId, delta, column, false);
						},
						onReasoning: (delta) => {
							useDesk.getState().appendDelta(chatId, msgId, delta, column, true);
						}
					});
					if (!got && !controller.signal.aborted) useDesk.getState().appendDelta(chatId, msgId, t(snap.language, "emptyReply"), column, false);
				} catch (err) {
					if (isAbortError(err) || controller.signal.aborted) throw err;
					const message = err instanceof Error ? err.message : t(snap.language, "emptyReply");
					useDesk.getState().appendDelta(chatId, msgId, message, column, false);
					setError(message);
				}
			}));
		} catch (err) {
			if (!isAbortError(err)) {
				const message = err instanceof Error ? err.message : t(snap.language, "emptyReply");
				if (!any) useDesk.getState().appendDelta(chatId, msgId, message, null, false);
				setError(message);
			}
		} finally {
			setBusy(false);
			abortRef.current = null;
		}
	}
	async function send() {
		if (busy) return;
		const text = draft.trim();
		if (!text && !attachment) return;
		if (!hasKey) {
			setError(t(lang, "needKey"));
			onNeedKey();
			return;
		}
		if (attachment?.kind === "image") {
			const primary = findModel(settings.modelId);
			const secondary = findModel(settings.compareModelId);
			if (settings.mode === "compare" ? !primary?.vision || !secondary?.vision : !primary?.vision) {
				setError(t(lang, "needVision"));
				return;
			}
		}
		let content = text;
		let imagePayload;
		if (attachment?.kind === "file") content = `${text}\n\n\`\`\`\n${attachment.payload}\n\`\`\``.trim();
		else if (attachment?.kind === "image") {
			imagePayload = attachment.payload;
			content = `${text || t(lang, "describeImage")}\n\n${IMAGE_MARKER}`;
		}
		let chatId = useDesk.getState().activeId;
		if (!chatId || !useDesk.getState().chats.some((item) => item.id === chatId)) chatId = useDesk.getState().newChat();
		useDesk.getState().appendUser(chatId, content);
		setDraft("");
		setAttachment(null);
		if (boxRef.current) boxRef.current.style.height = "auto";
		await run(chatId, imagePayload);
	}
	async function retry() {
		if (busy || !chat) return;
		if (chat.messages[chat.messages.length - 1]?.role !== "assistant") return;
		useDesk.getState().dropLast(chat.id);
		await run(chat.id);
	}
	function toggleMic() {
		const w = window;
		const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
		if (!Ctor) {
			setError(t(lang, "voiceUnsupported"));
			return;
		}
		if (listening && recRef.current) {
			recRef.current.stop();
			return;
		}
		const base = draft.trim();
		const rec = new Ctor();
		rec.lang = settings.voiceLang;
		rec.interimResults = true;
		rec.continuous = false;
		rec.onresult = (ev) => {
			let said = "";
			for (let i = 0; i < ev.results.length; i += 1) said += ev.results[i]?.[0]?.transcript ?? "";
			setDraft(`${base} ${said}`.trim());
		};
		rec.onerror = () => setListening(false);
		rec.onend = () => setListening(false);
		recRef.current = rec;
		setListening(true);
		setError("");
		rec.start();
	}
	function chooseMode(mode) {
		patch({ mode });
		setMenuOpen(false);
		if (!draft.trim()) setDraft(starterFor(mode, lang));
		boxRef.current?.focus();
	}
	async function copyText(id, text) {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedId(id);
			window.setTimeout(() => setCopiedId(""), 1200);
		} catch {
			setError(t(lang, "couldNotCopy"));
		}
	}
	function speak(text) {
		const utter = new SpeechSynthesisUtterance(text);
		utter.lang = settings.voiceLang;
		const picked = window.speechSynthesis?.getVoices().find((voice) => voice.voiceURI === settings.voiceURI);
		if (picked) utter.voice = picked;
		window.speechSynthesis?.cancel();
		window.speechSynthesis?.speak(utter);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 min-w-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-3 py-3 pt-safe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onOpenNav,
						"aria-label": t(lang, "menu"),
						className: "grid size-11 place-items-center rounded-full bg-subtle md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 truncate text-center text-sm text-muted",
						children: chat && chat.messages.length > 0 ? chat.title : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11 md:hidden" })
				]
			}),
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vela-glow pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "relative max-w-xl text-center text-3xl leading-tight font-medium tracking-tight md:text-4xl",
						children: t(lang, "greeting", { name: settings.name || "there" })
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-thin min-h-0 flex-1 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-4",
					children: [chat?.messages.map((msg, index) => {
						const last = index === chat.messages.length - 1;
						if (msg.role === "user") {
							const text = msg.content.replace(IMAGE_MARKER, "").trim();
							const image = msg.content.includes(IMAGE_MARKER);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-[85%] rounded-3xl rounded-br-lg bg-subtle px-4 py-3",
									children: [text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-wrap",
										children: text
									}), image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: t(lang, "attached")
									})]
								})
							}, msg.id);
						}
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
							className: "max-w-full",
							children: msg.columns?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 md:grid-cols-2",
								children: msg.columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 rounded-2xl bg-elevated p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-2 text-sm text-muted",
											children: shortModelName(column.modelId)
										}),
										column.reasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reasoning, {
											lang,
											text: column.reasoning
										}),
										column.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sectioned, { text: column.content }) : busy && last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, {}) : null,
										column.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
											lang,
											copied: copiedId === `${msg.id}-${column.modelId}`,
											onCopy: () => void copyText(`${msg.id}-${column.modelId}`, column.content),
											onSpeak: () => speak(column.content)
										})
									]
								}, column.modelId))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-1 text-sm text-muted",
									children: shortModelName(msg.modelId || settings.modelId)
								}),
								msg.reasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reasoning, {
									lang,
									text: msg.reasoning
								}),
								msg.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sectioned, { text: msg.content }) : busy && last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dots, {}) : null,
								msg.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Actions, {
									lang,
									copied: copiedId === msg.id,
									onCopy: () => void copyText(msg.id, msg.content),
									onSpeak: () => speak(msg.content),
									onRetry: last ? () => void retry() : void 0
								})
							] })
						}, msg.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-3xl px-3 pb-safe",
				children: [
					!hasKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onNeedKey,
						className: "mb-2 block w-full text-center text-sm text-accent",
						children: t(lang, "needKey")
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-center text-sm text-danger",
						children: error
					}),
					empty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex flex-wrap justify-center gap-2",
						children: MODES.map((mode) => {
							const Icon = MODE_ICON[mode];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => chooseMode(mode),
								className: "inline-flex h-11 items-center gap-2 rounded-full bg-subtle px-4 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(lang, MODE_KEY[mode])]
							}, mode);
						})
					}),
					activeMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => patch({ mode: "chat" }),
							className: "inline-flex h-9 items-center gap-2 rounded-full bg-subtle px-3 text-sm",
							children: [
								t(lang, MODE_KEY[activeMode]),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: t(lang, "clearMode")
								})
							]
						})
					}),
					attachment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-subtle px-3 py-1 text-sm",
							children: [attachment.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": t(lang, "remove"),
								onClick: () => setAttachment(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})]
						})
					}),
					listening && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-center text-sm text-accent",
						children: t(lang, "listening")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-3xl bg-elevated px-3 pt-3 pb-2",
						children: [
							menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "menu-in absolute bottom-full left-2 z-20 mb-2 w-56 rounded-2xl border border-line bg-elevated p-1.5",
								onPointerDown: (event) => event.stopPropagation(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
										icon: Camera,
										label: t(lang, "camera"),
										onClick: () => cameraRef.current?.click()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
										icon: Image$1,
										label: t(lang, "photos"),
										onClick: () => photoRef.current?.click()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
										icon: Paperclip,
										label: t(lang, "files"),
										onClick: () => fileRef.current?.click()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
										icon: Telescope,
										label: t(lang, "think"),
										active: settings.thinkHarder,
										onClick: () => patch({ thinkHarder: !settings.thinkHarder })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-3 pt-2 pb-1 text-xs text-faint",
										children: t(lang, "modes")
									}),
									MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
										icon: MODE_ICON[mode],
										label: t(lang, MODE_KEY[mode]),
										active: settings.mode === mode,
										onClick: () => chooseMode(mode)
									}, mode))
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: boxRef,
								value: draft,
								rows: 1,
								placeholder: t(lang, "ask"),
								onChange: (event) => {
									setDraft(event.target.value);
									grow(event.target);
									if (error) setError("");
								},
								onKeyDown: (event) => {
									if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
										event.preventDefault();
										send();
									}
								},
								className: "max-h-40 w-full resize-none bg-transparent px-1 text-base outline-none placeholder:text-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t(lang, "attach"),
										onPointerDown: (event) => event.stopPropagation(),
										onClick: () => setMenuOpen((value) => !value),
										className: "grid size-10 place-items-center rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onOpenModels("default"),
										className: "inline-flex h-10 items-center gap-1 rounded-full px-2 text-sm text-muted",
										children: shortModelName(settings.modelId)
									}),
									settings.mode === "compare" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onOpenModels("compare"),
										className: "inline-flex h-10 items-center rounded-full px-2 text-sm text-muted",
										children: shortModelName(settings.compareModelId)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: toggleMic,
										"aria-label": t(lang, "mic"),
										className: `grid size-10 place-items-center rounded-full ${listening ? "text-accent" : ""}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
									}),
									busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => abortRef.current?.abort(),
										"aria-label": t(lang, "stop"),
										className: "grid size-10 place-items-center rounded-full bg-fg text-bg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4 fill-current" })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void send(),
										disabled: !draft.trim() && !attachment,
										"aria-label": t(lang, "send"),
										className: "grid size-10 place-items-center rounded-full bg-fg text-bg disabled:opacity-40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: cameraRef,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (event) => {
					const file = event.target.files?.[0];
					event.target.value = "";
					takeImage(file);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: photoRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (event) => {
					const file = event.target.files?.[0];
					event.target.value = "";
					takeImage(file);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: ".txt,.md,.json,.csv,.ts,.tsx,.js,.py,.html,.css,text/plain",
				className: "hidden",
				onChange: (event) => {
					const file = event.target.files?.[0];
					event.target.value = "";
					takeFile(file);
				}
			})
		]
	});
}
function Dots() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex h-6 items-center gap-1",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot" })
		]
	});
}
function Reasoning({ lang, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "mb-2 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t(lang, "reasoning") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 whitespace-pre-wrap",
			children: text
		})]
	});
}
function Actions({ lang, copied, onCopy, onSpeak, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onCopy,
				"aria-label": t(lang, "copy"),
				className: "grid size-9 place-items-center rounded-full text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
			}),
			copied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "self-center text-xs text-muted",
				children: t(lang, "copied")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onSpeak,
				"aria-label": t(lang, "speak"),
				className: "grid size-9 place-items-center rounded-full text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRetry,
				"aria-label": t(lang, "retry"),
				className: "grid size-9 place-items-center rounded-full text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
			})
		]
	});
}
function MenuButton({ icon: Icon, label, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: label
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent" })
		]
	});
}
var ICONS = {
	daily: MessageSquare,
	thinking: Brain,
	code: Code,
	vision: Image$1
};
function ModelSheet({ lang, target, selectedId, onPick, onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const q = query.trim().toLowerCase();
	const groups = (0, import_react.useMemo)(() => {
		return MODEL_GROUPS.map((group) => ({
			group,
			items: modelsname.filter((model) => {
				if (model.group !== group) return false;
				if (!q) return true;
				return model.name.toLowerCase().includes(q) || model.provider.toLowerCase().includes(q) || model.id.toLowerCase().includes(q);
			})
		})).filter((group) => group.items.length > 0);
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "scrim absolute inset-0",
			"aria-label": t(lang, "close"),
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "dialog",
			"aria-label": t(lang, "chooseModel"),
			className: "sheet-in relative z-10 flex max-h-[86vh] w-full max-w-lg flex-col rounded-t-3xl bg-bg px-4 pt-4 pb-safe sm:rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-medium",
							children: t(lang, target === "compare" ? "compareModel" : "chooseModel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t(lang, "chooseModelSub")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": t(lang, "close"),
						className: "grid size-10 place-items-center rounded-full bg-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-4 flex h-11 items-center gap-2 rounded-full bg-subtle px-3 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: t(lang, "searchModel"),
						className: "w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-thin min-h-0 flex-1 overflow-y-auto pb-4",
					children: [groups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted",
						children: t(lang, "noModels")
					}), groups.map(({ group, items }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-xs font-medium tracking-widest text-faint",
							children: t(lang, groupLabel(group))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: items.map((model) => {
								const selected = model.id === selectedId;
								const Icon = ICONS[model.group];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onPick(model.id),
									className: `flex items-center gap-3 rounded-2xl p-3 text-left ${selected ? "bg-subtle ring-1 ring-accent" : "bg-elevated"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid size-11 shrink-0 place-items-center rounded-xl ${selected ? "bg-accent text-accent-fg" : "bg-subtle"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-medium",
												children: model.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block truncate text-sm text-muted",
												children: [
													model.provider,
													" · ",
													t(lang, "free")
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-accent bg-accent text-accent-fg" : "border-faint"}`,
											children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
										})
									]
								}, model.id);
							})
						})]
					}, group))]
				})
			]
		})]
	});
}
function groupLabel(group) {
	return group;
}
var backgrounds = [
	{
		id: "ink",
		en: "Ink",
		hi: "स्याही",
		swatch: "#0c0e10"
	},
	{
		id: "graphite",
		en: "Graphite",
		hi: "ग्रेफाइट",
		swatch: "#141618"
	},
	{
		id: "carbon",
		en: "Carbon",
		hi: "कार्बन",
		swatch: "#101010"
	},
	{
		id: "midnight",
		en: "Midnight",
		hi: "मध्यरात्रि",
		swatch: "#0d1218"
	},
	{
		id: "harbor",
		en: "Harbor",
		hi: "बंदरगाह",
		swatch: "#0c1416"
	},
	{
		id: "pine",
		en: "Pine",
		hi: "चीड़",
		swatch: "#0e1410"
	},
	{
		id: "cocoa",
		en: "Cocoa",
		hi: "कोको",
		swatch: "#14110e"
	},
	{
		id: "dusk",
		en: "Dusk",
		hi: "धुंधलका",
		swatch: "#10131a"
	},
	{
		id: "slate",
		en: "Slate",
		hi: "स्लेट",
		swatch: "#1c2128"
	},
	{
		id: "wine",
		en: "Wine",
		hi: "मदिरा",
		swatch: "#160f12"
	},
	{
		id: "ocean",
		en: "Ocean",
		hi: "सागर",
		swatch: "#0b1520"
	},
	{
		id: "paper",
		en: "Paper",
		hi: "कागज़",
		swatch: "#f4f1eb"
	},
	{
		id: "fog",
		en: "Fog",
		hi: "कोहरा",
		swatch: "#e7edf1"
	},
	{
		id: "sand",
		en: "Sand",
		hi: "रेत",
		swatch: "#f3ecdf"
	},
	{
		id: "snow",
		en: "Snow",
		hi: "हिम",
		swatch: "#f6f6f5"
	}
];
function findBackground(id) {
	return backgrounds.find((item) => item.id === id) ?? backgrounds[0];
}
var VOICE_LANGS = [
	["en-US", "English (US)"],
	["en-GB", "English (UK)"],
	["hi-IN", "Hindi"],
	["es-ES", "Spanish"],
	["fr-FR", "French"],
	["de-DE", "German"],
	["ja-JP", "Japanese"],
	["zh-CN", "Chinese"]
];
function Settings$1({ envKey, initial, onClose }) {
	const settings = useDesk((s) => s.settings);
	const patch = useDesk((s) => s.patchSettings);
	const logout = useDesk((s) => s.logout);
	const wipe = useDesk((s) => s.wipe);
	const clearChats = useDesk((s) => s.clearChats);
	const chats = useDesk((s) => s.chats);
	const lang = settings.language;
	const [screen, setScreen] = (0, import_react.useState)(initial);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [reveal, setReveal] = (0, import_react.useState)(false);
	const [voices, setVoices] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
		load();
		window.speechSynthesis?.addEventListener("voiceschanged", load);
		return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
	}, []);
	const title = screen === "root" ? t(lang, "settings") : screen === "account" ? t(lang, "account") : screen === "data" ? t(lang, "data") : screen === "language" ? t(lang, "language") : screen === "appearance" ? t(lang, "appearance") : screen === "font" ? t(lang, "fontSize") : screen === "personal" ? t(lang, "personalization") : screen === "voiceLang" ? t(lang, "mainLang") : screen === "voice" ? t(lang, "voice") : screen === "help" ? t(lang, "help") : t(lang, "about");
	function back() {
		if (screen === "root") onClose();
		else setScreen("root");
	}
	function exportChats() {
		const blob = new Blob([JSON.stringify(chats, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "vela-chats.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	const filteredVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith(settings.voiceLang.slice(0, 2).toLowerCase()));
	const voiceList = filteredVoices.length ? filteredVoices : voices;
	const bg = findBackground(settings.backgroundId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg pt-safe",
		role: "dialog",
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: back,
					"aria-label": t(lang, "back"),
					className: "grid size-11 place-items-center rounded-full bg-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-center text-lg font-medium",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scroll-thin min-h-0 flex-1 overflow-y-auto px-4 pb-safe",
			children: [
				screen === "root" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-5 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "profile"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: UserRound,
								label: t(lang, "account"),
								onClick: () => setScreen("account")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: Database,
								label: t(lang, "data"),
								onClick: () => setScreen("data")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "app"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
									icon: Globe,
									label: t(lang, "language"),
									value: lang === "hi" ? t(lang, "hindi") : t(lang, "english"),
									onClick: () => setScreen("language")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
									icon: Moon,
									label: t(lang, "appearance"),
									value: lang === "hi" ? bg.hi : bg.en,
									onClick: () => setScreen("appearance")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
									icon: ALargeSmall,
									label: t(lang, "fontSize"),
									onClick: () => setScreen("font")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
									icon: Sparkles,
									label: t(lang, "personalization"),
									onClick: () => setScreen("personal")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "audio"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: Mic,
								label: t(lang, "mainLang"),
								value: settings.voiceLang,
								onClick: () => setScreen("voiceLang")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: Volume2,
								label: t(lang, "voice"),
								onClick: () => setScreen("voice")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 text-sm text-muted",
							children: t(lang, "voiceHint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "about"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: Info,
								label: t(lang, "about"),
								value: "1.0.0",
								onClick: () => setScreen("about")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row$1, {
								icon: CircleHelp,
								label: t(lang, "help"),
								onClick: () => setScreen("help")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								logout();
								onClose();
							},
							className: "flex h-14 items-center gap-3 rounded-2xl bg-elevated px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" }), t(lang, "logout")]
						})
					]
				}),
				screen === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex min-h-full w-full max-w-lg flex-col gap-5 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "profile"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-16 text-sm",
										children: t(lang, "name")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: settings.name,
										onChange: (event) => patch({ name: event.target.value.slice(0, 40) }),
										className: "min-w-0 flex-1 bg-transparent text-right text-sm text-muted outline-none"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-3 border-t border-line px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-16 text-sm",
										children: t(lang, "email")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: settings.email,
										onChange: (event) => patch({ email: event.target.value }),
										className: "min-w-0 flex-1 bg-transparent text-right text-sm text-muted outline-none"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							label: t(lang, "key"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), t(lang, "browserKey")]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: settings.apiKey ? t(lang, "bound") : t(lang, "notSet")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: settings.apiKey,
										onChange: (event) => patch({ apiKey: event.target.value.trim() }),
										placeholder: t(lang, "keyPh"),
										type: reveal ? "text" : "password",
										autoComplete: "off",
										spellCheck: false,
										className: "h-11 w-full rounded-full bg-subtle px-4 font-mono text-sm outline-none placeholder:text-faint"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex gap-3 text-sm text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setReveal((value) => !value),
											children: reveal ? t(lang, "hideKey") : t(lang, "showKey")
										}), settings.apiKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => patch({ apiKey: "" }),
											children: t(lang, "clearKey")
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-t border-line px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "serverKey") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: envKey ? t(lang, "serverKeyOn") : t(lang, "serverKeyOff")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 text-sm text-muted",
							children: settings.apiKey ? t(lang, "usingBrowser") : envKey ? t(lang, "usingServer") : t(lang, "keyHint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConfirm("wipe"),
							className: "mt-auto py-8 text-center text-danger",
							children: t(lang, "deleteAccount")
						}),
						confirm === "wipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confirm, {
							lang,
							text: t(lang, "confirmDelete"),
							onCancel: () => setConfirm(null),
							onOk: () => {
								wipe();
								onClose();
							}
						})
					]
				}),
				screen === "data" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: exportChats,
							className: "h-14 rounded-2xl bg-elevated px-4 text-left",
							children: t(lang, "exportChats")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConfirm("chats"),
							className: "h-14 rounded-2xl bg-elevated px-4 text-left text-danger",
							children: t(lang, "clearChats")
						}),
						confirm === "chats" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confirm, {
							lang,
							text: t(lang, "confirmClear"),
							onCancel: () => setConfirm(null),
							onOk: () => {
								clearChats();
								setConfirm(null);
							}
						})
					]
				}),
				screen === "language" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						selected: lang === "en",
						label: t(lang, "english"),
						onClick: () => patch({ language: "en" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						selected: lang === "hi",
						label: t(lang, "hindi"),
						onClick: () => patch({ language: "hi" })
					})]
				}),
				screen === "appearance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid w-full max-w-lg grid-cols-4 gap-3 py-3",
					children: backgrounds.map((item) => {
						const selected = item.id === settings.backgroundId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => patch({ backgroundId: item.id }),
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `size-14 rounded-full border-2 ${selected ? "border-accent" : "border-transparent"}`,
								style: { background: item.swatch }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: lang === "hi" ? item.hi : item.en
							})]
						}, item.id);
					})
				}),
				screen === "font" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-elevated p-4 leading-relaxed",
						children: t(lang, "previewLine")
					}), [
						"sm",
						"md",
						"lg"
					].map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						selected: settings.fontScale === scale,
						label: t(lang, scale === "sm" ? "fontSm" : scale === "md" ? "fontMd" : "fontLg"),
						onClick: () => patch({ fontScale: scale })
					}, scale))]
				}),
				screen === "personal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t(lang, "personalNote")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-2xl bg-elevated px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(lang, "think") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: settings.thinkHarder,
								label: t(lang, "think"),
								onClick: () => patch({ thinkHarder: !settings.thinkHarder })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-lg",
							children: t(lang, "greeting", { name: settings.name || "…" })
						})
					]
				}),
				screen === "voiceLang" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid w-full max-w-lg gap-2 py-2",
					children: VOICE_LANGS.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						selected: settings.voiceLang === id,
						label,
						onClick: () => patch({ voiceLang: id })
					}, id))
				}),
				screen === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid w-full max-w-lg gap-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: !settings.voiceURI,
							label: t(lang, "systemVoice"),
							onClick: () => patch({ voiceURI: "" })
						}),
						voiceList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 text-sm text-muted",
							children: t(lang, "noVoices")
						}),
						voiceList.map((voice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: settings.voiceURI === voice.voiceURI,
							label: `${voice.name}`,
							onClick: () => patch({ voiceURI: voice.voiceURI })
						}, voice.voiceURI)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 h-12 rounded-full bg-fg font-medium text-bg",
							onClick: () => {
								const utter = new SpeechSynthesisUtterance(t(lang, "previewLine"));
								utter.lang = settings.voiceLang;
								const picked = voices.find((voice) => voice.voiceURI === settings.voiceURI);
								if (picked) utter.voice = picked;
								window.speechSynthesis?.cancel();
								window.speechSynthesis?.speak(utter);
							},
							children: t(lang, "speak")
						})
					]
				}),
				screen === "help" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-lg py-3 text-sm leading-relaxed text-muted",
					children: t(lang, "helpBody")
				}),
				screen === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-lg gap-3 py-3 text-sm leading-relaxed text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "aboutBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t(lang, "versionLabel"),
						": ",
						"1.0.0"
					] })]
				})
			]
		})]
	});
}
function Group({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-2 px-1 text-sm text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-2xl bg-elevated",
		children
	})] });
}
function Row$1({ icon: Icon, label, value, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center gap-3 border-b border-line px-4 py-3.5 text-left last:border-b-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1",
				children: label
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-36 truncate text-sm text-muted",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-faint" })
		]
	});
}
function Choice({ selected, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex h-12 items-center justify-between rounded-2xl px-4 text-left ${selected ? "bg-subtle ring-1 ring-accent" : "bg-elevated"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `grid size-5 place-items-center rounded-full border ${selected ? "border-accent bg-accent text-accent-fg" : "border-faint"}`,
			children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
		})]
	});
}
function Toggle({ on, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": on,
		"aria-label": label,
		onClick,
		className: `relative h-7 w-12 rounded-full ${on ? "bg-accent" : "bg-subtle"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `knob absolute top-0.5 size-6 rounded-full ${on ? "translate-x-5 bg-accent-fg" : "translate-x-0.5 bg-fg"}` })
	});
}
function Confirm({ lang, text, onCancel, onOk }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-subtle p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onCancel,
				className: "h-11 flex-1 rounded-full bg-elevated",
				children: t(lang, "cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onOk,
				className: "h-11 flex-1 rounded-full bg-fg font-medium text-danger",
				children: t(lang, "delete")
			})]
		})]
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18 38c2-14 14-22 24-16 6 3 8 11 5 18",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "4.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M46 26c-2 14-14 22-24 16-6-3-8-11-5-18",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "4.5",
				strokeLinecap: "round",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "20",
				r: "2.1",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "18",
				r: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "48",
				cy: "48",
				r: "1.8",
				fill: "currentColor"
			})
		]
	});
}
function bucket(ts) {
	const day = 864e5;
	const start = /* @__PURE__ */ new Date();
	start.setHours(0, 0, 0, 0);
	const today = start.getTime();
	const s = new Date(ts);
	s.setHours(0, 0, 0, 0);
	const diff = today - s.getTime();
	if (diff <= 0) return "today";
	if (diff <= day) return "yesterday";
	if (diff <= day * 7) return "week";
	return "older";
}
function Sidebar({ open, onClose, onOpenSettings }) {
	const lang = useDesk((s) => s.settings.language);
	const name = useDesk((s) => s.settings.name);
	const chats = useDesk((s) => s.chats);
	const activeId = useDesk((s) => s.activeId);
	const setActive = useDesk((s) => s.setActive);
	const togglePin = useDesk((s) => s.togglePin);
	const newChat = useDesk((s) => s.newChat);
	const [query, setQuery] = (0, import_react.useState)("");
	const q = query.trim().toLowerCase();
	const filtered = chats.filter((chat) => {
		if (!q) return true;
		if (chat.title.toLowerCase().includes(q)) return true;
		return chat.messages.some((msg) => {
			if (msg.content.toLowerCase().includes(q)) return true;
			return msg.columns?.some((column) => column.content.toLowerCase().includes(q)) ?? false;
		});
	});
	const pinned = filtered.filter((chat) => chat.pinned).sort((a, b) => b.updatedAt - a.updatedAt);
	const rest = filtered.filter((chat) => !chat.pinned);
	const groups = [
		["today", []],
		["yesterday", []],
		["week", []],
		["older", []]
	];
	for (const chat of rest) groups.find(([id]) => id === bucket(chat.updatedAt))?.[1].push(chat);
	for (const [, list] of groups) list.sort((a, b) => b.updatedAt - a.updatedAt);
	function openChat(id) {
		setActive(id);
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "scrim fixed inset-0 z-30 md:hidden",
		"aria-label": t(lang, "close"),
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `slide-x fixed inset-y-0 left-0 z-40 flex w-[min(88vw,20rem)] flex-col border-r border-line bg-bg pt-safe md:static md:z-auto md:w-80 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-4 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-medium",
						children: APP_NAME
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ml-auto grid size-10 place-items-center rounded-full md:hidden",
						onClick: onClose,
						"aria-label": t(lang, "close"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 rounded-full bg-subtle px-3 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: t(lang, "searchChats"),
						className: "w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						newChat();
						onClose();
					},
					className: "mt-3 h-11 w-full rounded-full bg-subtle text-sm font-medium",
					children: t(lang, "newChat")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-thin mt-4 min-h-0 flex-1 overflow-y-auto px-3 pb-3",
				children: [
					filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-6 text-sm text-muted",
						children: q ? t(lang, "emptySearch") : t(lang, "noChats")
					}),
					pinned.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "px-2 pb-1 text-sm text-muted",
							children: t(lang, "pinned")
						}), pinned.map((chat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							chat,
							active: chat.id === activeId,
							lang,
							onOpen: () => openChat(chat.id),
							onPin: () => togglePin(chat.id)
						}, chat.id))]
					}),
					groups.map(([id, list]) => list.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "px-2 pb-1 text-sm text-muted",
							children: t(lang, id)
						}), list.map((chat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							chat,
							active: chat.id === activeId,
							lang,
							onOpen: () => openChat(chat.id),
							onPin: () => togglePin(chat.id)
						}, chat.id))]
					}, id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpenSettings,
				className: "flex items-center gap-3 border-t border-line px-4 py-3 pb-safe text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-fg",
						children: (name || "Vela").slice(0, 1).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate font-medium",
						children: name || "Vela"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4 text-muted" })
				]
			})
		]
	})] });
}
function Row({ chat, active, lang, onOpen, onPin }) {
	const title = chat.title === "New chat" ? t(lang, "newChat") : chat.title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center rounded-xl ${active ? "bg-subtle" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onOpen,
			className: "min-w-0 flex-1 truncate px-2 py-2.5 text-left text-sm",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onPin,
			"aria-label": chat.pinned ? t(lang, "unpin") : t(lang, "pin"),
			className: "grid size-9 shrink-0 place-items-center text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: `size-4 ${chat.pinned ? "fill-current text-accent" : ""}` })
		})]
	});
}
function Welcome({ ready }) {
	const settings = useDesk((s) => s.settings);
	const patch = useDesk((s) => s.patchSettings);
	const [name, setName] = (0, import_react.useState)(settings.name);
	const [email, setEmail] = (0, import_react.useState)(settings.email);
	const [apiKey, setApiKey] = (0, import_react.useState)(settings.apiKey);
	const [showKey, setShowKey] = (0, import_react.useState)(Boolean(settings.apiKey));
	const [reveal, setReveal] = (0, import_react.useState)(false);
	const [legal, setLegal] = (0, import_react.useState)(null);
	const lang = settings.language;
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const saved = useDesk.getState().settings;
		setName(saved.name);
		setEmail(saved.email);
		setApiKey(saved.apiKey);
		setShowKey(Boolean(saved.apiKey));
	}, [ready]);
	function submit(event) {
		event.preventDefault();
		const nextName = name.trim();
		if (!nextName || !ready) return;
		const nextEmail = email.trim();
		if (nextEmail && !nextEmail.includes("@")) return;
		patch({
			name: nextName.slice(0, 40),
			email: nextEmail,
			apiKey: apiKey.trim(),
			onboarded: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-safe pt-safe",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm text-muted",
					onClick: () => patch({ language: lang === "en" ? "hi" : "en" }),
					children: lang === "en" ? "हिंदी" : "English"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex flex-1 flex-col items-center justify-center pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "mb-8 size-16 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-center text-3xl font-medium tracking-tight",
						children: t(lang, "welcomeTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-muted",
						children: t(lang, "welcomeSub")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-8 w-full text-sm font-medium",
						children: [t(lang, "name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: t(lang, "namePh"),
							autoComplete: "nickname",
							maxLength: 40,
							className: "mt-2 h-12 w-full rounded-full bg-subtle px-4 text-base outline-none placeholder:text-faint"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 w-full text-sm font-medium",
						children: [t(lang, "email"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: t(lang, "emailPh"),
							autoComplete: "email",
							inputMode: "email",
							className: "mt-2 h-12 w-full rounded-full bg-subtle px-4 text-base outline-none placeholder:text-faint"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !ready || !name.trim(),
						className: "mt-5 flex h-12 w-full items-center justify-center rounded-full bg-fg text-base font-medium text-bg disabled:opacity-40",
						children: t(lang, "continue")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-4 text-sm text-muted underline-offset-4 hover:underline",
						onClick: () => setShowKey((value) => !value),
						children: showKey ? t(lang, "hideKey") : t(lang, "addKey")
					}),
					showKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 w-full text-sm font-medium",
						children: [
							t(lang, "key"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: apiKey,
								onChange: (event) => setApiKey(event.target.value),
								placeholder: t(lang, "keyPh"),
								autoComplete: "off",
								spellCheck: false,
								type: reveal ? "text" : "password",
								className: "mt-2 h-12 w-full rounded-full bg-subtle px-4 font-mono text-sm outline-none placeholder:text-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block font-normal text-faint",
								children: t(lang, "keyHint")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center justify-between pb-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLegal("privacy"),
					children: t(lang, "privacy")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLegal("terms"),
					children: t(lang, "terms")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "pb-4 text-center text-sm text-faint",
				children: [
					t(lang, "versionLabel"),
					": ",
					APP_VERSION
				]
			}),
			legal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legal, {
				lang,
				kind: legal,
				onClose: () => setLegal(null)
			})
		]
	});
}
function Legal({ lang, kind, onClose }) {
	const key = kind === "privacy" ? "privacyBody" : kind === "terms" ? "termsBody" : kind === "help" ? "helpBody" : "aboutBody";
	const title = kind === "privacy" ? "privacy" : kind === "terms" ? "terms" : kind === "help" ? "help" : "about";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scrim fixed inset-0 z-50 flex items-end justify-center sm:items-center",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0",
			"aria-label": t(lang, "close"),
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "sheet-in relative z-10 m-3 w-full max-w-md rounded-3xl bg-elevated p-5",
			role: "dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: t(lang, title)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: t(lang, key)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "mt-5 h-11 w-full rounded-full bg-fg font-medium text-bg",
					children: t(lang, "close")
				})
			]
		})]
	});
}
function Desk() {
	const settings = useDesk((s) => s.settings);
	const patch = useDesk((s) => s.patchSettings);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [navOpen, setNavOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [settingsScreen, setSettingsScreen] = (0, import_react.useState)("root");
	const [modelTarget, setModelTarget] = (0, import_react.useState)(null);
	const [envKey, setEnvKey] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useDesk.persist.rehydrate()).finally(() => setHydrated(true));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const saved = useDesk.getState().settings;
		document.documentElement.dataset.bg = saved.backgroundId;
		document.documentElement.dataset.scale = saved.fontScale;
		document.documentElement.lang = saved.language === "hi" ? "hi" : "en";
		document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", findBackground(saved.backgroundId).swatch);
	}, [
		hydrated,
		settings.backgroundId,
		settings.fontScale,
		settings.language
	]);
	(0, import_react.useEffect)(() => {
		fetch("/api/status").then((res) => res.json()).then((data) => setEnvKey(Boolean(data.env))).catch(() => setEnvKey(false));
	}, []);
	if (!settings.onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, { ready: hydrated });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				open: navOpen,
				onClose: () => setNavOpen(false),
				onOpenSettings: () => {
					setNavOpen(false);
					setSettingsScreen("root");
					setSettingsOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatView, {
				envKey,
				onOpenNav: () => setNavOpen(true),
				onOpenModels: setModelTarget,
				onNeedKey: () => {
					setSettingsScreen("account");
					setSettingsOpen(true);
				}
			}),
			settingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings$1, {
				envKey,
				initial: settingsScreen,
				onClose: () => setSettingsOpen(false)
			}),
			modelTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSheet, {
				lang: settings.language,
				target: modelTarget,
				selectedId: modelTarget === "compare" ? settings.compareModelId : settings.modelId,
				onPick: (id) => {
					patch(modelTarget === "compare" ? { compareModelId: id } : { modelId: id });
					setModelTarget(null);
				},
				onClose: () => setModelTarget(null)
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {});
}
//#endregion
export { Home as component };
