(() => {
  "use strict";

  const cfg = window.PUPPY_LOG_CONFIG || {};
  const CLOUD_READY =
    typeof cfg.SUPABASE_URL === "string" &&
    cfg.SUPABASE_URL.startsWith("https://") &&
    typeof cfg.SUPABASE_PUBLISHABLE_KEY === "string" &&
    !cfg.SUPABASE_PUBLISHABLE_KEY.includes("PASTE_");

  const $ = (id) => document.getElementById(id);

  const LANGUAGE_KEY = "puppy-log-language";
  let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "zh";
  const I18N = {
  "zh": {
    "demoMode": "演示模式",
    "localDemo": "本机演示",
    "cloudSync": "云端同步",
    "demoHeading": "现在是本机演示模式。",
    "demoDescription": "界面可以直接试用，但两台手机还不会同步。连接 Supabase 后会自动变成你们俩共享的云端日志。",
    "signInHeading": "登录你们的小狗日志",
    "signIn": "登录",
    "signUp": "注册",
    "email": "邮箱",
    "password": "密码",
    "passwordPlaceholder": "至少 6 位",
    "forgotPassword": "忘记密码？",
    "authMembers": "每位家庭成员使用自己的账号登录，但加入同一个家庭空间。",
    "recoveryHeading": "设置新密码",
    "newPassword": "新密码",
    "confirmPassword": "再次输入新密码",
    "updatePassword": "更新密码",
    "recoveryHint": "设置成功后，你可以继续使用 Puppy Log。",
    "onboardingHeading": "建立你们的共享空间",
    "firstSetup": "第一次设置",
    "displayName": "你的显示名字",
    "householdName": "家庭空间名字",
    "firstDogName": "第一只小狗名字",
    "createJournal": "创建共享日志",
    "joinFamily": "加入已有家庭",
    "inviteCode": "家庭邀请码",
    "joinJournal": "加入共享日志",
    "displayNameExample": "例如 Li / Mom",
    "partnerNameExample": "例如 Dad",
    "inviteCodeExample": "8 位邀请码",
    "petNameExample": "例如 Douby",
    "petNamePlaceholder": "小狗名字",
    "lastPee": "上次小便",
    "lastPoop": "上次大便",
    "lastMeal": "上次吃饭",
    "latestWeight": "最新体重",
    "quickHeading": "刚刚发生了什么？",
    "pee": "小便",
    "poop": "大便",
    "meal": "吃饭",
    "water": "喝水",
    "weight": "体重",
    "note": "备注",
    "todayPee": "今天小便",
    "todayPoop": "今天大便",
    "todayMeal": "今天吃饭",
    "todayWater": "今天喝水",
    "countUnit": "次",
    "countOne": "次",
    "recentActivity": "最近记录",
    "all": "全部",
    "today": "今天",
    "yesterday": "昨天",
    "loadEarlier": "加载更早记录",
    "loadPreviousWeek": "加载上一周",
    "loadAllRecords": "加载全部",
    "loadingEarlier": "正在加载…",
    "timelineThisWeek": "本周记录",
    "timelineWeeks": "最近 {count} 周",
    "timelineAll": "全部记录",
    "noRecordsThisWeek": "{pet} 本周还没有记录。",
    "noRecordsToday": "{pet} 今天还没有记录。",
    "noRecordsLoadedPeriod": "{pet} 在已加载的时间范围内没有记录。",
    "olderRecordsHint": "更早记录已归档，可按需加载。",
    "log": "记录",
    "time": "时间",
    "amount": "数量",
    "unit": "单位",
    "optional": "可选",
    "notePlaceholder": "可选，例如：饭吃完了 / 便便偏软",
    "cancel": "取消",
    "saveRecord": "保存记录",
    "sharedSpace": "共享空间",
    "familySpace": "家庭空间",
    "currentName": "你现在的名字",
    "inviteMember": "邀请另一位",
    "dogs": "小狗管理",
    "switchOrAddDog": "切换或添加小狗",
    "addButton": "＋ 添加",
    "signOut": "退出登录",
    "sharedHint": "每只小狗的大小便、吃饭、喝水和体重会分别保存。你和家人看到的是同一组小狗和同一份云端记录。",
    "addDogHeading": "添加另一只小狗",
    "dogName": "小狗名字",
    "addAndSwitch": "添加并切换",
    "switchDog": "切换小狗",
    "settings": "设置",
    "recentStatus": "最近状态",
    "close": "关闭",
    "switchLanguage": "切换为英文",
    "noneYet": "暂无",
    "justNow": "刚刚",
    "minutesAgo": "{count} 分钟前",
    "hoursAgo": "{count} 小时前",
    "hoursMinutesAgo": "{hours} 小时 {minutes} 分钟前",
    "oneDayAgo": "1 天前",
    "daysAgo": "{count} 天前",
    "pageTitle": "{pet} Log · 小狗成长日志",
    "noDogs": "还没有小狗。",
    "thisDog": "这只小狗",
    "emptyTimeline": "{pet} 还没有记录。",
    "firstRecordHint": "点上面的按钮记下第一条吧。",
    "recordedBy": "记录人：",
    "unknownRecorder": "未知",
    "me": "我",
    "partner": "另一位",
    "delete": "删除",
    "deleteConfirm": "删除这条记录？",
    "addDogFirst": "请先添加一只小狗",
    "logFor": "记录给 {pet}",
    "savedTo": "已保存到 {pet}",
    "syncedTo": "已同步到 {pet}",
    "dogAdded": "已添加 {pet}",
    "enterEmail": "请先输入你的邮箱",
    "resetEmailSent": "重置邮件已发送，请检查邮箱",
    "resetEmailHint": "请打开邮件里的重置密码链接，然后回到这里设置新密码。",
    "passwordMismatch": "两次输入的密码不一致",
    "passwordUpdated": "密码已更新",
    "signupConfirm": "注册成功，请先去邮箱点确认链接",
    "householdCreated": "创建成功，邀请码 {code}",
    "joinedJournal": "已加入共享日志",
    "signInRequired": "请先登录，再保存记录。",
    "requestFailed": "操作未完成，请重试。详细错误已保留在浏览器控制台。",
    "unitCan": "罐",
    "unitCans": "罐",
    "unitServing": "份",
    "unitServings": "份",
    "unitCup": "杯",
    "unitCups": "杯",
    "eyebrowJournal": "共享小狗日志",
    "eyebrowAuth": "私人空间",
    "eyebrowRecovery": "密码重置",
    "eyebrowSetup": "首次设置",
    "eyebrowQuick": "快捷记录",
    "eyebrowHandoff": "照护交接",
    "eyebrowAdd": "添加记录",
    "eyebrowSettings": "设置",
    "eyebrowAddDog": "添加小狗",
    "eyebrowHistory": "全部记录",
    "viewPeeHistory": "查看所有小便记录",
    "viewPoopHistory": "查看所有大便记录",
    "viewMealHistory": "查看所有吃饭记录",
    "viewWeightHistory": "查看体重变化图",
    "peeHistoryTitle": "所有小便记录",
    "poopHistoryTitle": "所有大便记录",
    "mealHistoryTitle": "所有吃饭记录",
    "weightHistoryTitle": "体重变化",
    "historyCount": "{pet} · 共 {count} 条记录",
    "historyCountOne": "{pet} · 共 1 条记录",
    "loadingRecords": "正在加载记录…",
    "noTypeHistory": "{pet} 还没有{type}记录。",
    "noWeightHistory": "{pet} 还没有可绘制的体重记录。",
    "weightChartAria": "{pet} 的体重变化折线图，单位为 {unit}",
    "weightPoint": "{date}：{value} {unit}",
    "historyLoadFailed": "记录加载失败，请重试。",
    "edit": "修改",
    "recordType": "记录类型",
    "eyebrowEdit": "修改记录",
    "saveChanges": "保存修改",
    "recordUpdated": "记录已更新",
    "recordNotFound": "找不到这条记录，请刷新后重试。",
    "outingReminder": "出门提醒",
    "logPeeNow": "记录小便",
    "reminderSettings": "提醒设置",
    "reminderSchedule": "提醒间隔",
    "reminderPuppyPreset": "幼犬 · 每 4 小时",
    "reminderAdultPreset": "大狗 · 每 6.5 小时",
    "reminderCustomPreset": "自定义",
    "reminderOffPreset": "关闭提醒",
    "customHours": "自定义小时数",
    "saveReminder": "保存提醒设置",
    "reminderLocalHint": "按最近一次小便记录计算。设置只保存在当前设备，每台手机可以单独选择。",
    "reminderSaved": "{pet} 的提醒已保存",
    "reminderDisabled": "{pet} 的出门提醒已关闭",
    "reminderNoPee": "{pet} 还没有小便记录；记录一次后开始倒计时。",
    "reminderWaitingDetail": "当前设置：每 {hours} 小时提醒",
    "reminderNext": "{pet} 距离下次出门还有 {remaining}",
    "reminderDueSoon": "{pet} 很快需要出门：还有 {remaining}",
    "reminderOverdue": "{pet} 该出门了，已超时 {overdue}",
    "reminderBasedOn": "按最后一次小便 {time} 计算 · 每 {hours} 小时",
    "reminderOffStatus": "当前已关闭出门提醒",
    "durationMinutes": "{minutes} 分钟",
    "durationHours": "{hours} 小时",
    "durationHoursMinutes": "{hours} 小时 {minutes} 分钟",
    "invalidReminderHours": "请输入 0.5 到 24 之间的小时数"
  },
  "en": {
    "demoMode": "Demo mode",
    "localDemo": "Local demo",
    "cloudSync": "Cloud sync",
    "demoHeading": "You are using local demo mode.",
    "demoDescription": "You can try the interface now, but devices do not sync yet. Connect Supabase to share the cloud journal with your family.",
    "signInHeading": "Sign in to your puppy log",
    "signIn": "Sign in",
    "signUp": "Sign up",
    "email": "Email",
    "password": "Password",
    "passwordPlaceholder": "At least 6 characters",
    "forgotPassword": "Forgot password?",
    "authMembers": "Each family member uses their own account and joins the same family space.",
    "recoveryHeading": "Set a new password",
    "newPassword": "New password",
    "confirmPassword": "Confirm new password",
    "updatePassword": "Update password",
    "recoveryHint": "After updating your password, you can continue using Puppy Log.",
    "onboardingHeading": "Set up your shared space",
    "firstSetup": "First-time setup",
    "displayName": "Your display name",
    "householdName": "Family space name",
    "firstDogName": "First dog’s name",
    "createJournal": "Create shared journal",
    "joinFamily": "Join an existing family",
    "inviteCode": "Family invite code",
    "joinJournal": "Join shared journal",
    "displayNameExample": "e.g. Li / Mom",
    "partnerNameExample": "e.g. Dad",
    "inviteCodeExample": "8-character invite code",
    "petNameExample": "e.g. Douby",
    "petNamePlaceholder": "Dog name",
    "lastPee": "Last pee",
    "lastPoop": "Last poop",
    "lastMeal": "Last meal",
    "latestWeight": "Latest weight",
    "quickHeading": "What just happened?",
    "pee": "Pee",
    "poop": "Poop",
    "meal": "Meal",
    "water": "Water",
    "weight": "Weight",
    "note": "Note",
    "todayPee": "Pee today",
    "todayPoop": "Poop today",
    "todayMeal": "Meals today",
    "todayWater": "Water today",
    "countUnit": "logs",
    "countOne": "log",
    "recentActivity": "Recent activity",
    "all": "All",
    "today": "Today",
    "yesterday": "Yesterday",
    "loadEarlier": "Load earlier records",
    "loadPreviousWeek": "Load previous week",
    "loadAllRecords": "Load all",
    "loadingEarlier": "Loading…",
    "timelineThisWeek": "This week",
    "timelineWeeks": "Last {count} weeks",
    "timelineAll": "All records",
    "noRecordsThisWeek": "No records for {pet} this week.",
    "noRecordsToday": "No records for {pet} today.",
    "noRecordsLoadedPeriod": "No records for {pet} in the loaded date range.",
    "olderRecordsHint": "Earlier records are archived and can be loaded when needed.",
    "log": "Log",
    "time": "Time",
    "amount": "Amount",
    "unit": "Unit",
    "optional": "Optional",
    "notePlaceholder": "Optional, e.g. finished the meal / soft stool",
    "cancel": "Cancel",
    "saveRecord": "Save record",
    "sharedSpace": "Shared space",
    "familySpace": "Family space",
    "currentName": "Your display name",
    "inviteMember": "Invite a family member",
    "dogs": "Dogs",
    "switchOrAddDog": "Switch or add a dog",
    "addButton": "+ Add",
    "signOut": "Sign out",
    "sharedHint": "Each dog has separate pee, poop, meal, water, and weight records. You and your family share the same dogs and cloud journal.",
    "addDogHeading": "Add another dog",
    "dogName": "Dog name",
    "addAndSwitch": "Add and switch",
    "switchDog": "Switch dog",
    "settings": "Settings",
    "recentStatus": "Recent status",
    "close": "Close",
    "switchLanguage": "Switch to Chinese",
    "noneYet": "None yet",
    "justNow": "Just now",
    "minutesAgo": "{count} min ago",
    "hoursAgo": "{count} hr ago",
    "hoursMinutesAgo": "{hours} hr {minutes} min ago",
    "oneDayAgo": "1 day ago",
    "daysAgo": "{count} days ago",
    "pageTitle": "{pet} Log · Puppy journal",
    "noDogs": "No dogs yet.",
    "thisDog": "This dog",
    "emptyTimeline": "No records for {pet} yet.",
    "firstRecordHint": "Use a button above to add the first record.",
    "recordedBy": "Recorded by:",
    "unknownRecorder": "Unknown",
    "me": "Me",
    "partner": "Partner",
    "delete": "Delete",
    "deleteConfirm": "Delete this record?",
    "addDogFirst": "Please add a dog first.",
    "logFor": "Log for {pet}",
    "savedTo": "Saved to {pet}",
    "syncedTo": "Synced to {pet}",
    "dogAdded": "Added {pet}",
    "enterEmail": "Please enter your email first.",
    "resetEmailSent": "Password reset email sent. Check your inbox.",
    "resetEmailHint": "Open the password reset link in your email, then return here to set a new password.",
    "passwordMismatch": "The passwords do not match.",
    "passwordUpdated": "Password updated.",
    "signupConfirm": "Account created. Check your email for the confirmation link.",
    "householdCreated": "Shared space created. Invite code: {code}",
    "joinedJournal": "Joined the shared journal.",
    "signInRequired": "Please sign in before saving a record.",
    "requestFailed": "The request could not be completed. Please try again. Error details are available in the browser console.",
    "unitCan": "can",
    "unitCans": "cans",
    "unitServing": "serving",
    "unitServings": "servings",
    "unitCup": "cup",
    "unitCups": "cups",
    "eyebrowJournal": "SHARED PUPPY JOURNAL",
    "eyebrowAuth": "PRIVATE ACCESS",
    "eyebrowRecovery": "PASSWORD RECOVERY",
    "eyebrowSetup": "ONE-TIME SETUP",
    "eyebrowQuick": "QUICK LOG",
    "eyebrowHandoff": "HANDOFF",
    "eyebrowAdd": "ADD EVENT",
    "eyebrowSettings": "SETTINGS",
    "eyebrowAddDog": "ADD PET",
    "eyebrowHistory": "ALL RECORDS",
    "viewPeeHistory": "View all pee records",
    "viewPoopHistory": "View all poop records",
    "viewMealHistory": "View all meal records",
    "viewWeightHistory": "View weight chart",
    "peeHistoryTitle": "All pee records",
    "poopHistoryTitle": "All poop records",
    "mealHistoryTitle": "All meal records",
    "weightHistoryTitle": "Weight history",
    "historyCount": "{pet} · {count} records",
    "historyCountOne": "{pet} · 1 record",
    "loadingRecords": "Loading records…",
    "noTypeHistory": "No {type} records for {pet} yet.",
    "noWeightHistory": "No weight records are available to chart for {pet} yet.",
    "weightChartAria": "Line chart of {pet}’s weight in {unit}",
    "weightPoint": "{date}: {value} {unit}",
    "historyLoadFailed": "Records could not be loaded. Please try again.",
    "edit": "Edit",
    "recordType": "Record type",
    "eyebrowEdit": "EDIT RECORD",
    "saveChanges": "Save changes",
    "recordUpdated": "Record updated",
    "recordNotFound": "This record could not be found. Refresh and try again.",
    "outingReminder": "Outing reminder",
    "logPeeNow": "Log pee",
    "reminderSettings": "Reminder settings",
    "reminderSchedule": "Reminder interval",
    "reminderPuppyPreset": "Puppy · Every 4 hours",
    "reminderAdultPreset": "Adult dog · Every 6.5 hours",
    "reminderCustomPreset": "Custom",
    "reminderOffPreset": "Turn reminders off",
    "customHours": "Custom hours",
    "saveReminder": "Save reminder settings",
    "reminderLocalHint": "The timer starts from the latest pee record. Settings are saved on this device, so each phone can choose separately.",
    "reminderSaved": "Reminder saved for {pet}",
    "reminderDisabled": "Outing reminder turned off for {pet}",
    "reminderNoPee": "No pee record for {pet} yet. Log one to start the timer.",
    "reminderWaitingDetail": "Current setting: every {hours} hours",
    "reminderNext": "Next outing for {pet} in {remaining}",
    "reminderDueSoon": "{pet} should go out soon: {remaining} remaining",
    "reminderOverdue": "{pet} should go out now — overdue by {overdue}",
    "reminderBasedOn": "Based on the last pee at {time} · every {hours} hours",
    "reminderOffStatus": "Outing reminders are turned off",
    "durationMinutes": "{minutes} min",
    "durationHours": "{hours} hr",
    "durationHoursMinutes": "{hours} hr {minutes} min",
    "invalidReminderHours": "Enter a number from 0.5 to 24 hours"
  }
};
  let activeToast = null;

  function tr(key, values = {}) {
    const template = I18N[currentLanguage][key];
    if (typeof template !== "string") {
      console.warn("Missing Puppy Log translation:", key);
      return key;
    }
    return template.replace(/\{(\w+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match
    );
  }

  function formatUnit(unit, amount = null) {
    // Keep stored unit values unchanged, including older Chinese unit codes.
    const plural = amount !== null && Number(amount) !== 1;
    const keys = {
      "罐": plural ? "unitCans" : "unitCan",
      "份": plural ? "unitServings" : "unitServing",
      "杯": plural ? "unitCups" : "unitCup"
    };
    if (keys[unit]) return tr(keys[unit]);
    if (currentLanguage === "en" && unit === "cup" && plural) return "cups";
    return unit || "";
  }

  function renderAuthText() {
    $("authSubmitBtn").textContent = tr($("authForm").dataset.mode === "signup" ? "signUp" : "signIn");
    $("authHint").textContent = tr(state.authHint);
  }

  function renderLogText() {
    const type = $("eventType").value;
    const info = TYPE[type];
    const editing = Boolean(state.editingEventId);
    $("dialogEyebrow").textContent = tr(editing ? "eyebrowEdit" : "eyebrowAdd");
    $("saveEventBtn").textContent = tr(editing ? "saveChanges" : "saveRecord");
    $("eventTypeRow").classList.toggle("hidden", !editing);
    if (!info) {
      $("dialogTitle").textContent = tr("log");
      return;
    }
    $("dialogTitle").textContent = `${info.icon} ${tr(info.label)}`;
    $("dialogPetName").textContent = tr("logFor", {pet: state.pet?.name || "Puppy"});
    // Relabel options without resetting the selected unit or any typed values.
    [...$("eventUnit").options].forEach(option => {
      option.textContent = option.value ? formatUnit(option.value) : "—";
    });
  }

  function applyLanguage() {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = tr(el.dataset.i18n);
    });
    ["placeholder", "aria-label", "title"].forEach(attr => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach(el => {
        el.setAttribute(attr, tr(el.getAttribute(`data-i18n-${attr}`)));
      });
    });
    $("languageToggleBtn").textContent = currentLanguage === "zh" ? "EN" : "ZH";
    setCloudUI();
    renderAuthText();
    renderAll();
    renderLogText();
    if ($("historyDialog")?.open) renderHistoryDialog();
    if (activeToast) $("toast").textContent = tr(activeToast.key, activeToast.values);
  }

  function toggleLanguage() {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyLanguage();
  }

  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const TYPE = {
    pee:    { label: "pee", icon: "💧", units: [] },
    poop:   { label: "poop", icon: "💩", units: [] },
    meal:   { label: "meal", icon: "🍽️", units: ["g", "cup", "罐", "份"] },
    water:  { label: "water", icon: "🥤", units: ["mL", "oz", "杯"] },
    weight: { label: "weight", icon: "⚖️", units: ["lb", "kg"] },
    note:   { label: "note", icon: "📝", units: [] }
  };

  const state = {
    supabase: null,
    session: null,
    household: null,
    member: null,
    pets: [],
    pet: null,
    members: {},
    events: [],
    latestByType: {},
    filter: "all",
    loadedWeeks: 1,
    allEventsLoaded: false,
    hasOlderEvents: false,
    eventsLoading: false,
    weekAnchor: null,
    channel: null,
    recoveryMode: false,
    authHint: "authMembers",
    historyType: null,
    historyEvents: [],
    historyLoading: false,
    historyError: false,
    historyRequestId: 0,
    editingEventId: null,
    returnHistoryType: null,
    demo: !CLOUD_READY
  };

  function toast(key, values = {}) {
    activeToast = {key, values};
    const el = $("toast");
    el.textContent = tr(key, values);
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.classList.remove("show");
      activeToast = null;
    }, 3500);
  }

  function showError(error) {
    // Server diagnostics are not app translations. Keep the original for debugging.
    console.error("Puppy Log request failed:", error);
    toast("requestFailed");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function localDatetimeValue(date = new Date()) {
    const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return shifted.toISOString().slice(0, 16);
  }

  function startOfToday() {
    const d = new Date(); d.setHours(0,0,0,0); return d;
  }

  function startOfWeek(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const daysSinceMonday = (day + 6) % 7;
    d.setDate(d.getDate() - daysSinceMonday);
    return d;
  }

  function currentWeekAnchor() {
    return startOfWeek().toISOString();
  }

  function loadedWindowStart() {
    const start = new Date(state.weekAnchor || currentWeekAnchor());
    start.setDate(start.getDate() - 7 * Math.max(0, state.loadedWeeks - 1));
    return start;
  }

  function resetEventWindow() {
    state.events = [];
    state.latestByType = {};
    state.loadedWeeks = 1;
    state.allEventsLoaded = false;
    state.hasOlderEvents = false;
    state.eventsLoading = false;
    state.weekAnchor = currentWeekAnchor();
  }

  const EVENT_CACHE_MAX_AGE = 48 * 60 * 60 * 1000;

  function eventCacheKey(petId, householdId, weekAnchor = state.weekAnchor) {
    return `puppy-log-week-cache-v9-${householdId}-${petId}-${weekAnchor || currentWeekAnchor()}`;
  }

  function hydrateEventCache(petId, householdId, startIso) {
    try {
      const raw = localStorage.getItem(eventCacheKey(petId, householdId));
      if (!raw) return false;
      const cached = JSON.parse(raw);
      if (!cached || Date.now() - Number(cached.savedAt) > EVENT_CACHE_MAX_AGE) return false;
      const start = new Date(startIso);
      state.events = (Array.isArray(cached.events) ? cached.events : [])
        .filter(event => new Date(event.event_time) >= start)
        .sort((a, b) => new Date(b.event_time) - new Date(a.event_time));
      state.latestByType = cached.latestByType && typeof cached.latestByType === "object"
        ? cached.latestByType : {};
      state.hasOlderEvents = Boolean(cached.hasOlderEvents);
      return true;
    } catch (error) {
      console.warn("Invalid Puppy Log event cache:", error);
      return false;
    }
  }

  function saveEventCache(petId, householdId) {
    try {
      const weekStart = new Date(state.weekAnchor || currentWeekAnchor());
      const weekEvents = state.events.filter(event => new Date(event.event_time) >= weekStart);
      const hasOlderEvents = state.allEventsLoaded
        ? state.events.some(event => new Date(event.event_time) < weekStart)
        : state.hasOlderEvents || state.loadedWeeks > 1;
      localStorage.setItem(eventCacheKey(petId, householdId), JSON.stringify({
        savedAt: Date.now(),
        events: weekEvents,
        latestByType: state.latestByType,
        hasOlderEvents
      }));
    } catch (error) {
      console.warn("Could not save Puppy Log event cache:", error);
    }
  }

  function mergeEvents(rows) {
    const merged = new Map(state.events.map(event => [event.id, event]));
    (rows || []).forEach(event => merged.set(event.id, event));
    state.events = [...merged.values()]
      .sort((a, b) => new Date(b.event_time) - new Date(a.event_time));
  }

  function sameLocalDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function relativeAgo(iso) {
    if (!iso) return "—";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return tr("justNow");
    if (mins < 60) return tr("minutesAgo", {count: mins});
    const hours = Math.floor(mins / 60), minutes = mins % 60;
    if (hours < 24) return minutes
      ? tr("hoursMinutesAgo", {hours, minutes})
      : tr("hoursAgo", {count: hours});
    const days = Math.floor(hours / 24);
    return days === 1 ? tr("oneDayAgo") : tr("daysAgo", {count: days});
  }

  function formatClock(iso) {
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      hour: "numeric", minute: "2-digit"
    }).format(new Date(iso));
  }

  function formatDate(iso) {
    const d = new Date(iso), now = new Date();
    if (sameLocalDay(d, now)) return tr("today");
    const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
    if (sameLocalDay(d, yesterday)) return tr("yesterday");
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      month: "short", day: "numeric", weekday: "short"
    }).format(d);
  }

  function recorderName(event) {
    const uid = event.user_id;
    if (!uid) return tr("unknownRecorder");
    // These two names belong to the demo, not real household members.
    if (state.demo && uid === "demo-user") return tr("me");
    if (state.demo && uid === "demo-partner") return tr("partner");
    const name = Object.prototype.hasOwnProperty.call(state.members, uid)
      ? state.members[uid] : null;
    if (typeof name === "string" && name.trim()) return name;
    if (uid === state.member?.user_id && state.member.display_name?.trim()) {
      return state.member.display_name;
    }
    // Never assign old or unmatched records to the current viewer.
    return tr("unknownRecorder");
  }

  function findEventById(id) {
    return state.events.find(event => event.id === id)
      || state.historyEvents.find(event => event.id === id)
      || null;
  }

  function eventActionsHtml(event) {
    return `<div class="event-actions">
      <button data-edit="${escapeHtml(event.id)}" type="button">${escapeHtml(tr("edit"))}</button>
      <button data-delete="${escapeHtml(event.id)}" type="button">${escapeHtml(tr("delete"))}</button>
    </div>`;
  }

  function historyTitleKey(type) {
    return ({
      pee: "peeHistoryTitle",
      poop: "poopHistoryTitle",
      meal: "mealHistoryTitle",
      weight: "weightHistoryTitle"
    })[type] || "recentActivity";
  }

  function formatHistoryDateTime(iso) {
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    }).format(new Date(iso));
  }

  function formatShortDate(iso) {
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      month: "short", day: "numeric"
    }).format(new Date(iso));
  }

  function formatChartTickDate(timestamp, spanMs) {
    const day = 24 * 60 * 60 * 1000;
    let options;
    if (spanMs <= 2 * day) {
      options = {month: "numeric", day: "numeric", hour: "numeric"};
    } else if (spanMs > 180 * day) {
      options = {year: "2-digit", month: "short", day: "numeric"};
    } else {
      options = {month: "short", day: "numeric"};
    }
    return new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", options)
      .format(new Date(timestamp));
  }

  async function fetchHistoryEvents(type) {
    if (!state.pet) return [];

    if (state.demo) {
      const all = JSON.parse(localStorage.getItem("puppy-log-demo-events") || "[]");
      return all.filter(e => e.pet_id === state.pet.id && e.event_type === type)
        .sort((a, b) => new Date(b.event_time) - new Date(a.event_time));
    }

    const rows = [];
    const pageSize = 500;
    let from = 0;

    while (true) {
      const {data, error} = await state.supabase
        .from("puppy_events")
        .select("*")
        .eq("household_id", state.household.id)
        .eq("pet_id", state.pet.id)
        .eq("event_type", type)
        .order("event_time", {ascending: false})
        .order("id", {ascending: false})
        .range(from, from + pageSize - 1);

      if (error) throw error;
      rows.push(...(data || []));
      if (!data || data.length < pageSize) break;
      from += pageSize;
    }

    return rows;
  }

  async function openHistory(type) {
    if (!state.pet || !TYPE[type]) return;

    const requestId = ++state.historyRequestId;
    state.historyType = type;
    state.historyEvents = [];
    state.historyLoading = true;
    state.historyError = false;
    renderHistoryDialog();
    if (!$("historyDialog").open) $("historyDialog").showModal();

    try {
      const rows = await fetchHistoryEvents(type);
      if (requestId !== state.historyRequestId) return;
      state.historyEvents = rows;
      state.historyLoading = false;
      state.historyError = false;
      renderHistoryDialog();
    } catch (error) {
      if (requestId !== state.historyRequestId) return;
      console.error("Puppy Log history load failed:", error);
      state.historyEvents = [];
      state.historyLoading = false;
      state.historyError = true;
      renderHistoryDialog();
      toast("historyLoadFailed");
    }
  }

  function renderHistoryList(events) {
    let lastDate = "";
    $("historyList").innerHTML = events.map(event => {
      const dateLabel = formatDate(event.event_time);
      const separator = dateLabel !== lastDate
        ? `<div class="date-sep">${escapeHtml(dateLabel)}</div>` : "";
      lastDate = dateLabel;
      const who = recorderName(event);
      const amount = event.amount != null
        ? ` · ${escapeHtml(event.amount)} ${escapeHtml(formatUnit(event.unit, event.amount))}` : "";
      const info = TYPE[event.event_type] || TYPE.note;
      return `${separator}
        <div class="event-row history-event-row">
          <div class="event-icon">${info.icon}</div>
          <div class="event-main">
            <b>${escapeHtml(tr(info.label))}${amount}</b>
            <div class="meta"><span class="event-recorder">${escapeHtml(tr("recordedBy"))} <span class="recorder-name">${escapeHtml(who)}</span></span></div>
            ${event.note ? `<div class="event-note">${escapeHtml(event.note)}</div>` : ""}
          </div>
          <div class="event-time">
            <span>${escapeHtml(formatHistoryDateTime(event.event_time))}</span>
            ${eventActionsHtml(event)}
          </div>
        </div>`;
    }).join("");
  }

  function renderHistoryDialog() {
    const type = state.historyType;
    if (!type || !TYPE[type]) return;

    const events = state.historyEvents || [];
    const petName = state.pet?.name || tr("thisDog");
    $("historyTitle").textContent = tr(historyTitleKey(type));
    $("historySubtitle").textContent = tr(events.length === 1 ? "historyCountOne" : "historyCount", {pet: petName, count: events.length});
    $("historyLoading").classList.toggle("hidden", !state.historyLoading);
    $("historyEmpty").classList.add("hidden");
    $("historyChart").classList.add("hidden");
    $("historyChart").innerHTML = "";
    $("historyList").innerHTML = "";

    if (state.historyLoading) return;

    if (state.historyError) {
      $("historyEmpty").textContent = tr("historyLoadFailed");
      $("historyEmpty").classList.remove("hidden");
      return;
    }

    if (!events.length) {
      $("historyEmpty").textContent = type === "weight"
        ? tr("noWeightHistory", {pet: petName})
        : tr("noTypeHistory", {pet: petName, type: tr(TYPE[type].label)});
      $("historyEmpty").classList.remove("hidden");
      return;
    }

    if (type === "weight") renderWeightChart(events, petName);
    renderHistoryList(events);
  }

  function normalizedWeight(amount, fromUnit, toUnit) {
    const value = Number(amount);
    if (!Number.isFinite(value)) return null;
    const from = String(fromUnit || toUnit).toLowerCase();
    const to = String(toUnit || fromUnit).toLowerCase();
    if (!from || !to || from === to) return value;
    if (from === "kg" && to === "lb") return value * 2.2046226218;
    if (from === "lb" && to === "kg") return value / 2.2046226218;
    return null;
  }

  function renderWeightChart(events, petName) {
    const valid = events
      .filter(event => Number.isFinite(Number(event.amount)))
      .sort((a, b) => new Date(a.event_time) - new Date(b.event_time));

    if (!valid.length) {
      $("historyEmpty").textContent = tr("noWeightHistory", {pet: petName});
      $("historyEmpty").classList.remove("hidden");
      return;
    }

    const lastKnownUnit = [...valid].reverse().find(event => ["lb", "kg"].includes(String(event.unit).toLowerCase()))?.unit;
    const unit = String(lastKnownUnit || valid[valid.length - 1].unit || "lb").toLowerCase();
    const points = valid.map(event => ({
      event,
      value: normalizedWeight(event.amount, event.unit, unit)
    })).filter(point => Number.isFinite(point.value));

    if (!points.length) {
      $("historyEmpty").textContent = tr("noWeightHistory", {pet: petName});
      $("historyEmpty").classList.remove("hidden");
      return;
    }

    const compact = window.matchMedia("(max-width: 520px)").matches;
    const width = compact ? 360 : 680;
    const height = compact ? 275 : 330;
    const margin = compact
      ? {left: 43, right: 12, top: 24, bottom: 45}
      : {left: 58, right: 24, top: 28, bottom: 54};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const values = points.map(point => point.value);
    let minValue = Math.min(...values), maxValue = Math.max(...values);
    const naturalRange = maxValue - minValue;
    const pad = naturalRange > 0 ? naturalRange * 0.12 : Math.max(Math.abs(maxValue) * 0.05, 0.5);
    minValue -= pad;
    maxValue += pad;

    const times = points.map(point => new Date(point.event.event_time).getTime());
    const minTime = Math.min(...times), maxTime = Math.max(...times);
    const timeRange = maxTime - minTime;
    const xAtTime = time => timeRange === 0
      ? margin.left + innerWidth / 2
      : margin.left + (time - minTime) * innerWidth / timeRange;
    const xAt = index => xAtTime(times[index]);
    const yAt = value => margin.top + (maxValue - value) * innerHeight / (maxValue - minValue);
    const polyline = points.map((point, index) => `${xAt(index).toFixed(2)},${yAt(point.value).toFixed(2)}`).join(" ");

    const yTickCount = 4;
    const yTicks = Array.from({length: yTickCount + 1}, (_, index) => {
      const value = minValue + (maxValue - minValue) * index / yTickCount;
      const y = yAt(value);
      return `<line class="chart-grid-line" x1="${margin.left}" x2="${width - margin.right}" y1="${y}" y2="${y}"/>
        <text class="chart-axis-label" x="${margin.left - 9}" y="${y + 4}" text-anchor="end">${escapeHtml(value.toFixed(1))}</text>`;
    }).join("");

    const xTickCount = timeRange === 0 ? 1 : (compact ? 4 : 5);
    const tickTimes = Array.from({length: xTickCount}, (_, index) => xTickCount === 1
      ? minTime
      : minTime + timeRange * index / (xTickCount - 1));
    const xTicks = tickTimes.map(time => {
      const x = xAtTime(time);
      return `<line class="chart-time-grid-line" x1="${x}" x2="${x}" y1="${margin.top}" y2="${height - margin.bottom}"/>
        <text class="chart-axis-label" x="${x}" y="${height - 18}" text-anchor="middle">${escapeHtml(formatChartTickDate(time, timeRange))}</text>`;
    }).join("");

    const circles = points.map((point, index) => {
      const valueText = point.value.toFixed(point.value % 1 === 0 ? 0 : 1);
      const title = tr("weightPoint", {
        date: formatHistoryDateTime(point.event.event_time),
        value: valueText,
        unit
      });
      const previousGap = index > 0 ? xAt(index) - xAt(index - 1) : Infinity;
      const nextGap = index < points.length - 1 ? xAt(index + 1) - xAt(index) : Infinity;
      const label = points.length <= 10 && Math.min(previousGap, nextGap) >= 30
        ? `<text class="chart-value-label" x="${xAt(index)}" y="${yAt(point.value) - 10}" text-anchor="middle">${escapeHtml(valueText)}</text>` : "";
      return `${label}<circle class="chart-point" cx="${xAt(index)}" cy="${yAt(point.value)}" r="5" tabindex="0"><title>${escapeHtml(title)}</title></circle>`;
    }).join("");

    const aria = tr("weightChartAria", {pet: petName, unit});
    $("historyChart").setAttribute("aria-label", aria);
    $("historyChart").innerHTML = `<svg aria-hidden="true" class="weight-chart-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 ${width} ${height}">
      ${yTicks}
      ${xTicks}
      <line class="chart-axis-line" x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height - margin.bottom}"/>
      <line class="chart-axis-line" x1="${margin.left}" x2="${width - margin.right}" y1="${height - margin.bottom}" y2="${height - margin.bottom}"/>
      <polyline class="chart-line" fill="none" points="${polyline}"/>
      ${circles}
      <text class="chart-unit-label" x="${margin.left}" y="17">${escapeHtml(unit)}</text>
    </svg>`;
    $("historyChart").classList.remove("hidden");
  }

  function petStorageKey() {
    return state.household ? `puppy-log-selected-pet-${state.household.id}` : "puppy-log-selected-pet";
  }

  function reminderStorageKey(petId = state.pet?.id) {
    const householdId = state.household?.id || "local";
    return `puppy-log-outing-reminder-${householdId}-${petId || "none"}`;
  }

  function getReminderSettings(petId = state.pet?.id) {
    const fallback = {enabled: true, hours: 4};
    if (!petId) return fallback;
    try {
      const saved = JSON.parse(localStorage.getItem(reminderStorageKey(petId)) || "null");
      if (!saved || typeof saved !== "object") return fallback;
      const hours = Number(saved.hours);
      if (saved.enabled === false) return {enabled: false, hours: Number.isFinite(hours) ? hours : 4};
      if (!Number.isFinite(hours) || hours < 0.5 || hours > 24) return fallback;
      return {enabled: true, hours};
    } catch (error) {
      console.warn("Invalid Puppy Log reminder settings:", error);
      return fallback;
    }
  }

  function setReminderSettings(settings, petId = state.pet?.id) {
    if (!petId) return;
    localStorage.setItem(reminderStorageKey(petId), JSON.stringify(settings));
  }

  function formatHoursValue(hours) {
    return new Intl.NumberFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
      maximumFractionDigits: 1
    }).format(Number(hours));
  }

  function formatDuration(milliseconds) {
    const totalMinutes = Math.max(1, Math.ceil(Math.abs(milliseconds) / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!hours) return tr("durationMinutes", {minutes});
    if (!minutes) return tr("durationHours", {hours});
    return tr("durationHoursMinutes", {hours, minutes});
  }

  function renderReminderSettings() {
    if (!$("reminderPreset") || !state.pet) return;
    const settings = getReminderSettings();
    $("reminderPetName").textContent = state.pet.name || "Puppy";
    let preset = "custom";
    if (!settings.enabled) preset = "off";
    else if (Math.abs(settings.hours - 4) < 0.001) preset = "4";
    else if (Math.abs(settings.hours - 6.5) < 0.001) preset = "6.5";
    $("reminderPreset").value = preset;
    $("reminderCustomHours").value = String(settings.hours || 4);
    $("reminderCustomRow").classList.toggle("hidden", preset !== "custom");
  }

  function renderOutingReminder() {
    const panel = $("outingReminder");
    if (!panel) return;
    if (!state.pet) {
      panel.classList.add("hidden");
      return;
    }

    const settings = getReminderSettings();
    if (!settings.enabled) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden", "reminder-soon", "reminder-overdue");
    const petName = state.pet.name || tr("thisDog");
    const lastPee = latest("pee");
    const hours = formatHoursValue(settings.hours);

    if (!lastPee) {
      $("outingReminderStatus").textContent = tr("reminderNoPee", {pet: petName});
      $("outingReminderDetail").textContent = tr("reminderWaitingDetail", {hours});
      return;
    }

    const dueAt = new Date(lastPee.event_time).getTime() + settings.hours * 60 * 60 * 1000;
    const remaining = dueAt - Date.now();
    if (remaining <= 0) {
      panel.classList.add("reminder-overdue");
      $("outingReminderStatus").textContent = tr("reminderOverdue", {
        pet: petName,
        overdue: formatDuration(remaining)
      });
    } else if (remaining <= 30 * 60 * 1000) {
      panel.classList.add("reminder-soon");
      $("outingReminderStatus").textContent = tr("reminderDueSoon", {
        pet: petName,
        remaining: formatDuration(remaining)
      });
    } else {
      $("outingReminderStatus").textContent = tr("reminderNext", {
        pet: petName,
        remaining: formatDuration(remaining)
      });
    }
    $("outingReminderDetail").textContent = tr("reminderBasedOn", {
      time: formatClock(lastPee.event_time),
      hours
    });
  }

  function updateReminderCustomVisibility() {
    $("reminderCustomRow").classList.toggle("hidden", $("reminderPreset").value !== "custom");
  }

  function saveReminderSettings() {
    if (!state.pet) return;
    const preset = $("reminderPreset").value;
    if (preset === "off") {
      setReminderSettings({enabled: false, hours: getReminderSettings().hours || 4});
      renderAll();
      toast("reminderDisabled", {pet: state.pet.name});
      return;
    }

    const hours = preset === "custom" ? Number($("reminderCustomHours").value) : Number(preset);
    if (!Number.isFinite(hours) || hours < 0.5 || hours > 24) {
      toast("invalidReminderHours");
      $("reminderCustomHours").focus();
      return;
    }

    setReminderSettings({enabled: true, hours});
    renderAll();
    toast("reminderSaved", {pet: state.pet.name});
  }

  function openSettingsDialog(focusReminder = false) {
    renderReminderSettings();
    if (!$("settingsDialog").open) $("settingsDialog").showModal();
    if (focusReminder) {
      requestAnimationFrame(() => $("reminderSettingsSection").scrollIntoView({block: "center"}));
    }
  }

  function latest(type) {
    return state.latestByType[type] || state.events.find(event => event.event_type === type);
  }

  function setCloudUI() {
    $("demoBanner").classList.toggle("hidden", !state.demo);
    $("syncPill").textContent = tr(state.demo ? "localDemo" : "cloudSync");
    $("settingsBtn").classList.toggle("hidden", !state.demo && !state.session);
    $("signOutBtn").classList.toggle("hidden", state.demo);
  }

  function showView(name) {
    $("authView").classList.add("hidden");
    $("recoveryView").classList.add("hidden");
    $("onboardingView").classList.add("hidden");
    $("appView").classList.add("hidden");
    if (name === "auth") $("authView").classList.remove("hidden");
    if (name === "recovery") $("recoveryView").classList.remove("hidden");
    if (name === "onboarding") $("onboardingView").classList.remove("hidden");
    if (name === "app") $("appView").classList.remove("hidden");
  }

  function chooseInitialPet() {
    if (!state.pets.length) {
      state.pet = null;
      return;
    }
    const saved = localStorage.getItem(petStorageKey());
    state.pet = state.pets.find(p => p.id === saved) || state.pets[0];
    localStorage.setItem(petStorageKey(), state.pet.id);
  }

  async function selectPet(petId) {
    const next = state.pets.find(p => p.id === petId);
    if (!next || next.id === state.pet?.id) return;
    state.pet = next;
    state.historyRequestId += 1;
    if ($("historyDialog")?.open) $("historyDialog").close();
    localStorage.setItem(petStorageKey(), next.id);
    resetEventWindow();
    renderAll();
    await fetchEvents();
  }

  function readDemoEvents() {
    try {
      return JSON.parse(localStorage.getItem("puppy-log-demo-events") || "[]");
    } catch (error) {
      console.warn("Invalid Puppy Log demo events:", error);
      return [];
    }
  }

  function writeDemoEvents(events) {
    localStorage.setItem("puppy-log-demo-events", JSON.stringify(events));
  }

  function demoEventsForPet(petId = state.pet?.id) {
    return readDemoEvents()
      .filter(event => event.pet_id === petId)
      .sort((a, b) => new Date(b.event_time) - new Date(a.event_time));
  }

  function demoUpsertEvent(item) {
    const all = readDemoEvents();
    const index = all.findIndex(event => event.id === item.id);
    if (index >= 0) all[index] = item;
    else all.push(item);
    writeDemoEvents(all);
  }

  function demoDeleteEvent(id) {
    writeDemoEvents(readDemoEvents().filter(event => event.id !== id));
  }

  async function demoLoad() {
    state.household = { id:"demo", name:"Our Puppy", invite_code:"DEMO2026" };
    state.member = { household_id:"demo", user_id:"demo-user", display_name:"我" };
    state.pets = JSON.parse(localStorage.getItem("puppy-log-demo-pets") || "null") || [
      { id:"demo-pet-1", name:"Puppy", created_at:new Date().toISOString() }
    ];
    chooseInitialPet();
    state.members = {"demo-user":"我", "demo-partner":"Partner"};
    resetEventWindow();
    showView("app");
    await fetchEvents();
  }

  function demoSavePets() {
    localStorage.setItem("puppy-log-demo-pets", JSON.stringify(state.pets));
  }

  async function initCloud() {
    state.supabase = window.supabase.createClient(
      cfg.SUPABASE_URL,
      cfg.SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

    const { data } = await state.supabase.auth.getSession();
    state.session = data.session;

    state.supabase.auth.onAuthStateChange((event, session) => {
      state.session = session;
      setCloudUI();
      if (event === "PASSWORD_RECOVERY") {
        state.recoveryMode = true;
        showView("recovery");
      }
    });

    if (state.recoveryMode) {
      showView("recovery");
      return;
    }
    if (!state.session) {
      showView("auth");
      setCloudUI();
      return;
    }
    await loadWorkspace();
  }

  async function loadWorkspace() {
    const uid = state.session.user.id;
    const { data: membership, error } = await state.supabase
      .from("puppy_household_members")
      .select("household_id,user_id,display_name,role")
      .eq("user_id", uid)
      .maybeSingle();

    if (error) { showError(error); return; }
    if (!membership) {
      showView("onboarding");
      return;
    }
    state.member = membership;

    const [{ data: household }, { data: pets, error: petsError }, { data: members }] = await Promise.all([
      state.supabase.from("puppy_households").select("*").eq("id", membership.household_id).single(),
      state.supabase.from("puppy_pets").select("*").eq("household_id", membership.household_id).order("created_at"),
      state.supabase.from("puppy_household_members").select("user_id,display_name").eq("household_id", membership.household_id)
    ]);

    if (petsError) { showError(petsError); return; }

    state.household = household;
    state.pets = pets || [];
    chooseInitialPet();
    state.members = Object.fromEntries((members || []).map(m => [m.user_id, m.display_name]));
    resetEventWindow();
    showView("app");
    await fetchEvents();
    subscribeRealtime();
    setCloudUI();
    renderAll();
  }

  async function refreshPets(selectId = null) {
    if (state.demo) {
      if (selectId) await selectPet(selectId);
      else renderAll();
      return;
    }
    const { data, error } = await state.supabase
      .from("puppy_pets")
      .select("*")
      .eq("household_id", state.household.id)
      .order("created_at");
    if (error) { showError(error); return; }
    state.pets = data || [];
    if (selectId) {
      state.pet = state.pets.find(p => p.id === selectId) || state.pets[0] || null;
      if (state.pet) localStorage.setItem(petStorageKey(), state.pet.id);
      resetEventWindow();
    } else if (!state.pets.some(p => p.id === state.pet?.id)) {
      chooseInitialPet();
      resetEventWindow();
    }
    renderAll();
  }

  async function refreshMembers() {
    if (state.demo || !state.household) return;
    const householdId = state.household.id;
    const {data, error} = await state.supabase.from("puppy_household_members")
      .select("user_id,display_name")
      .eq("household_id", householdId);
    if (error) {
      console.warn("Puppy Log member lookup failed:", error);
      return;
    }
    if (state.household?.id !== householdId) return;
    state.members = Object.fromEntries((data || []).map(member => [member.user_id, member.display_name]));
    renderAll();
  }

  const LATEST_TYPES = ["pee", "poop", "meal", "weight"];

  function latestMapFromEvents(events) {
    const latest = {};
    for (const event of events || []) {
      if (LATEST_TYPES.includes(event.event_type) && !latest[event.event_type]) {
        latest[event.event_type] = event;
      }
    }
    return latest;
  }

  async function fetchCloudEventPages({petId, householdId, afterIso = null, beforeIso = null, type = null}) {
    const rows = [];
    const pageSize = 500;
    let from = 0;

    while (true) {
      let query = state.supabase.from("puppy_events").select("*")
        .eq("household_id", householdId)
        .eq("pet_id", petId);
      if (type) query = query.eq("event_type", type);
      if (afterIso) query = query.gte("event_time", afterIso);
      if (beforeIso) query = query.lt("event_time", beforeIso);
      const {data, error} = await query
        .order("event_time", {ascending: false})
        .order("id", {ascending: false})
        .range(from, from + pageSize - 1);
      if (error) throw error;
      rows.push(...(data || []));
      if (!data || data.length < pageSize) break;
      from += pageSize;
    }
    return rows;
  }

  async function fetchCloudLatestEvents(petId, householdId) {
    const pairs = await Promise.all(LATEST_TYPES.map(async type => {
      const {data, error} = await state.supabase.from("puppy_events").select("*")
        .eq("household_id", householdId)
        .eq("pet_id", petId)
        .eq("event_type", type)
        .order("event_time", {ascending: false})
        .limit(1);
      if (error) throw error;
      return [type, data?.[0] || null];
    }));
    return Object.fromEntries(pairs.filter(([, event]) => event));
  }

  async function cloudHasEventsBefore(petId, householdId, beforeIso) {
    const {data, error} = await state.supabase.from("puppy_events").select("id")
      .eq("household_id", householdId)
      .eq("pet_id", petId)
      .lt("event_time", beforeIso)
      .order("event_time", {ascending: false})
      .limit(1);
    if (error) throw error;
    return Boolean(data?.length);
  }

  async function fetchEvents({resetWindow = false, useCache = true} = {}) {
    if (!state.pet) {
      resetEventWindow();
      renderAll();
      return;
    }
    if (resetWindow || !state.weekAnchor) resetEventWindow();

    const petId = state.pet.id;
    const householdId = state.household?.id || "demo";
    const startIso = loadedWindowStart().toISOString();
    if (!state.demo && useCache && state.loadedWeeks === 1 && !state.allEventsLoaded && !state.events.length) {
      if (hydrateEventCache(petId, householdId, startIso)) renderAll();
    }
    state.eventsLoading = true;
    renderTimelineControls();

    try {
      if (state.demo) {
        const all = demoEventsForPet(petId);
        state.events = state.allEventsLoaded
          ? all
          : all.filter(event => new Date(event.event_time) >= new Date(startIso));
        state.latestByType = latestMapFromEvents(all);
        state.hasOlderEvents = !state.allEventsLoaded
          && all.some(event => new Date(event.event_time) < new Date(startIso));
        state.eventsLoading = false;
        renderAll();
        return;
      }

      const [events, latestByType, hasOlder] = await Promise.all([
        state.allEventsLoaded
          ? fetchCloudEventPages({petId, householdId})
          : fetchCloudEventPages({petId, householdId, afterIso: startIso}),
        fetchCloudLatestEvents(petId, householdId),
        state.allEventsLoaded
          ? Promise.resolve(false)
          : cloudHasEventsBefore(petId, householdId, startIso)
      ]);

      // Ignore an obsolete response after switching dogs, households, or signing out.
      if (state.pet?.id !== petId || state.household?.id !== householdId || !state.session) return;
      state.events = events;
      state.latestByType = latestByType;
      state.hasOlderEvents = hasOlder;
      state.eventsLoading = false;
      saveEventCache(petId, householdId);
      renderAll();
    } catch (error) {
      if (state.pet?.id === petId) {
        state.eventsLoading = false;
        renderTimelineControls();
        showError(error);
      }
    }
  }

  async function loadPreviousWeek() {
    if (!state.pet || state.eventsLoading || state.allEventsLoaded || !state.hasOlderEvents) return;

    const petId = state.pet.id;
    const householdId = state.household?.id || "demo";
    const previousStart = loadedWindowStart();
    const nextStart = new Date(previousStart);
    nextStart.setDate(nextStart.getDate() - 7);
    state.eventsLoading = true;
    renderTimelineControls();

    try {
      let rows, hasOlder;
      if (state.demo) {
        const all = demoEventsForPet(petId);
        rows = all.filter(event => {
          const time = new Date(event.event_time);
          return time >= nextStart && time < previousStart;
        });
        hasOlder = all.some(event => new Date(event.event_time) < nextStart);
      } else {
        [rows, hasOlder] = await Promise.all([
          fetchCloudEventPages({
            petId,
            householdId,
            afterIso: nextStart.toISOString(),
            beforeIso: previousStart.toISOString()
          }),
          cloudHasEventsBefore(petId, householdId, nextStart.toISOString())
        ]);
      }

      if (state.pet?.id !== petId || state.household?.id !== householdId) return;
      state.loadedWeeks += 1;
      mergeEvents(rows);
      state.hasOlderEvents = hasOlder;
      state.eventsLoading = false;
      renderAll();
    } catch (error) {
      if (state.pet?.id === petId) {
        state.eventsLoading = false;
        renderTimelineControls();
        showError(error);
      }
    }
  }

  async function loadAllEvents() {
    if (!state.pet || state.eventsLoading || state.allEventsLoaded || !state.hasOlderEvents) return;

    const petId = state.pet.id;
    const householdId = state.household?.id || "demo";
    const beforeIso = loadedWindowStart().toISOString();
    state.eventsLoading = true;
    renderTimelineControls();

    try {
      const older = state.demo
        ? demoEventsForPet(petId).filter(event => new Date(event.event_time) < new Date(beforeIso))
        : await fetchCloudEventPages({petId, householdId, beforeIso});
      if (state.pet?.id !== petId || state.household?.id !== householdId) return;
      mergeEvents(older);
      state.allEventsLoaded = true;
      state.hasOlderEvents = false;
      state.eventsLoading = false;
      renderAll();
    } catch (error) {
      if (state.pet?.id === petId) {
        state.eventsLoading = false;
        renderTimelineControls();
        showError(error);
      }
    }
  }

  function subscribeRealtime() {
    if (state.demo || !state.household) return;
    if (state.channel) state.supabase.removeChannel(state.channel);
    state.channel = state.supabase
      .channel(`puppy-log-${state.household.id}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "puppy_events",
        filter: `household_id=eq.${state.household.id}`
      }, () => fetchEvents({useCache: false}))
      .on("postgres_changes", {
        event: "*", schema: "public", table: "puppy_pets",
        filter: `household_id=eq.${state.household.id}`
      }, () => refreshPets())
      .on("postgres_changes", {
        event: "*", schema: "public", table: "puppy_household_members",
        filter: `household_id=eq.${state.household.id}`
      }, () => refreshMembers())
      .subscribe();
  }

  function renderPetControls() {
    const switcher = $("petSwitcher");
    const settings = $("settingsPetList");

    const chips = state.pets.map(p => `
      <button class="pet-chip ${p.id === state.pet?.id ? "active" : ""}"
              data-pet-id="${escapeHtml(p.id)}"
              type="button">${escapeHtml(p.name)}</button>
    `).join("");

    switcher.innerHTML = chips + (
      state.demo ? `<button class="pet-chip add" data-add-pet type="button" aria-label="${escapeHtml(tr("addDogHeading"))}">＋</button>` : ""
    );

    settings.innerHTML = chips || `<div class="hint">${escapeHtml(tr("noDogs"))}</div>`;
  }

  function renderAll() {
    const petName = state.pet?.name || "Puppy";
    $("petNameTitle").textContent = petName;
    document.title = tr("pageTitle", {pet: petName});

    const pee = latest("pee"), poop = latest("poop"), meal = latest("meal"), wt = latest("weight");
    $("lastPee").textContent = pee ? relativeAgo(pee.event_time) : tr("noneYet");
    $("lastPoop").textContent = poop ? relativeAgo(poop.event_time) : tr("noneYet");
    $("lastMeal").textContent = meal ? relativeAgo(meal.event_time) : tr("noneYet");
    $("latestWeight").textContent = wt ? `${wt.amount ?? "—"} ${formatUnit(wt.unit, wt.amount)}`.trim() : tr("noneYet");

    const today = startOfToday();
    const todays = state.events.filter(e => new Date(e.event_time) >= today);
    $("todayPee").textContent = todays.filter(e=>e.event_type==="pee").length;
    $("todayPoop").textContent = todays.filter(e=>e.event_type==="poop").length;
    $("todayMeal").textContent = todays.filter(e=>e.event_type==="meal").length;
    $("todayWater").textContent = todays.filter(e=>e.event_type==="water").length;
    document.querySelectorAll(".mini-stat").forEach(card => {
      const count = Number(card.querySelector("strong").textContent);
      card.querySelector('[data-i18n="countUnit"]').textContent = tr(count === 1 ? "countOne" : "countUnit");
    });

    if (state.household) $("settingsHousehold").textContent = state.household.name || "—";
    if (state.member) $("settingsMe").textContent = state.demo ? tr("me") : (state.member.display_name || "—");
    if (state.household) $("settingsInvite").textContent = state.household.invite_code || "—";

    renderPetControls();
    renderOutingReminder();
    renderReminderSettings();
    renderTimeline();
  }

  function renderTimelineControls() {
    const scope = $("timelineScope");
    const loadPrevious = $("loadMoreBtn");
    const loadAll = $("loadAllBtn");
    if (!scope || !loadPrevious || !loadAll) return;

    scope.textContent = state.allEventsLoaded
      ? tr("timelineAll")
      : state.loadedWeeks === 1
        ? tr("timelineThisWeek")
        : tr("timelineWeeks", {count: state.loadedWeeks});

    const showArchiveActions = state.hasOlderEvents && !state.allEventsLoaded;
    loadPrevious.classList.toggle("hidden", !showArchiveActions);
    loadAll.classList.toggle("hidden", !showArchiveActions);
    loadPrevious.disabled = state.eventsLoading;
    loadAll.disabled = state.eventsLoading;
    loadPrevious.textContent = tr(state.eventsLoading ? "loadingEarlier" : "loadPreviousWeek");
    loadAll.textContent = tr("loadAllRecords");
  }

  function renderTimeline() {
    renderTimelineControls();
    let events = state.events;
    if (state.filter === "today") {
      const today = startOfToday();
      events = events.filter(e => new Date(e.event_time) >= today);
    }

    const holder = $("timeline");
    holder.setAttribute("aria-busy", state.eventsLoading ? "true" : "false");
    if (!events.length) {
      const pet = state.pet?.name || tr("thisDog");
      let lines;
      if (state.filter === "today") {
        lines = [tr("noRecordsToday", {pet})];
      } else if (state.loadedWeeks === 1 && state.hasOlderEvents) {
        lines = [tr("noRecordsThisWeek", {pet}), tr("olderRecordsHint")];
      } else if (state.hasOlderEvents) {
        lines = [tr("noRecordsLoadedPeriod", {pet}), tr("olderRecordsHint")];
      } else {
        lines = [tr("emptyTimeline", {pet}), tr("firstRecordHint")];
      }
      holder.innerHTML = `<div class="timeline-empty">${lines.map(escapeHtml).join("<br>")}</div>`;
      return;
    }

    let lastDate = "";
    holder.innerHTML = events.map(e => {
      const dateLabel = formatDate(e.event_time);
      const sep = dateLabel !== lastDate ? `<div class="date-sep">${escapeHtml(dateLabel)}</div>` : "";
      lastDate = dateLabel;
      const t = TYPE[e.event_type] || TYPE.note;
      const who = recorderName(e);
      const amount = e.amount != null ? ` · ${escapeHtml(e.amount)} ${escapeHtml(formatUnit(e.unit, e.amount))}` : "";
      return `${sep}
        <div class="event-row">
          <div class="event-icon">${t.icon}</div>
          <div class="event-main">
            <b>${escapeHtml(tr(t.label))}${amount}</b>
            <div class="meta"><span class="event-recorder">${escapeHtml(tr("recordedBy"))} <span class="recorder-name">${escapeHtml(who)}</span></span> · <span class="event-age">${escapeHtml(relativeAgo(e.event_time))}</span></div>
            ${e.note ? `<div class="event-note">${escapeHtml(e.note)}</div>` : ""}
          </div>
          <div class="event-time">
            <span>${escapeHtml(formatClock(e.event_time))}</span>
            ${eventActionsHtml(e)}
          </div>
        </div>`;
    }).join("");
  }

  function configureLogType(type, selectedUnit = "", clearIncompatibleAmount = false) {
    const info = TYPE[type] || TYPE.note;
    $("eventType").value = type;
    $("eventTypeSelect").value = type;

    const units = [...info.units];
    if (selectedUnit && !units.includes(selectedUnit)) units.push(selectedUnit);
    $("eventUnit").innerHTML = units.length
      ? units.map(unit => `<option value="${escapeHtml(unit)}">${escapeHtml(formatUnit(unit))}</option>`).join("")
      : `<option value="">—</option>`;
    $("amountRow").classList.toggle("hidden", !units.length);
    $("eventAmount").required = type === "weight";

    if (!units.length) {
      $("eventUnit").value = "";
      if (clearIncompatibleAmount) $("eventAmount").value = "";
    } else if (selectedUnit && units.includes(selectedUnit)) {
      $("eventUnit").value = selectedUnit;
    } else if (type === "weight") {
      $("eventUnit").value = "lb";
    } else {
      $("eventUnit").value = units[0] || "";
    }
    renderLogText();
  }

  function clearLogEditingState() {
    state.editingEventId = null;
    state.returnHistoryType = null;
    $("eventId").value = "";
    $("eventTypeRow").classList.add("hidden");
  }

  function closeLogDialog(reopenHistory = false) {
    const historyType = state.returnHistoryType;
    if ($("logDialog").open) $("logDialog").close();
    clearLogEditingState();
    renderLogText();
    if (reopenHistory && historyType) openHistory(historyType);
  }

  function openLog(type, event = null, returnHistoryType = null) {
    if (!state.pet) {
      toast("addDogFirst");
      return;
    }

    const info = TYPE[type];
    if (!info) return;
    state.editingEventId = event?.id || null;
    state.returnHistoryType = returnHistoryType;
    $("eventId").value = event?.id || "";
    configureLogType(type, event?.unit || "", true);
    $("eventTime").value = event?.event_time
      ? localDatetimeValue(new Date(event.event_time))
      : localDatetimeValue();
    $("eventAmount").value = event?.amount ?? "";
    $("eventNote").value = event?.note || "";
    renderLogText();
    $("logDialog").showModal();
  }

  function openEditEvent(id, fromHistory = false) {
    const event = findEventById(id);
    if (!event) {
      toast("recordNotFound");
      return;
    }
    const returnHistoryType = fromHistory ? state.historyType : null;
    if (fromHistory && $("historyDialog").open) {
      state.historyRequestId += 1;
      $("historyDialog").close();
    }
    openLog(event.event_type, event, returnHistoryType);
  }

  async function saveEvent(formEvent) {
    formEvent.preventDefault();
    if (!state.pet) return;

    const editingId = state.editingEventId;
    const returnHistoryType = state.returnHistoryType;
    const recorderId = state.demo ? "demo-user" : state.session?.user?.id;
    if (!recorderId) { toast("signInRequired"); return; }
    const type = $("eventType").value;
    const rawAmount = $("eventAmount").value.trim();
    const values = {
      event_type: type,
      event_time: new Date($("eventTime").value).toISOString(),
      amount: rawAmount === "" ? null : Number(rawAmount),
      unit: $("eventUnit").value || null,
      note: $("eventNote").value.trim() || null
    };

    if (editingId) {
      const existing = findEventById(editingId);
      if (!existing) { toast("recordNotFound"); return; }

      if (state.demo) {
        demoUpsertEvent({...existing, ...values});
      } else {
        const {data, error} = await state.supabase.from("puppy_events")
          .update(values)
          .eq("id", editingId)
          .eq("household_id", state.household.id)
          .eq("pet_id", state.pet.id)
          .select("id")
          .maybeSingle();
        if (error || !data) {
          showError(error || new Error("Puppy Log update was not permitted."));
          return;
        }
      }

      if ($("logDialog").open) $("logDialog").close();
      clearLogEditingState();
      toast("recordUpdated");
      await fetchEvents({useCache: false});
      if (returnHistoryType) await openHistory(returnHistoryType);
      return;
    }

    const item = {
      id: crypto.randomUUID(),
      household_id: state.household?.id || "demo",
      pet_id: state.pet.id,
      user_id: recorderId,
      ...values,
      created_at: new Date().toISOString()
    };

    if (state.demo) {
      demoUpsertEvent(item);
      closeLogDialog(false);
      toast("savedTo", {pet: state.pet.name});
      await fetchEvents({useCache: false});
      return;
    }

    const cloudItem = {...item};
    delete cloudItem.id;
    delete cloudItem.created_at;

    const { error } = await state.supabase.from("puppy_events").insert(cloudItem);
    if (error) { showError(error); return; }

    closeLogDialog(false);
    toast("syncedTo", {pet: state.pet.name});
    await fetchEvents({useCache: false});
  }

  async function deleteEvent(id, fromHistory = false) {
    if (!confirm(tr("deleteConfirm"))) return;
    const historyType = fromHistory ? state.historyType : null;

    if (state.demo) {
      demoDeleteEvent(id);
    } else {
      const { error } = await state.supabase.from("puppy_events").delete().eq("id", id);
      if (error) { showError(error); return; }
    }

    await fetchEvents({useCache: false});
    if (historyType) await openHistory(historyType);
  }

  function openAddPet() {
    $("newPetName").value = "";
    $("addPetDialog").showModal();
    setTimeout(() => $("newPetName").focus(), 50);
  }

  async function addPet(e) {
    e.preventDefault();
    const name = $("newPetName").value.trim();
    if (!name) return;

    if (state.demo) {
      const pet = {
        id: `demo-pet-${crypto.randomUUID()}`,
        name,
        created_at: new Date().toISOString()
      };
      state.pets.push(pet);
      demoSavePets();
      state.pet = pet;
      localStorage.setItem(petStorageKey(), pet.id);
      resetEventWindow();
      $("addPetDialog").close();
      $("settingsDialog").close();
      renderAll();
      toast("dogAdded", {pet: name});
      return;
    }

    const { data, error } = await state.supabase
      .from("puppy_pets")
      .insert({
        household_id: state.household.id,
        name
      })
      .select("*")
      .single();

    if (error) {
      showError(error);
      return;
    }

    $("addPetDialog").close();
    $("settingsDialog").close();
    await refreshPets(data.id);
    await fetchEvents();
    toast("dogAdded", {pet: name});
  }

  function bindPetClick(container) {
    container.addEventListener("click", async (e) => {
      const add = e.target.closest("[data-add-pet]");
      if (add) {
        openAddPet();
        return;
      }

      const btn = e.target.closest("[data-pet-id]");
      if (!btn) return;
      const id = btn.dataset.petId;

      if ($("settingsDialog").open) $("settingsDialog").close();
      await selectPet(id);
    });
  }

  function bindUI() {
    $("languageToggleBtn").addEventListener("click", toggleLanguage);
    $$(".quick-btn").forEach(btn => btn.addEventListener("click", () => openLog(btn.dataset.type)));
    $$("[data-history-type]").forEach(btn => btn.addEventListener("click", () => openHistory(btn.dataset.historyType)));

    $("closeDialogBtn").addEventListener("click", () => closeLogDialog(true));
    $("closeHistoryBtn").addEventListener("click", () => {
      state.historyRequestId += 1;
      $("historyDialog").close();
    });
    $("cancelDialogBtn").addEventListener("click", () => closeLogDialog(true));
    $("logDialog").addEventListener("cancel", (event) => {
      event.preventDefault();
      closeLogDialog(true);
    });
    $("eventTypeSelect").addEventListener("change", () => {
      configureLogType($("eventTypeSelect").value, "", true);
    });
    $("logForm").addEventListener("submit", saveEvent);

    $("timeline").addEventListener("click", (e) => {
      const edit = e.target.closest("[data-edit]");
      if (edit) { openEditEvent(edit.dataset.edit, false); return; }
      const remove = e.target.closest("[data-delete]");
      if (remove) deleteEvent(remove.dataset.delete, false);
    });

    $("historyList").addEventListener("click", (e) => {
      const edit = e.target.closest("[data-edit]");
      if (edit) { openEditEvent(edit.dataset.edit, true); return; }
      const remove = e.target.closest("[data-delete]");
      if (remove) deleteEvent(remove.dataset.delete, true);
    });

    $("loadMoreBtn").addEventListener("click", loadPreviousWeek);
    $("loadAllBtn").addEventListener("click", loadAllEvents);

    $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
      state.filter = btn.dataset.filter;
      $$(".filter-btn").forEach(b=>b.classList.toggle("active", b===btn));
      renderTimeline();
    }));

    bindPetClick($("petSwitcher"));
    bindPetClick($("settingsPetList"));

    $("settingsBtn").addEventListener("click", () => openSettingsDialog(false));
    $("reminderSettingsBtn").addEventListener("click", () => openSettingsDialog(true));
    $("reminderLogPeeBtn").addEventListener("click", () => openLog("pee"));
    $("reminderPreset").addEventListener("change", updateReminderCustomVisibility);
    $("saveReminderBtn").addEventListener("click", saveReminderSettings);
    $("closeSettingsBtn").addEventListener("click", () => $("settingsDialog").close());
    $("addPetBtn").addEventListener("click", openAddPet);
    $("closeAddPetBtn").addEventListener("click", () => $("addPetDialog").close());
    $("cancelAddPetBtn").addEventListener("click", () => $("addPetDialog").close());
    $("addPetForm").addEventListener("submit", addPet);

    $$(".seg").forEach(btn => btn.addEventListener("click", () => {
      $$(".seg").forEach(b => b.classList.toggle("active", b===btn));
      const signup = btn.dataset.authMode === "signup";
      $("authSubmitBtn").textContent = tr(signup ? "signUp" : "signIn");
      $("authPassword").autocomplete = signup ? "new-password" : "current-password";
      $("authForm").dataset.mode = signup ? "signup" : "signin";
    }));

    $("forgotPasswordBtn").addEventListener("click", async () => {
      const email = $("authEmail").value.trim();
      if (!email) {
        toast("enterEmail");
        $("authEmail").focus();
        return;
      }
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const { error } = await state.supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) { showError(error); return; }
      toast("resetEmailSent");
      state.authHint = "resetEmailHint";
      renderAuthText();
    });

    $("recoveryForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const password = $("recoveryPassword").value;
      const confirmPassword = $("recoveryPasswordConfirm").value;
      if (password !== confirmPassword) {
        toast("passwordMismatch");
        return;
      }
      const { error } = await state.supabase.auth.updateUser({ password });
      if (error) { showError(error); return; }

      state.recoveryMode = false;
      $("recoveryForm").reset();
      if (window.history?.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      toast("passwordUpdated");
      await loadWorkspace();
    });

    $("authForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("authEmail").value.trim();
      const password = $("authPassword").value;
      const mode = $("authForm").dataset.mode || "signin";
      let result;

      if (mode === "signup") {
        result = await state.supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` }
        });
        if (!result.error && !result.data.session) {
          toast("signupConfirm");
          return;
        }
      } else {
        result = await state.supabase.auth.signInWithPassword({email, password});
      }

      if (result.error) { showError(result.error); return; }
      state.session = result.data.session;
      await loadWorkspace();
    });

    $("createHouseholdForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const { data, error } = await state.supabase.rpc("puppy_create_household", {
        p_household_name: $("householdName").value.trim(),
        p_display_name: $("createDisplayName").value.trim(),
        p_pet_name: $("petNameInput").value.trim()
      });
      if (error) { showError(error); return; }
      toast("householdCreated", {code: data.invite_code});
      await loadWorkspace();
    });

    $("joinHouseholdForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const { error } = await state.supabase.rpc("puppy_join_household", {
        p_invite_code: $("inviteCodeInput").value.trim().toUpperCase(),
        p_display_name: $("joinDisplayName").value.trim()
      });
      if (error) { showError(error); return; }
      toast("joinedJournal");
      await loadWorkspace();
    });

    $("signOutBtn").addEventListener("click", async () => {
      if (state.channel) state.supabase.removeChannel(state.channel);
      await state.supabase.auth.signOut();
      state.session = null;
      state.household = null;
      state.member = null;
      state.members = {};
      state.pets = [];
      state.pet = null;
      resetEventWindow();
      state.historyRequestId += 1;
      state.historyType = null;
      state.historyEvents = [];
      state.historyError = false;
      if ($("historyDialog")?.open) $("historyDialog").close();
      state.authHint = "authMembers";
      $("settingsDialog").close();
      renderAll();
      renderAuthText();
      showView("auth");
      setCloudUI();
    });
  }

  async function start() {
    bindUI();
    applyLanguage();

    if (state.demo) await demoLoad();
    else await initCloud();

    setInterval(() => {
      if ($("appView").classList.contains("hidden")) return;
      if (state.weekAnchor && state.weekAnchor !== currentWeekAnchor() && !state.eventsLoading) {
        fetchEvents({resetWindow: true});
        return;
      }
      renderAll();
    }, 60000);
  }

  start().catch(showError);
})();
