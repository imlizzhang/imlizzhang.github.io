(() => {
  "use strict";

  const cfg = window.PUPPY_LOG_CONFIG || {};
  const CLOUD_READY =
    typeof cfg.SUPABASE_URL === "string" &&
    cfg.SUPABASE_URL.startsWith("https://") &&
    typeof cfg.SUPABASE_PUBLISHABLE_KEY === "string" &&
    !cfg.SUPABASE_PUBLISHABLE_KEY.includes("PASTE_");

  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const TYPE = {
    pee:    { label: "小便", icon: "💧", units: [] },
    poop:   { label: "大便", icon: "💩", units: [] },
    meal:   { label: "吃饭", icon: "🍽️", units: ["g", "cup", "罐", "份"] },
    water:  { label: "喝水", icon: "🥤", units: ["mL", "oz", "杯"] },
    weight: { label: "体重", icon: "⚖️", units: ["lb", "kg"] },
    note:   { label: "备注", icon: "📝", units: [] }
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
    filter: "all",
    limit: 100,
    channel: null,
    demo: !CLOUD_READY
  };

  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
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

  function sameLocalDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function relativeAgo(iso) {
    if (!iso) return "—";
    const diff = Date.now() - new Date(iso).getTime();
    if (diff < 0) return "刚刚";
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "刚刚";
    if (mins < 60) return `${mins} 分钟前`;
    const h = Math.floor(mins / 60), m = mins % 60;
    if (h < 24) return `${h}:${String(m).padStart(2,"0")} 前`;
    const d = Math.floor(h / 24);
    return `${d} 天前`;
  }

  function formatClock(iso) {
    return new Intl.DateTimeFormat("zh-CN", {hour:"numeric", minute:"2-digit"}).format(new Date(iso));
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    if (sameLocalDay(d, now)) return "今天";
    const y = new Date(now); y.setDate(y.getDate()-1);
    if (sameLocalDay(d, y)) return "昨天";
    return new Intl.DateTimeFormat("zh-CN", {month:"short", day:"numeric", weekday:"short"}).format(d);
  }

  function petStorageKey() {
    return state.household ? `puppy-log-selected-pet-${state.household.id}` : "puppy-log-selected-pet";
  }

  function latest(type) {
    return state.events.find(e => e.event_type === type);
  }

  function setCloudUI() {
    $("demoBanner").classList.toggle("hidden", !state.demo);
    $("syncPill").textContent = state.demo ? "本机演示" : "云端同步";
    $("settingsBtn").classList.toggle("hidden", state.demo || !state.session);
  }

  function showView(name) {
    $("authView").classList.add("hidden");
    $("onboardingView").classList.add("hidden");
    $("appView").classList.add("hidden");
    if (name === "auth") $("authView").classList.remove("hidden");
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
    localStorage.setItem(petStorageKey(), next.id);
    state.events = [];
    renderAll();
    await fetchEvents();
  }

  function demoLoad() {
    state.household = { id:"demo", name:"Our Puppy", invite_code:"DEMO2026" };
    state.member = { household_id:"demo", user_id:"demo-user", display_name:"我" };
    state.pets = JSON.parse(localStorage.getItem("puppy-log-demo-pets") || "null") || [
      { id:"demo-pet-1", name:"Puppy", created_at:new Date().toISOString() }
    ];
    chooseInitialPet();
    state.members = {"demo-user":"我", "demo-partner":"Partner"};
    const all = JSON.parse(localStorage.getItem("puppy-log-demo-events") || "[]");
    state.events = all.filter(e => e.pet_id === state.pet?.id)
      .sort((a,b)=>new Date(b.event_time)-new Date(a.event_time));
    showView("app");
    renderAll();
  }

  function demoSaveEvents() {
    const all = JSON.parse(localStorage.getItem("puppy-log-demo-events") || "[]");
    const otherPets = all.filter(e => e.pet_id !== state.pet?.id);
    localStorage.setItem("puppy-log-demo-events", JSON.stringify([...otherPets, ...state.events]));
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

    state.supabase.auth.onAuthStateChange((_event, session) => {
      state.session = session;
      setCloudUI();
    });

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

    if (error) { toast(error.message); return; }
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

    if (petsError) { toast(petsError.message); return; }

    state.household = household;
    state.pets = pets || [];
    chooseInitialPet();
    state.members = Object.fromEntries((members || []).map(m => [m.user_id, m.display_name]));
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
    if (error) { toast(error.message); return; }
    state.pets = data || [];
    if (selectId) {
      state.pet = state.pets.find(p => p.id === selectId) || state.pets[0] || null;
      if (state.pet) localStorage.setItem(petStorageKey(), state.pet.id);
    } else if (!state.pets.some(p => p.id === state.pet?.id)) {
      chooseInitialPet();
    }
    renderAll();
  }

  async function fetchEvents() {
    if (!state.pet) {
      state.events = [];
      renderAll();
      return;
    }

    if (state.demo) {
      const all = JSON.parse(localStorage.getItem("puppy-log-demo-events") || "[]");
      state.events = all.filter(e => e.pet_id === state.pet.id)
        .sort((a,b)=>new Date(b.event_time)-new Date(a.event_time));
      renderAll();
      return;
    }

    const { data, error } = await state.supabase
      .from("puppy_events")
      .select("*")
      .eq("household_id", state.household.id)
      .eq("pet_id", state.pet.id)
      .order("event_time", {ascending:false})
      .limit(state.limit);

    if (error) { toast(error.message); return; }
    state.events = data || [];
    renderAll();
  }

  function subscribeRealtime() {
    if (state.demo || !state.household) return;
    if (state.channel) state.supabase.removeChannel(state.channel);
    state.channel = state.supabase
      .channel(`puppy-log-${state.household.id}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "puppy_events",
        filter: `household_id=eq.${state.household.id}`
      }, () => fetchEvents())
      .on("postgres_changes", {
        event: "*", schema: "public", table: "puppy_pets",
        filter: `household_id=eq.${state.household.id}`
      }, () => refreshPets())
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
      state.demo ? `<button class="pet-chip add" data-add-pet type="button">＋</button>` : ""
    );

    settings.innerHTML = chips || `<div class="hint">还没有小狗。</div>`;
  }

  function renderAll() {
    const petName = state.pet?.name || "Puppy";
    $("petNameTitle").textContent = petName;
    document.title = `${petName} Log · 小狗成长日志`;

    const pee = latest("pee"), poop = latest("poop"), meal = latest("meal"), wt = latest("weight");
    $("lastPee").textContent = pee ? relativeAgo(pee.event_time) : "暂无";
    $("lastPoop").textContent = poop ? relativeAgo(poop.event_time) : "暂无";
    $("lastMeal").textContent = meal ? relativeAgo(meal.event_time) : "暂无";
    $("latestWeight").textContent = wt ? `${wt.amount ?? "—"} ${wt.unit ?? ""}`.trim() : "暂无";

    const today = startOfToday();
    const todays = state.events.filter(e => new Date(e.event_time) >= today);
    $("todayPee").textContent = todays.filter(e=>e.event_type==="pee").length;
    $("todayPoop").textContent = todays.filter(e=>e.event_type==="poop").length;
    $("todayMeal").textContent = todays.filter(e=>e.event_type==="meal").length;
    $("todayWater").textContent = todays.filter(e=>e.event_type==="water").length;

    if (state.household) $("settingsHousehold").textContent = state.household.name || "—";
    if (state.member) $("settingsMe").textContent = state.member.display_name || "—";
    if (state.household) $("settingsInvite").textContent = state.household.invite_code || "—";

    renderPetControls();
    renderTimeline();
  }

  function renderTimeline() {
    let events = state.events;
    if (state.filter === "today") {
      const today = startOfToday();
      events = events.filter(e => new Date(e.event_time) >= today);
    }

    const holder = $("timeline");
    if (!events.length) {
      holder.innerHTML = `<div class="timeline-empty">${escapeHtml(state.pet?.name || "这只小狗")} 还没有记录。<br>点上面的按钮记下第一条吧。</div>`;
      return;
    }

    let lastDate = "";
    holder.innerHTML = events.map(e => {
      const dateLabel = formatDate(e.event_time);
      const sep = dateLabel !== lastDate ? `<div class="date-sep">${escapeHtml(dateLabel)}</div>` : "";
      lastDate = dateLabel;
      const t = TYPE[e.event_type] || TYPE.note;
      const who = state.members[e.user_id] || "家庭成员";
      const amount = e.amount != null ? ` · ${escapeHtml(e.amount)} ${escapeHtml(e.unit || "")}` : "";
      return `${sep}
        <div class="event-row">
          <div class="event-icon">${t.icon}</div>
          <div class="event-main">
            <b>${escapeHtml(t.label)}${amount}</b>
            <div class="meta">${escapeHtml(who)} · ${escapeHtml(relativeAgo(e.event_time))}</div>
            ${e.note ? `<div class="event-note">${escapeHtml(e.note)}</div>` : ""}
          </div>
          <div class="event-time">
            ${escapeHtml(formatClock(e.event_time))}
            <button data-delete="${escapeHtml(e.id)}">删除</button>
          </div>
        </div>`;
    }).join("");
  }

  function openLog(type, customPast = false) {
    if (!state.pet) {
      toast("请先添加一只小狗");
      return;
    }

    const t = TYPE[type];
    $("eventType").value = type;
    $("dialogTitle").textContent = `${t.icon} ${t.label}`;
    $("dialogPetName").textContent = `记录给 ${state.pet.name}`;
    $("eventTime").value = localDatetimeValue();
    $("eventAmount").value = "";
    $("eventNote").value = "";
    $("eventUnit").innerHTML = t.units.length
      ? t.units.map(u => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join("")
      : `<option value="">—</option>`;
    $("amountRow").classList.toggle("hidden", !t.units.length);

    if (type === "weight") {
      $("eventAmount").required = true;
      $("eventUnit").value = "lb";
    } else {
      $("eventAmount").required = false;
    }

    $("dialogEyebrow").textContent = customPast ? "BACKFILL EVENT" : "ADD EVENT";
    $("logDialog").showModal();
  }

  async function saveEvent(formEvent) {
    formEvent.preventDefault();
    if (!state.pet) return;

    const type = $("eventType").value;
    const rawAmount = $("eventAmount").value.trim();
    const item = {
      id: crypto.randomUUID(),
      household_id: state.household?.id || "demo",
      pet_id: state.pet.id,
      user_id: state.member?.user_id || "demo-user",
      event_type: type,
      event_time: new Date($("eventTime").value).toISOString(),
      amount: rawAmount === "" ? null : Number(rawAmount),
      unit: $("eventUnit").value || null,
      note: $("eventNote").value.trim() || null,
      created_at: new Date().toISOString()
    };

    if (state.demo) {
      state.events.unshift(item);
      state.events.sort((a,b)=>new Date(b.event_time)-new Date(a.event_time));
      demoSaveEvents();
      renderAll();
      $("logDialog").close();
      toast(`已保存到 ${state.pet.name}`);
      return;
    }

    const cloudItem = {...item};
    delete cloudItem.id;
    delete cloudItem.created_at;

    const { error } = await state.supabase.from("puppy_events").insert(cloudItem);
    if (error) { toast(error.message); return; }

    $("logDialog").close();
    toast(`已同步到 ${state.pet.name}`);
    await fetchEvents();
  }

  async function deleteEvent(id) {
    if (!confirm("删除这条记录？")) return;

    if (state.demo) {
      state.events = state.events.filter(e => e.id !== id);
      demoSaveEvents();
      renderAll();
      return;
    }

    const { error } = await state.supabase.from("puppy_events").delete().eq("id", id);
    if (error) { toast(error.message); return; }
    await fetchEvents();
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
      state.events = [];
      $("addPetDialog").close();
      $("settingsDialog").close();
      renderAll();
      toast(`已添加 ${name}`);
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
      toast(error.message);
      return;
    }

    $("addPetDialog").close();
    $("settingsDialog").close();
    await refreshPets(data.id);
    await fetchEvents();
    toast(`已添加 ${name}`);
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
    $$(".quick-btn").forEach(btn => btn.addEventListener("click", () => openLog(btn.dataset.type)));

    $("customTimeBtn").addEventListener("click", () => {
      openLog("pee", true);
      toast("可修改为过去的实际时间");
    });

    $("closeDialogBtn").addEventListener("click", () => $("logDialog").close());
    $("cancelDialogBtn").addEventListener("click", () => $("logDialog").close());
    $("logForm").addEventListener("submit", saveEvent);

    $("timeline").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-delete]");
      if (btn) deleteEvent(btn.dataset.delete);
    });

    $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
      state.filter = btn.dataset.filter;
      $$(".filter-btn").forEach(b=>b.classList.toggle("active", b===btn));
      renderTimeline();
    }));

    bindPetClick($("petSwitcher"));
    bindPetClick($("settingsPetList"));

    $("settingsBtn").addEventListener("click", () => $("settingsDialog").showModal());
    $("closeSettingsBtn").addEventListener("click", () => $("settingsDialog").close());
    $("addPetBtn").addEventListener("click", openAddPet);
    $("closeAddPetBtn").addEventListener("click", () => $("addPetDialog").close());
    $("cancelAddPetBtn").addEventListener("click", () => $("addPetDialog").close());
    $("addPetForm").addEventListener("submit", addPet);

    $$(".seg").forEach(btn => btn.addEventListener("click", () => {
      $$(".seg").forEach(b => b.classList.toggle("active", b===btn));
      const signup = btn.dataset.authMode === "signup";
      $("authSubmitBtn").textContent = signup ? "注册" : "登录";
      $("authPassword").autocomplete = signup ? "new-password" : "current-password";
      $("authForm").dataset.mode = signup ? "signup" : "signin";
    }));

    $("authForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("authEmail").value.trim();
      const password = $("authPassword").value;
      const mode = $("authForm").dataset.mode || "signin";
      let result;

      if (mode === "signup") {
        result = await state.supabase.auth.signUp({email, password});
        if (!result.error && !result.data.session) {
          toast("注册成功，请先去邮箱点确认链接");
          return;
        }
      } else {
        result = await state.supabase.auth.signInWithPassword({email, password});
      }

      if (result.error) { toast(result.error.message); return; }
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
      if (error) { toast(error.message); return; }
      toast(`创建成功，邀请码 ${data.invite_code}`);
      await loadWorkspace();
    });

    $("joinHouseholdForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const { error } = await state.supabase.rpc("puppy_join_household", {
        p_invite_code: $("inviteCodeInput").value.trim().toUpperCase(),
        p_display_name: $("joinDisplayName").value.trim()
      });
      if (error) { toast(error.message); return; }
      toast("已加入共享日志");
      await loadWorkspace();
    });

    $("signOutBtn").addEventListener("click", async () => {
      if (state.channel) state.supabase.removeChannel(state.channel);
      await state.supabase.auth.signOut();
      state.session = null;
      $("settingsDialog").close();
      showView("auth");
      setCloudUI();
    });
  }

  async function start() {
    bindUI();
    setCloudUI();

    if (state.demo) demoLoad();
    else await initCloud();

    setInterval(() => {
      if (!$("appView").classList.contains("hidden")) renderAll();
    }, 60000);
  }

  start();
})();
