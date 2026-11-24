import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Home,
  CalendarCheck,
  Wallet,
  Users,
  MoreHorizontal,
  Sun,
  Moon,
  GraduationCap,
  Bell,
  Plus,
  Search,
  ArrowUpRight,
  TrendingUp,
  IndianRupee,
  Check,
  X,
  Clock,
  BookOpen,
  FileText,
  Send,
  ChevronDown,
  Menu,
  LayoutDashboard,
  UserRound,
  Settings,
  Languages,
  Receipt,
  Download,
  Phone,
  School,
  ChartNoAxesCombined,
  CalendarDays,
  ArrowLeftRight,
  Lock,
  MessageCircle,
  ClipboardList,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  batches as seedBatches,
  initialStudents,
  initialAttendance,
  initialHomework,
} from "./data/mock";
import en from "./i18n/en";
import hi from "./i18n/hi";
import mr from "./i18n/mr";
const C = createContext(null),
  useC = () => useContext(C),
  money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
const dict = { en, hi, mr };
function Provider({ children }) {
  const [lang, setLang] = useState(
      () => localStorage.getItem("cp-lang") || "en",
    ),
    [theme, setTheme] = useState(
      () =>
        localStorage.getItem("cp-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    ),
    [students, setStudents] = useState(initialStudents),
    [batches, setBatches] = useState(seedBatches),
    [attendance, setAttendance] = useState(initialAttendance),
    [fees, setFees] = useState(
      initialStudents.map((s) => ({
        studentId: s.id,
        paid: s.paid,
        plan: s.feePlan,
      })),
    ),
    [homework, setHomework] = useState(initialHomework),
    [messages, setMessages] = useState([]),
    [marks, setMarks] = useState({}),
    [toast, setToast] = useState(""),
    [page, setPage] = useState("home"),
    [parent, setParent] = useState(false);
  const t = (k) => dict[lang][k] || dict.en[k] || k;
  useEffect(() => {
    localStorage.setItem("cp-lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("cp-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);
  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };
  const value = {
    lang,
    setLang,
    theme,
    setTheme,
    t,
    students,
    setStudents,
    batches,
    setBatches,
    attendance,
    setAttendance,
    fees,
    setFees,
    homework,
    setHomework,
    messages,
    setMessages,
    marks,
    setMarks,
    toast,
    notify,
    page,
    setPage,
    parent,
    setParent,
  };
  return <C.Provider value={value}>{children}</C.Provider>;
}
const nav = [
  ["home", Home],
  ["attendance", CalendarCheck],
  ["fees", Wallet],
  ["students", Users],
  ["more", MoreHorizontal],
];
function App() {
  return (
    <Provider>
      <Shell />
    </Provider>
  );
}
function Shell() {
  const {
    t,
    page,
    setPage,
    theme,
    setTheme,
    lang,
    setLang,
    parent,
    setParent,
  } = useC();
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={21} />
          </div>
          <div>
            <b>ClassPro</b>
            <small>Gurukul Coaching Classes</small>
          </div>
        </div>
        <div className="top-actions">
          <span className="demo">DEMO</span>
          <div className="lang-switch">
            {[
              ["en", "EN"],
              ["hi", "हिं"],
              ["mr", "मरा"],
            ].map(([v, l]) => (
              <button
                className={lang === v ? "selected" : ""}
                onClick={() => setLang(v)}
                key={v}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <div className="class-chip">
            <div className="avatar">GC</div>
            <div>
              <b>{t("class")}</b>
              <small>{t("location")}</small>
            </div>
          </div>
          <p className="nav-label">WORKSPACE</p>
          {nav.map(([id, I]) => (
            <button
              key={id}
              className={"nav-item " + (!parent && page === id ? "active" : "")}
              onClick={() => {
                setParent(false);
                setPage(id);
              }}
            >
              <I size={18} />
              {t(id)}
            </button>
          ))}
          <p className="nav-label">MANAGE</p>
          {[
            ["tests", ClipboardList],
            ["homework", BookOpen],
            ["announcements", Bell],
            ["batches", GraduationCap],
          ].map(([id, I]) => (
            <button
              key={id}
              className={"nav-item " + (page === id ? "active" : "")}
              onClick={() => {
                setParent(false);
                setPage(id);
              }}
            >
              <I size={18} />
              {t(id)}
            </button>
          ))}
          <div className="sidebar-bottom">
            <button className="nav-item" onClick={() => setParent(!parent)}>
              <ArrowLeftRight size={18} />
              {parent ? t("switchClass") : t("switchParent")}
            </button>
            <div className="teacher-mini">
              <div className="avatar small">PP</div>
              <div>
                <b>Prof. Patil</b>
                <small>Class owner</small>
              </div>
              <Settings size={16} />
            </div>
          </div>
        </aside>
        <main className="main-area">
          {parent ? (
            <ParentPanel />
          ) : (
            <>
              <div className="mobile-heading">
                <div>
                  <span className="eyebrow">GURUKUL COACHING CLASSES</span>
                  <h1>{t(page === "home" ? "dashboard" : page)}</h1>
                </div>
                <button className="icon-btn" onClick={() => setParent(true)}>
                  <UserRound size={18} />
                </button>
              </div>
              <PageRouter />
            </>
          )}
        </main>
      </div>
      <nav className="bottom-nav">
        {nav.map(([id, I]) => (
          <button
            key={id}
            className={page === id && !parent ? "active" : ""}
            onClick={() => {
              setParent(false);
              setPage(id);
            }}
          >
            <I size={19} />
            <span>{t(id)}</span>
          </button>
        ))}
      </nav>
      {useC().toast && (
        <div className="toast">
          <Check size={17} />
          {useC().toast}
        </div>
      )}
    </div>
  );
}
function PageRouter() {
  const { page } = useC();
  return (
    <div className="page-enter">
      {{
        home: <Dashboard />,
        attendance: <Attendance />,
        fees: <Fees />,
        students: <Students />,
        more: <More />,
        tests: <Tests />,
        homework: <Homework />,
        announcements: <Announcements />,
        batches: <Batches />,
      }[page] || <Dashboard />}
    </div>
  );
}
function SectionTitle({ title, sub, action }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action}
    </div>
  );
}
function Stat({ label, value, sub, icon: Icon, tone = "blue" }) {
  return (
    <div className="stat-card">
      <div className={"stat-icon " + tone}>
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  );
}
function Dashboard() {
  const { t, students, fees, attendance, batches, setPage, notify } = useC();
  const total = students.length,
    collected = fees.reduce((a, f) => a + f.paid, 0),
    pending = fees.reduce((a, f) => a + f.plan - f.paid, 0),
    present = Object.values(attendance).filter((x) => x === "present").length,
    rate = Math.round((present / Math.max(1, students.length)) * 100);
  const feeData = [
    { name: "Collected", value: collected },
    { name: "Pending", value: pending },
  ];
  const admissions = [
    { m: "Jan", new: 8, left: 1 },
    { m: "Feb", new: 6, left: 2 },
    { m: "Mar", new: 9, left: 1 },
    { m: "Apr", new: 5, left: 2 },
    { m: "May", new: 7, left: 1 },
    { m: "Jun", new: 10, left: 2 },
    { m: "Jul", new: 6, left: 1 },
    { m: "Aug", new: 8, left: 2 },
    { m: "Sep", new: 4, left: 1 },
    { m: "Oct", new: 7, left: 1 },
    { m: "Nov", new: 5, left: 1 },
    { m: "Dec", new: 3, left: 0 },
  ];
  const batchData = batches.map((b) => ({
    name: b.name.replace(" Morning", "").replace(" Evening", ""),
    rate: Math.round(
      students
        .filter((s) => s.batchId === b.id)
        .reduce((a, s) => a + s.attendance, 0) /
        Math.max(1, students.filter((s) => s.batchId === b.id).length),
    ),
    revenue: fees
      .filter(
        (f) => students.find((s) => s.id === f.studentId)?.batchId === b.id,
      )
      .reduce((a, f) => a + f.paid, 0),
  }));
  const due = students
    .filter((s) => {
      const f = fees.find((f) => f.studentId === s.id);
      return f && f.paid < f.plan;
    })
    .slice(0, 4);
  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">TUESDAY, 24 NOVEMBER 2026</span>
          <h1>
            {t("welcome")}, Prof. Patil <span>✦</span>
          </h1>
          <p>Your class is looking good. Here's today's overview.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn primary" onClick={() => setPage("attendance")}>
            <CalendarCheck size={16} />
            {t("markAttendance")}
          </button>
          <button className="btn secondary" onClick={() => setPage("fees")}>
            <Plus size={16} />
            {t("collectFee")}
          </button>
        </div>
      </div>
      <div className="stats-grid">
        <Stat
          label={t("totalStudents")}
          value={total}
          sub="+5 this month"
          icon={Users}
        />
        <Stat
          label={t("collected")}
          value={money(collected)}
          sub="↑ 12% from last month"
          icon={IndianRupee}
          tone="teal"
        />
        <Stat
          label={t("pending")}
          value={money(pending)}
          sub={`${fees.filter((f) => f.paid < f.plan).length} students pending`}
          icon={Wallet}
          tone="amber"
        />
        <Stat
          label={t("todayAttendance")}
          value={rate + "%"}
          sub={`${present} present · ${total - present} absent`}
          icon={CalendarCheck}
          tone="green"
        />
      </div>
      <div className="chart-grid">
        <div className="panel chart-panel">
          <SectionTitle
            title={t("admissions")}
            sub="New admissions vs students who left"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={admissions}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--line)"
              />
              <XAxis
                dataKey="m"
                tick={{ fill: "var(--muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  color: "var(--text)",
                }}
              />
              <Bar dataKey="new" fill="#6366f1" radius={[5, 5, 0, 0]} />
              <Bar dataKey="left" fill="#f59e0b" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="legend">
            <span>
              <i className="dot indigo" /> New students
            </span>
            <span>
              <i className="dot amber" /> Left students
            </span>
          </div>
        </div>
        <div className="panel chart-panel">
          <SectionTitle
            title={t("feesSplit")}
            sub="Collected vs pending fees"
          />
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={feeData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={4}
                  stroke="none"
                >
                  {feeData.map((x, i) => (
                    <Cell key={i} fill={i ? "#f59e0b" : "#14b8a6"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => money(v)}
                  contentStyle={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <b>
                {Math.round(
                  (collected / Math.max(1, collected + pending)) * 100,
                )}
                %
              </b>
              <small>collected</small>
            </div>
          </div>
          <div className="fee-legend">
            <div>
              <i className="dot teal" />
              <span>Collected</span>
              <b>{money(collected)}</b>
            </div>
            <div>
              <i className="dot amber" />
              <span>Pending</span>
              <b>{money(pending)}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-grid">
        <div className="panel chart-panel">
          <SectionTitle title={t("batchAttendance")} />
          {batchData.map((b) => (
            <div className="hbar" key={b.name}>
              <div>
                <span>{b.name}</span>
                <b>{b.rate}%</b>
              </div>
              <div className="progress">
                <i style={{ width: b.rate + "%" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="panel chart-panel">
          <SectionTitle title={t("revenue")} />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={batchData}
              layout="vertical"
              margin={{ left: 8, right: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="var(--line)"
              />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={112}
                tick={{ fill: "var(--muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(v) => money(v)} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="panel list-panel">
        <SectionTitle
          title={t("dueWeek")}
          action={
            <button className="text-btn" onClick={() => setPage("fees")}>
              View all <ArrowUpRight size={14} />
            </button>
          }
        />
        {due.map((s) => (
          <div className="person-row" key={s.id}>
            <div className="person-avatar">
              {s.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="person-info">
              <b>{s.name}</b>
              <small>{batches.find((b) => b.id === s.batchId)?.name}</small>
            </div>
            <strong className="amount">
              {money(
                fees.find((f) => f.studentId === s.id).plan -
                  fees.find((f) => f.studentId === s.id).paid,
              )}
            </strong>
            <button
              className="small-btn"
              onClick={() => notify("Fee reminder sent to parent")}
            >
              {t("sendReminder")}
            </button>
          </div>
        ))}
      </div>
      <div className="panel list-panel">
        <SectionTitle
          title={t("attention")}
          action={
            <button className="text-btn" onClick={() => setPage("students")}>
              View students <ArrowUpRight size={14} />
            </button>
          }
        />
        <div className="attention-grid">
          {students
            .filter((s) => s.attendance < 75)
            .slice(0, 3)
            .map((s) => (
              <div className="attention-item" key={s.id}>
                <div className="person-avatar warn">{s.name[0]}</div>
                <div>
                  <b>{s.name}</b>
                  <small>{s.attendance}% attendance · needs follow-up</small>
                </div>
                <span className="status pending">Review</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
function Attendance() {
  const { t, students, batches, attendance, setAttendance, notify } = useC();
  const [batch, setBatch] = useState("b1"),
    [date, setDate] = useState("2026-11-24");
  const list = students.filter((s) => s.batchId === batch),
    p = list.filter((s) => attendance[s.id] === "present").length,
    a = list.length - p;
  return (
    <>
      <SectionTitle
        title={t("attendance")}
        sub="Take attendance for a batch in seconds."
        action={
          <input
            className="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        }
      />
      <div className="panel attendance-toolbar">
        <label>
          {t("selectBatch")}
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            {batches.map((b) => (
              <option value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
        <div className="attendance-count">
          <span className="green-text">
            ● {p} {t("present")}
          </span>
          <span className="red-text">
            ● {a} {t("absent")}
          </span>
        </div>
        <button
          className="btn secondary"
          onClick={() =>
            setAttendance((old) => ({
              ...old,
              ...Object.fromEntries(list.map((s) => [s.id, "present"])),
            }))
          }
        >
          <Check size={15} />
          {t("markAll")}
        </button>
      </div>
      <div className="panel attendance-list">
        {list.map((s) => (
          <div className="attendance-row" key={s.id}>
            <div className="person-avatar">
              {s.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="person-info">
              <b>{s.name}</b>
              <small>{s.school}</small>
            </div>
            <div className="toggle-group">
              <button
                className={attendance[s.id] === "present" ? "is-present" : ""}
                onClick={() =>
                  setAttendance((o) => ({ ...o, [s.id]: "present" }))
                }
              >
                <Check size={15} />
                {t("present")}
              </button>
              <button
                className={attendance[s.id] === "absent" ? "is-absent" : ""}
                onClick={() =>
                  setAttendance((o) => ({ ...o, [s.id]: "absent" }))
                }
              >
                <X size={15} />
                {t("absent")}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky-action">
        <button
          className="btn primary full"
          onClick={() => notify(t("markSaved"))}
        >
          {t("save")} · {p}/{list.length}
        </button>
      </div>
    </>
  );
}
function Fees() {
  const { t, students, fees, setFees, batches, notify } = useC();
  const [batch, setBatch] = useState("all"),
    [status, setStatus] = useState("all"),
    [modal, setModal] = useState(null),
    [amount, setAmount] = useState(""),
    [mode, setMode] = useState("UPI"),
    [search, setSearch] = useState("");
  const total = fees.reduce((a, f) => a + f.plan, 0),
    col = fees.reduce((a, f) => a + f.paid, 0);
  const visible = students
    .filter(
      (s) =>
        (batch === "all" || s.batchId === batch) &&
        s.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((s) => {
      const f = fees.find((f) => f.studentId === s.id);
      return (
        status === "all" ||
        (f.paid === 0 ? "unpaid" : f.paid >= f.plan ? "paid" : "partial") ===
          status
      );
    });
  const open = (s) => {
    setModal(s);
    setAmount(
      String(
        Math.max(
          0,
          fees.find((f) => f.studentId === s.id).plan -
            fees.find((f) => f.studentId === s.id).paid,
        ),
      ),
    );
  };
  return (
    <>
      <SectionTitle
        title={t("fees")}
        sub="Track collections and follow up on pending payments."
        action={
          <button
            className="btn primary"
            onClick={() => visible[0] && open(visible[0])}
          >
            <Plus size={16} />
            {t("collectFee")}
          </button>
        }
      />
      <div className="stats-grid three">
        <Stat
          label={t("totalFees")}
          value={money(total)}
          sub="Across all active students"
          icon={IndianRupee}
        />
        <Stat
          label={t("feeCollected")}
          value={money(col)}
          sub={`${Math.round((col / total) * 100)}% of total`}
          icon={Check}
          tone="teal"
        />
        <Stat
          label={t("feePending")}
          value={money(total - col)}
          sub={`${fees.filter((f) => f.paid < f.plan).length} students`}
          icon={Clock}
          tone="amber"
        />
      </div>
      <div className="panel filters">
        <div className="searchbox">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
          />
        </div>
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="all">{t("allBatches")}</option>
          {batches.map((b) => (
            <option value={b.id}>{b.name}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">{t("allStatuses")}</option>
          <option value="paid">{t("paid")}</option>
          <option value="partial">{t("partial")}</option>
          <option value="unpaid">{t("unpaid")}</option>
        </select>
        <button
          className="btn secondary"
          onClick={() => {
            students
              .filter(
                (s) =>
                  fees.find((f) => f.studentId === s.id).paid <
                  fees.find((f) => f.studentId === s.id).plan,
              )
              .forEach(() => {});
            notify("Reminders sent to all pending parents");
          }}
        >
          <Send size={15} />
          {t("remindAll")}
        </button>
      </div>
      <div className="panel fee-list">
        {visible.map((s) => {
          const f = fees.find((f) => f.studentId === s.id),
            pct = Math.round((f.paid / f.plan) * 100),
            st = pct === 100 ? "paid" : pct === 0 ? "pending" : "partial";
          return (
            <div className="fee-row" key={s.id}>
              <div className="person-avatar">{s.name[0]}</div>
              <div className="fee-main">
                <div className="fee-name">
                  <b>{s.name}</b>
                  <span className={"status " + st}>
                    {t(st === "pending" ? "unpaid" : st)}
                  </span>
                </div>
                <small>
                  {batches.find((b) => b.id === s.batchId)?.name} ·{" "}
                  {money(f.paid)} / {money(f.plan)}
                </small>
                <div className="progress">
                  <i className={st} style={{ width: pct + "%" }} />
                </div>
              </div>
              <button className="small-btn" onClick={() => open(s)}>
                {t("collectFee")}
              </button>
            </div>
          );
        })}
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{t("collectFee")}</h2>
              <button className="icon-btn" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            <p className="muted">
              {modal.name} · {batches.find((b) => b.id === modal.batchId)?.name}
            </p>
            <label>
              {t("amount")} (₹)
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label>
              {t("paymentMode")}
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option>UPI</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </label>
            <div className="receipt">
              <div className="receipt-brand">
                <Receipt /> GURUKUL COACHING CLASSES
              </div>
              <small>
                {t("receipt")} · #GC{Date.now().toString().slice(-6)}
              </small>
              <b>{modal.name}</b>
              <strong>{money(amount)}</strong>
              <small>Payment mode: {mode} · 24 Nov 2026</small>
            </div>
            <button
              className="btn primary full"
              onClick={() => {
                setFees((fs) =>
                  fs.map((f) =>
                    f.studentId === modal.id
                      ? {
                          ...f,
                          paid: Math.min(f.plan, f.paid + Number(amount)),
                        }
                      : f,
                  ),
                );
                setModal(null);
                notify(t("feeSaved"));
              }}
            >
              <Check size={16} />
              {t("save")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
function Students() {
  const { t, students, batches, setStudents, fees, setFees, notify } = useC();
  const [q, setQ] = useState(""),
    [batch, setBatch] = useState("all"),
    [modal, setModal] = useState(false),
    [form, setForm] = useState({
      name: "",
      phone: "",
      school: "",
      batchId: "b1",
      feePlan: "18000",
    }),
    [profile, setProfile] = useState(null);
  const list = students.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (batch === "all" || s.batchId === batch),
  );
  return (
    <>
      <SectionTitle
        title={t("students")}
        sub={`${students.length} active students across ${batches.length} batches.`}
        action={
          <button className="btn primary" onClick={() => setModal(true)}>
            <Plus size={16} />
            {t("addStudent")}
          </button>
        }
      />
      <div className="panel filters">
        <div className="searchbox">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search")}
          />
        </div>
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="all">{t("allBatches")}</option>
          {batches.map((b) => (
            <option value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
      <div className="panel student-table">
        {list.map((s) => (
          <button
            className="student-row"
            key={s.id}
            onClick={() => setProfile(s)}
          >
            <div className="person-avatar">
              {s.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="person-info">
              <b>{s.name}</b>
              <small>
                {s.school} · {batches.find((b) => b.id === s.batchId)?.name}
              </small>
            </div>
            <div className="student-meta">
              <span className={s.attendance < 75 ? "red-text" : "green-text"}>
                {s.attendance}%
              </span>
              <small>Attendance</small>
            </div>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{t("addStudent")}</h2>
              <button className="icon-btn" onClick={() => setModal(false)}>
                <X />
              </button>
            </div>
            {[
              ["name", "name"],
              ["phone", "phone"],
              ["school", "school"],
              ["feePlan", "feePlan"],
            ].map(([k, l]) => (
              <label>
                {t(l)}
                <input
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                />
              </label>
            ))}
            <label>
              {t("batch")}
              <select
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              >
                {batches.map((b) => (
                  <option value={b.id}>{b.name}</option>
                ))}
              </select>
            </label>
            <button
              className="btn primary full"
              onClick={() => {
                if (!form.name.trim()) return;
                const s = {
                  ...form,
                  id: "s" + Date.now(),
                  joined: "2026-11-24",
                  feePlan: Number(form.feePlan),
                  paid: 0,
                  attendance: 100,
                  marks: [0, 0, 0, 0],
                };
                setStudents((x) => [s, ...x]);
                setFees((x) => [
                  ...x,
                  { studentId: s.id, paid: 0, plan: s.feePlan },
                ]);
                setModal(false);
                notify(t("studentAdded"));
              }}
            >
              {t("add")}
            </button>
          </div>
        </div>
      )}
      {profile && (
        <div className="modal-backdrop" onClick={() => setProfile(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{profile.name}</h2>
              <button className="icon-btn" onClick={() => setProfile(null)}>
                <X />
              </button>
            </div>
            <div className="profile-hero">
              <div className="profile-avatar">{profile.name[0]}</div>
              <div>
                <b>{batches.find((b) => b.id === profile.batchId)?.name}</b>
                <p>{profile.school}</p>
              </div>
            </div>
            <div className="profile-stats">
              <Stat
                label="Attendance"
                value={profile.attendance + "%"}
                icon={CalendarCheck}
              />
              <Stat
                label="Fee status"
                value={money(
                  fees.find((f) => f.studentId === profile.id)?.plan -
                    fees.find((f) => f.studentId === profile.id)?.paid || 0,
                )}
                icon={Wallet}
              />
            </div>
            <p>
              <Phone size={15} /> {profile.phone}
            </p>
            <h3>Test performance</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart
                data={profile.marks.map((m, i) => ({
                  test: "Test " + (i + 1),
                  marks: m,
                }))}
              >
                <XAxis dataKey="test" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line dataKey="marks" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
function Batches() {
  const { t, batches, students, setBatches, notify } = useC();
  const [modal, setModal] = useState(false),
    [form, setForm] = useState({
      name: "",
      teacher: "Prof. Patil",
      time: "4:00 – 5:00 PM",
    });
  return (
    <>
      <SectionTitle
        title="Batches"
        sub="Manage class groups, teachers and schedules."
        action={
          <button className="btn primary" onClick={() => setModal(true)}>
            <Plus size={16} />
            {t("createBatch")}
          </button>
        }
      />
      <div className="batch-grid">
        {batches.map((b) => (
          <div className="panel batch-card">
            <div className="batch-icon">
              <GraduationCap />
            </div>
            <h3>{b.name}</h3>
            <p>
              {b.subject || "Coaching"} ·{" "}
              {students.filter((s) => s.batchId === b.id).length} students
            </p>
            <div className="batch-detail">
              <span>
                <UserRound size={15} />
                {b.teacher}
              </span>
              <span>
                <Clock size={15} />
                {b.time}
              </span>
            </div>
            <div className="batch-footer">
              <span>Attendance rate</span>
              <b>
                {Math.round(
                  students
                    .filter((s) => s.batchId === b.id)
                    .reduce((a, s) => a + s.attendance, 0) /
                    Math.max(
                      1,
                      students.filter((s) => s.batchId === b.id).length,
                    ),
                )}
                %
              </b>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{t("createBatch")}</h2>
              <button className="icon-btn" onClick={() => setModal(false)}>
                <X />
              </button>
            </div>
            <label>
              Batch name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              {t("teacher")}
              <input
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
              />
            </label>
            <label>
              {t("timing")}
              <input
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </label>
            <button
              className="btn primary full"
              onClick={() => {
                if (!form.name) return;
                setBatches((x) => [
                  ...x,
                  { ...form, id: "b" + Date.now(), subject: "Coaching" },
                ]);
                setModal(false);
                notify("Batch created");
              }}
            >
              Create batch
            </button>
          </div>
        </div>
      )}
    </>
  );
}
function Tests() {
  const { t, students, batches, marks, setMarks, notify } = useC();
  const [batch, setBatch] = useState("b1"),
    [test, setTest] = useState("Unit Test 1");
  const list = students.filter((s) => s.batchId === batch),
    vals = list.map((s) => Number(marks[s.id]?.[test] ?? s.marks[0]));
  const avg = Math.round(
    vals.reduce((a, b) => a + b, 0) / Math.max(1, vals.length),
  );
  return (
    <>
      <SectionTitle
        title={t("tests")}
        sub="Enter scores and track student progress."
      />
      <div className="panel filters">
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          {batches.map((b) => (
            <option value={b.id}>{b.name}</option>
          ))}
        </select>
        <select value={test} onChange={(e) => setTest(e.target.value)}>
          {["Unit Test 1", "Unit Test 2", "Mid-term", "Unit Test 4"].map(
            (x) => (
              <option>{x}</option>
            ),
          )}
        </select>
      </div>
      <div className="stats-grid three">
        <Stat
          label={t("classAverage")}
          value={avg + "/100"}
          icon={ChartNoAxesCombined}
        />
        <Stat
          label={t("highest")}
          value={Math.max(...vals) + "/100"}
          icon={TrendingUp}
          tone="teal"
        />
        <Stat
          label={t("lowest")}
          value={Math.min(...vals) + "/100"}
          icon={ArrowUpRight}
          tone="amber"
        />
      </div>
      <div className="panel attendance-list">
        {list.map((s) => (
          <div className="marks-row">
            <div className="person-avatar">{s.name[0]}</div>
            <div className="person-info">
              <b>{s.name}</b>
              <small>{t("marks")} / 100</small>
            </div>
            <input
              className="marks-input"
              type="number"
              min="0"
              max="100"
              value={marks[s.id]?.[test] ?? s.marks[0]}
              onChange={(e) =>
                setMarks((o) => ({
                  ...o,
                  [s.id]: { ...o[s.id], [test]: Number(e.target.value) },
                }))
              }
            />
          </div>
        ))}
      </div>
      <div className="sticky-action">
        <button
          className="btn primary full"
          onClick={() => notify(t("marksSaved"))}
        >
          {t("save")}
        </button>
      </div>
      <div className="panel chart-panel">
        <SectionTitle title={t("topPerformers")} />
        {[...list]
          .sort((a, b) => b.marks[0] - a.marks[0])
          .slice(0, 4)
          .map((s) => (
            <div className="person-row">
              <div className="person-avatar">{s.name[0]}</div>
              <div className="person-info">
                <b>{s.name}</b>
                <small>{batches.find((b) => b.id === s.batchId)?.name}</small>
              </div>
              <b>{s.marks[0]}/100</b>
            </div>
          ))}
      </div>
    </>
  );
}
function Homework() {
  const { t, homework, setHomework, batches, students, notify } = useC();
  const [modal, setModal] = useState(false),
    [form, setForm] = useState({
      title: "",
      description: "",
      batchId: "b1",
      due: "2026-11-28",
    });
  return (
    <>
      <SectionTitle
        title={t("homework")}
        sub="Share practice work and follow submissions."
        action={
          <button className="btn primary" onClick={() => setModal(true)}>
            <Plus size={16} />
            {t("postHomework")}
          </button>
        }
      />
      {homework.map((h) => (
        <div className="panel homework-card">
          <div className="homework-top">
            <div className="homework-icon">
              <BookOpen />
            </div>
            <span className="status partial">Due {h.due}</span>
          </div>
          <h3>{h.title}</h3>
          <p>{h.description}</p>
          <small>{batches.find((b) => b.id === h.batchId)?.name}</small>
          <div className="homework-progress">
            <div>
              <span>
                {h.submitted} {t("submitted")} of {h.total}
              </span>
              <b>{Math.round((h.submitted / h.total) * 100)}%</b>
            </div>
            <div className="progress">
              <i style={{ width: (h.submitted / h.total) * 100 + "%" }} />
            </div>
          </div>
        </div>
      ))}
      <div className="panel upload-placeholder">
        <FileText size={22} />
        <b>{t("notes")} upload</b>
        <p>Attach PDF notes or worksheets for your students.</p>
        <button
          className="btn secondary"
          onClick={() => notify("Demo: file upload is not connected")}
        >
          Choose file
        </button>
      </div>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{t("postHomework")}</h2>
              <button className="icon-btn" onClick={() => setModal(false)}>
                <X />
              </button>
            </div>
            <label>
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label>
              {t("description")}
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </label>
            <label>
              {t("batch")}
              <select
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              >
                {batches.map((b) => (
                  <option value={b.id}>{b.name}</option>
                ))}
              </select>
            </label>
            <label>
              {t("dueDate")}
              <input
                type="date"
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
              />
            </label>
            <button
              className="btn primary full"
              onClick={() => {
                if (!form.title) return;
                setHomework((x) => [
                  {
                    ...form,
                    id: "h" + Date.now(),
                    submitted: 0,
                    total: students.filter((s) => s.batchId === form.batchId)
                      .length,
                  },
                  ...x,
                ]);
                setModal(false);
                notify(t("homeworkPosted"));
              }}
            >
              {t("postHomework")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
function Announcements() {
  const { t, batches, messages, setMessages, notify } = useC();
  const [message, setMessage] = useState(""),
    [batch, setBatch] = useState("all");
  return (
    <>
      <SectionTitle
        title={t("announcements")}
        sub="Keep parents informed with one simple message."
      />
      <div className="panel compose-panel">
        <h3>
          <MessageCircle size={18} /> {t("compose")}
        </h3>
        <label>
          Send to
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="all">{t("allParents")}</option>
            {batches.map((b) => (
              <option value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
        <label>
          {t("message")}
          <textarea
            rows="4"
            placeholder="E.g. Tomorrow's class will start at 5 PM…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="whatsapp-preview">
          <small>WHATSAPP PREVIEW</small>
          <div className="chat-bubble">
            {message || "Your announcement will appear here…"}
            <small>Now ✓✓</small>
          </div>
        </div>
        <button
          className="btn primary full"
          disabled={!message.trim()}
          onClick={() => {
            setMessages((x) => [
              { id: Date.now(), message, batch, date: "24 Nov 2026" },
              ...x,
            ]);
            setMessage("");
            notify(t("announcementSent"));
          }}
        >
          <Send size={16} />
          {t("send")}
        </button>
      </div>
      <SectionTitle title={t("sentMessages")} />
      {messages.map((m) => (
        <div className="panel sent-card">
          <b>
            {m.batch === "all"
              ? t("allParents")
              : batches.find((b) => b.id === m.batch)?.name}
          </b>
          <p>{m.message}</p>
          <small>{m.date} · Sent</small>
        </div>
      ))}
    </>
  );
}
function More() {
  const { t, lang, setLang, theme, setTheme, setParent, notify } = useC();
  return (
    <>
      <SectionTitle
        title={t("settings")}
        sub="Make ClassPro work the way your class does."
      />
      <div className="panel settings-panel">
        <div className="setting-row">
          <div className="setting-icon">
            <Languages />
          </div>
          <div>
            <b>{t("language")}</b>
            <small>English · हिंदी · मराठी</small>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
        <div className="setting-row">
          <div className="setting-icon">
            <Sun />
          </div>
          <div>
            <b>{t("theme")}</b>
            <small>Choose your preferred appearance</small>
          </div>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">{t("light")}</option>
            <option value="dark">{t("dark")}</option>
          </select>
        </div>
        <button
          className="setting-row setting-button"
          onClick={() => setParent(true)}
        >
          <div className="setting-icon">
            <UserRound />
          </div>
          <div>
            <b>{t("switchParent")}</b>
            <small>Preview the parent experience</small>
          </div>
          <ArrowUpRight />
        </button>
        <div className="setting-row">
          <div className="setting-icon">
            <School />
          </div>
          <div>
            <b>{t("profile")}</b>
            <small>Gurukul Coaching Classes, Kothrud, Pune</small>
          </div>
          <ArrowUpRight />
        </div>
      </div>
      <SectionTitle
        title={t("comingSoon")}
        sub="More ways to grow your coaching class."
      />
      <div className="coming-grid">
        {[
          ["Online fee payment", "Collect fees digitally"],
          ["Online tests", "Conduct tests from anywhere"],
          ["AI progress summary", "Personalised student insights"],
          ["Multiple branches", "Manage all locations"],
        ].map(([a, b]) => (
          <div className="panel coming-card">
            <div className="lock-icon">
              <Lock />
            </div>
            <b>{a}</b>
            <small>{b}</small>
            <span>COMING SOON</span>
          </div>
        ))}
      </div>
      <button
        className="btn secondary full"
        onClick={() => notify("ClassPro demo · Version 1.0")}
      >
        About ClassPro
      </button>
    </>
  );
}
function ParentPanel() {
  const {
    t,
    students,
    attendance,
    fees,
    homework,
    batches,
    theme,
    setTheme,
    lang,
    setLang,
    setParent,
  } = useC();
  const [child, setChild] = useState(students[0]?.id || "s1");
  const s = students.find((x) => x.id === child) || students[0],
    f = fees.find((x) => x.studentId === s.id);
  return (
    <>
      <div className="parent-head">
        <div>
          <span className="eyebrow">GURUKUL COACHING CLASSES</span>
          <h1>{t("parent")}</h1>
          <p>Welcome back, Mrs. Joshi</p>
        </div>
        <button className="btn secondary" onClick={() => setParent(false)}>
          <ArrowLeftRight size={16} />
          {t("switchClass")}
        </button>
      </div>
      <div className="panel child-select">
        <div className="person-avatar large">{s.name[0]}</div>
        <div>
          <small>{t("child")}</small>
          <select value={child} onChange={(e) => setChild(e.target.value)}>
            {students.slice(0, 2).map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </select>
          <small>{batches.find((b) => b.id === s.batchId)?.name}</small>
        </div>
      </div>
      <div className="stats-grid two">
        <Stat
          label={t("todayAttendance")}
          value={attendance[s.id] === "present" ? t("present") : t("absent")}
          icon={CalendarCheck}
          tone={attendance[s.id] === "present" ? "green" : "amber"}
        />
        <Stat
          label={t("monthlyAttendance")}
          value={s.attendance + "%"}
          icon={TrendingUp}
          tone="teal"
        />
        <Stat
          label={t("lastTest")}
          value={s.marks[0] + "/100"}
          icon={ClipboardList}
        />
        <Stat
          label={t("pendingFee")}
          value={money(f.plan - f.paid)}
          icon={Wallet}
          tone="amber"
        />
      </div>
      <div className="panel chart-panel">
        <SectionTitle title="Learning progress" sub="Recent test scores" />
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={s.marks.map((m, i) => ({
              test: "Test " + (i + 1),
              marks: m,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
            <XAxis dataKey="test" tick={{ fill: "var(--muted)" }} />
            <YAxis domain={[0, 100]} tick={{ fill: "var(--muted)" }} />
            <Tooltip />
            <Line
              dataKey="marks"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="panel list-panel">
        <SectionTitle title={t("homeworkTitle")} />
        {homework
          .filter((h) => h.batchId === s.batchId)
          .map((h) => (
            <div className="homework-parent">
              <BookOpen />
              <div>
                <b>{h.title}</b>
                <small>
                  Due {h.due} · {h.submitted} of {h.total} submitted
                </small>
              </div>
            </div>
          ))}
      </div>
      <div className="panel pay-panel">
        <div>
          <b>Fee payment</b>
          <small>Secure online payment will be available soon.</small>
        </div>
        <button className="btn secondary" disabled>
          {t("payOnline")}
        </button>
      </div>
      <div className="parent-bottom-settings">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
        <button
          className="icon-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
    </>
  );
}
export default App;
