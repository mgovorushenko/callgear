const pages = [
  { id: "colors", label: "Colors", type: "foundation" },
  { id: "typography", label: "Typography", type: "foundation" },
  { id: "icons", label: "Icons", type: "foundation" },
  { id: "button", label: "Button", type: "component" },
  { id: "content-button", label: "Content Button", type: "component" },
  { id: "status-bar", label: "Status Bar", type: "component" },
  { id: "tab-bar", label: "Tab Bar", type: "component" },
  { id: "glass-menu", label: "Glass Menu", type: "component" },
  { id: "badge", label: "Badge", type: "component" },
  { id: "segmented-control", label: "Segmented Control", type: "component" },
  { id: "textfield", label: "Textfield", type: "component" },
  { id: "select", label: "Select", type: "component" },
  { id: "date-picker", label: "Date Picker", type: "component" },
  { id: "time-picker", label: "Time Picker", type: "component" },
  { id: "wheel-picker", label: "Wheel Picker", type: "component" },
  { id: "alert", label: "Alert", type: "component" },
  { id: "row", label: "List", type: "component" },
];

const appRoutes = ["clients", "new-client", "edit-client", "tasks", "tasks-screen", "task", "new-task", "edit-task", "touches", "call-results", "settings"];
const createdTasksStorageKey = "callgear.createdTasks";
const taskOverridesStorageKey = "callgear.taskOverrides";
const deletedTasksStorageKey = "callgear.deletedTasks";
const dismissedCallResultUpdatesStorageKey = "callgear.dismissedCallResultUpdates";
const createdClientsStorageKey = "callgear.createdClients";
const clientOverridesStorageKey = "callgear.clientOverrides";
const deletedClientsStorageKey = "callgear.deletedClients";
const pendingClientTouchesStorageKey = "callgear.pendingClientTouches";
const clientTouchesStorageKey = "callgear.clientTouches";
const settingsStorageKey = "callgear.settings";

const defaultSettingsState = {
  morningDigest: "07:10",
  quietStart: "22:00",
  quietEnd: "07:30",
  overdueAlerts: true,
  personalCalls: true,
  meetingMode: false,
};

const timeWheelHours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const timeWheelMinutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
const timeWheelCycleCount = 7;
const timeWheelMiddleCycle = Math.floor(timeWheelCycleCount / 2);
let dismissedCallResultUpdates = [];

const colorGroups = [
  {
    title: "Accents",
    tokens: [
      ["Brand", "--color-accents-brand"],
      ["Brand Subtle", "--color-accents-brand-subtle"],
      ["Blue", "--color-accents-blue"],
      ["Green", "--color-accents-green"],
      ["Green Subtle", "--color-accents-green-subtle"],
      ["Red", "--color-accents-red"],
      ["Orange", "--color-accents-orange"],
      ["Orange Subtle", "--color-accents-orange-subtle"],
      ["Yellow", "--color-accents-yellow"],
      ["Purple", "--color-accents-purple"],
      ["Purple Subtle", "--color-accents-purple-subtle"],
      ["Cyan", "--color-accents-cyan"],
    ],
  },
  {
    title: "Backgrounds",
    tokens: [
      ["Primary", "--color-backgrounds-primary"],
      ["Secondary", "--color-backgrounds-secondary"],
    ],
  },
  {
    title: "Labels",
    tokens: [
      ["Primary", "--color-labels-primary"],
      ["Secondary", "--color-labels-secondary"],
      ["Tertiary", "--color-labels-tertiary"],
      ["Quaternary", "--color-labels-quaternary"],
      ["Invert", "--color-labels-invert"],
      ["Brand", "--color-labels-brand"],
    ],
  },
  {
    title: "Grays",
    tokens: [
      ["Black", "--color-grays-black"],
      ["White", "--color-grays-white"],
      ["Gray 1", "--color-grays-gray-1"],
      ["Gray 2", "--color-grays-gray-2"],
      ["Gray 3", "--color-grays-gray-3"],
      ["Gray 4", "--color-grays-gray-4"],
      ["Gray 5", "--color-grays-gray-5"],
    ],
  },
  {
    title: "Fills",
    tokens: [
      ["Primary", "--color-fills-primary"],
      ["Secondary", "--color-fills-secondary"],
      ["Tertiary", "--color-fills-tertiary"],
      ["Quaternary", "--color-fills-quaternary"],
    ],
  },
  {
    title: "Separators",
    tokens: [
      ["Opaque", "--color-separators-opaque"],
      ["Non-opaque", "--color-separators-non-opaque"],
      ["Vibrant", "--color-separators-vibrant"],
    ],
  },
];

const typography = [
  ["Title 1", "title1"],
  ["Title 2", "title2"],
  ["Title 3", "title3"],
  ["Headline", "headline"],
  ["Body", "body"],
  ["Subheadline", "subheadline"],
  ["Footnote Strong", "footnote-strong"],
  ["Footnote", "footnote"],
  ["Caption", "caption"],
];

const icons = [
  "add-24.svg",
  "arrow-list-right.svg",
  "call-24.svg",
  "call-fiiled-24.svg",
  "check.svg",
  "close-24.svg",
  "document-24.svg",
  "down-24.svg",
  "edit-24.svg",
  "filter-24.svg",
  "flag-24.svg",
  "flag-filled-24.svg",
  "left-24.svg",
  "message-square-24.svg",
  "message-square-fiiled-24.svg",
  "more-24.svg",
  "right-24.svg",
  "search-24.svg",
  "settings-24.svg",
  "sort-24.svg",
  "up-24.svg",
  "user-24.svg",
  "users-24.svg",
];

const componentPages = {
  button: {
    render: ({ content = "icon", style = "primary", disabled = false } = {}) =>
      renderButton({
        content,
        style,
        disabled,
        label: content === "icon" ? "Добавить" : "Label",
        icon: "plus",
      }),
  },
  "content-button": {
    variants: [
      "prominent-symbol",
      "bordered-symbol",
      "secondary-symbol",
      "prominent-text",
      "bordered-text",
      "secondary-text",
      "destructive-prominent-symbol",
      "destructive-bordered-symbol",
      "destructive-secondary-symbol",
      "disabled-prominent-symbol",
      "disabled-bordered-symbol",
      "disabled-secondary-symbol",
    ],
    render: (variant) => {
      const destructive = variant.includes("destructive");
      const disabled = variant.includes("disabled");
      const icon = variant.includes("symbol");
      const style = variant.includes("prominent")
        ? "prominent"
        : variant.includes("secondary")
          ? "secondary"
          : "bordered";
      return renderContentButton({ style, label: "Play", icon, destructive, disabled });
    },
  },
  "tab-bar": {
    variants: ["clients", "tasks", "settings", "over-content"],
    render: (variant) => {
      const active = variant === "over-content" ? "clients" : variant;
      const tabBar = renderTabBar(active);
      return variant === "over-content" ? renderOverContentPreview(tabBar) : tabBar;
    },
  },
  "glass-menu": {
    variants: ["default", "over-content"],
    render: (variant) => {
      const menu = renderGlassMenu();
      return variant === "over-content" ? renderOverContentPreview(menu) : `<div class="cg-glass-menu-reference">${menu}</div>`;
    },
  },
  "status-bar": {
    variants: ["default"],
    render: () => renderStatusBar(),
  },
  badge: {
    variants: ["square-default", "square-error", "rounded-color", "rounded-brand"],
    render: (variant) => {
      return renderBadge({ variant, label: "в 14:00" });
    },
  },
  "segmented-control": {
    render: ({ segments = 2, selected = 1, badges = true, layout = "fit" } = {}) =>
      renderSegmentedControl(
        segments,
        selected,
        badges,
        layout === "scroll" ? ["Label", "Long Label", "Label", "Long Label", "Label"] : ["Label", "Label", "Label", "Label", "Label"],
        ["8", "24", "12", "5", "3"],
        Array.from({ length: segments }, (_, index) => ({ value: String(index + 1) })),
        { scroll: layout === "scroll" },
      ),
  },
  textfield: {
    render: (props = {}) => renderLiveTextfield(props),
  },
  select: {
    render: (props = {}) => renderLiveSelect(props),
  },
  alert: {
    variants: ["stacked", "side-by-side"],
    render: (variant) => renderAlert(variant),
  },
  row: {
    variants: [
      "regular-image-badge",
      "tall-image-badge",
      "reverse-image-badge",
      "regular-detail",
      "regular-action",
      "regular-check",
      "regular-no-trailing",
      "tall-no-image",
      "reverse-read-only",
      "row-button",
      "row-button-destructive",
      "row-button-disabled",
      "trailing-button",
      "trailing-date",
      "read-only-info",
    ],
    render: (variant) => {
      if (variant.startsWith("row-button")) {
        const value = variant.includes("destructive") ? "destructive" : variant.includes("disabled") ? "disabled" : "default";
        return renderRowButton(value);
      }

      const config = {
        "regular-image-badge": { height: "regular", showImage: true, trailing: "badge", title: "Title" },
        "tall-image-badge": { height: "tall", showImage: true, trailing: "badge", title: "Title", subtitle: "Subtitle" },
        "reverse-image-badge": { height: "reverse", showImage: true, trailing: "badge", title: "Title", subtitle: "Subtitle" },
        "regular-detail": { height: "regular", trailing: "default", title: "Title", detail: "Detail" },
        "regular-action": { height: "regular", showImage: true, trailing: "action", title: "Клиент", detail: "Выбрать клиента" },
        "regular-check": { height: "regular", trailing: "check-detail-badge", title: "Title", detail: "Detail" },
        "regular-no-trailing": { height: "regular", showImage: true, trailing: "none", title: "Title" },
        "tall-no-image": { height: "tall", trailing: "badge", title: "Title", subtitle: "Subtitle" },
        "reverse-read-only": { height: "reverse", trailing: "none", title: "+971 50 123 4567", subtitle: "Телефон" },
        "trailing-button": { height: "reverse", trailing: "button", title: "Title", subtitle: "Subtitle" },
        "trailing-date": { height: "reverse", trailing: "date", title: "Title", subtitle: "Subtitle" },
        "read-only-info": { height: "reverse", trailing: "none", title: "+971 50 123 4567", subtitle: "Телефон" },
      }[variant];

      return renderRow(config);
    },
  },
  "task-card": {
    variants: ["hot-overdue", "hot-default", "default"],
    render: (variant) => renderTaskCard(taskCards[variant]),
  },
  "list-item": {
    variants: ["contact", "call", "deal", "photo"],
    render: (variant) => {
      if (variant === "photo") {
        return `<div class="cg-list-group">${renderListItem(clients[0], { photo: true })}</div>`;
      }

      const data = {
        contact: ["AK", "Anna Kovalenko", "Product demo today", "Lead"],
        call: ["IG", "Igor Gromov", "Missed call, 12:48", "Call"],
        deal: ["MS", "Mira Studio", "$12,400 pipeline value", "Deal"],
      }[variant];
      return renderListItem({
        initials: data[0],
        name: data[1],
        company: data[2],
        badge: data[3],
      });
    },
  },
  "section-title": {
    variants: ["default"],
    render: () => renderSectionTitle("О КЛИЕНТЕ"),
  },
  "action-tile": {
    variants: ["call", "message", "done"],
    render: (variant) => renderActionTile(taskActions[variant]),
  },
  "task-summary-card": {
    variants: ["default"],
    render: () => renderTaskSummaryCard(taskDetails["hot-overdue"].summary),
  },
  "client-card": {
    variants: ["default", "summary"],
    render: (variant) => renderClientCard(taskDetails["hot-overdue"].client, { summaryOnly: variant === "summary" }),
  },
  "client-profile": {
    variants: ["default"],
    render: () => renderClientProfile(getClientDetail("omar").profile),
  },
  "activity-item": {
    variants: ["call", "viewing", "message"],
    render: (variant) => renderActivityItem(taskDetails["hot-overdue"].activities[variant]),
  },
};

const app = document.querySelector("#app");

const taskCards = {
  "hot-overdue": {
    id: "hot-overdue",
    clientId: "omar",
    size: "standard",
    badge: { label: "Горячий", variant: "rounded-default" },
    title: "Подтвердить время просмотра",
    subtitle: "Tech Innovations Inc. • Омар Аль Мансури",
    description: "Клиент интересуется апартаментами в JVC и хочет сравнить сроки сдачи и условия оплаты перед тем, как...",
    price: "23,5 млн ₽",
    status: { label: "Просрочено с 14:00", variant: "square-error" },
  },
  "hot-default": {
    id: "hot-default",
    clientId: "sophia",
    size: "standard",
    badge: { label: "Горячий", variant: "rounded-default" },
    title: "Отправить коммерческое предложение",
    subtitle: "Future Dynamics Corp. • София Браун",
    description: "Клиент выбирает между двухкомнатными апартаментами в Dubai Marina и Business Bay. Подготовьте варианты до AED 3,5M.",
    price: "54,0 млн ₽",
    status: { label: "в 14:00", variant: "square-default" },
  },
  "future-terms": {
    id: "future-terms",
    clientId: "omar",
    size: "compact",
    badge: { label: "Отправить документы", variant: "rounded-default" },
    title: "Отправить условия",
    subtitle: "Tech Innovations Inc. • Омар Аль Мансури",
    description: "Подготовить короткое сообщение с условиями по выбранным объектам и зафиксировать следующий шаг после ответа клиента.",
    price: "23,5 млн ₽",
    status: { label: "Завтра, 16:00", variant: "square-default" },
  },
  default: {
    id: "follow-up",
    clientId: "michael",
    size: "compact",
    title: "Запланировать повторный звонок",
    subtitle: "Green Solutions LLC • Майкл Смит",
    description: "Клиент запросил варианты вилл в Arabian Ranches с приватным садом и готовностью к заселению. Позвоните, чтобы подтвердить бюджет и назначить просмотр.",
    status: { label: "в 14:00", variant: "square-default" },
  },
  "future-contract": {
    id: "future-contract",
    clientId: "james",
    size: "standard",
    badge: { label: "Отправить документы", variant: "rounded-default" },
    title: "Подготовить договор бронирования",
    subtitle: "Creative Ventures Ltd. • Джеймс Уилсон",
    description: "Клиент выбрал два инвестиционных объекта и ждет черновик договора с условиями бронирования и графиком платежей.",
    price: "41,0 млн ₽",
    status: { label: "Завтра, 11:30", variant: "square-default" },
  },
  "future-viewing": {
    id: "future-viewing",
    clientId: "emma",
    size: "standard",
    badge: { label: "Личная встреча", variant: "rounded-default" },
    title: "Согласовать просмотр апартаментов",
    subtitle: "Global Synergy Group • Эмма Дэвис",
    description: "Нужно подтвердить время просмотра и подготовить короткий маршрут по двум объектам рядом с метро.",
    price: "29,0 млн ₽",
    status: { label: "Пт, 29 мая, 16:00", variant: "square-default" },
  },
  "completed-offer": {
    id: "completed-offer",
    clientId: "liam",
    size: "standard",
    badge: { label: "Отправить документы", variant: "rounded-default" },
    title: "Отправить подборку по районам",
    subtitle: "Pinnacle Enterprises • Лиам Гарсия",
    description: "Клиент получил сравнение районов, сервисных сборов и прогнозируемой окупаемости для долгосрочной аренды.",
    price: "33,0 млн ₽",
    status: { label: "Завершено", variant: "square-completed" },
  },
  "completed-call": {
    id: "completed-call",
    clientId: "omar",
    size: "compact",
    badge: { label: "Связаться с клиентом", variant: "rounded-default" },
    title: "Уточнить условия оплаты",
    subtitle: "Tech Innovations Inc. • Омар Аль Мансури",
    description: "Уточнили комфортный платежный план и зафиксировали, какие варианты не подходят клиенту.",
    price: "23,5 млн ₽",
    status: { label: "Завершено", variant: "square-completed" },
  },
};

const taskCardOrder = [
  "hot-overdue",
  "future-terms",
  "hot-default",
  "default",
  "future-contract",
  "future-viewing",
  "completed-offer",
  "completed-call",
];

const taskActions = {
  call: { icon: "call-24.svg", label: "Позвонить", tone: "green", action: "call" },
  message: { icon: "message-square-24.svg", label: "Написать", tone: "orange", action: "message" },
  more: { icon: "more-24.svg", label: "Еще", tone: "primary", action: "task-more", popup: true },
  done: { icon: "flag-filled-24.svg", label: "Выполнено", tone: "secondary" },
};

const clientActions = {
  call: { icon: "call-24.svg", label: "Позвонить", tone: "green", action: "call" },
  message: { icon: "message-square-24.svg", label: "Написать", tone: "orange", action: "message" },
  task: { icon: "flag-24.svg", label: "Задача", tone: "blue" },
  more: { icon: "more-24.svg", label: "Еще", tone: "primary" },
};

const clients = [
  {
    id: "omar",
    name: "Омар Аль Мансури",
    company: "Tech Innovations Inc.",
    initials: "OM",
    photo: "https://www.figma.com/api/mcp/asset/402937c2-c99c-4780-a2d8-e0f4f9c64851",
  },
  {
    id: "michael",
    name: "Майкл Смит",
    company: "Green Solutions LLC",
    initials: "MS",
    photo: "https://www.figma.com/api/mcp/asset/1bfd870c-b20b-4880-939a-a58ef506c4cc",
  },
  {
    id: "sophia",
    name: "София Браун",
    company: "Future Dynamics Corp.",
    initials: "SB",
    photo: "https://www.figma.com/api/mcp/asset/d3ba502d-7de9-4a22-b20e-d03ebe67f17b",
  },
  {
    id: "james",
    name: "Джеймс Уилсон",
    company: "Creative Ventures Ltd.",
    initials: "JW",
    photo: "https://www.figma.com/api/mcp/asset/f8544d31-ea3b-4c97-b76c-ac739f763e65",
  },
  {
    id: "emma",
    name: "Эмма Дэвис",
    company: "Global Synergy Group",
    initials: "ED",
    photo: "https://www.figma.com/api/mcp/asset/4fdd73a2-8cbf-4b0e-9f52-9fa9dc0eb53e",
  },
  {
    id: "liam",
    name: "Лиам Гарсия",
    company: "Pinnacle Enterprises",
    initials: "LG",
    photo: "https://www.figma.com/api/mcp/asset/cf09237d-2106-44d7-b0c5-3fab1792bd28",
  },
];

const clientDetails = {
  omar: {
    profile: {
      name: "Омар Аль Мансури",
      company: "Tech Innovations Inc.",
      photo: clients[0].photo,
    },
    summary: {
      description:
        "Омар рассматривает апартаменты в JVC. Ключевые критерии — срок сдачи, условия оплаты, бюджет и возможность выбрать 2–3 подходящих объекта перед просмотром.",
      price: "23,5 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 50 123 4567" },
      { label: "Почта", value: "o.mansoori@gmail.com" },
    ],
    activities: [
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Звонок",
        subtitle: "",
        time: "12 марта 2026, 11:00",
      },
      {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Чат в WhatsApp",
        subtitle: "",
        time: "12 марта 2026, 11:00",
      },
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Звонок",
        subtitle: "",
        time: "11 марта 2026, 11:00",
      },
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Звонок",
        subtitle: "",
        time: "11 марта 2026, 11:00",
      },
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Звонок",
        subtitle: "",
        time: "10 марта 2026, 11:00",
      },
    ],
  },
  sophia: {
    profile: {
      name: "София Браун",
      company: "Future Dynamics Corp.",
      photo: clients[2].photo,
    },
    summary: {
      description:
        "София сравнивает семейные апартаменты в Dubai Marina и Business Bay. Ей нужна компактная подборка с понятными различиями по бюджету, локации и платежному плану.",
      price: "54,0 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 55 234 9876" },
      { label: "Почта", value: "s.brown@futuredynamics.com" },
    ],
    activities: [
      {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Запрошено коммерческое предложение",
        subtitle: "Попросила краткое сравнение двухкомнатных апартаментов с платежным планом и потенциалом перепродажи.",
        time: "14 марта 2026, 13:20",
      },
      {
        icon: "users-24.svg",
        tone: "purple",
        title: "Добавлен этап согласования с семьей",
        subtitle: "Отметили, что перед бронированием просмотров нужно согласовать варианты с супругом.",
        time: "13 марта 2026, 17:20",
      },
    ],
  },
  michael: {
    profile: {
      name: "Майкл Смит",
      company: "Green Solutions LLC",
      photo: clients[1].photo,
    },
    summary: {
      description:
        "Майкл ищет готовые виллы с приватным садом и спокойным комьюнити для семьи.",
      price: "38,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 52 888 1040" },
      { label: "Почта", value: "m.smith@greensolutions.ae" },
    ],
    activities: [
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Пропущенный звонок",
        subtitle: "Пытались связаться после отправки вариантов вилл; ответа нет, сегодня нужен повторный контакт.",
        time: "14 марта 2026, 09:10",
      },
      {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Подборка вилл отправлена",
        subtitle: "Отправили три варианта в Arabian Ranches и спросили, какие объекты поставить в приоритет для просмотра.",
        time: "12 марта 2026, 14:40",
      },
    ],
  },
  james: {
    profile: {
      name: "Джеймс Уилсон",
      company: "Creative Ventures Ltd.",
      photo: clients[3].photo,
    },
    summary: {
      description:
        "Джеймс рассматривает апартаменты для инвестиций и хочет быстро сравнить доходность, район и платежные условия перед выбором объектов для просмотра.",
      price: "41,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 50 440 1822" },
      { label: "Почта", value: "j.wilson@creativeventures.ae" },
    ],
    activities: [
      {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Первичный запрос получен",
        subtitle: "Клиент попросил подготовить несколько ликвидных объектов с понятной ожидаемой доходностью.",
        time: "11 марта 2026, 16:10",
      },
    ],
  },
  emma: {
    profile: {
      name: "Эмма Дэвис",
      company: "Global Synergy Group",
      photo: clients[4].photo,
    },
    summary: {
      description:
        "Эмма подбирает объект для релокации команды. Важны транспортная доступность, готовность объекта и возможность быстро согласовать просмотр.",
      price: "29,0 млн ₽",
      badge: { label: "Новый", variant: "square-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 54 902 3311" },
      { label: "Почта", value: "e.davis@globalsynergy.ae" },
    ],
    activities: [
      {
        icon: "users-24.svg",
        tone: "purple",
        title: "Критерии клиента уточнены",
        subtitle: "Добавили требования к району, сроку готовности и удобству для ежедневных поездок.",
        time: "10 марта 2026, 12:45",
      },
    ],
  },
  liam: {
    profile: {
      name: "Лиам Гарсия",
      company: "Pinnacle Enterprises",
      photo: clients[5].photo,
    },
    summary: {
      description:
        "Лиам ищет объект под долгосрочную аренду. Нужно сравнить районы, сервисные сборы и прогнозируемую окупаемость.",
      price: "33,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    contacts: [
      { label: "Телефон", value: "+971 58 618 7704" },
      { label: "Почта", value: "l.garcia@pinnacle.ae" },
    ],
    activities: [
      {
        icon: "call-24.svg",
        tone: "green",
        title: "Вводный звонок",
        subtitle: "Обсудили инвестиционный горизонт, желаемый район и комфортный диапазон бюджета.",
        time: "9 марта 2026, 15:30",
      },
    ],
  },
};

const taskDetails = {
  "hot-overdue": {
    clientId: "omar",
    summary: {
      title: "Подтвердить время просмотра",
      badges: [
        { label: "Связаться с клиентом", variant: "square-warning" },
        { label: "Просрочено с 14:00", variant: "square-error" },
      ],
      paragraphs: [
        "Клиент интересуется апартаментами в JVC и хочет сравнить сроки сдачи и условия оплаты перед тем, как записаться на просмотр.",
        "Нужно уточнить желаемый срок сдачи объекта и предпочтительные условия оплаты. Подтвердить бюджетный диапазон и гибкость бюджета. Сравнить 2–3 подходящих строящихся объекта в JVC.",
        "Подтвердить удобные дату и время просмотра, затем зафиксировать договоренность в карточке клиента.",
      ],
    },
    client: {
      name: "Омар Аль Мансури",
      company: "Tech Innovations Inc.",
      description:
        "Омар рассматривает апартаменты в JVC. Ключевые критерии — срок сдачи, условия оплаты, бюджет и возможность выбрать 2–3 подходящих объекта перед просмотром.",
      price: "23,5 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    relatedTask: {
      id: "future-terms",
      title: "Отправить условия",
      detail: "Завтра, 16:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Повторный звонок",
        subtitle:
          "Уточнили, что сроки сдачи и гибкость платежного плана важны перед записью на просмотр.",
        time: "14 марта 2026, 12:00",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Проверка времени для просмотра",
        subtitle: "Запросили удобные даты и временные окна, чтобы организовать просмотр объекта.",
        time: "12 марта 2026, 11:00",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Подборка проектов отправлена",
        subtitle:
          "Отправили короткий список строящихся апартаментов в JVC под бюджет и ожидания по срокам переезда.",
        time: "12 марта 2026, 11:00",
      },
    },
  },
  "future-terms": {
    clientId: "omar",
    summary: {
      title: "Отправить условия",
      badges: [
        { label: "Отправить документы", variant: "square-warning" },
        { label: "Завтра, 16:00", variant: "square-default" },
      ],
      paragraphs: [
        "Омар ждет короткое сообщение с условиями по подходящим объектам в JVC.",
        "Нужно собрать условия оплаты, сроки сдачи и ключевые ограничения по 2–3 объектам, которые подходят под его бюджет.",
        "После отправки зафиксируйте реакцию клиента и договоритесь о просмотре или следующем звонке.",
      ],
    },
    client: {
      name: "Омар Аль Мансури",
      company: "Tech Innovations Inc.",
      description:
        "Омар рассматривает апартаменты в JVC. Ключевые критерии — срок сдачи, условия оплаты, бюджет и возможность выбрать 2–3 подходящих объекта перед просмотром.",
      price: "23,5 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    relatedTask: {
      id: "hot-overdue",
      title: "Подтвердить время просмотра",
      detail: "Сегодня, 14:00",
    },
    activities: {
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Условия подготовлены",
        subtitle: "Черновик сообщения по объектам и условиям оплаты готов к отправке клиенту.",
        time: "15 марта 2026, 11:05",
      },
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Контекст подтвержден",
        subtitle: "Подтвердили бюджет, район и ожидания по сроку сдачи объекта.",
        time: "14 марта 2026, 12:00",
      },
    },
  },
  "hot-default": {
    clientId: "sophia",
    summary: {
      title: "Отправить коммерческое предложение",
      badges: [
        { label: "Подготовить подборку", variant: "square-warning" },
        { label: "в 14:00", variant: "square-default" },
      ],
      paragraphs: [
        "София выбирает между двухкомнатными апартаментами в Dubai Marina и Business Bay. Ей нужна короткая подборка без лишних вариантов, чтобы быстро согласовать бюджет с семьей.",
        "Собрать 3–4 объекта до AED 3,5M с понятной сравнительной таблицей: район, площадь, вид, платежный план, сервисные сборы и ожидаемая доходность.",
        "Отправить предложение в мессенджер и назначить повторный контакт на следующий день, если клиент откроет материалы, но не ответит.",
      ],
    },
    client: {
      name: "София Браун",
      company: "Future Dynamics Corp.",
      description:
        "София смотрит инвестиционные апартаменты для семьи. Важны ликвидный район, понятный платежный план и возможность быстро выйти на просмотр лучших вариантов.",
      price: "54,0 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    relatedTask: {
      id: "follow-up",
      title: "Запланировать повторный звонок",
      detail: "Сегодня, 14:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Квалификационный звонок",
        subtitle: "Подтвердили целевой бюджет, предпочтительные районы и необходимость компактного сравнения инвестиций.",
        time: "14 марта 2026, 10:30",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Критерии покупателя обновлены",
        subtitle: "Отметили Dubai Marina и Business Bay как приоритетные районы и добавили согласование с семьей как этап решения.",
        time: "13 марта 2026, 17:20",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Первые варианты обсуждены",
        subtitle: "Отправили два примера, чтобы сверить ожидания перед подготовкой финального предложения.",
        time: "13 марта 2026, 15:45",
      },
    },
  },
  "follow-up": {
    clientId: "michael",
    summary: {
      title: "Запланировать повторный звонок",
      badges: [
        { label: "Позвонить клиенту", variant: "square-warning" },
        { label: "в 14:00", variant: "square-default" },
      ],
      paragraphs: [
        "Майкл запросил варианты вилл в Arabian Ranches с приватным садом и готовностью к заселению. После первой подборки нужно уточнить, готов ли он расширить бюджет ради лучшей локации.",
        "На звонке подтвердить бюджетный диапазон, сроки переезда, обязательные требования к участку и готовность рассматривать соседние комьюнити, если подходящих вилл мало.",
        "После разговора обновить критерии поиска и поставить следующую задачу на подбор объектов или организацию просмотра.",
      ],
    },
    client: {
      name: "Майкл Смит",
      company: "Green Solutions LLC",
      description:
        "Майкл ищет виллу для переезда семьи. Главные факторы — приватность, готовность объекта, сад и спокойное комьюнити с хорошей транспортной доступностью.",
      price: "38,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    relatedTask: {
      id: "hot-overdue",
      title: "Подтвердить время просмотра",
      detail: "Сегодня, 14:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Пропущенный звонок",
        subtitle: "Пытались связаться после отправки вариантов вилл; ответа нет, сегодня нужен повторный контакт.",
        time: "14 марта 2026, 09:10",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Семейные требования зафиксированы",
        subtitle: "Добавили приватный сад, готовность к заселению и спокойное комьюнити как обязательные фильтры.",
        time: "12 марта 2026, 18:05",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Подборка вилл отправлена",
        subtitle: "Отправили три варианта в Arabian Ranches и спросили, какие объекты поставить в приоритет для просмотра.",
        time: "12 марта 2026, 14:40",
      },
    },
  },
  "future-contract": {
    clientId: "james",
    summary: {
      title: "Подготовить договор бронирования",
      badges: [
        { label: "Отправить документы", variant: "square-warning" },
        { label: "Завтра, 11:30", variant: "square-default" },
      ],
      paragraphs: [
        "Джеймс выбрал два инвестиционных объекта и хочет сравнить условия бронирования перед финальным решением.",
        "Подготовить черновик договора, график платежей и короткое сравнение обязательных платежей по каждому объекту.",
        "После отправки зафиксировать вопросы клиента и назначить следующий контакт для согласования брони.",
      ],
    },
    client: {
      name: "Джеймс Уилсон",
      company: "Creative Ventures Ltd.",
      description:
        "Джеймс рассматривает апартаменты для инвестиций. Ему важно быстро сравнить доходность, район и платежные условия перед выбором объекта.",
      price: "41,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    relatedTask: {
      id: "hot-default",
      title: "Отправить коммерческое предложение",
      detail: "Сегодня, 14:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Уточнили формат документов",
        subtitle: "Клиент попросил подготовить договор и график платежей в одном сообщении.",
        time: "14 марта 2026, 16:40",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Объекты выбраны",
        subtitle: "В финальном сравнении остались два объекта с похожим бюджетом и разными сроками оплаты.",
        time: "14 марта 2026, 15:20",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Запрос на документы",
        subtitle: "Джеймс попросил прислать условия бронирования и список платежей.",
        time: "14 марта 2026, 14:50",
      },
    },
  },
  "future-viewing": {
    clientId: "emma",
    summary: {
      title: "Согласовать просмотр апартаментов",
      badges: [
        { label: "Личная встреча", variant: "square-warning" },
        { label: "Пт, 29 мая, 16:00", variant: "square-default" },
      ],
      paragraphs: [
        "Эмма подбирает объект для релокации команды. Нужен просмотр двух апартаментов рядом с метро и понятный маршрут между объектами.",
        "Подтвердить время с клиентом и владельцами объектов, проверить доступность парковки и подготовить краткую карточку каждого варианта.",
        "После просмотра зафиксировать обратную связь и следующий шаг по выбранному объекту.",
      ],
    },
    client: {
      name: "Эмма Дэвис",
      company: "Global Synergy Group",
      description:
        "Эмма подбирает объект для релокации команды. Важны транспортная доступность, готовность объекта и быстрый просмотр.",
      price: "29,0 млн ₽",
      badge: { label: "Новый", variant: "square-default" },
    },
    relatedTask: {
      id: "future-contract",
      title: "Подготовить договор бронирования",
      detail: "Завтра, 11:30",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Время согласовано предварительно",
        subtitle: "Клиенту подходит пятница после 16:00, осталось подтвердить доступность объектов.",
        time: "14 марта 2026, 13:30",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Маршрут просмотра подготовлен",
        subtitle: "Выбрали два объекта рядом с метро, чтобы уложиться в один выезд.",
        time: "13 марта 2026, 18:15",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Критерии отправлены",
        subtitle: "Эмма уточнила требования к району, парковке и готовности объекта.",
        time: "13 марта 2026, 17:40",
      },
    },
  },
  "completed-offer": {
    clientId: "liam",
    summary: {
      title: "Отправить подборку по районам",
      badges: [
        { label: "Отправить документы", variant: "square-warning" },
        { label: "Завершено", variant: "square-default" },
      ],
      paragraphs: [
        "Лиам получил подборку районов для долгосрочной аренды и сравнение сервисных сборов по каждому варианту.",
        "В задаче зафиксированы районы с лучшим соотношением бюджета, транспортной доступности и прогнозируемой окупаемости.",
        "Следующий шаг — дождаться обратной связи клиента и при необходимости создать новую задачу на просмотр.",
      ],
    },
    client: {
      name: "Лиам Гарсия",
      company: "Pinnacle Enterprises",
      description:
        "Лиам ищет объект под долгосрочную аренду. Для него важны район, сервисные сборы и понятная окупаемость.",
      price: "33,0 млн ₽",
      badge: { label: "Лид", variant: "square-default" },
    },
    relatedTask: {
      id: "future-viewing",
      title: "Согласовать просмотр апартаментов",
      detail: "Пт, 29 мая, 16:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Результат согласован",
        subtitle: "Клиент подтвердил, что подборка закрывает первый этап сравнения районов.",
        time: "15 марта 2026, 12:10",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Критерии обновлены",
        subtitle: "Добавили сервисные сборы и прогнозируемую доходность как обязательные параметры.",
        time: "15 марта 2026, 11:30",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Подборка отправлена",
        subtitle: "Отправили сравнение районов и краткий вывод по каждому варианту.",
        time: "15 марта 2026, 11:05",
      },
    },
  },
  "completed-call": {
    clientId: "omar",
    summary: {
      title: "Уточнить условия оплаты",
      badges: [
        { label: "Связаться с клиентом", variant: "square-warning" },
        { label: "Завершено", variant: "square-default" },
      ],
      paragraphs: [
        "Омар уточнил комфортный платежный план и исключил объекты с жесткими условиями оплаты.",
        "В карточке клиента обновлены требования к первому взносу, рассрочке и срокам сдачи объекта.",
        "Следующая активная задача — подтвердить время просмотра по подходящим вариантам.",
      ],
    },
    client: {
      name: "Омар Аль Мансури",
      company: "Tech Innovations Inc.",
      description:
        "Омар рассматривает апартаменты в JVC. После уточнения условий оплаты список подходящих объектов стал уже.",
      price: "23,5 млн ₽",
      badge: { label: "Горячий", variant: "rounded-default" },
    },
    relatedTask: {
      id: "hot-overdue",
      title: "Подтвердить время просмотра",
      detail: "Сегодня, 14:00",
    },
    activities: {
      call: {
        icon: "call-24.svg",
        tone: "green",
        title: "Звонок завершен",
        subtitle: "Подтвердили условия оплаты и исключили неподходящие варианты.",
        time: "14 марта 2026, 12:35",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Требования уточнены",
        subtitle: "Обновили параметры первого взноса, рассрочки и срока сдачи.",
        time: "14 марта 2026, 12:20",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Краткое резюме отправлено",
        subtitle: "Отправили клиенту подтверждение обновленных условий поиска.",
        time: "14 марта 2026, 12:45",
      },
    },
  },
};

const taskTypeOptions = {
  call: "Связаться с клиентом",
  proposal: "Отправить документы",
  viewing: "Личная встреча",
  followup: "Другое",
};

const reminderOptions = {
  none: "Нет",
  due: "В день срока задачи",
  before: "За день до срока задачи",
};

const clientStatusOptions = {
  hot: "Горячий",
  lead: "Нецелевой",
  new: "Новый",
  ordinary: "Обычный",
};

const clientStatusLabels = Object.fromEntries(Object.entries(clientStatusOptions).map(([value, label]) => [label, value]));
clientStatusLabels["Лид"] = "lead";

const pickerMonthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const pickerMonthNamesGenitive = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const pickerWeekdayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const clientOptions = {
  omar: {
    name: "Омар Аль Мансури",
    company: "Tech Innovations Inc.",
    price: "23,5 млн ₽",
  },
  michael: {
    name: "Майкл Смит",
    company: "Green Solutions LLC",
    price: "38,0 млн ₽",
  },
  sophia: {
    name: "София Браун",
    company: "Future Dynamics Corp.",
    price: "54,0 млн ₽",
  },
  james: {
    name: "Джеймс Уилсон",
    company: "Creative Ventures Ltd.",
    price: "41,0 млн ₽",
  },
  emma: {
    name: "Эмма Дэвис",
    company: "Global Synergy Group",
    price: "29,0 млн ₽",
  },
  liam: {
    name: "Лиам Гарсия",
    company: "Pinnacle Enterprises",
    price: "33,0 млн ₽",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCreatedTasks() {
  try {
    return JSON.parse(localStorage.getItem(createdTasksStorageKey) || "[]");
  } catch {
    return [];
  }
}

function saveCreatedTasks(tasks) {
  localStorage.setItem(createdTasksStorageKey, JSON.stringify(tasks));
}

function getTaskOverrides() {
  try {
    return JSON.parse(localStorage.getItem(taskOverridesStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveTaskOverrides(overrides) {
  localStorage.setItem(taskOverridesStorageKey, JSON.stringify(overrides));
}

function getDeletedTaskIds() {
  try {
    return JSON.parse(localStorage.getItem(deletedTasksStorageKey) || "[]");
  } catch {
    return [];
  }
}

function saveDeletedTaskIds(ids) {
  localStorage.setItem(deletedTasksStorageKey, JSON.stringify(ids));
}

function getCreatedClients() {
  try {
    return JSON.parse(localStorage.getItem(createdClientsStorageKey) || "[]");
  } catch {
    return [];
  }
}

function saveCreatedClients(items) {
  localStorage.setItem(createdClientsStorageKey, JSON.stringify(items));
}

function getDeletedClientIds() {
  try {
    return JSON.parse(localStorage.getItem(deletedClientsStorageKey) || "[]");
  } catch {
    return [];
  }
}

function saveDeletedClientIds(ids) {
  localStorage.setItem(deletedClientsStorageKey, JSON.stringify(ids));
}

function getClientOverrides() {
  try {
    return JSON.parse(localStorage.getItem(clientOverridesStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveClientOverrides(overrides) {
  localStorage.setItem(clientOverridesStorageKey, JSON.stringify(overrides));
}

function getPendingClientTouches() {
  try {
    return JSON.parse(localStorage.getItem(pendingClientTouchesStorageKey) || "{}");
  } catch {
    return {};
  }
}

function savePendingClientTouches(items) {
  localStorage.setItem(pendingClientTouchesStorageKey, JSON.stringify(items));
}

function getPendingClientTouch(clientId = "") {
  return getPendingClientTouches()[clientId] || null;
}

function getClientTouches() {
  try {
    return JSON.parse(localStorage.getItem(clientTouchesStorageKey) || "{}");
  } catch {
    return {};
  }
}

function saveClientTouches(touches) {
  localStorage.setItem(clientTouchesStorageKey, JSON.stringify(touches));
}

function getSavedClientTouches(clientId = "") {
  const touches = getClientTouches()[clientId];
  return Array.isArray(touches) ? touches : [];
}

function formatCallTouchTime(date = new Date()) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()] || "";
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}

function addClientCallTouch(clientId = "", time = formatCallTouchTime()) {
  if (!clientId) {
    return;
  }

  addClientTouch(clientId, {
    icon: "call-24.svg",
    tone: "green",
    title: "Звонок",
    time,
  });
}

function addClientChatTouch(clientId = "", time = formatCallTouchTime()) {
  if (!clientId) {
    return;
  }

  addClientTouch(clientId, {
    icon: "message-square-24.svg",
    tone: "orange",
    title: "Чат в WhatsApp",
    time,
  });
}

function addClientTouch(clientId = "", touch = {}) {
  const touches = getClientTouches();
  const currentTouches = Array.isArray(touches[clientId]) ? touches[clientId] : [];

  saveClientTouches({
    ...touches,
    [clientId]: [
      {
        id: `touch-${Date.now()}`,
        icon: touch.icon || "call-24.svg",
        tone: touch.tone || "green",
        title: touch.title || "Звонок",
        subtitle: "",
        time: touch.time || formatCallTouchTime(),
      },
      ...currentTouches,
    ],
  });
}

function setPendingClientTouch(clientId = "", touch = {}) {
  if (!clientId) {
    return;
  }

  savePendingClientTouches({
    ...getPendingClientTouches(),
    [clientId]: {
      type: "call",
      title: "Звонок",
      time: formatCallTouchTime(),
      ...touch,
    },
  });
}

function clearPendingClientTouch(clientId = "") {
  if (!clientId) {
    return;
  }

  const touches = getPendingClientTouches();
  delete touches[clientId];
  savePendingClientTouches(touches);
}

function deleteClient(clientId) {
  saveCreatedClients(getCreatedClients().filter((client) => client.id !== clientId));
  saveCreatedTasks(getCreatedTasks().filter((task) => task.client !== clientId));

  const overrides = getClientOverrides();
  delete overrides[clientId];
  saveClientOverrides(overrides);

  const taskIdsToDelete = taskCardOrder
    .map((key) => taskCards[key])
    .filter((task) => {
      if (!task) {
        return false;
      }

      const override = getTaskOverrides()[task.id];
      return (override?.client || task.clientId) === clientId;
    })
    .map((task) => task.id);
  const taskOverrides = getTaskOverrides();
  taskIdsToDelete.forEach((taskId) => {
    delete taskOverrides[taskId];
  });
  saveTaskOverrides(taskOverrides);

  if (taskIdsToDelete.length) {
    saveDeletedTaskIds([...new Set([...getDeletedTaskIds(), ...taskIdsToDelete])]);
  }

  clearPendingClientTouch(clientId);

  const touches = getClientTouches();
  delete touches[clientId];
  saveClientTouches(touches);

  if (clients.some((client) => client.id === clientId)) {
    saveDeletedClientIds([...new Set([...getDeletedClientIds(), clientId])]);
  }
}

function completeTask(taskId) {
  const createdTasks = getCreatedTasks();
  const createdTask = createdTasks.find((task) => task.id === taskId);

  if (createdTask) {
    saveCreatedTasks(
      createdTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              time: "Завершено",
            }
          : task,
      ),
    );
    return;
  }

  const currentTask = getTaskEditModel(taskId);
  saveTaskOverrides({
    ...getTaskOverrides(),
    [taskId]: {
      title: currentTask.title,
      client: currentTask.client,
      type: currentTask.type,
      time: "Завершено",
      description: currentTask.description,
    },
  });
}

function deleteTask(taskId) {
  saveCreatedTasks(getCreatedTasks().filter((task) => task.id !== taskId));

  const overrides = getTaskOverrides();
  delete overrides[taskId];
  saveTaskOverrides(overrides);

  if (taskCardOrder.some((key) => taskCards[key]?.id === taskId)) {
    saveDeletedTaskIds([...new Set([...getDeletedTaskIds(), taskId])]);
  }
}

function getInitials(name = "") {
  const words = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (words[0]?.[0] || "C") + (words[1]?.[0] || "");
}

function getClientOption(clientId) {
  const options = getClientOptions();
  return options[clientId] || Object.values(options)[0] || {
    name: "Клиент удален",
    company: "",
    price: "",
  };
}

function getClientOptions() {
  return Object.fromEntries(
    getClients().map((client) => [
      client.id,
      {
        name: client.name,
        company: client.company,
        price: client.price,
      },
    ]),
  );
}

function getStaticClientForImport(client) {
  const detail = clientDetails[client.id];
  const phone = detail?.contacts?.find((contact) => contact.label === "Телефон")?.value || "";
  const email = detail?.contacts?.find((contact) => contact.label === "Почта")?.value || "";

  return {
    ...client,
    description: detail?.summary?.description || "",
    email,
    phone,
    price: detail?.summary?.price || "",
    status: clientStatusLabels[detail?.summary?.badge?.label] || "new",
    initials: getInitials(client.name),
  };
}

function importClientsFromCrm() {
  const existingClients = getCreatedClients();
  const existingIds = new Set(existingClients.map((client) => client.id));
  const importedClients = clients
    .filter((client) => !existingIds.has(client.id))
    .map(getStaticClientForImport);
  const importedIds = clients.map((client) => client.id);

  if (importedClients.length) {
    saveCreatedClients([...existingClients, ...importedClients]);
  }

  saveDeletedClientIds(getDeletedClientIds().filter((clientId) => !importedIds.includes(clientId)));
}

function getClients() {
  const overrides = getClientOverrides();
  const deletedClientIds = new Set(getDeletedClientIds());

  return getCreatedClients()
    .filter((client) => !deletedClientIds.has(client.id))
    .map((client) => {
      const override = overrides[client.id] || {};

      return {
        ...client,
        ...override,
        initials: getInitials(override.name || client.name),
      };
    });
}

function getClientById(clientId) {
  const appClient = getClients().find((client) => client.id === clientId);

  if (appClient) {
    return appClient;
  }

  if (getDeletedClientIds().includes(clientId)) {
    return getClients()[0] || null;
  }

  const staticClient = clients.find((client) => client.id === clientId);

  return staticClient ? getStaticClientForImport(staticClient) : getClients()[0] || null;
}

function getClientStatusBadge(clientId) {
  const client = getClients().find((item) => item.id === clientId);
  const status = client?.status || "ordinary";

  if (status === "ordinary" || !clientStatusOptions[status]) {
    return null;
  }

  return {
    label: clientStatusOptions[status],
    variant: `status-${status}`,
  };
}

function formatTaskClientSubtitle(client) {
  return [client.company, client.name]
    .filter((item) => String(item || "").trim())
    .map(escapeHtml)
    .join(" • ");
}

function getCreatedTaskCard(task) {
  const client = getClientOption(task.client);
  const description = task.description || "Задача создана вручную. Описание можно уточнить позже.";

  return {
    id: task.id,
    clientId: task.client,
    size: "standard",
    badge: getClientStatusBadge(task.client),
    title: escapeHtml(task.title),
    subtitle: formatTaskClientSubtitle(client),
    description: escapeHtml(description),
    price: client.price,
    status: { label: escapeHtml(task.time || "Без времени"), variant: "square-default" },
  };
}

function getStaticTaskCardById(taskId) {
  return Object.values(taskCards).find((task) => task.id === taskId);
}

function getTaskTypeByLabel(label = "") {
  const exact = Object.entries(taskTypeOptions).find(([, value]) => value === label)?.[0];
  if (exact) {
    return exact;
  }

  if (label.includes("Подготовить") || label.includes("документ") || label.includes("предлож") || label.includes("подбор")) {
    return "proposal";
  }

  if (label.includes("встреч") || label.includes("просмотр")) {
    return "viewing";
  }

  if (label.includes("звон") || label.includes("Связаться") || label.includes("контакт")) {
    return "call";
  }

  if (label.includes("Другое") || label.includes("повтор")) {
    return "followup";
  }

  return "call";
}

function getTaskTypeBadge(typeOrLabel = "call", label = "") {
  const type = taskTypeOptions[typeOrLabel] ? typeOrLabel : getTaskTypeByLabel(typeOrLabel);
  const variants = {
    call: "square-task-call",
    proposal: "square-task-proposal",
    viewing: "square-task-viewing",
    followup: "square-task-followup",
  };

  return {
    label: escapeHtml(label || taskTypeOptions[type] || typeOrLabel || taskTypeOptions.call),
    variant: variants[type] || variants.call,
  };
}

function getStaticTaskBaseEditModel(taskId = "hot-overdue") {
  const detail = taskDetails[taskId] || taskDetails["hot-overdue"];
  const card = getStaticTaskCardById(taskId) || taskCards["hot-overdue"];

  return {
    title: detail.summary.title,
    client: detail.clientId || card.clientId || "omar",
    type: getTaskTypeByLabel(detail.summary.badges?.[0]?.label),
    time: normalizeTaskTimeForEdit(detail.summary.badges?.[1]?.label || card.status?.label || "Сегодня, 14:00"),
    description: detail.summary.paragraphs.join("\n\n"),
  };
}

function isTaskOverrideMeaningful(taskId, override) {
  if (!override) {
    return false;
  }

  const base = getStaticTaskBaseEditModel(taskId);
  return ["title", "client", "type", "time", "description"].some(
    (key) => String(override[key] || "") !== String(base[key] || ""),
  );
}

function getTaskCardWithOverrides(card) {
  const override = getTaskOverrides()[card.id];
  const clientId = override?.client || card.clientId;

  if (!isTaskOverrideMeaningful(card.id, override)) {
    return {
      ...card,
      badge: getClientStatusBadge(card.clientId),
    };
  }

  const client = getClientOption(clientId);

  return {
    ...card,
    clientId,
    badge: getClientStatusBadge(clientId),
    title: escapeHtml(override.title || card.title),
    subtitle: formatTaskClientSubtitle(client),
    description: escapeHtml(override.description || card.description),
    price: client.price || card.price,
    status: { ...(card.status || {}), label: escapeHtml(override.time || card.status?.label || "Без времени") },
  };
}

function getTaskCards() {
  const deletedTaskIds = new Set(getDeletedTaskIds());

  return getCreatedTasks().map(getCreatedTaskCard).filter((task) => !deletedTaskIds.has(task.id));
}

function getTaskPeriod(card) {
  const label = String(card.status?.label || "").trim();

  if (label.startsWith("Завершено")) {
    return "completed";
  }

  if (!label || label.startsWith("Просрочено") || label.startsWith("Сегодня") || label.startsWith("в ")) {
    return "today";
  }

  return "future";
}

function getTasksPeriodFromUrl() {
  const period = new URL(window.location.href).searchParams.get("taskPeriod");
  return ["future", "completed"].includes(period) ? period : "today";
}

function getTasksSortFromUrl() {
  const sort = new URL(window.location.href).searchParams.get("tasksSort");
  return ["hot", "new"].includes(sort) ? sort : "time";
}

function getTouchFilterFromUrl() {
  const filter = new URL(window.location.href).searchParams.get("touchFilter");
  return ["call", "chat", "meeting"].includes(filter) ? filter : "all";
}

function getTaskOriginalIndex(taskId = "") {
  const staticIndex = taskCardOrder.findIndex((key) => taskCards[key]?.id === taskId);

  if (staticIndex >= 0) {
    return staticIndex;
  }

  return taskCardOrder.length + getCreatedTasks().findIndex((task) => task.id === taskId);
}

function getTaskTimeRank(card) {
  const label = String(card.status?.label || "").trim();
  const timeMatch = label.match(/(\d{1,2}):(\d{2})/);
  const minutes = timeMatch ? Number(timeMatch[1]) * 60 + Number(timeMatch[2]) : 0;
  const monthIndex = pickerMonthNamesGenitive.findIndex((month) => label.toLowerCase().includes(month));
  const dayMatch = label.match(/(\d{1,2})\s+[а-яё]+/i);

  if (label.startsWith("Просрочено")) {
    return -10000 + minutes;
  }

  if (label.startsWith("в ") || label.startsWith("Сегодня")) {
    return minutes;
  }

  if (label.startsWith("Завтра")) {
    return 1440 + minutes;
  }

  if (monthIndex >= 0 && dayMatch) {
    const due = new Date(2026, monthIndex, Number(dayMatch[1]), Math.floor(minutes / 60), minutes % 60);
    return Math.round((due.getTime() - new Date(2026, 4, 28).getTime()) / 60000);
  }

  if (label.startsWith("Завершено")) {
    return 999999;
  }

  return getTaskOriginalIndex(card.id) * 10000;
}

function getTaskHotRank(card) {
  const client = getClients().find((item) => item.id === card.clientId);
  return client?.status === "hot" || card.badge?.label === clientStatusOptions.hot ? 0 : 1;
}

function getTaskNewRank(card) {
  if (!String(card.id || "").startsWith("created-")) {
    return 1;
  }

  const timestamp = Number(String(card.id).replace("created-", ""));
  return Number.isFinite(timestamp) ? -timestamp : 0;
}

function sortTaskCards(cards, sort) {
  return [...cards].sort((a, b) => {
    if (sort === "hot") {
      return getTaskHotRank(a) - getTaskHotRank(b) || getTaskTimeRank(a) - getTaskTimeRank(b) || getTaskOriginalIndex(a.id) - getTaskOriginalIndex(b.id);
    }

    if (sort === "new") {
      return getTaskNewRank(a) - getTaskNewRank(b) || getTaskOriginalIndex(a.id) - getTaskOriginalIndex(b.id);
    }

    return getTaskTimeRank(a) - getTaskTimeRank(b) || getTaskOriginalIndex(a.id) - getTaskOriginalIndex(b.id);
  });
}

function getClientsFilterFromUrl() {
  const filter = new URL(window.location.href).searchParams.get("clientsFilter");
  return ["hot", "no-tasks"].includes(filter) ? filter : "all";
}

function getClientsSortFromUrl() {
  const sort = new URL(window.location.href).searchParams.get("clientsSort");
  return ["hot", "alphabet", "new"].includes(sort) ? sort : "hot";
}

function getClientStatusPriority(client, preferredStatus) {
  return client.status === preferredStatus ? 0 : 1;
}

function sortClients(clientsList, sort) {
  return [...clientsList].sort((a, b) => {
    if (sort === "alphabet") {
      return a.name.localeCompare(b.name, "ru");
    }

    if (sort === "new") {
      return getClientStatusPriority(a, "new") - getClientStatusPriority(b, "new") || a.name.localeCompare(b.name, "ru");
    }

    return getClientStatusPriority(a, "hot") - getClientStatusPriority(b, "hot") || a.name.localeCompare(b.name, "ru");
  });
}

function getClientFilterCounts(clientsList) {
  return {
    all: clientsList.length,
    hot: clientsList.filter((client) => client.status === "hot").length,
    "no-tasks": clientsList.filter((client) => getClientActiveTaskRows(client.id).length === 0).length,
  };
}

function getFilteredClients(clientsList, filter) {
  if (filter === "hot") {
    return clientsList.filter((client) => client.status === "hot");
  }

  if (filter === "no-tasks") {
    return clientsList.filter((client) => getClientActiveTaskRows(client.id).length === 0);
  }

  return clientsList;
}

function getClientTaskRows(clientId) {
  return getTaskCards()
    .filter((task) => task.clientId === clientId)
    .map((task) => ({
      id: task.id,
      title: task.title,
      detail: formatClientTaskRowDetail(task.status?.label),
    }));
}

function getClientActiveTaskRows(clientId) {
  return getTaskCards().filter((task) => task.clientId === clientId && getTaskPeriod(task) !== "completed");
}

function formatTaskRowDetail(detail = "") {
  return detail.replace("Просрочено с ", "").trim();
}

function formatClientTaskRowDetail(detail = "") {
  const value = String(detail || "").trim();

  if (value.startsWith("Просрочено с ")) {
    return `Сегодня, ${formatTaskRowDetail(value)}`;
  }

  if (value.startsWith("в ")) {
    return `Сегодня, ${value.replace("в ", "").trim()}`;
  }

  return value;
}

function normalizeTaskTimeForEdit(detail = "") {
  const value = String(detail || "").trim();
  return value.startsWith("Просрочено с ") ? `Сегодня, ${formatTaskRowDetail(value)}` : value;
}

function getCreatedTaskDetail(task) {
  const client = getClientOption(task.client);
  const typeLabel = taskTypeOptions[task.type] || taskTypeOptions.call;
  const description = task.description || "Описание пока не заполнено. Вернитесь к клиенту и уточните контекст задачи.";

  return {
    summary: {
      title: escapeHtml(task.title),
      badges: [
        getTaskTypeBadge(task.type, typeLabel),
        { label: escapeHtml(task.time || "Без времени"), variant: "square-default" },
      ],
      paragraphs: [
        escapeHtml(description),
        `Клиент: ${client.name}. Компания: ${client.company}. Нужно зафиксировать следующий шаг и обновить карточку после выполнения.`,
        "После выполнения отметьте задачу завершенной или создайте следующий повторный контакт.",
      ],
    },
    client: {
      name: client.name,
      company: client.company,
      description: `Новая задача создана для клиента ${client.name}. Используйте описание задачи как основной контекст для следующего контакта.`,
      price: client.price,
      badge: { label: "Новая", variant: "square-default" },
    },
    relatedTask: {
      id: "hot-overdue",
      title: "Подтвердить время просмотра",
      detail: "Сегодня, 14:00",
    },
    activities: {
      call: {
        icon: "flag-24.svg",
        tone: "green",
        title: "Задача создана",
        subtitle: "Новая задача создана из мобильного веб-прототипа.",
        time: "Сегодня",
      },
      viewing: {
        icon: "users-24.svg",
        tone: "purple",
        title: "Клиент выбран",
        subtitle: `${client.name} теперь связан с этой задачей.`,
        time: "Сегодня",
      },
      message: {
        icon: "message-square-24.svg",
        tone: "orange",
        title: "Следующий шаг подготовлен",
        subtitle: typeLabel,
        time: escapeHtml(task.time || "Время не указано"),
      },
    },
  };
}

function getStaticTaskDetail(taskId) {
  const detail = taskDetails[taskId] || taskDetails["hot-overdue"];
  const override = getTaskOverrides()[taskId];

  if (!isTaskOverrideMeaningful(taskId, override)) {
    const typeBadge = detail.summary.badges?.[0] || { label: taskTypeOptions.call };

    return {
      ...detail,
      summary: {
        ...detail.summary,
        badges: [
          getTaskTypeBadge(typeBadge.label),
          ...(detail.summary.badges || []).slice(1),
        ],
      },
    };
  }

  const client = getClientOption(override.client || detail.clientId);
  const typeLabel = taskTypeOptions[override.type] || detail.summary.badges?.[0]?.label || taskTypeOptions.call;
  const paragraphs = override.description
    ? override.description
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map(escapeHtml)
    : detail.summary.paragraphs;

  return {
    ...detail,
    clientId: override.client || detail.clientId,
    summary: {
      ...detail.summary,
      title: escapeHtml(override.title || detail.summary.title),
      badges: [
        getTaskTypeBadge(override.type || typeLabel, typeLabel),
        { label: escapeHtml(override.time || detail.summary.badges?.[1]?.label || "Без времени"), variant: "square-default" },
      ],
      paragraphs,
    },
    client: {
      name: client.name,
      company: client.company,
      description: `Задача связана с клиентом ${client.name}. Используйте описание задачи как основной контекст для следующего контакта.`,
      price: client.price,
      badge: { label: typeLabel, variant: "square-default" },
    },
  };
}

function getTaskEditModel(taskId = "hot-overdue") {
  const createdTask = getCreatedTasks().find((task) => task.id === taskId);

  if (createdTask) {
    return {
      id: createdTask.id,
      title: createdTask.title,
      client: createdTask.client || "omar",
      type: createdTask.type || "call",
      time: createdTask.time || "Сегодня, 14:00",
      description: createdTask.description || "",
      isCreated: true,
    };
  }

  const detail = getStaticTaskDetail(taskId);
  const card = getStaticTaskCardById(taskId) || taskCards["hot-overdue"];
  const storedOverride = getTaskOverrides()[taskId];
  const override = isTaskOverrideMeaningful(taskId, storedOverride) ? storedOverride : {};
  const description = detail.summary.paragraphs.join("\n\n");

  return {
    id: taskId,
    title: override.title || detail.summary.title,
    client: override.client || detail.clientId || card.clientId || "omar",
    type: override.type || getTaskTypeByLabel(detail.summary.badges?.[0]?.label),
    time: override.time || normalizeTaskTimeForEdit(detail.summary.badges?.[1]?.label || card.status?.label || "Сегодня, 14:00"),
    description: override.description || description,
    isCreated: false,
  };
}

function renderIconButton({ style = "primary", label = "Добавить", icon = "plus", className = "", href = "", historyBack = false } = {}) {
  return renderButton({
    content: "icon",
    style,
    label,
    icon,
    href,
    className: `cg-icon-button cg-icon-button--${style}${className ? ` ${className}` : ""}`,
    historyBack,
  });
}

function renderButton({ content = "icon", style = "primary", label = "Label", icon = "plus", className = "", href = "", disabled = false, buttonType = "button", historyBack = false } = {}) {
  const tag = href && !disabled ? "a" : "button";
  const hrefAttr = tag === "a" ? ` href="${href}"` : "";
  const historyBackAttr = historyBack && !disabled ? ` data-history-back data-history-fallback="${escapeHtml(href || "")}"` : "";
  const typeAttr = tag === "button" ? ` type="${escapeHtml(buttonType)}"` : "";
  const disabledAttr = tag === "button" && disabled ? " disabled" : "";
  const ariaLabel = content === "icon" ? ` aria-label="${escapeHtml(label)}"` : "";
  const iconMarkup =
    icon === "plus"
      ? '<span class="cg-button-symbol" aria-hidden="true"></span>'
      : icon === "menu"
        ? '<span class="cg-button-menu" aria-hidden="true"></span>'
        : `<img class="cg-button-img" src="./assets/icons/${icon}" alt="" aria-hidden="true" />`;
  const contentMarkup =
    content === "icon"
      ? iconMarkup
      : `<span class="cg-button-label">${escapeHtml(label)}</span>`;

  return `
    <${tag} class="cg-button cg-button--${content} cg-button--${style}${disabled ? " is-disabled" : ""}${className ? ` ${className}` : ""}"${ariaLabel}${hrefAttr}${historyBackAttr}${typeAttr}${disabledAttr}>
      <span class="cg-button-bg" aria-hidden="true"></span>
      ${contentMarkup}
    </${tag}>
  `;
}

function renderAppHeader({ title, leftIcon, rightIcon, leftLabel = "Назад", rightLabel = "Редактировать", leftHref = "", rightHref = "", rightHidden = false }) {
  const leftIsBack = leftIcon === "left-24.svg";

  return `
    <header class="cg-app-header">
      ${renderIconButton({ style: "secondary", icon: leftIcon, label: leftLabel, href: leftHref, historyBack: leftIsBack, className: "cg-app-header-button" })}
      <h1 class="cg-app-header-title">${title}</h1>
      ${renderIconButton({ style: "secondary", icon: rightIcon, label: rightLabel, href: rightHref, className: `cg-app-header-button${rightHidden ? " cg-app-header-button--hidden" : ""}` })}
    </header>
  `;
}

function renderLiquidTextButton({ style = "default", label = "Label", className = "", href = "" } = {}) {
  const buttonStyle = style === "tinted" || style === "primary" ? "primary" : "secondary";

  return renderButton({
    content: "text",
    style: buttonStyle,
    label,
    href,
    className: `cg-text-button cg-text-button--${style}${className ? ` ${className}` : ""}`,
  });
}

function renderStatusBar() {
  return `
    <div class="cg-status-bar" aria-label="Status bar">
      <div class="cg-status-time">9:41</div>
      <div class="cg-status-island" aria-hidden="true"></div>
      <div class="cg-status-levels" aria-hidden="true">
        <span class="cg-status-cellular"><span></span><span></span><span></span></span>
        <span class="cg-status-wifi"></span>
        <span class="cg-status-battery"></span>
      </div>
    </div>
  `;
}

function renderBadge({ variant = "square-default", label = "в 14:00", className = "" } = {}) {
  return `<span class="cg-badge cg-badge--${variant}${className ? ` ${className}` : ""}">${label}</span>`;
}

function renderSectionTitle(label, id = "") {
  return `<h2 class="cg-section-title"${id ? ` id="${id}"` : ""}>${label}</h2>`;
}

function renderTaskCard(card, { href = "" } = {}) {
  const tag = href ? "a" : "article";
  const hrefAttr = href ? ` href="${href}"` : "";
  return `
    <${tag} class="cg-task-card cg-task-card--${card.size || "standard"}${href ? " cg-task-card--link" : ""}"${hrefAttr}>
      ${card.badge ? renderBadge({ ...card.badge, className: "cg-task-card-badge" }) : ""}
      <div class="cg-task-card-heading">
        <h3 class="cg-task-card-title">${card.title}</h3>
        <div class="cg-task-card-subtitle">${card.subtitle}</div>
      </div>
      <p class="cg-task-card-description">${card.description}</p>
      <div class="cg-task-card-footer">
        ${card.price ? `<span class="cg-task-card-price">${card.price}</span>` : "<span></span>"}
        ${card.status ? renderBadge({ ...card.status }) : ""}
      </div>
    </${tag}>
  `;
}

function renderTaskSummaryCard(summary) {
  return `
    <article class="cg-task-summary-card">
      <h2 class="cg-task-summary-title">${summary.title}</h2>
      <div class="cg-task-summary-badges">
        ${summary.badges.map((badge) => renderBadge(badge)).join("")}
      </div>
      <div class="cg-task-summary-body">
        ${summary.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    </article>
  `;
}

function renderActionTile(action) {
  const isDisabled = Boolean(action.disabled);
  const tag = action.href && !isDisabled ? "a" : "button";
  const actionAttr = action.action && !isDisabled ? ` data-action="${escapeHtml(action.action)}"` : "";
  const popupAttr = action.popup && !isDisabled ? ' aria-haspopup="menu" aria-expanded="false"' : "";
  const disabledAttr = tag === "button" && isDisabled ? " disabled aria-disabled=\"true\"" : "";
  const attrs = tag === "a" ? ` href="${action.href}"${actionAttr}${popupAttr}` : ` type="button"${actionAttr}${popupAttr}${disabledAttr}`;

  return `
    <${tag} class="cg-action-tile cg-action-tile--${action.tone}${isDisabled ? " is-disabled" : ""}"${attrs}>
      <span class="cg-action-tile-icon" style="--action-icon: url('../assets/icons/${action.icon}')" aria-hidden="true"></span>
      <span class="cg-action-tile-label">${action.label}</span>
    </${tag}>
  `;
}

function getClientHasPhone(clientId = "") {
  const phone = getClientById(clientId)?.phone || "";
  return Boolean(String(phone).replace(/\D/g, ""));
}

function getPhoneActionState(action, hasPhone) {
  return hasPhone
    ? action
    : {
        ...action,
        disabled: true,
        tone: "secondary",
      };
}

function renderClientCard(client, { summaryOnly = false } = {}) {
  return `
    <article class="cg-client-card${summaryOnly ? " cg-client-card--summary" : ""}">
      ${
        summaryOnly
          ? ""
          : `
            <div class="cg-client-heading">
              <h3 class="cg-client-name">${client.name}</h3>
              <div class="cg-client-company">${client.company}</div>
            </div>
          `
      }
      <p class="cg-client-description">${client.description}</p>
      <div class="cg-client-footer">
        <span class="cg-client-price">${client.price}</span>
        ${client.badge ? renderBadge(client.badge) : ""}
      </div>
    </article>
  `;
}

function renderClientProfile(client) {
  return `
    <section class="cg-client-profile" aria-label="${client.name}">
      <div class="cg-client-profile-toolbar">
        ${renderIconButton({ style: "secondary", icon: "left-24.svg", label: "Назад к клиентам", href: "#/clients", historyBack: true })}
        ${renderIconButton({ style: "secondary", icon: "edit-24.svg", label: "Редактировать клиента", href: `#/edit-client/${client.id}` })}
      </div>
      <div class="cg-client-profile-copy">
        <h1 class="cg-client-profile-name">${client.name}</h1>
        <p class="cg-client-profile-company">${client.company}</p>
      </div>
    </section>
  `;
}

function renderActivityItem(activity) {
  return `
    <article class="cg-activity-item">
      <span class="cg-activity-icon-wrap cg-activity-icon-wrap--${activity.tone}" aria-hidden="true">
        <span class="cg-activity-icon" style="--activity-icon: url('../assets/icons/${activity.icon}')"></span>
      </span>
      <div class="cg-activity-content">
        <h3 class="cg-activity-title">${activity.title}</h3>
        <p class="cg-activity-subtitle">${activity.subtitle}</p>
        <time class="cg-activity-time">${activity.time}</time>
      </div>
    </article>
  `;
}

function renderActivityFeed(activities, { showMore = false } = {}) {
  const items = Array.isArray(activities) ? activities : Object.values(activities);
  return `
    <div class="cg-activity-feed">
      ${items.map((activity) => renderActivityItem(activity)).join("")}
      ${showMore ? '<button class="cg-activity-more" type="button">Смотреть все</button>' : ""}
    </div>
  `;
}

function formatActivityTime(time = "") {
  return String(time).replace(", ", " в ");
}

function getClientTouchTitle(activity) {
  if (activity.title) {
    return activity.title;
  }

  if (activity.icon?.includes("message")) {
    return "Чат в WhatsApp";
  }

  if (activity.icon?.includes("users")) {
    return "Встреча";
  }

  return "Звонок";
}

function getClientTouchType(activity) {
  const title = getClientTouchTitle(activity).toLowerCase();

  if (title.includes("чат") || activity.icon?.includes("message")) {
    return "chat";
  }

  if (title.includes("встреч") || activity.icon?.includes("users")) {
    return "meeting";
  }

  return "call";
}

function getClientTouchVisual(activity) {
  const type = getClientTouchType(activity);

  if (type === "chat") {
    return { icon: "message-square-24.svg", tone: "orange" };
  }

  if (type === "meeting") {
    return { icon: "users-24.svg", tone: "blue" };
  }

  return { icon: "call-24.svg", tone: "green" };
}

function getClientAllTouches(clientId = "omar") {
  const detail = getClientDetail(clientId);
  const touches = Array.isArray(detail.activities) ? detail.activities : Object.values(detail.activities || {});

  if (clientId !== "omar") {
    return touches;
  }

  return [
    touches[0],
    touches[1],
    touches[2],
    touches[3],
    {
      icon: "call-24.svg",
      tone: "green",
      title: "Звонок",
      subtitle: "",
      time: "11 марта 2026, 11:00",
    },
    {
      icon: "call-24.svg",
      tone: "green",
      title: "Звонок",
      subtitle: "",
      time: "11 марта 2026, 11:00",
    },
    {
      icon: "call-24.svg",
      tone: "green",
      title: "Звонок",
      subtitle: "",
      time: "11 марта 2026, 11:00",
    },
    touches[4],
  ];
}

function getFilteredTouches(touches, filter) {
  if (filter === "all") {
    return touches;
  }

  return touches.filter((touch) => getClientTouchType(touch) === filter);
}

function renderTouchList(touches) {
  if (!touches.length) {
    return `
      <div class="cg-row-card">
        ${renderRow({ active: false, title: "Касаний нет", trailing: "none", className: "cg-row--full cg-row--empty" })}
      </div>
    `;
  }

  return `
    <div class="cg-row-card">
      ${touches
        .map((activity) => {
          const visual = getClientTouchVisual(activity);

          return renderRow({
            active: true,
            height: "tall",
            imageIcon: visual.icon,
            imageTone: visual.tone,
            showImage: true,
            title: getClientTouchTitle(activity),
            subtitle: formatActivityTime(activity.time),
            trailing: "chevron",
            className: "cg-row--full",
          });
        })
        .join("")}
    </div>
  `;
}

function renderClientTouchRows(activities, { showMore = true, clientId = "omar", back = `client:${clientId}` } = {}) {
  const items = (Array.isArray(activities) ? activities : Object.values(activities)).slice(0, 5);
  const moreHref = `#/touches/${clientId}?back=${encodeURIComponent(back)}`;

  return `
    ${renderTouchList(items)}
    ${showMore ? `<a class="cg-grouped-table-footer" href="${moreHref}">Все касания</a>` : ""}
  `;
}

function renderListItem(item, { photo = false, href = "" } = {}) {
  const tag = href ? "a" : "div";
  const hrefAttr = href ? ` href="${href}"` : "";
  const avatar = photo && item.photo
    ? `
      <span class="cg-avatar cg-avatar--photo">
        <img src="${item.photo}" alt="" />
      </span>
    `
    : `<span class="cg-avatar">${item.initials || getInitials(item.name)}</span>`;
  const trailing = item.badge
    ? `<span class="cg-badge">${item.badge}</span>`
    : `<span class="cg-row-chevron" aria-hidden="true"></span>`;

  return `
    <${tag} class="cg-list-item${photo ? " cg-list-item--photo" : ""}${href ? " cg-list-item--link" : ""}"${hrefAttr}>
      ${avatar}
      <div class="cg-list-content">
        <div class="cg-list-title">${item.name}</div>
        <div class="cg-list-subtitle">${item.company}</div>
      </div>
      ${trailing}
    </${tag}>
  `;
}

function renderContentButton({ style = "prominent", label = "Play", icon = false, destructive = false, disabled = false, className = "" }) {
  return `
    <button class="cg-content-button cg-content-button--${style}${destructive ? " is-destructive" : ""}${className ? ` ${className}` : ""}"${disabled ? " disabled" : ""}>
      ${icon ? '<span class="cg-content-button-icon" aria-hidden="true"></span>' : ""}
      <span class="cg-content-button-label">${label}</span>
    </button>
  `;
}

function renderAlert(variant) {
  const isSideBySide = variant === "side-by-side";
  const actions = isSideBySide
    ? `
      ${renderContentButton({ style: "secondary", label: "Secondary", className: "cg-alert-action" })}
      ${renderLiquidTextButton({ style: "tinted", label: "Primary", className: "cg-alert-action" })}
    `
    : `
      ${renderContentButton({ style: "prominent", label: "Primary", icon: true, className: "cg-alert-action cg-content-button--full" })}
      ${renderContentButton({ style: "bordered", label: "Destructive", icon: true, destructive: true, className: "cg-alert-action cg-content-button--full" })}
      ${renderContentButton({ style: "secondary", label: "Secondary", icon: true, className: "cg-alert-action cg-content-button--full" })}
    `;

  return `
    <section class="cg-alert cg-alert--${variant}" role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-description">
      <span class="cg-alert-blur" aria-hidden="true"></span>
      <span class="cg-alert-bg" aria-hidden="true"></span>
      <span class="cg-alert-glass-effect" aria-hidden="true"></span>
      <div class="cg-alert-copy">
        <h2 class="cg-alert-title" id="alert-title">A Short Title Is Best</h2>
        <p class="cg-alert-description" id="alert-description">A description should be a short, complete sentence.</p>
      </div>
      <div class="cg-alert-actions">
        ${actions}
      </div>
    </section>
  `;
}

function renderDeleteClientAlert(client) {
  return `
    <div class="cg-alert-modal" data-client-delete-modal hidden>
      <section class="cg-alert cg-alert--side-by-side" role="alertdialog" aria-modal="true" aria-labelledby="client-delete-title" aria-describedby="client-delete-description">
        <span class="cg-alert-blur" aria-hidden="true"></span>
        <span class="cg-alert-bg" aria-hidden="true"></span>
        <span class="cg-alert-glass-effect" aria-hidden="true"></span>
        <div class="cg-alert-copy">
          <h2 class="cg-alert-title" id="client-delete-title">Удалить клиента?</h2>
          <p class="cg-alert-description" id="client-delete-description">${escapeHtml(client.name)} и все связанные задачи будут удалены.</p>
        </div>
        <div class="cg-alert-actions">
          <button class="cg-content-button cg-content-button--secondary cg-alert-action" type="button" data-client-delete-cancel>
            <span class="cg-content-button-label">Отмена</span>
          </button>
          <button class="cg-content-button cg-content-button--bordered is-destructive cg-alert-action" type="button" data-client-delete-confirm>
            <span class="cg-content-button-label">Удалить</span>
          </button>
        </div>
      </section>
    </div>
  `;
}

function renderTaskActionAlerts(taskTitle) {
  const title = escapeHtml(taskTitle || "Задача");

  return `
    <div class="cg-alert-modal" data-task-complete-modal hidden>
      <section class="cg-alert cg-alert--side-by-side" role="alertdialog" aria-modal="true" aria-labelledby="task-complete-title" aria-describedby="task-complete-description">
        <span class="cg-alert-blur" aria-hidden="true"></span>
        <span class="cg-alert-bg" aria-hidden="true"></span>
        <span class="cg-alert-glass-effect" aria-hidden="true"></span>
        <div class="cg-alert-copy">
          <h2 class="cg-alert-title" id="task-complete-title">Завершить задачу?</h2>
          <p class="cg-alert-description" id="task-complete-description">Задача «${title}» будет перенесена в готовые.</p>
        </div>
        <div class="cg-alert-actions">
          <button class="cg-content-button cg-content-button--secondary cg-alert-action" type="button" data-task-complete-cancel>
            <span class="cg-content-button-label">Отмена</span>
          </button>
          <button class="cg-content-button cg-content-button--bordered cg-alert-action" type="button" data-task-complete-confirm>
            <span class="cg-content-button-label">Завершить</span>
          </button>
        </div>
      </section>
    </div>
    <div class="cg-alert-modal" data-task-delete-modal hidden>
      <section class="cg-alert cg-alert--side-by-side" role="alertdialog" aria-modal="true" aria-labelledby="task-delete-title" aria-describedby="task-delete-description">
        <span class="cg-alert-blur" aria-hidden="true"></span>
        <span class="cg-alert-bg" aria-hidden="true"></span>
        <span class="cg-alert-glass-effect" aria-hidden="true"></span>
        <div class="cg-alert-copy">
          <h2 class="cg-alert-title" id="task-delete-title">Удалить задачу?</h2>
          <p class="cg-alert-description" id="task-delete-description">Задача «${title}» будет удалена из списка задач.</p>
        </div>
        <div class="cg-alert-actions">
          <button class="cg-content-button cg-content-button--secondary cg-alert-action" type="button" data-task-delete-cancel>
            <span class="cg-content-button-label">Отмена</span>
          </button>
          <button class="cg-content-button cg-content-button--bordered is-destructive cg-alert-action" type="button" data-task-delete-confirm>
            <span class="cg-content-button-label">Удалить</span>
          </button>
        </div>
      </section>
    </div>
  `;
}

function renderCallProgressModal({ resultHref = "#/call-results", title = "Происходит звонок" } = {}) {
  return `
    <div class="cg-call-progress-modal" data-call-progress-modal hidden>
      <section class="cg-call-progress" role="dialog" aria-modal="true" aria-labelledby="call-progress-title">
        <div class="cg-call-progress-loader" aria-hidden="true"></div>
        <h2 class="cg-call-progress-title" id="call-progress-title">${escapeHtml(title)}</h2>
        <div class="cg-call-progress-actions">
          <button class="cg-content-button cg-content-button--brand cg-call-progress-action" type="button" data-call-finish data-call-result-href="${escapeHtml(resultHref)}">
            <span class="cg-content-button-label">Звонок окончен</span>
          </button>
          <button class="cg-content-button cg-content-button--secondary cg-call-progress-action" type="button" data-call-cancel>
            <span class="cg-content-button-label">Отменить</span>
          </button>
        </div>
      </section>
    </div>
    <div class="cg-call-progress-modal" data-chat-progress-modal hidden>
      <section class="cg-call-progress" role="dialog" aria-modal="true" aria-labelledby="chat-progress-title">
        <div class="cg-call-progress-loader" aria-hidden="true"></div>
        <h2 class="cg-call-progress-title" id="chat-progress-title">Общение в чате</h2>
        <div class="cg-call-progress-actions">
          <button class="cg-content-button cg-content-button--brand cg-call-progress-action" type="button" data-chat-finish data-call-result-href="${escapeHtml(resultHref)}">
            <span class="cg-content-button-label">Чат окончен</span>
          </button>
          <button class="cg-content-button cg-content-button--secondary cg-call-progress-action" type="button" data-chat-cancel>
            <span class="cg-content-button-label">Отменить</span>
          </button>
        </div>
      </section>
    </div>
    ${renderCallAnalysisSheet({ resultHref })}
  `;
}

function renderCallAnalysisSheet({ resultHref = "#/call-results" } = {}) {
  const clientId = getClientIdFromCallResultHref(resultHref);
  const pendingTouch = getPendingClientTouch(clientId);
  const touchTime = pendingTouch?.time || formatCallTouchTime();
  const isChatTouch = pendingTouch?.type === "chat";
  const touchTitle = pendingTouch?.title || (isChatTouch ? "Чат в WhatsApp" : "Звонок");
  const touchIcon = isChatTouch ? "message-square-24.svg" : "call-24.svg";
  const touchTone = isChatTouch ? "orange" : "green";

  return `
    <div class="cg-call-analysis-modal" data-call-analysis-modal hidden>
      <div class="cg-call-analysis-scrim" data-call-analysis-close></div>
      <section class="cg-call-analysis-sheet" role="dialog" aria-modal="true" aria-labelledby="call-analysis-title">
        <div class="cg-select-sheet-toolbar">
          <div class="cg-select-sheet-grabber" aria-hidden="true"><span></span></div>
          <div class="cg-select-sheet-heading">
            <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
            <h2 class="cg-select-sheet-title" id="call-analysis-title">Новое касание</h2>
            <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
          </div>
        </div>
        <div class="cg-call-analysis-content">
          <p class="cg-call-analysis-description">Отправьте разговор на анализ. AI соберет сводку, предложит обновить данные о&nbsp;клиенте и связанные с ним задачи.</p>
          <article class="cg-call-analysis-card">
            <span class="cg-call-analysis-icon cg-call-analysis-icon--${touchTone}" style="--call-analysis-icon: url('../assets/icons/${touchIcon}')" aria-hidden="true"></span>
            <div class="cg-call-analysis-copy">
              <h3 class="cg-call-analysis-name">${escapeHtml(touchTitle)}</h3>
              <p class="cg-call-analysis-time" data-call-analysis-time>${escapeHtml(touchTime)}</p>
            </div>
          </article>
          ${renderButton({ content: "text", style: "primary", label: "Проанализировать", className: "cg-text-button cg-text-button--tinted cg-call-analysis-submit", buttonType: "button" }).replace("<button", `<button data-call-analysis-start data-call-result-href="${escapeHtml(resultHref)}"`)}
        </div>
      </section>
      <div class="cg-analysis-progress-modal" data-analysis-progress-modal hidden>
        <section class="cg-analysis-progress" role="dialog" aria-modal="true" aria-live="polite" aria-label="Идет анализ">
          <div class="cg-call-progress-loader" aria-hidden="true"></div>
          <h2 class="cg-call-progress-title">Идет анализ</h2>
        </section>
      </div>
    </div>
  `;
}

function getClientIdFromCallResultHref(href = "") {
  const hash = String(href || "").replace(/^#/, "");
  const queryStart = hash.indexOf("?");

  if (queryStart < 0) {
    return "";
  }

  return new URLSearchParams(hash.slice(queryStart + 1)).get("client") || "";
}

function renderRow({
  active = true,
  height = "regular",
  trailing = "default",
  title = "Title",
  subtitle = "Subtitle",
  detail = "Detail",
  badgeLabel = "в 14:00",
  badgeVariant = "rounded-brand",
  image = clients[0]?.photo,
  imageIcon = "",
  imageShape = "circular",
  imageTone = "",
  showImage = false,
  className = "",
} = {}) {
  const isRegular = height === "regular";
  const titleMarkup = `<span class="cg-row-title">${title}</span>`;
  const subtitleMarkup = subtitle ? `<span class="cg-row-subtitle">${subtitle}</span>` : "";
  const copy = isRegular || !subtitle ? titleMarkup : height === "tall" ? `${titleMarkup}${subtitleMarkup}` : `${subtitleMarkup}${titleMarkup}`;

  return `
    <div class="cg-row cg-row--${height}${className ? ` ${className}` : ""}">
      ${showImage ? renderRowImage(image, title, { icon: imageIcon, shape: imageShape, tone: imageTone }) : ""}
      <div class="cg-row-main">
        <div class="cg-row-separator" aria-hidden="true"></div>
        <div class="cg-row-content">
          <div class="cg-row-copy">
            ${copy}
          </div>
          ${renderRowTrailing(trailing, detail, badgeLabel, { active, badgeVariant })}
        </div>
      </div>
    </div>
  `;
}

function renderRowImage(src = "", alt = "", { icon = "", shape = "circular", tone = "" } = {}) {
  const shapeClass = shape === "rounded" ? " cg-row-image--rounded" : "";

  if (tone) {
    const iconStyle = icon ? ` style="--row-image-icon: url('../assets/icons/${icon}')"` : "";
    const iconClass = icon ? " cg-row-image--with-icon" : "";
    return `<div class="cg-row-image-slot"><span class="cg-row-image cg-row-image--tone cg-row-image--${tone}${shapeClass}${iconClass}"${iconStyle} aria-hidden="true"></span></div>`;
  }

  const imageMarkup = src
    ? `<img class="cg-row-image" src="${src}" alt="" aria-hidden="true" />`
    : `<span class="cg-row-image cg-row-image--placeholder" aria-hidden="true">${getInitials(alt)}</span>`;
  return `<div class="cg-row-image-slot">${imageMarkup}</div>`;
}

function renderRowTrailing(type = "default", detail = "Detail", badgeLabel = "в 14:00", { active = true, badgeVariant = "rounded-brand" } = {}) {
  const chevron = active ? '<span class="cg-row-chevron" aria-hidden="true"></span>' : "";

  if (type === "none") {
    return "";
  }

  if (type === "badge") {
    return `
      <div class="cg-row-trailing">
        ${renderBadge({ variant: badgeVariant, label: badgeLabel })}
        ${chevron}
      </div>
    `;
  }

  if (type === "check" || type === "check-detail-badge") {
    return `
      <div class="cg-row-trailing">
        <span class="cg-row-check" aria-hidden="true"></span>
      </div>
    `;
  }

  if (type === "switch") {
    return `
      <div class="cg-row-trailing">
        <span class="cg-switch" aria-hidden="true"></span>
      </div>
    `;
  }

  if (type === "action") {
    return `
      <div class="cg-row-trailing cg-row-trailing--action">
        <span class="cg-row-action-text">${detail}</span>
        ${chevron}
      </div>
    `;
  }

  if (type === "chevron") {
    return `
      <div class="cg-row-trailing">
        ${chevron}
      </div>
    `;
  }

  if (type === "button") {
    return `
      <button class="cg-row-trailing-button" type="button">
        Button
      </button>
    `;
  }

  if (type === "date") {
    return `
      <div class="cg-row-trailing">
        <div class="cg-row-date" aria-label="June 2024">
          <span>June</span>
          <span>2024</span>
        </div>
        ${chevron}
      </div>
    `;
  }

  return `
    <div class="cg-row-trailing">
      <span class="cg-row-detail">${detail}</span>
      ${chevron}
    </div>
  `;
}

function renderRowButton(value = "default") {
  return `
    <div class="cg-row-button cg-row-button--${value}">
      <div class="cg-row-separator" aria-hidden="true"></div>
      <button class="cg-row-button-action" type="button"${value === "disabled" ? " disabled" : ""}>
        Action
      </button>
    </div>
  `;
}

function renderTab(id, icon, label, active) {
  const isActive = id === active;
  const iconSrc = `../assets/icons/${icon}`;
  const href = id === "clients" ? "#/clients" : id === "tasks" ? "#/tasks" : "#/settings";
  return `
    <a class="cg-tab${isActive ? " is-active" : ""}" href="${href}" aria-current="${isActive ? "page" : "false"}">
      <span class="cg-tab-selection" aria-hidden="true"></span>
      <span class="cg-tab-icon" style="--icon-url: url('${iconSrc}')" aria-hidden="true"></span>
      <span class="cg-tab-label">${label}</span>
    </a>
  `;
}

function renderTabBar(active = "clients") {
  return `
    <div class="cg-tab-bar-shell">
      <nav class="cg-tab-bar" aria-label="Primary">
        <span class="cg-tab-bar-blur" aria-hidden="true"></span>
        <span class="cg-tab-bar-bg" aria-hidden="true"></span>
        ${renderTab("clients", "users-24.svg", "Клиенты", active)}
        ${renderTab("tasks", "document-24.svg", "Задачи", active)}
        ${renderTab("settings", "settings-24.svg", "Настройки", active)}
      </nav>
      <button class="cg-tab-search" aria-label="Search">
        <span class="cg-tab-search-blur" aria-hidden="true"></span>
        <span class="cg-tab-search-bg" aria-hidden="true"></span>
        <span class="cg-tab-icon" style="--icon-url: url('../assets/icons/search-24.svg')" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

function renderGlassMenu(items = ["Связаться с клиентом", "Отправить документы", "Личная встреча", "Другое"], { className = "", selected = "" } = {}) {
  return `
    <div class="cg-glass-menu${className ? ` ${className}` : ""}" role="menu" aria-label="Меню">
      <span class="cg-glass-menu-blur" aria-hidden="true"></span>
      <span class="cg-glass-menu-dodge" aria-hidden="true"></span>
      <span class="cg-glass-menu-fill" aria-hidden="true"></span>
      <span class="cg-glass-menu-effect" aria-hidden="true"></span>
      <div class="cg-glass-menu-items">
        ${items
          .map((item) => {
            const value = typeof item === "string" ? item : item.value;
            const label = typeof item === "string" ? item : item.label;
            const isSelected = value === selected;

            return `
              <button class="cg-glass-menu-item${isSelected ? " is-selected" : ""}" type="button" role="menuitemradio" aria-checked="${isSelected}" data-menu-value="${escapeHtml(value)}" data-menu-label="${escapeHtml(label)}">
                <span class="cg-glass-menu-label">${escapeHtml(label)}</span>
                <span class="cg-glass-menu-check" aria-hidden="true"></span>
              </button>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderClientAddMenu(className = "cg-clients-add-menu") {
  return renderGlassMenu(
    [
      { value: "manual", label: "Добавить вручную" },
      { value: "crm", label: "Добавить из CRM" },
    ],
    { className },
  );
}

function renderCrmImportProgressModal() {
  return `
    <div class="cg-call-progress-modal" data-crm-import-modal hidden>
      <section class="cg-call-progress" role="dialog" aria-modal="true" aria-live="polite" aria-label="Импорт из CRM">
        <div class="cg-call-progress-loader" aria-hidden="true"></div>
        <h2 class="cg-call-progress-title">Импорт из CRM</h2>
      </section>
    </div>
  `;
}

function renderSegmentedControl(count, selected, showBadges, labels = ["Label", "Label", "Label", "Label", "Label"], badges = ["8", "24"], items = [], { scroll = false } = {}) {
  return `
    <div class="cg-segmented-control${scroll ? " cg-segmented-control--scroll" : ""}" role="tablist" aria-label="Segmented control">
      ${labels
        .slice(0, count)
        .map((label, index) => {
          const number = index + 1;
          const isSelected = number === selected;
          const item = items[index] || {};
          const tag = item.href ? "a" : "button";
          const hrefAttr = item.href ? ` href="${item.href}"` : "";
          const typeAttr = item.href ? "" : ' type="button"';
          const dataAttr = item.value ? ` data-segment-value="${escapeHtml(item.value)}"` : "";
          const scopeAttr = item.scope ? ` data-segment-scope="${escapeHtml(item.scope)}"` : "";
          const badge =
            showBadges && badges[index]
              ? `<span class="cg-segment-badge${isSelected ? " cg-segment-badge--primary" : ""}">${badges[index]}</span>`
              : "";
          return `
            <${tag} class="cg-segment${isSelected ? " is-active" : ""}" role="tab" aria-selected="${isSelected}"${hrefAttr}${typeAttr}${dataAttr}${scopeAttr}>
              <span class="cg-segment-label">${label}</span>
              ${badge}
            </${tag}>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderLiveTextfield({ label = true, height = "fixed", clear = true, labelWidth = "100", value = "", labelText = "Label", placeholder = "Value", name = "", grouped = false, separator = false } = {}) {
  const isGrow = height === "grow";
  const inputId = `storybook-textfield-${label ? "label" : "plain"}-${height}-${clear ? "clear" : "no-clear"}-${labelWidth}-${name || "field"}`;
  const labelMarkup = label ? `<span class="cg-live-textfield-label" id="${inputId}-label">${escapeHtml(labelText)}</span>` : "";
  const labelAttr = label ? ` aria-labelledby="${inputId}-label"` : ' aria-label="Textfield"';
  const nameAttr = name ? ` name="${escapeHtml(name)}"` : "";
  const clearMarkup = clear
    ? `<button class="cg-live-textfield-clear" type="button" aria-label="Очистить" data-textfield-clear></button>`
    : "";
  const fieldMarkup = isGrow
    ? `
        <textarea class="cg-live-textfield-hidden" rows="1"${nameAttr} hidden>${escapeHtml(value)}</textarea>
        <div class="cg-live-textfield-input cg-live-textfield-editor" contenteditable="true" role="textbox" data-textfield-editor data-placeholder="${escapeHtml(placeholder)}"${labelAttr}>${renderTextfieldParagraphs(value)}</div>
      `
    : `<input class="cg-live-textfield-input" type="text" placeholder="${escapeHtml(placeholder)}"${nameAttr} value="${escapeHtml(value)}"${labelAttr} />`;

  return `
    <label class="cg-live-textfield cg-live-textfield--${isGrow ? "grow" : "fixed"}${grouped ? " cg-live-textfield--grouped" : ""}${separator ? " cg-live-textfield--separator" : ""}${label ? "" : " cg-live-textfield--no-label"}${value ? "" : " is-empty"}" style="--textfield-label-width: ${Number(labelWidth) || 100}px">
      ${separator ? '<span class="cg-live-textfield-separator" aria-hidden="true"></span>' : ""}
      ${labelMarkup}
      <span class="cg-live-textfield-control">
        ${fieldMarkup}
        ${clearMarkup}
      </span>
    </label>
  `;
}

function renderTextfieldParagraphs(value = "") {
  const paragraphs = String(value || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return "";
  }

  return paragraphs
    .map((paragraph) => `<p>${paragraph.split(/\n/).map((line) => escapeHtml(line)).join("<br>")}</p>`)
    .join("");
}

function renderFormTextField({ name, placeholder, multiline = false, value = "" } = {}) {
  const control = multiline
    ? `<textarea class="cg-form-input cg-form-input--multiline" name="${name}" rows="1" placeholder="${placeholder}">${escapeHtml(value)}</textarea>`
    : `<input class="cg-form-input" name="${name}" type="text" placeholder="${placeholder}" value="${escapeHtml(value)}" />`;

  return `
    <label class="cg-form-field">
      ${control}
    </label>
  `;
}

function renderFormInputControl({ name, placeholder, value = "", type = "text" } = {}) {
  return `<input class="cg-form-input cg-form-input--row" name="${name}" type="${type}" placeholder="${placeholder}" value="${escapeHtml(value)}" />`;
}

function renderFormSelect({ name, options, placeholder, selected = "" }) {
  const entries = Object.entries(options).map(([value, option]) => ({
    value,
    label: typeof option === "string" ? option : option.name,
  }));
  const current = entries.find((option) => option.value === selected);
  const buttonLabel = current?.label || placeholder;

  return `
    <span class="cg-form-select-wrap" data-glass-select>
      <input type="hidden" name="${name}" value="${escapeHtml(selected)}" />
      <button class="cg-form-select-trigger" type="button" data-glass-select-trigger aria-haspopup="menu" aria-expanded="false">
        <span class="cg-form-select-value${current ? "" : " is-placeholder"}">${escapeHtml(buttonLabel)}</span>
        <span class="cg-row-chevron" aria-hidden="true"></span>
      </button>
      ${renderGlassMenu(entries, { className: "cg-form-select-menu", selected })}
    </span>
  `;
}

function getPickerDateIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatPickerDate(date) {
  return `${date.getDate()} ${pickerMonthNamesGenitive[date.getMonth()]} ${date.getFullYear()}`;
}

function formatPickerValue(date, { includeTime = false, hour = "14", minute = "00" } = {}) {
  const dateLabel = formatPickerDate(date);
  return includeTime ? `${dateLabel}, ${hour}:${minute}` : dateLabel;
}

function parsePickerDateText(value, fallbackDate) {
  const normalizedValue = String(value).trim().toLowerCase();
  const match = normalizedValue.match(/^(\d{1,2})\s+([а-яё]+)\s+(\d{4})$/i);

  if (!match) {
    return new Date(fallbackDate);
  }

  const monthIndex = pickerMonthNamesGenitive.indexOf(match[2]);

  if (monthIndex < 0) {
    return new Date(fallbackDate);
  }

  return new Date(Number(match[3]), monthIndex, Number(match[1]));
}

function parsePickerTimeText(value, fallback = "14:00") {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return fallback;
  }

  const hour = Math.min(23, Math.max(0, Number(match[1])));
  const minute = Math.min(59, Math.max(0, Number(match[2])));

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function parseTaskTimeValueForPicker(value = "") {
  const raw = String(value || "").trim();
  const range = getTaskTimeRangeParts(raw);
  const parsePart = (part, fallbackDate, fallbackTime) => {
    const currentYear = new Date().getFullYear();
    const normalized = String(part || "").trim().toLowerCase();
    const monthIndex = pickerMonthNamesGenitive.findIndex((month) => normalized.includes(month));
    const dayMatch = normalized.match(/(\d{1,2})\s+[а-яё]+(?:\s+(\d{4}))?/i);
    const timeMatch = normalized.match(/(\d{1,2}):(\d{2})/);
    let hasDate = false;
    let date = new Date(fallbackDate);

    if (monthIndex >= 0 && dayMatch) {
      date = new Date(Number(dayMatch[2] || currentYear), monthIndex, Number(dayMatch[1]));
      hasDate = true;
    } else if (normalized.startsWith("завтра")) {
      date = new Date();
      date.setDate(date.getDate() + 1);
      hasDate = true;
    } else if (normalized.startsWith("сегодня") || normalized.startsWith("в ") || normalized.startsWith("просрочено")) {
      date = new Date();
      hasDate = true;
    }

    return {
      date,
      time: timeMatch ? parsePickerTimeText(`${timeMatch[1]}:${timeMatch[2]}`, fallbackTime) : fallbackTime,
      hasDate,
      hasTime: Boolean(timeMatch),
    };
  };
  const start = parsePart(range.start, new Date(2026, 5, 16), "14:00");
  const end = parsePart(range.end || range.start, start.date, "15:00");

  return {
    hasEnd: range.hasEnd,
    includeTime: start.hasTime || end.hasTime,
    hasUsableValue: start.hasDate || start.hasTime || end.hasDate || end.hasTime,
    start,
    end,
  };
}

function getPickerDateTimeValue(date, time = "00:00") {
  const [hour = "00", minute = "00"] = time.split(":");
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), Number(hour), Number(minute));
}

function getPickerCalendarDays(monthDate, selectedDate) {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const startOffset = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startOffset);
  const selectedIso = getPickerDateIso(selectedDate);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      iso: getPickerDateIso(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === monthDate.getMonth(),
      isSelected: getPickerDateIso(date) === selectedIso,
    };
  });
}

function renderPickerCalendar(monthDate = new Date(2026, 5, 1), selectedDate = new Date(2026, 5, 16)) {
  const days = getPickerCalendarDays(monthDate, selectedDate);

  return `
    <div class="cg-picker-calendar-card" data-picker-calendar>
      <div class="cg-picker-calendar-header">
        <h3 class="cg-picker-calendar-title">${pickerMonthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}</h3>
        <div class="cg-picker-calendar-nav">
          <button class="cg-picker-calendar-nav-button cg-picker-calendar-nav-button--prev" type="button" data-picker-prev-month aria-label="Предыдущий месяц"></button>
          <button class="cg-picker-calendar-nav-button" type="button" data-picker-next-month aria-label="Следующий месяц"></button>
        </div>
      </div>
      <div class="cg-picker-weekdays" aria-hidden="true">
        ${pickerWeekdayNames.map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="cg-picker-calendar-grid" role="grid" aria-label="Календарь">
        ${days
          .map(
            (day) => `
              <button class="cg-picker-calendar-day${day.isCurrentMonth ? "" : " is-outside"}${day.isSelected ? " is-selected" : ""}" type="button" data-picker-day="${day.iso}" aria-pressed="${day.isSelected}">
                ${day.day}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderPickerTextfield({ value = "", placeholder = "Дата", className = "", field = "" } = {}) {
  const fieldAttr = field ? ` data-picker-field="${escapeHtml(field)}"` : "";

  return `
    <label class="cg-live-textfield cg-live-textfield--fixed cg-live-textfield--no-label${className ? ` ${className}` : ""}">
      <span class="cg-live-textfield-control">
        <textarea class="cg-live-textfield-input" rows="1" placeholder="${escapeHtml(placeholder)}"${fieldAttr}>${escapeHtml(value)}</textarea>
      </span>
    </label>
  `;
}

function renderListSwitchRow({ title, action, checked = false } = {}) {
  return `
    <button class="cg-row cg-row--regular cg-row--full cg-row--switch${checked ? " is-on" : ""}" type="button" data-picker-toggle="${escapeHtml(action)}" aria-pressed="${checked}">
      <div class="cg-row-main">
        <div class="cg-row-separator" aria-hidden="true"></div>
        <div class="cg-row-content">
          <div class="cg-row-copy">
            <span class="cg-row-title">${escapeHtml(title)}</span>
          </div>
          <div class="cg-row-trailing">
            <span class="cg-switch" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </button>
  `;
}

function renderPickerReminderRow(selected = "none") {
  const label = reminderOptions[selected] || reminderOptions.none;
  const options = Object.entries(reminderOptions).map(([value, optionLabel]) => ({
    value,
    label: optionLabel,
  }));

  return `
    <div class="cg-picker-reminder-select" data-picker-reminder-select data-glass-select>
      <input type="hidden" name="reminder" value="${escapeHtml(selected)}" />
      <button class="cg-row cg-row--regular cg-row--full cg-picker-reminder-trigger" type="button" data-glass-select-trigger aria-haspopup="dialog" aria-expanded="false">
        <div class="cg-row-main">
          <div class="cg-row-separator" aria-hidden="true"></div>
          <div class="cg-row-content">
            <div class="cg-row-copy">
              <span class="cg-row-title">Напомнить</span>
            </div>
            <div class="cg-row-trailing">
              <span class="cg-row-detail cg-picker-reminder-value">${escapeHtml(label)}</span>
              <span class="cg-row-chevron" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </button>
      <div class="cg-form-select-menu" hidden>
        ${renderGlassMenu(options, { selected })}
      </div>
    </div>
  `;
}

function renderLiveSelect({
  label = true,
  labelText = "Label",
  labelWidth = "100",
  name = "storybook-select",
  options = taskTypeOptions,
  placeholder = "Value",
  selected = "",
  content = "text",
  grouped = false,
  separator = false,
} = {}) {
  const inputId = `storybook-select-${label ? "label" : "plain"}-${labelWidth}-${name}`;
  const entries = Object.entries(options).map(([value, option]) => ({
    value,
    label: typeof option === "string" ? option : option.name,
  }));
  const current = entries.find((option) => option.value === selected);
  const buttonLabel = current?.label || placeholder;
  const labelMarkup = label ? `<span class="cg-live-select-label" id="${inputId}-label">${escapeHtml(labelText)}</span>` : "";
  const valueMarkup =
    current && content === "badge"
      ? renderBadge({ variant: `status-${selected}`, label: current.label, className: "cg-live-select-badge" })
      : `<span class="cg-live-select-value${current ? "" : " is-placeholder"}">${escapeHtml(buttonLabel)}</span>`;

  return `
    <label class="cg-live-select${grouped ? " cg-live-select--grouped" : ""}${separator ? " cg-live-select--separator" : ""}${label ? "" : " cg-live-select--no-label"}" style="--select-label-width: ${Number(labelWidth) || 100}px">
      ${separator ? '<span class="cg-live-select-separator" aria-hidden="true"></span>' : ""}
      ${labelMarkup}
      <span class="cg-live-select-control" data-glass-select data-select-content="${content}">
        <input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(selected)}" />
        <button class="cg-live-select-trigger" type="button" data-glass-select-trigger aria-haspopup="menu" aria-expanded="false"${label ? ` aria-labelledby="${inputId}-label"` : ' aria-label="Select"'}>
          ${valueMarkup}
          <span class="cg-live-select-spacer" aria-hidden="true"></span>
          <span class="cg-live-select-arrow" aria-hidden="true"></span>
        </button>
        ${renderGlassMenu(entries, { className: "cg-form-select-menu", selected })}
      </span>
    </label>
  `;
}

function renderFormTimeInput(value = "16 июня 2026") {
  return `
    <input class="cg-form-time-input" name="time" type="hidden" value="${escapeHtml(value)}" data-picker-date="2026-06-16" data-picker-include-time="false" />
    <button class="cg-form-time-trigger" type="button" data-time-trigger>
      <span class="cg-form-time-value" data-time-value="single">${escapeHtml(value)}</span>
    </button>
  `;
}

function getTaskTimeRangeParts(value = "") {
  const parts = String(value || "")
    .split(/\s+—\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    hasEnd: parts.length > 1,
    start: parts[0] || value,
    end: parts[1] || "",
  };
}

function renderTaskTimeRow({ label, value, inputValue = value, includeInput = false, hidden = false, valueTarget = "single" }) {
  return `
    <div class="cg-row cg-row--actionable cg-task-time-row"${hidden ? " hidden" : ""}${valueTarget === "start" ? ' data-task-start-time-row' : ""}${valueTarget === "end" ? ' data-task-end-time-row' : ""}>
      <div class="cg-form-row-label"${valueTarget === "start" ? " data-task-start-label" : ""}>${escapeHtml(label)}</div>
      <div class="cg-form-row-control">
        ${includeInput ? `<input class="cg-form-time-input" name="time" type="hidden" value="${escapeHtml(inputValue)}" data-picker-date="2026-06-16" data-picker-include-time="${/\d{1,2}:\d{2}/.test(inputValue) ? "true" : "false"}" data-picker-include-end="${getTaskTimeRangeParts(inputValue).hasEnd ? "true" : "false"}" />` : ""}
        <button class="cg-form-time-trigger" type="button" data-time-trigger>
          <span class="cg-form-time-value" data-time-value="${escapeHtml(valueTarget)}">${escapeHtml(value)}</span>
        </button>
      </div>
    </div>
  `;
}

function renderTaskDateRows(value = "") {
  const range = getTaskTimeRangeParts(value);

  if (range.hasEnd) {
    return `
      ${renderTaskTimeRow({ label: "Начало", value: range.start, inputValue: value, includeInput: true, valueTarget: "start" })}
      ${renderTaskTimeRow({ label: "Окончание", value: range.end, valueTarget: "end" })}
    `;
  }

  return `
    ${renderTaskTimeRow({ label: "Дата", value: range.start, includeInput: true, valueTarget: "start" })}
    ${renderTaskTimeRow({ label: "Окончание", value: range.end || range.start, hidden: true, valueTarget: "end" })}
  `;
}

function renderTaskTimeField({ value = "", placeholder = "Задать время", separator = true } = {}) {
  const isEmpty = !value;

  return `
    <label class="cg-live-select cg-live-select--grouped cg-task-date-field${separator ? " cg-live-select--separator" : ""}" style="--select-label-width: 100px">
      ${separator ? '<span class="cg-live-select-separator" aria-hidden="true"></span>' : ""}
      <span class="cg-live-select-label">Время</span>
      <span class="cg-live-select-control">
        <input class="cg-form-time-input" name="time" type="hidden" value="${escapeHtml(value)}" data-picker-date="2026-06-16" data-picker-include-time="false" data-picker-placeholder="${escapeHtml(placeholder)}"${isEmpty ? ' data-picker-empty="true"' : ""} />
        <button class="cg-live-select-trigger cg-task-date-trigger" type="button" data-time-trigger aria-haspopup="dialog">
          <span class="cg-live-select-value cg-form-time-value${isEmpty ? " is-placeholder" : ""}" data-time-value="single">${escapeHtml(value || placeholder)}</span>
          <span class="cg-live-select-spacer" aria-hidden="true"></span>
          <span class="cg-live-select-arrow" aria-hidden="true"></span>
        </button>
      </span>
    </label>
  `;
}

function renderDateTimePickerSheet({ inline = false } = {}) {
  const selectedDate = new Date(2026, 5, 16);
  const selectedValue = formatPickerValue(selectedDate);
  const endDate = new Date(selectedDate);
  endDate.setHours(15, 0, 0, 0);
  const pickerClass = `cg-date-time-picker${inline ? " cg-date-time-picker--inline" : ""}`;
  const pickerMode = inline ? ' data-picker-inline="true"' : "";
  const sheetMarkup = `
    <section class="${pickerClass}" role="dialog" aria-modal="true" aria-labelledby="date-time-picker-title"${pickerMode}>
      <div class="cg-select-sheet-toolbar cg-picker-toolbar">
        <div class="cg-select-sheet-grabber" aria-hidden="true"><span></span></div>
        <div class="cg-select-sheet-heading">
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
          <h2 class="cg-select-sheet-title" id="date-time-picker-title">Дата</h2>
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cg-picker-body">
        <div class="cg-picker-input-card">
          <div class="cg-picker-input-row is-active" data-picker-range="start">
            ${renderPickerTextfield({ value: selectedValue, placeholder: "Дата", className: "cg-picker-date-field", field: "start-date" })}
            ${renderPickerTextfield({ value: "14:00", placeholder: "Время", className: "cg-picker-time-field", field: "start-time" })}
          </div>
          <div class="cg-picker-input-row" data-picker-range="end" data-picker-end-row hidden>
            ${renderPickerTextfield({ value: formatPickerDate(endDate), placeholder: "Дата", className: "cg-picker-date-field", field: "end-date" })}
            ${renderPickerTextfield({ value: "15:00", placeholder: "Время", className: "cg-picker-time-field", field: "end-time" })}
          </div>
        </div>
        ${renderPickerCalendar(selectedDate, selectedDate)}
        <div class="cg-picker-settings-card">
          ${renderListSwitchRow({ title: "Окончание", action: "end" })}
          ${renderListSwitchRow({ title: "Время", action: "time" })}
          ${renderPickerReminderRow()}
        </div>
        <button class="cg-picker-clear" type="button" data-picker-clear>Очистить</button>
      </div>
    </section>
  `;

  if (inline) {
    return `
      <div class="cg-picker-scrim" data-picker-close hidden></div>
      ${sheetMarkup}
    `;
  }

  return `
    <div class="cg-picker-modal" data-picker-modal hidden>
      <div class="cg-picker-scrim" data-picker-close></div>
      ${sheetMarkup}
    </div>
  `;
}

function parseTimeWheelValue(value = "00:00") {
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  const hour = match ? Math.min(23, Math.max(0, Number(match[1]))) : 0;
  const minute = match ? Math.min(59, Math.max(0, Number(match[2]))) : 0;

  return {
    hour: String(hour).padStart(2, "0"),
    minute: String(minute).padStart(2, "0"),
  };
}

function renderTimeWheelColumn(kind, values, selectedValue) {
  const cyclicValues = Array.from({ length: timeWheelCycleCount }, (_, cycle) =>
    values.map((value) => ({ value, cycle })),
  ).flat();

  return `
    <div class="cg-time-wheel-column" data-time-wheel-column="${escapeHtml(kind)}" data-time-wheel-options="${values.length}" aria-label="${kind === "hour" ? "Часы" : "Минуты"}">
      ${cyclicValues
        .map(
          ({ value, cycle }) => `
            <button class="cg-time-wheel-item${value === selectedValue && cycle === timeWheelMiddleCycle ? " is-active" : ""}" type="button" data-time-wheel-${escapeHtml(kind)}="${escapeHtml(value)}" data-time-wheel-cycle="${cycle}">
              ${escapeHtml(value)}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderWheelPicker({ hour = "07", minute = "10" } = {}) {
  return `
    <div class="cg-time-wheel-drum" data-time-wheel-drum>
      <span class="cg-time-wheel-selection" aria-hidden="true"></span>
      ${renderTimeWheelColumn("hour", timeWheelHours, hour)}
      ${renderTimeWheelColumn("minute", timeWheelMinutes, minute)}
    </div>
  `;
}

function renderTimeWheelSheet({ inline = false, title = "Время", mode = "single", start = "07:10", end = "07:30" } = {}) {
  const parsedStart = parseTimeWheelValue(start);
  const parsedEnd = parseTimeWheelValue(end);
  const isRange = mode === "range";
  const sheetClass = `cg-time-wheel-sheet${inline ? " cg-time-wheel-sheet--inline" : ""}${isRange ? " is-range" : ""}`;
  const modalAttr = inline ? ' data-time-wheel-inline="true"' : "";
  const sheetMarkup = `
    <section class="${sheetClass}" role="dialog" aria-modal="${inline ? "false" : "true"}" aria-labelledby="time-wheel-title"${modalAttr} data-time-wheel-sheet data-time-wheel-mode="${escapeHtml(mode)}">
      <div class="cg-select-sheet-toolbar">
        <div class="cg-select-sheet-grabber" aria-hidden="true"><span></span></div>
        <div class="cg-select-sheet-heading">
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
          <h2 class="cg-select-sheet-title" id="time-wheel-title" data-time-wheel-title>${escapeHtml(title)}</h2>
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cg-time-wheel-body">
        <div class="cg-time-wheel-fields">
          <button class="cg-time-wheel-field is-active" type="button" data-time-wheel-field="start">
            <span class="cg-time-wheel-field-label" data-time-wheel-start-label>${isRange ? "Начало" : "Время"}</span>
            <span class="cg-time-wheel-field-value" data-time-wheel-start-value>${escapeHtml(`${parsedStart.hour}:${parsedStart.minute}`)}</span>
          </button>
          <button class="cg-time-wheel-field" type="button" data-time-wheel-field="end"${isRange ? "" : " hidden"}>
            <span class="cg-time-wheel-field-label">Окончание</span>
            <span class="cg-time-wheel-field-value" data-time-wheel-end-value>${escapeHtml(`${parsedEnd.hour}:${parsedEnd.minute}`)}</span>
          </button>
        </div>
        ${renderWheelPicker({ hour: parsedStart.hour, minute: parsedStart.minute })}
        <div class="cg-time-wheel-actions">
          ${renderLiquidTextButton({ style: "default", label: "Отменить", className: "cg-time-wheel-cancel" })}
          ${renderLiquidTextButton({ style: "tinted", label: "Готово", className: "cg-time-wheel-done" })}
        </div>
      </div>
    </section>
  `;

  if (inline) {
    return sheetMarkup;
  }

  return `
    <div class="cg-time-wheel-modal" data-time-wheel-modal hidden>
      <div class="cg-time-wheel-scrim" data-time-wheel-close></div>
      ${sheetMarkup}
    </div>
  `;
}

function renderActionableListRow({ label, control }) {
  return `
    <div class="cg-row cg-row--actionable">
      <div class="cg-form-row-label">${label}</div>
      <div class="cg-form-row-control">${control}</div>
    </div>
  `;
}

function renderFormRow({ label, control }) {
  return renderActionableListRow({ label, control });
}

function renderTaskCreateSection({ title, fields, className = "" }) {
  return `
    <section class="cg-task-create-section${className ? ` ${className}` : ""}" aria-label="${escapeHtml(title)}">
      <div class="cg-task-create-section-label">${escapeHtml(title)}</div>
      <div class="cg-task-create-card">
        ${fields.join("")}
      </div>
    </section>
  `;
}

function renderCreateTaskForm({ selectedClient = "", backHref = "#/tasks", preset = {} } = {}) {
  const clientOptions = getClientOptions();
  const safeSelectedClient = clientOptions[selectedClient] ? selectedClient : "";
  const selectedType = preset.type && taskTypeOptions[preset.type] ? preset.type : "";

  return `
    <form class="cg-new-task-form cg-task-create-form" id="new-task-form">
      <div class="cg-task-create-content">
        <header class="cg-task-create-top">
          ${renderIconButton({ style: "secondary", icon: "left-24.svg", label: "Назад", href: backHref, historyBack: true, className: "cg-task-create-back" })}
          <h1 class="cg-task-create-title">Новая задача</h1>
          ${renderButton({ content: "icon", style: "primary", icon: "check.svg", label: "Сохранить задачу", className: "cg-new-task-submit", disabled: true, buttonType: "submit" })}
        </header>
        ${renderTaskCreateSection({
          title: "КОНТАКТЫ",
          fields: [
            renderLiveTextfield({ name: "title", labelText: "Название", placeholder: "Название", value: preset.title || "", clear: false, grouped: true }),
            renderLiveSelect({ name: "client", labelText: "Клиент", options: clientOptions, placeholder: "Выберите клиента", selected: safeSelectedClient, grouped: true, separator: true }),
            renderLiveSelect({ name: "type", labelText: "Тип задачи", options: taskTypeOptions, placeholder: "Выберите тип", selected: selectedType, grouped: true, separator: true }),
            renderTaskTimeField({ value: preset.time || "", separator: true }),
          ],
        })}
        ${renderTaskCreateSection({
          title: "ОПИСАНИЕ",
          className: "cg-task-create-section--description",
          fields: [
            renderLiveTextfield({ name: "description", label: false, height: "grow", clear: false, placeholder: "Что нужно сделать", value: preset.description || "", grouped: true }),
          ],
        })}
      </div>
      ${renderDateTimePickerSheet()}
    </form>
  `;
}

function renderEditTaskForm(taskId = "hot-overdue", { backHref = "" } = {}) {
  const task = getTaskEditModel(taskId);
  const clientOptions = getClientOptions();
  const safeSelectedClient = clientOptions[task.client] ? task.client : "";
  const safeBackHref = backHref || `#/task/${task.id}`;

  return `
    <form class="cg-new-task-form cg-task-create-form cg-edit-task-form" id="edit-task-form" data-task-id="${escapeHtml(task.id)}">
      <div class="cg-task-create-content">
        <header class="cg-task-create-top">
          ${renderIconButton({ style: "secondary", icon: "left-24.svg", label: "Назад", href: safeBackHref, historyBack: true, className: "cg-task-create-back" })}
          <h1 class="cg-task-create-title">Настройки задачи</h1>
          ${renderButton({ content: "icon", style: "primary", icon: "check.svg", label: "Сохранить задачу", className: "cg-new-task-submit is-ready", buttonType: "submit" })}
        </header>
        ${renderTaskCreateSection({
          title: "КОНТАКТЫ",
          fields: [
            renderLiveTextfield({ name: "title", labelText: "Название", placeholder: "Название", value: task.title, clear: false, grouped: true }),
            renderLiveSelect({ name: "client", labelText: "Клиент", options: clientOptions, placeholder: "Выберите клиента", selected: safeSelectedClient, grouped: true, separator: true }),
            renderLiveSelect({ name: "type", labelText: "Тип задачи", options: taskTypeOptions, placeholder: "Выберите тип", selected: task.type, grouped: true, separator: true }),
            renderTaskTimeField({ value: task.time, separator: true }),
          ],
        })}
        ${renderTaskCreateSection({
          title: "ОПИСАНИЕ",
          className: "cg-task-create-section--description",
          fields: [
            renderLiveTextfield({ name: "description", label: false, height: "grow", clear: false, placeholder: "Что нужно сделать", value: task.description, grouped: true }),
          ],
        })}
      </div>
      ${renderDateTimePickerSheet()}
    </form>
  `;
}

function getClientFormModel(clientId = "") {
  const client = getClientById(clientId);
  const [firstName = "", ...lastNameParts] = (client?.name || "").split(" ").filter(Boolean);

  return {
    id: client?.id || "",
    firstName,
    lastName: lastNameParts.join(" "),
    name: client?.name || "",
    company: client?.company || "",
    position: client?.position || "",
    status: client?.status === "active" ? "ordinary" : client?.status || clientStatusLabels[client?.badgeLabel] || "new",
    phone: client?.phone || "",
    email: client?.email || "",
    price: normalizeClientPriceInput(client?.price || ""),
    description: client?.description || "",
    photo: client?.photo || "",
    isCreated: getCreatedClients().some((item) => item.id === clientId),
  };
}

function normalizeClientPriceInput(price = "") {
  const value = String(price).trim().toLowerCase();
  const millionMatch = value.match(/([\d\s]+)(?:[,.](\d+))?\s*млн/);

  if (millionMatch) {
    const whole = millionMatch[1].replace(/\D/g, "");
    const fraction = (millionMatch[2] || "").padEnd(6, "0").slice(0, 6);
    const amount = Number(`${whole}${fraction || "000000"}`);
    return amount ? String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
  }

  return value.replace(/[^\d\s]/g, "").trim();
}

function renderClientForm({ mode = "create", clientId = "" } = {}) {
  const client = mode === "edit" ? getClientFormModel(clientId) : {};
  const isEdit = mode === "edit";
  const formId = isEdit ? "edit-client-form" : "new-client-form";
  const title = isEdit ? "Настройки клиента" : "Новый клиент";
  const backHref = isEdit ? `#/clients/${clientId}` : "#/clients";
  const submitDisabled = isEdit ? "" : " disabled";
  const submitReadyClass = isEdit ? " is-ready" : "";

  return `
    <form class="cg-client-create-form" id="${formId}"${isEdit ? ` data-client-id="${escapeHtml(client.id || clientId)}"` : ""}>
      <div class="cg-client-create-content">
        <header class="cg-client-create-top">
          ${renderIconButton({ style: "secondary", icon: "left-24.svg", label: "Назад к клиенту", href: backHref, historyBack: true, className: "cg-client-create-back" })}
          <h1 class="cg-client-create-title">${title}</h1>
          <button class="cg-icon-button cg-icon-button--primary cg-client-create-submit${submitReadyClass}" type="submit" aria-label="Сохранить клиента"${submitDisabled}>
            <span class="cg-icon-button-blur" aria-hidden="true"></span>
            <span class="cg-icon-button-bg" aria-hidden="true"></span>
            <span class="cg-icon-button-glass-effect" aria-hidden="true"></span>
            <span class="cg-icon-button-check" aria-hidden="true"></span>
          </button>
        </header>
        ${renderClientCreateSection({
          title: "КОНТАКТЫ",
          fields: [
            renderClientCreateInput({ name: "firstName", label: "Имя", placeholder: "Имя", autocomplete: "given-name", value: client.firstName || "" }),
            renderClientCreateInput({ name: "lastName", label: "Фамилия", placeholder: "Фамилия", autocomplete: "family-name", value: client.lastName || "" }),
            renderClientCreateInput({ name: "company", label: "Компания", placeholder: "Компания", autocomplete: "organization", value: client.company || "" }),
            renderClientCreateInput({ name: "position", label: "Должность", placeholder: "Должность", autocomplete: "organization-title", value: client.position || "" }),
            renderClientCreateInput({ name: "phone", label: "Телефон", placeholder: "Телефон", type: "tel", autocomplete: "tel", inputMode: "tel", format: "phone", value: client.phone || "" }),
            renderClientCreateInput({ name: "email", label: "Email", placeholder: "Email", type: "email", autocomplete: "email", inputMode: "email", format: "email", value: client.email || "" }),
          ],
        })}
        ${renderClientCreateSection({
          title: "О КЛИЕНТЕ",
          className: "cg-client-create-section--about",
          fields: [
            renderClientCreateTextarea({ name: "description", placeholder: "Например: что ищет, бюджет, сроки", value: client.description || "" }),
          ],
        })}
        ${renderClientCreateSection({
          title: "ДЕТАЛИ",
          fields: [
            renderClientCreateInput({ name: "price", label: "Бюджет", placeholder: "Бюджет", inputMode: "numeric", format: "money", value: client.price || "" }),
            renderClientCreateSelect({ name: "status", label: "Статус", placeholder: "Выберите статус", options: clientStatusOptions, selected: client.status || "" }),
          ],
        })}
      </div>
    </form>
  `;
}

function renderNewClientForm() {
  return renderClientForm();
}

function renderClientCreateSection({ title, fields, className = "" }) {
  return `
    <section class="cg-client-create-section${className ? ` ${className}` : ""}" aria-label="${title}">
      <div class="cg-client-create-section-label">${title}</div>
      <div class="cg-client-create-card">
        ${fields.join("")}
      </div>
    </section>
  `;
}

function renderClientCreateInput({ name, label, placeholder, type = "text", autocomplete = "", inputMode = "", format = "", value = "" }) {
  const suffix = format === "money" ? '<span class="cg-client-create-suffix" aria-hidden="true">₽</span>' : "";

  return `
    <label class="cg-client-create-field${format ? ` cg-client-create-field--${format}` : ""}">
      <span class="cg-client-create-field-main">
        <span class="cg-client-create-separator" aria-hidden="true"></span>
        <span class="cg-client-create-field-frame">
          <span class="cg-client-create-label">${label}</span>
          <input class="cg-client-create-input" name="${name}" type="${type}" placeholder="${placeholder}" value="${escapeHtml(value)}"${autocomplete ? ` autocomplete="${autocomplete}"` : ""}${inputMode ? ` inputmode="${inputMode}"` : ""}${format ? ` data-format="${format}"` : ""} />
          ${suffix}
        </span>
      </span>
    </label>
  `;
}

function renderClientCreateTextarea({ name, placeholder, value = "" }) {
  return `
    <label class="cg-client-create-textarea-field">
      <span class="cg-client-create-field-main">
        <span class="cg-client-create-field-frame">
          <textarea class="cg-client-create-input cg-client-create-textarea" name="${name}" rows="1" placeholder="${placeholder}">${escapeHtml(value)}</textarea>
        </span>
      </span>
    </label>
  `;
}

function renderClientCreateSelect({ name, label, placeholder, options, selected = "" }) {
  const isBadgeSelect = name === "status";
  const selectedLabel = selected ? options[selected] : "";
  const valueMarkup = selectedLabel
    ? isBadgeSelect
      ? `<span class="cg-badge cg-badge--status-${selected} cg-client-create-select-badge">${selectedLabel}</span>`
      : `<span class="cg-client-create-select-value">${selectedLabel}</span>`
    : `<span class="cg-client-create-select-value is-placeholder">${placeholder}</span>`;

  return `
    <div class="cg-client-create-field">
      <span class="cg-client-create-field-main">
        <span class="cg-client-create-separator" aria-hidden="true"></span>
        <span class="cg-client-create-field-frame">
          <span class="cg-client-create-label">${label}</span>
          <span class="cg-client-create-select-wrap" data-glass-select${isBadgeSelect ? ' data-select-content="badge"' : ""}>
            <input type="hidden" name="${name}" value="${escapeHtml(selected)}" />
            <button class="cg-client-create-select-trigger" type="button" data-glass-select-trigger aria-haspopup="menu" aria-expanded="false">
              ${valueMarkup}
              <span class="cg-row-chevron" aria-hidden="true"></span>
            </button>
            ${renderGlassMenu(Object.entries(options).map(([value, optionLabel]) => ({ value, label: optionLabel })), { className: "cg-form-select-menu", selected })}
          </span>
        </span>
      </span>
    </div>
  `;
}

function renderOverContentPreview(component) {
  return `
    <div class="glass-preview">
      <div class="glass-preview-content" aria-hidden="true">
        <div class="type-subheadline">Subheadline</div>
        <div class="type-body">Subheadline</div>
        <div class="type-caption">Caption</div>
      </div>
      <div class="glass-preview-floating">
        ${component}
      </div>
    </div>
  `;
}

function getCurrentPage() {
  const hash = window.location.hash.replace("#/", "");
  if (hash === "form-row" || hash === "list") {
    return "row";
  }

  return pages.some((page) => page.id === hash) ? hash : "colors";
}

function renderNav(currentPage) {
  return `
    <nav class="sidebar" aria-label="Storybook pages">
      ${pages
        .map(
          (page) =>
            `<a class="nav-link${page.id === currentPage ? " is-active" : ""}" href="#/${page.id}">${page.label}</a>`,
        )
        .join("")}
    </nav>
  `;
}

function renderColors() {
  return `
    <main class="page page--colors">
      ${colorGroups
        .map(
          (group) => `
            <section class="token-group" aria-label="${group.title}">
              ${group.tokens
                .map(
                  ([name, token]) => `
                    <article class="color-token">
                      <div class="color-swatch" style="--swatch-token: var(${token})"></div>
                      <div class="color-token-name">${name}</div>
                      <div class="color-token-value">${token.replace("--color-", "")}</div>
                    </article>
                  `,
                )
                .join("")}
            </section>
          `,
        )
        .join("")}
    </main>
  `;
}

function renderTypography() {
  return `
    <main class="page page--typography">
      ${typography
        .map(
          ([label, token]) => `
            <div class="type-row">
              <div class="type-sample type-${token}">${label}</div>
              <div class="type-name">typography.${token.replace("-", "")}</div>
            </div>
          `,
        )
        .join("")}
    </main>
  `;
}

function renderIcons() {
  return `
    <main class="page page--icons">
      ${icons
        .map((icon) => {
          const name = icon.replace(".svg", "");
          const src = `./assets/icons/${icon}`;
          return `
            <article class="icon-token">
              <span class="icon-preview" data-icon-src="${src}" aria-hidden="true">
                <img class="icon-preview-img" src="${src}" alt="" />
              </span>
              <div class="icon-name">${name}</div>
            </article>
          `;
        })
        .join("")}
    </main>
  `;
}

function getSettingsState() {
  try {
    return {
      ...defaultSettingsState,
      ...(JSON.parse(localStorage.getItem(settingsStorageKey) || "{}") || {}),
    };
  } catch {
    return { ...defaultSettingsState };
  }
}

function saveSettingsState(nextState) {
  localStorage.setItem(settingsStorageKey, JSON.stringify({ ...getSettingsState(), ...nextState }));
}

function renderSettingsProfile() {
  return `
    <section class="cg-settings-profile" aria-label="Профиль">
      <div class="cg-settings-avatar" aria-hidden="true">AA</div>
      <div class="cg-settings-profile-copy">
        <h2 class="cg-settings-profile-name">Ahmed Al-Mansoori</h2>
        <p class="cg-settings-profile-status">
          <span class="cg-settings-status-dot" aria-hidden="true"></span>
          Статус — В звонке
        </p>
      </div>
    </section>
  `;
}

function getSettingsSections(state = getSettingsState()) {
  return [
    {
      id: "settings-integrations",
      title: "ИНТЕГРАЦИИ",
      rows: [
        {
          title: "Настройки интеграции",
          subtitle: "CRM (Zoho), WhatsApp, Email, Календарь",
          detail: "",
          icon: "settings-24.svg",
          tone: "blue",
        },
      ],
    },
    {
      id: "settings-notifications",
      title: "УВЕДОМЛЕНИЯ",
      rows: [
        { title: "Пресет по умолчанию", detail: "Стандарт", icon: "document-24.svg", tone: "purple" },
        {
          title: "Утренний дайджест",
          subtitle: "Задачи на день",
          detail: state.morningDigest,
          icon: "flag-24.svg",
          tone: "orange",
          time: { mode: "single", startKey: "morningDigest", title: "Утренний дайджест" },
        },
        { title: "Дедлайны обещаний", subtitle: "Уведомление до дедлайна", detail: "за 30 мин", icon: "document-24.svg", tone: "green" },
        {
          title: "Просроченные обещания",
          subtitle: "Уведомление о просроченном обещании",
          icon: "flag-filled-24.svg",
          tone: "orange",
          trailing: "switch",
          toggleKey: "overdueAlerts",
          isOn: state.overdueAlerts,
        },
        {
          title: "Режим тишины",
          detail: `${state.quietStart} - ${state.quietEnd}`,
          icon: "close-24.svg",
          tone: "purple",
          time: { mode: "range", startKey: "quietStart", endKey: "quietEnd", title: "Режим тишины" },
        },
        {
          title: "Режим встречи",
          icon: "users-24.svg",
          tone: "blue",
          trailing: "switch",
          toggleKey: "meetingMode",
          isOn: state.meetingMode,
        },
      ],
    },
    {
      id: "settings-privacy",
      title: "ПРИВАТНОСТЬ",
      rows: [
        {
          title: "Обработка личных звонков",
          subtitle: "Короткое резюме и другое",
          icon: "call-24.svg",
          tone: "green",
          trailing: "switch",
          toggleKey: "personalCalls",
          isOn: state.personalCalls,
        },
        { title: "Список приватных номеров", subtitle: "Звонки не будут обрабатываться", detail: "12 номеров", icon: "user-24.svg", tone: "purple" },
        { title: "История удалений и выгрузок", subtitle: "Что это?", detail: "", icon: "document-24.svg", tone: "orange" },
      ],
    },
    {
      id: "settings-personal",
      title: "ЛИЧНЫЕ ДАННЫЕ",
      rows: [
        { title: "Имя и должность", detail: "Ahmed Al-Mansoori", icon: "user-24.svg", tone: "blue" },
        { title: "Номер телефона и email", subtitle: "+050 123 4567, ahmed.almansoori@example.com", detail: "", icon: "call-24.svg", tone: "green" },
        { title: "Язык интерфейса", detail: "en", icon: "settings-24.svg", tone: "purple" },
      ],
    },
    {
      id: "settings-support",
      title: "ПОДДЕРЖКА И ЛОГИ",
      rows: [
        { title: "Связаться с поддержкой", icon: "message-square-24.svg", tone: "orange" },
        { title: "Отправить отчет о проблеме", icon: "flag-24.svg", tone: "red" },
        { title: "Данные о приложении", subtitle: "Версия приложения, условия и политика", icon: "document-24.svg", tone: "blue" },
      ],
    },
  ];
}

function renderSettingsRow(row) {
  const attrs = [];

  if (row.time) {
    attrs.push(`data-settings-time-start="${escapeHtml(row.time.startKey)}"`);
    attrs.push(`data-settings-time-mode="${escapeHtml(row.time.mode)}"`);
    attrs.push(`data-settings-time-title="${escapeHtml(row.time.title)}"`);

    if (row.time.endKey) {
      attrs.push(`data-settings-time-end="${escapeHtml(row.time.endKey)}"`);
    }
  }

  if (row.toggleKey) {
    attrs.push(`data-settings-toggle="${escapeHtml(row.toggleKey)}"`);
  }

  const isInteractive = row.time || row.toggleKey || row.detail !== undefined;
  const tag = isInteractive ? "button" : "div";
  const typeAttr = tag === "button" ? ' type="button"' : "";
  const className = row.trailing === "switch" ? `cg-row--full cg-row--switch${row.isOn ? " is-on" : ""}` : "cg-row--full";

  return `
    <${tag} class="cg-row-card-link cg-settings-row-button"${typeAttr}${attrs.length ? ` ${attrs.join(" ")}` : ""}>
      ${renderRow({
        active: row.trailing === "switch" ? false : true,
        height: row.subtitle ? "tall" : "regular",
        trailing: row.trailing || "default",
        title: row.title,
        subtitle: row.subtitle || "",
        detail: row.detail || "",
        showImage: true,
        imageIcon: row.icon,
        imageShape: "rounded",
        imageTone: row.tone,
        className,
      })}
    </${tag}>
  `;
}

function renderSettingsSection(section) {
  return `
    <section class="cg-detail-section cg-settings-section" aria-labelledby="${escapeHtml(section.id)}">
      ${renderSectionTitle(section.title, section.id)}
      <div class="cg-row-card">
        ${section.rows.map((row) => renderSettingsRow(row)).join("")}
      </div>
    </section>
  `;
}

function renderSettingsApp() {
  const state = getSettingsState();

  return `
    <main class="cg-app cg-app--settings">
      <section class="cg-mobile-web-page" aria-label="Настройки">
        <div class="cg-mobile-web-content cg-mobile-web-content--settings">
          ${renderAppHeader({ title: "Настройки", leftIcon: "menu", rightIcon: "more-24.svg", leftLabel: "Меню", rightLabel: "Еще" })}
          ${renderSettingsProfile()}
          ${getSettingsSections(state).map((section) => renderSettingsSection(section)).join("")}
        </div>
        ${renderTimeWheelSheet()}
        <div class="cg-mobile-web-tab-bar">
          ${renderTabBar("settings")}
        </div>
      </section>
    </main>
  `;
}

function renderClientsApp() {
  const allClients = getClients();
  const clientsFilter = getClientsFilterFromUrl();
  const clientsSort = getClientsSortFromUrl();
  const counts = getClientFilterCounts(allClients);
  const visibleClients = sortClients(getFilteredClients(allClients, clientsFilter), clientsSort);
  const selected = clientsFilter === "hot" ? 2 : clientsFilter === "no-tasks" ? 3 : 1;
  const isEmptyState = new URLSearchParams(window.location.search).get("clientsState") === "empty" || allClients.length === 0;

  if (isEmptyState) {
    return renderClientsEmptyApp();
  }

  return `
    <main class="cg-app cg-app--clients">
      <section class="cg-mobile-web-page" aria-label="Клиенты">
        <div class="cg-mobile-web-content">
          <div class="cg-clients-header-wrap">
            ${renderAppHeader({ title: "Клиенты", leftIcon: "sort-24.svg", rightIcon: "plus", leftLabel: "Сортировка", rightLabel: "Добавить клиента" })}
            ${renderGlassMenu(
              [
                { value: "hot", label: "Сначала горячие" },
                { value: "alphabet", label: "По алфавиту" },
                { value: "new", label: "Сначала новые" },
              ],
              { className: "cg-clients-sort-menu", selected: clientsSort },
            )}
            ${renderClientAddMenu()}
          </div>
          <div class="cg-clients-segments">
            ${renderSegmentedControl(3, selected, true, ["Все", "Горячие", "Без задач"], [String(counts.all), String(counts.hot), String(counts["no-tasks"])], [
              { value: "all", scope: "clients" },
              { value: "hot", scope: "clients" },
              { value: "no-tasks", scope: "clients" },
            ])}
          </div>
          <div class="cg-row-card cg-clients-list">
            ${
              visibleClients.length
                ? visibleClients
                    .map(
                      (client) => `
                        <a class="cg-row-card-link" href="#/clients/${client.id}">
                          ${renderRow({
                            active: true,
                            height: "tall",
                            showImage: false,
                            subtitle: client.company,
                            title: client.name,
                            trailing: getPendingClientTouch(client.id) ? "badge" : "chevron",
                            badgeLabel: "Новые касания",
                            badgeVariant: "rounded-brand",
                            className: "cg-row--full",
                          })}
                        </a>
                      `,
                    )
                    .join("")
                : renderRow({
                    active: false,
                    title: "Клиентов нет",
                    detail: "",
                    trailing: "none",
                    className: "cg-row--full cg-row--empty",
                  })
            }
          </div>
        </div>
        <div class="cg-mobile-web-tab-bar">
          ${renderTabBar("clients")}
        </div>
        ${renderCrmImportProgressModal()}
      </section>
    </main>
  `;
}

function renderClientsEmptyApp() {
  return `
    <main class="cg-app cg-app--clients cg-app--empty">
      <section class="cg-mobile-web-page cg-mobile-web-page--clients-empty" aria-label="Клиенты">
        <div class="cg-empty-state cg-empty-state--clients">
          <div class="cg-clients-empty-illustration" aria-hidden="true">
            <img src="./assets/illustrations/clients-empty.png" alt="" />
          </div>
          <h1 class="cg-clients-empty-title">Здесь будут ваши клиенты</h1>
          <p class="cg-clients-empty-description">Добавьте первого клиента, чтобы хранить контакты, задачи и&nbsp;историю общения</p>
          <div class="cg-clients-empty-add-wrap">
            ${renderLiquidTextButton({ style: "tinted", label: "Добавить клиента", className: "cg-clients-empty-button" })}
            ${renderClientAddMenu("cg-clients-empty-add-menu")}
          </div>
        </div>
        <div class="cg-mobile-web-tab-bar cg-mobile-web-tab-bar--clients-empty">
          ${renderTabBar("clients")}
        </div>
        ${renderCrmImportProgressModal()}
      </section>
    </main>
  `;
}

function renderTasksApp() {
  const taskPeriod = getTasksPeriodFromUrl();
  const tasksSort = getTasksSortFromUrl();
  const allCards = getTaskCards();
  const isEmptyState = new URLSearchParams(window.location.search).get("tasksState") === "empty" || allCards.length === 0;
  const todayCards = allCards.filter((card) => getTaskPeriod(card) === "today");
  const futureCards = allCards.filter((card) => getTaskPeriod(card) === "future");
  const completedCards = allCards.filter((card) => getTaskPeriod(card) === "completed");
  const cards = sortTaskCards(taskPeriod === "completed" ? completedCards : taskPeriod === "future" ? futureCards : todayCards, tasksSort);
  const selected = taskPeriod === "completed" ? 3 : taskPeriod === "future" ? 2 : 1;

  if (isEmptyState) {
    return renderTasksEmptyApp();
  }

  return `
    <main class="cg-app cg-app--tasks">
      <section class="cg-mobile-web-page" aria-label="Задачи">
        <div class="cg-mobile-web-content">
          <div class="cg-tasks-header-wrap">
            ${renderAppHeader({ title: "Задачи", leftIcon: "sort-24.svg", rightIcon: "plus", leftLabel: "Сортировка", rightLabel: "Добавить", rightHref: "#/new-task" })}
            ${renderGlassMenu(
              [
                { value: "time", label: "По времени" },
                { value: "hot", label: "Сначала горячие" },
                { value: "new", label: "Сначала новые" },
              ],
              { className: "cg-tasks-sort-menu", selected: tasksSort },
            )}
          </div>
          <div class="cg-tasks-segments">
            ${renderSegmentedControl(3, selected, true, ["Сегодня", "Будущие", "Выполненные"], [String(todayCards.length), String(futureCards.length), String(completedCards.length)], [
              { value: "today", scope: "tasks" },
              { value: "future", scope: "tasks" },
              { value: "completed", scope: "tasks" },
            ], { scroll: true })}
          </div>
          <div class="cg-tasks-list">
            ${cards.map((card) => renderTaskCard(card, { href: `#/task/${card.id}` })).join("")}
          </div>
        </div>
        <div class="cg-mobile-web-tab-bar">
          ${renderTabBar("tasks")}
        </div>
      </section>
    </main>
  `;
}

function renderTasksEmptyApp() {
  return `
    <main class="cg-app cg-app--tasks cg-app--empty">
      <section class="cg-mobile-web-page cg-mobile-web-page--tasks-empty" aria-label="Задачи">
        <div class="cg-empty-state cg-empty-state--tasks">
          <div class="cg-tasks-empty-illustration" aria-hidden="true">
            <img src="./assets/illustrations/tasks-empty.png" alt="" />
          </div>
          <h1 class="cg-tasks-empty-title">Здесь будут ваши задачи</h1>
          <p class="cg-tasks-empty-description">Создайте первую задачу, чтобы не забыть о звонках, встречах и&nbsp;других делах.</p>
          ${renderLiquidTextButton({ style: "tinted", label: "Добавить задачу", href: "#/new-task", className: "cg-tasks-empty-button" })}
        </div>
        <div class="cg-mobile-web-tab-bar cg-mobile-web-tab-bar--tasks-empty">
          ${renderTabBar("tasks")}
        </div>
      </section>
    </main>
  `;
}

function getTaskDetail(taskId = "hot-overdue") {
  const createdTask = getCreatedTasks().find((task) => task.id === taskId);
  return createdTask ? getCreatedTaskDetail(createdTask) : getStaticTaskDetail(taskId);
}

function getClientDetail(clientId = "omar") {
  const baseClient = getClientById(clientId) || getStaticClientForImport(clients[0]);
  const detail = clientDetails[baseClient.id];
  const source = detail || {
    summary: {
      description:
        baseClient.description || `${baseClient.name} связан с компанией ${baseClient.company}. Добавьте задачи и заметки, чтобы вести работу с клиентом.`,
      price: baseClient.price || "Без бюджета",
      badge: { label: baseClient.badgeLabel || "Новый", variant: "square-default" },
    },
    contacts: [
      { label: "Телефон", value: baseClient.phone || "Не указан" },
      { label: "Почта", value: baseClient.email || "Не указана" },
    ],
    activities: [
      {
        icon: "users-24.svg",
        tone: "purple",
        title: "Клиент добавлен",
        subtitle: "Карточка клиента создана в мобильном веб-прототипе.",
        time: "Сегодня",
      },
    ],
  };
  const savedActivities = getSavedClientTouches(baseClient.id);
  const sourceActivities = Array.isArray(source.activities) ? source.activities : Object.values(source.activities || {});

  return {
    ...source,
    summary: {
      ...source.summary,
      description: baseClient.description || source.summary.description,
      price: baseClient.price || source.summary.price,
      badge: getClientStatusBadge(baseClient.id),
    },
    contacts: [
      { label: "Телефон", value: baseClient.phone || source.contacts?.find((contact) => contact.label === "Телефон")?.value || "Не указан" },
      { label: "Почта", value: baseClient.email || source.contacts?.find((contact) => contact.label === "Почта")?.value || "Не указана" },
    ],
    activities: [...savedActivities, ...sourceActivities],
    profile: {
      id: baseClient.id,
      initials: baseClient.initials || getInitials(baseClient.name),
      name: baseClient.name,
      company: baseClient.company,
      photo: baseClient.photo || "",
    },
  };
}

function renderTaskDetailApp(taskId = "hot-overdue") {
  const detail = getTaskDetail(taskId);
  const clientId = detail.clientId || getTaskEditModel(taskId).client || "omar";
  const hasPhone = getClientHasPhone(clientId);
  const touches = getClientAllTouches(clientId);
  const callResultHref = `#/call-results?task=${encodeURIComponent(taskId)}&client=${encodeURIComponent(clientId)}&back=task:${encodeURIComponent(taskId)}`;

  return `
    <main class="cg-app cg-app--task-detail">
      <section class="cg-mobile-web-page" aria-label="Задача">
        <div class="cg-mobile-web-content cg-mobile-web-content--detail">
          ${renderAppHeader({ title: "Задача", leftIcon: "left-24.svg", rightIcon: "edit-24.svg", leftHref: "#/tasks", rightHref: `#/edit-task/${taskId}` })}
          ${renderTaskSummaryCard(detail.summary)}
          <div class="cg-task-actions-wrap">
            <div class="cg-action-tile-row">
              ${renderActionTile(getPhoneActionState(taskActions.call, hasPhone))}
              ${renderActionTile(getPhoneActionState(taskActions.message, hasPhone))}
              ${renderActionTile(taskActions.more)}
            </div>
            ${renderCallProgressModal({ resultHref: callResultHref })}
            ${renderGlassMenu(
              [
                { value: "complete", label: "Завершить задачу" },
                { value: "delete", label: "Удалить задачу" },
              ],
              { className: "cg-task-more-menu" },
            )}
          </div>
          ${renderTaskActionAlerts(detail.summary.title)}
          ${renderPendingTouchNotice(clientId)}
          <section class="cg-detail-section" aria-labelledby="client-section-title">
            ${renderSectionTitle("О КЛИЕНТЕ", "client-section-title")}
            ${renderClientCard({ ...detail.client, badge: getClientStatusBadge(clientId) })}
          </section>
          <section class="cg-detail-section" aria-labelledby="related-section-title">
            ${renderSectionTitle("ДРУГИЕ ЗАДАЧИ", "related-section-title")}
            <a class="cg-row-card cg-row-card--link" href="#/task/${detail.relatedTask.id}">
              ${renderRow({
                title: detail.relatedTask.title,
                subtitle: "",
                detail: detail.relatedTask.detail,
                className: "cg-row--full",
              })}
            </a>
          </section>
          <section class="cg-detail-section" aria-labelledby="activity-section-title">
            ${renderSectionTitle("ПОСЛЕДНИЕ КАСАНИЯ", "activity-section-title")}
            ${renderClientTouchRows(touches, { clientId, back: `task:${taskId}` })}
          </section>
        </div>
      </section>
    </main>
  `;
}

function renderEditTaskApp(taskId = "hot-overdue") {
  const backHref = getHashSearchParams().get("back") || "";

  return `
    <main class="cg-app cg-app--edit-task">
      <section class="cg-mobile-web-page" aria-label="Настройки задачи">
        <div class="cg-mobile-web-content cg-mobile-web-content--new-task cg-mobile-web-content--edit-task">
          ${renderEditTaskForm(taskId, { backHref })}
        </div>
      </section>
    </main>
  `;
}

function renderNewClientApp() {
  return `
    <main class="cg-app cg-app--new-client">
      <section class="cg-mobile-web-page cg-mobile-web-page--new-client" aria-label="Новый клиент">
        ${renderClientForm({ mode: "create" })}
      </section>
    </main>
  `;
}

function renderEditClientApp(clientId = "omar") {
  return `
    <main class="cg-app cg-app--edit-client">
      <section class="cg-mobile-web-page cg-mobile-web-page--new-client" aria-label="Настройки клиента">
        ${renderClientForm({ mode: "edit", clientId })}
      </section>
    </main>
  `;
}

function renderClientTasks(tasks) {
  if (!tasks.length) {
    return `
      <div class="cg-row-card">
        ${renderRow({ title: "Задач нет", subtitle: "", detail: "", trailing: "none", className: "cg-row--full cg-row--empty" })}
      </div>
    `;
  }

  return `
    <div class="cg-row-card">
      ${tasks
        .slice(0, 2)
        .map(
          (task) => `
            <a class="cg-row-card-link" href="#/task/${task.id}">
              ${renderRow({ title: task.title, subtitle: "", detail: task.detail, className: "cg-row--full" })}
            </a>
          `,
        )
        .join("")}
    </div>
    <a class="cg-grouped-table-footer" href="#/tasks">Архив задач</a>
  `;
}

function renderContactRows(contacts) {
  return `
    <div class="cg-row-card">
      ${contacts
        .map((contact) => {
          const label = contact.label === "Почта" ? "Email" : contact.label;
          return (
          renderRow({
            active: false,
            detail: contact.value,
            title: label,
            className: "cg-row--full cg-row--contact-info",
          })
          );
        })
        .join("")}
    </div>
  `;
}

function renderPendingTouchNotice(clientId = "") {
  const pendingTouch = getPendingClientTouch(clientId);

  if (!pendingTouch) {
    return "";
  }

  return `
    <section class="cg-pending-touch-notice" aria-labelledby="pending-touch-title">
      <span class="cg-pending-touch-accent" aria-hidden="true"></span>
      <div class="cg-pending-touch-body">
        <div class="cg-pending-touch-copy">
          <h2 class="cg-pending-touch-title" id="pending-touch-title">Новые касания</h2>
          <p class="cg-pending-touch-description">Проанализируйте новые касания, чтобы обновить данные клиента и связанные задачи с помощью AI</p>
        </div>
        <button class="cg-pending-touch-action" type="button" data-open-pending-touch>
          Просмотреть касания
        </button>
      </div>
    </section>
  `;
}

function renderClientDetailApp(clientId = "omar") {
  const detail = getClientDetail(clientId);
  const tasks = getClientTaskRows(clientId);
  const hasPhone = getClientHasPhone(clientId);
  const callResultHref = `#/call-results?client=${encodeURIComponent(clientId)}&back=client:${encodeURIComponent(clientId)}`;
  const summary = {
    ...detail.summary,
    name: detail.profile.name,
    company: detail.profile.company,
  };

  return `
    <main class="cg-app cg-app--client-detail">
      <section class="cg-mobile-web-page" aria-label="Клиент">
        <div class="cg-mobile-web-content cg-mobile-web-content--client-detail">
          ${renderClientProfile(detail.profile)}
          <div class="cg-client-actions-wrap">
            <div class="cg-action-tile-row cg-action-tile-row--client">
              ${renderActionTile(getPhoneActionState(clientActions.call, hasPhone))}
              ${renderActionTile(getPhoneActionState(clientActions.message, hasPhone))}
              ${renderActionTile({ ...clientActions.task, href: `#/new-task/${clientId}` })}
              ${renderActionTile({ ...clientActions.more, action: "client-more", popup: true })}
            </div>
            ${renderCallProgressModal({ resultHref: callResultHref })}
            ${renderGlassMenu(
              [
                { value: "analyze", label: "Проанализировать все касания" },
                { value: "delete", label: "Удалить клиента" },
              ],
              { className: "cg-client-more-menu" },
            )}
          </div>
          ${renderDeleteClientAlert(detail.profile)}
          ${renderPendingTouchNotice(clientId)}
          ${renderClientCard(summary, { summaryOnly: true })}
          <section class="cg-detail-section" aria-labelledby="client-tasks-title">
            ${renderSectionTitle("ЗАДАЧИ", "client-tasks-title")}
            ${renderClientTasks(tasks)}
          </section>
          <section class="cg-detail-section" aria-labelledby="client-contacts-title">
            ${renderSectionTitle("КОНТАКТНАЯ ИНФОРМАЦИЯ", "client-contacts-title")}
            ${renderContactRows(detail.contacts)}
          </section>
          <section class="cg-detail-section" aria-labelledby="client-activity-title">
            ${renderSectionTitle("ПОСЛЕДНИЕ КАСАНИЯ", "client-activity-title")}
            ${renderClientTouchRows(detail.activities, { clientId })}
          </section>
        </div>
        <div class="cg-mobile-web-tab-bar">
          ${renderTabBar("clients")}
        </div>
      </section>
    </main>
  `;
}

function getHashSearchParams() {
  const queryStart = window.location.hash.indexOf("?");
  return new URLSearchParams(queryStart >= 0 ? window.location.hash.slice(queryStart + 1) : "");
}

function getTouchesBackTarget(clientId = "omar") {
  const back = getHashSearchParams().get("back") || `client:${clientId}`;
  const [source, id] = back.split(":");

  if (source === "task" && id) {
    return {
      href: `#/task/${id}`,
      label: "Назад к задаче",
    };
  }

  return {
    href: `#/clients/${clientId}`,
    label: "Назад к клиенту",
  };
}

function renderTouchesApp(clientId = "omar") {
  const safeClientId = clientId || "omar";
  const filter = getTouchFilterFromUrl();
  const touches = getFilteredTouches(getClientAllTouches(safeClientId), filter);
  const backTarget = getTouchesBackTarget(safeClientId);

  return `
    <main class="cg-app cg-app--touches">
      <section class="cg-mobile-web-page" aria-label="Все касания">
        <div class="cg-mobile-web-content">
          <div class="cg-touches-header-wrap">
            ${renderAppHeader({ title: "Все касания", leftIcon: "left-24.svg", rightIcon: "filter-24.svg", leftLabel: backTarget.label, rightLabel: "Фильтр", leftHref: backTarget.href })}
            ${renderGlassMenu(
              [
                { value: "all", label: "Все касания" },
                { value: "call", label: "Звонки" },
                { value: "chat", label: "Чаты" },
                { value: "meeting", label: "Встречи" },
              ],
              { className: "cg-touches-filter-menu", selected: filter },
            )}
          </div>
          ${renderTouchList(touches)}
        </div>
      </section>
    </main>
  `;
}

const callResultTaskUpdates = [
  {
    id: "completed",
    title: "Подтвердить время просмотра",
    subtitle: "Сегодня, 12:00",
    badgeLabel: "Выполнено",
    badgeVariant: "square-success",
    editTaskId: "hot-overdue",
    sheetTitle: "Задача выполнена",
    sheetDescription: "Задача была успешно выполнена. Оставшиеся вопросы на уточнение были учтены в следующей задаче",
    editLabel: "Открыть задачу снова",
  },
  {
    id: "changed",
    title: "Отправить условия",
    subtitle: "Завтра, 12:00",
    badgeLabel: "Изменено",
    badgeVariant: "square-orange",
    editTaskId: "future-terms",
    sheetTitle: "Задача изменена",
    sheetDescription: "Изменилось время. С 3 марта 14:00 на завтра 12:00",
    editLabel: "Изменить",
  },
  {
    id: "new",
    title: "Просмотр апартаментов JVC",
    subtitle: "Пятница, 12:00",
    badgeLabel: "Новая",
    badgeVariant: "square-blue",
    editTaskId: "future-viewing",
    sheetTitle: "Новая задача",
    sheetDescription: "Договорились о просмотре в пятницу в 12:00, адрес: ул. Дубайская, д.9",
    editLabel: "Изменить",
    isNewSuggestion: true,
  },
];

const callResultDataUpdates = [
  {
    label: "Бюджет",
    value: "1 000 000 ₽",
    type: "text",
    name: "call-result-budget",
  },
  {
    label: "Статус",
    badge: { label: "Горячий", variant: "status-hot" },
    active: true,
    type: "status",
    name: "call-result-status",
  },
];

function getDismissedCallResultUpdates() {
  return dismissedCallResultUpdates;
}

function saveDismissedCallResultUpdates(ids) {
  dismissedCallResultUpdates = Array.from(new Set(ids));
}

function getCurrentCallResultsHref() {
  return window.location.hash.startsWith("#/call-results") ? window.location.hash : "#/call-results";
}

function getCallResultTaskEditHref(item, clientId) {
  const backHref = encodeURIComponent(getCurrentCallResultsHref());

  if (item.isNewSuggestion) {
    return `#/new-task/${clientId}?preset=call-result-new&back=${backHref}`;
  }

  return `#/edit-task/${item.editTaskId}?back=${backHref}`;
}

function renderCallResultTaskRow(item) {
  return `
    <button class="cg-row-card-link cg-call-result-task-trigger" type="button" data-call-result-update="${escapeHtml(item.id)}">
      ${renderRow({
        active: true,
        height: "tall",
        trailing: "badge",
        title: item.title,
        subtitle: item.subtitle,
        badgeLabel: item.badgeLabel,
        badgeVariant: item.badgeVariant,
        className: "cg-row--full cg-row--call-result",
      })}
    </button>
  `;
}

function renderCallResultTaskSheet(item, clientId) {
  return `
    <div class="cg-call-result-update-modal" data-call-result-update-modal="${escapeHtml(item.id)}" hidden>
      <div class="cg-call-result-update-scrim" data-call-result-update-close></div>
      <section class="cg-call-result-update-sheet" role="dialog" aria-modal="true" aria-labelledby="call-result-update-${escapeHtml(item.id)}-title">
        <div class="cg-select-sheet-toolbar">
          <div class="cg-select-sheet-grabber" aria-hidden="true"><span></span></div>
          <div class="cg-select-sheet-heading">
            <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
            <h2 class="cg-select-sheet-title" id="call-result-update-${escapeHtml(item.id)}-title">${escapeHtml(item.sheetTitle)}</h2>
            <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
          </div>
        </div>
        <div class="cg-call-result-update-content">
          <p class="cg-call-result-update-description">${escapeHtml(item.sheetDescription)}</p>
          <div class="cg-call-result-update-actions">
            <a class="cg-content-button cg-content-button--secondary-white cg-call-result-update-action" href="${getCallResultTaskEditHref(item, clientId)}">
              <span class="cg-content-button-label">${escapeHtml(item.editLabel)}</span>
            </a>
            ${
              item.isNewSuggestion
                ? `
                  <button class="cg-content-button cg-content-button--secondary-white cg-call-result-update-action" type="button" data-call-result-update-dismiss="${escapeHtml(item.id)}">
                    <span class="cg-content-button-label">Не ставить задачу</span>
                  </button>
                `
                : ""
            }
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderCallResultFieldRow(item) {
  if (item.type === "text") {
    return `
      <div class="cg-call-result-field-row">
        <div class="cg-row-separator" aria-hidden="true"></div>
        <div class="cg-call-result-field-label">${item.label}</div>
        <div class="cg-call-result-field-value">
          ${renderLiveTextfield({ name: item.name, label: false, height: "fixed", clear: false, value: item.value || "", placeholder: item.label, grouped: true })}
        </div>
        <span class="cg-call-result-field-spacer" aria-hidden="true"></span>
      </div>
    `;
  }

  if (item.type === "status") {
    const selected = clientStatusLabels[item.badge?.label] || "hot";

    return `
      <div class="cg-call-result-field-row cg-call-result-field-row--select">
        <div class="cg-row-separator" aria-hidden="true"></div>
        <div class="cg-call-result-field-label">${item.label}</div>
        <div class="cg-call-result-field-value">
          ${renderLiveSelect({ name: item.name, label: false, options: clientStatusOptions, placeholder: "Выберите статус", selected, content: "badge", grouped: true })}
        </div>
      </div>
    `;
  }

  return `
    <div class="cg-call-result-field-row${item.active ? " cg-call-result-field-row--active" : ""}">
      <div class="cg-row-separator" aria-hidden="true"></div>
      <div class="cg-call-result-field-label">${item.label}</div>
      <div class="cg-call-result-field-value">
        ${item.badge ? renderBadge(item.badge) : escapeHtml(item.value || "")}
      </div>
      ${item.active ? '<span class="cg-row-chevron" aria-hidden="true"></span>' : '<span class="cg-call-result-field-spacer" aria-hidden="true"></span>'}
    </div>
  `;
}

function renderCallResultButtonRow(label, href) {
  return `
    <a class="cg-call-result-button-row" href="${href}">
      <div class="cg-row-separator" aria-hidden="true"></div>
      <span>${label}</span>
    </a>
  `;
}

function renderCallResultSummaryEditor() {
  const value = [
    "Обсудили желаемый срок сдачи объекта — через 4 месяца. Бюджет опустился до 20 млн ₽.",
    "Договорились о просмотре в пятницу в 12:00",
    "Условия оплаты остались под вопросом, клиент попросил прислать их раньше, до просмотра",
  ].join("\n\n");

  return `
    <article class="cg-call-result-summary">
      ${renderLiveTextfield({
        name: "call-summary",
        label: false,
        height: "grow",
        clear: false,
        placeholder: "Сводка звонка",
        value,
      })}
    </article>
  `;
}

function getCallResultBackHref({ taskId = "hot-overdue", clientId = "omar" } = {}) {
  const back = getHashSearchParams().get("back") || (taskId ? `task:${taskId}` : `client:${clientId}`);
  const [source, id] = back.split(":");

  if (source === "client" && id) {
    return `#/clients/${id}`;
  }

  if (source === "task" && id) {
    return `#/task/${id}`;
  }

  return taskId ? `#/task/${taskId}` : `#/clients/${clientId}`;
}

function renderCallResultsApp() {
  const params = getHashSearchParams();
  const taskId = params.get("task") || "hot-overdue";
  const clientId = params.get("client") || getTaskEditModel(taskId).client || "omar";
  const backHref = getCallResultBackHref({ taskId, clientId });
  const dismissedUpdates = getDismissedCallResultUpdates();
  const visibleTaskUpdates = callResultTaskUpdates.filter((item) => !dismissedUpdates.includes(item.id));

  return `
    <main class="cg-app cg-app--call-results">
      <section class="cg-mobile-web-page" aria-label="Результаты звонка">
        <div class="cg-mobile-web-content cg-mobile-web-content--call-results">
          ${renderAppHeader({ title: "Результаты звонка", leftIcon: "left-24.svg", rightIcon: "add-24.svg", leftLabel: "Назад", leftHref: backHref, rightHidden: true })}
          ${renderCallResultSummaryEditor()}
          <section class="cg-detail-section" aria-labelledby="call-result-tasks-title">
            ${renderSectionTitle("ОБНОВЛЕНИЕ ЗАДАЧ", "call-result-tasks-title")}
            <div class="cg-row-card">
              ${visibleTaskUpdates.map((item) => renderCallResultTaskRow(item)).join("")}
            </div>
          </section>
          <section class="cg-detail-section" aria-labelledby="call-result-data-title">
            ${renderSectionTitle("ОБНОВЛЕНИЕ ДАННЫХ", "call-result-data-title")}
            <div class="cg-row-card">
              ${callResultDataUpdates.map((item) => renderCallResultFieldRow(item)).join("")}
            </div>
          </section>
          ${renderLiquidTextButton({ style: "tinted", label: "Сохранить", href: backHref, className: "cg-call-result-save" })}
        </div>
        ${visibleTaskUpdates.map((item) => renderCallResultTaskSheet(item, clientId)).join("")}
      </section>
    </main>
  `;
}

function renderNewTaskApp(selectedClient = "") {
  const clientOptions = getClientOptions();
  const safeSelectedClient = clientOptions[selectedClient] ? selectedClient : "";
  const params = getHashSearchParams();
  const backHref = params.get("back") || (safeSelectedClient ? `#/clients/${safeSelectedClient}` : "#/tasks");
  const preset =
    params.get("preset") === "call-result-new"
      ? {
          title: "Просмотр апартаментов JVC",
          type: "viewing",
          time: "Пятница, 12:00",
          description: "Договорились о просмотре в пятницу в 12:00, адрес: ул. Дубайская, д.9",
        }
      : {};

  return `
    <main class="cg-app cg-app--new-task">
      <section class="cg-mobile-web-page" aria-label="Новая задача">
        <div class="cg-mobile-web-content cg-mobile-web-content--new-task">
          ${renderCreateTaskForm({ selectedClient: safeSelectedClient, backHref, preset })}
        </div>
      </section>
    </main>
  `;
}

function renderVariantControls(page, activeVariant) {
  if (!page.variants?.length) {
    return "";
  }

  return `
    <div class="variant-controls" aria-label="Variants">
      ${page.variants
        .map(
          (variant) =>
            `<button class="variant-control${variant === activeVariant ? " is-active" : ""}" data-variant="${variant}">${variant}</button>`,
        )
        .join("")}
    </div>
  `;
}

function getButtonStorybookState() {
  const params = new URLSearchParams(window.location.search);
  const content = params.get("content") === "text" ? "text" : "icon";
  const style = params.get("style") === "secondary" ? "secondary" : "primary";
  const disabled = params.get("disabled") === "true";

  return { content, style, disabled };
}

function renderButtonStorybookControls({ content, style, disabled }) {
  return `
    <div class="storybook-prop-controls" aria-label="Button props">
      <div class="storybook-prop-control" role="group" aria-label="Содержимое">
        ${[
          ["icon", "Иконка"],
          ["text", "Текст"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${content === value ? " is-active" : ""}" type="button" data-button-control="content" data-button-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Стиль">
        ${[
          ["primary", "Primary"],
          ["secondary", "Secondary"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${style === value ? " is-active" : ""}" type="button" data-button-control="style" data-button-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Disabled">
        ${[
          ["false", "Enabled"],
          ["true", "Disabled"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${String(disabled) === value ? " is-active" : ""}" type="button" data-button-control="disabled" data-button-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderButtonStorybook() {
  const state = getButtonStorybookState();

  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="button">
        ${componentPages.button.render(state)}
      </section>
      ${renderButtonStorybookControls(state)}
    </main>
  `;
}

function getTextfieldStorybookState() {
  const params = new URLSearchParams(window.location.search);
  const label = params.get("label") !== "false";
  const height = params.get("height") === "grow" ? "grow" : "fixed";
  const clear = params.get("clear") !== "false";
  const example = params.get("example") === "stack" ? "stack" : "single";
  const value = params.get("value") || "";

  return { label, height, clear, labelWidth: "100", example, value };
}

function renderTextfieldStorybookControls({ label, height, clear, example }) {
  return `
    <div class="storybook-prop-controls" aria-label="Textfield props">
      <div class="storybook-prop-control" role="group" aria-label="Пример">
        ${[
          ["single", "Один"],
          ["stack", "Группа"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${example === value ? " is-active" : ""}" type="button" data-textfield-control="example" data-textfield-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Лейбл">
        ${[
          ["true", "С лейблом"],
          ["false", "Без лейбла"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${String(label) === value ? " is-active" : ""}" type="button" data-textfield-control="label" data-textfield-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Высота">
        ${[
          ["fixed", "Фикс"],
          ["grow", "Растет"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${height === value ? " is-active" : ""}" type="button" data-textfield-control="height" data-textfield-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Очистка">
        ${[
          ["true", "С очисткой"],
          ["false", "Без очистки"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${String(clear) === value ? " is-active" : ""}" type="button" data-textfield-control="clear" data-textfield-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderTextfieldStorybookExample(state) {
  if (state.example !== "stack") {
    return componentPages.textfield.render(state);
  }

  const fields = [
    "Имя",
    "Фамилия",
    "Компания",
    "Должность",
    "Телефон",
    "Email",
  ];

  return `
    <div class="cg-live-textfield-section">
      <div class="cg-live-textfield-section-title">КОНТАКТЫ</div>
      <div class="cg-live-textfield-stack">
        ${fields.map((field, index) => componentPages.textfield.render({ ...state, clear: false, labelText: field, placeholder: field, value: "", name: `stack-${index}`, grouped: true, separator: index > 0 })).join("")}
      </div>
    </div>
  `;
}

function renderTextfieldStorybook() {
  const state = getTextfieldStorybookState();

  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="textfield">
        ${renderTextfieldStorybookExample(state)}
      </section>
      ${renderTextfieldStorybookControls(state)}
    </main>
  `;
}

function getSelectStorybookState() {
  const params = new URLSearchParams(window.location.search);
  const content = params.get("content") === "badge" ? "badge" : "text";

  return {
    example: params.get("example") === "stack" ? "stack" : "single",
    label: params.get("label") !== "false",
    content,
    selected: params.get("selected") || "",
  };
}

function renderSelectStorybookControls({ example, label, content }) {
  return `
    <div class="storybook-prop-controls" aria-label="Select props">
      <div class="storybook-prop-control" role="group" aria-label="Пример">
        ${[
          ["single", "Один"],
          ["stack", "Группа"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${example === value ? " is-active" : ""}" type="button" data-select-control="example" data-select-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Контент">
        ${[
          ["text", "Текст"],
          ["badge", "Бейдж"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${content === value ? " is-active" : ""}" type="button" data-select-control="content" data-select-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Лейбл">
        ${[
          ["true", "С лейблом"],
          ["false", "Без лейбла"],
        ]
          .map(
            ([value, controlLabel]) => `
              <button class="variant-control${String(label) === value ? " is-active" : ""}" type="button" data-select-control="label" data-select-value="${value}">
                ${controlLabel}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSelectStorybookExample(state) {
  if (state.example !== "stack") {
    const isBadge = state.content === "badge";

    return componentPages.select.render({
      ...state,
      labelText: isBadge ? "Статус" : "Бюджет",
      options: isBadge ? clientStatusOptions : { budget: "1 000 000 ₽", budget2: "2 500 000 ₽", budget3: "5 000 000 ₽" },
      placeholder: isBadge ? "Выберите статус" : "Бюджет",
      name: "storybook-select",
    });
  }

  const fields = [
    { labelText: "Бюджет", placeholder: "Бюджет", options: { budget: "1 000 000 ₽", budget2: "2 500 000 ₽", budget3: "5 000 000 ₽" }, selected: "budget", content: "text" },
    { labelText: "Статус", placeholder: "Выберите статус", options: clientStatusOptions, selected: "hot", content: "badge" },
  ];

  return `
    <div class="cg-live-select-section">
      <div class="cg-live-select-stack">
        ${fields.map((field, index) => componentPages.select.render({ ...state, ...field, name: `storybook-select-${index}`, grouped: true, separator: index > 0 })).join("")}
      </div>
    </div>
  `;
}

function renderSelectStorybook() {
  const state = getSelectStorybookState();

  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="select">
        ${renderSelectStorybookExample(state)}
      </section>
      ${renderSelectStorybookControls(state)}
    </main>
  `;
}

function renderDatePickerStorybook() {
  return `
    <main class="page page--component page--date-picker">
      <section class="component-stage component-stage--date-picker" aria-label="date picker">
        <form class="cg-new-task-form cg-date-picker-story">
          ${renderFormTimeInput("16 июня 2026")}
          ${renderDateTimePickerSheet({ inline: true })}
        </form>
      </section>
    </main>
  `;
}

function renderTimePickerStorybook() {
  return `
    <main class="page page--component page--time-picker">
      <section class="component-stage component-stage--time-picker" aria-label="time picker">
        <div class="cg-time-wheel-story">
          ${renderTimeWheelSheet({ inline: true, title: "Режим тишины", mode: "range", start: "22:00", end: "07:30" })}
        </div>
      </section>
    </main>
  `;
}

function renderWheelPickerStorybook() {
  return `
    <main class="page page--component page--wheel-picker">
      <section class="component-stage component-stage--wheel-picker" aria-label="wheel picker">
        <div class="cg-wheel-picker-story">
          ${renderWheelPicker({ hour: "00", minute: "00" })}
        </div>
      </section>
    </main>
  `;
}

function getRowStorybookState() {
  const params = new URLSearchParams(window.location.search);
  const allowedHeights = ["regular", "tall", "reverse"];
  const allowedTrailing = ["badge", "default", "check", "action", "date", "none", "check-detail-badge"];
  const allowedImageShapes = ["circular", "rounded"];
  const height = allowedHeights.includes(params.get("height")) ? params.get("height") : "regular";
  const trailing = allowedTrailing.includes(params.get("trailing")) ? params.get("trailing") : "badge";
  const imageShape = allowedImageShapes.includes(params.get("imageShape")) ? params.get("imageShape") : "circular";

  return {
    active: params.get("active") !== "false",
    height,
    imageShape,
    trailing,
    showImage: params.get("image") !== "false",
    showSubtitle: true,
  };
}

function renderRowStorybookControls({ active, height, imageShape, showImage, trailing }) {
  return `
    <div class="storybook-prop-controls" aria-label="Row props">
      <div class="storybook-prop-control" role="group" aria-label="Active">
        ${[
          ["true", "Active"],
          ["false", "Inactive"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${String(active) === value ? " is-active" : ""}" type="button" data-row-control="active" data-row-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Высота">
        ${[
          ["regular", "Regular"],
          ["tall", "Tall"],
          ["reverse", "Reverse"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${height === value ? " is-active" : ""}" type="button" data-row-control="height" data-row-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Фото">
        ${[
          ["true", "С фото"],
          ["false", "Без фото"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${String(showImage) === value ? " is-active" : ""}" type="button" data-row-control="image" data-row-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Тип изображения">
        ${[
          ["circular", "Circular"],
          ["rounded", "Rounded"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${imageShape === value ? " is-active" : ""}" type="button" data-row-control="imageShape" data-row-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Trailing">
        ${[
          ["badge", "Badge"],
          ["default", "Detail"],
          ["check", "Check"],
          ["switch", "Switch"],
          ["action", "Action"],
          ["date", "Date"],
          ["none", "None"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${trailing === value ? " is-active" : ""}" type="button" data-row-control="trailing" data-row-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderRowStorybookActionableExample({ action }) {
  const rows = {
    input: {
      label: "Компания",
      control: renderFormInputControl({ name: "storybook-row-company", placeholder: "Название", value: "Acme Realty" }),
    },
    select: {
      label: "Тип задачи",
      control: renderFormSelect({ name: "storybook-row-type", options: taskTypeOptions, placeholder: "Выбрать тип", selected: "call" }),
    },
    time: {
      label: "Время",
      control: renderFormTimeInput("Сегодня, 14:00"),
    },
  };

  return `<div class="cg-form-row-group cg-row-story-actionable-group">${renderActionableListRow(rows[action] || rows.select)}</div>`;
}

function renderRowStorybook() {
  const state = getRowStorybookState();

  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="row">
        ${renderRow({
          active: state.active,
          height: state.height,
          trailing: state.trailing,
          title: "Title",
          subtitle: state.showSubtitle ? "Subtitle" : "",
          detail: state.trailing === "action" ? "Выбрать клиента" : "Detail",
          imageIcon: state.imageShape === "rounded" ? "settings-24.svg" : "",
          imageShape: state.imageShape,
          imageTone: state.imageShape === "rounded" ? "blue" : "",
          showImage: state.showImage,
          className: state.trailing === "switch" ? `cg-row--switch${state.active ? " is-on" : ""}` : "",
        })}
      </section>
      ${renderRowStorybookControls(state)}
    </main>
  `;
}

function getSegmentedStorybookState() {
  const params = new URLSearchParams(window.location.search);
  const layout = params.get("layout") === "scroll" ? "scroll" : "fit";
  const segments = Math.min(5, Math.max(2, Number(params.get("segments")) || (layout === "scroll" ? 5 : 2)));
  const selected = Math.min(segments, Math.max(1, Number(params.get("selected")) || 1));
  const badges = params.get("badges") !== "false";

  return { segments, selected, badges, layout };
}

function renderSegmentedStorybookControls({ segments, badges, layout }) {
  return `
    <div class="storybook-prop-controls" aria-label="Segmented control props">
      <div class="storybook-prop-control" role="group" aria-label="Количество табов">
        ${[2, 3, 4, 5]
          .map(
            (count) => `
              <button class="variant-control${segments === count ? " is-active" : ""}" type="button" data-story-control="segments" data-story-value="${count}">
                ${count}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Поведение ширины">
        ${[
          ["fit", "Fit"],
          ["scroll", "Scroll"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${layout === value ? " is-active" : ""}" type="button" data-story-control="layout" data-story-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="storybook-prop-control" role="group" aria-label="Бейджи">
        ${[
          ["true", "С бейджами"],
          ["false", "Без бейджей"],
        ]
          .map(
            ([value, label]) => `
              <button class="variant-control${String(badges) === value ? " is-active" : ""}" type="button" data-story-control="badges" data-story-value="${value}">
                ${label}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSegmentedControlStorybook() {
  const state = getSegmentedStorybookState();

  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="segmented-control">
        ${componentPages["segmented-control"].render(state)}
      </section>
      ${renderSegmentedStorybookControls(state)}
    </main>
  `;
}

function renderComponent(pageId) {
  if (pageId === "button") {
    return renderButtonStorybook();
  }

  if (pageId === "textfield") {
    return renderTextfieldStorybook();
  }

  if (pageId === "select") {
    return renderSelectStorybook();
  }

  if (pageId === "date-picker") {
    return renderDatePickerStorybook();
  }

  if (pageId === "time-picker") {
    return renderTimePickerStorybook();
  }

  if (pageId === "wheel-picker") {
    return renderWheelPickerStorybook();
  }

  if (pageId === "segmented-control") {
    return renderSegmentedControlStorybook();
  }

  if (pageId === "row") {
    return renderRowStorybook();
  }

  const page = componentPages[pageId];
  const activeVariant = new URLSearchParams(window.location.search).get("variant") || page.variants[0];
  const safeVariant = page.variants.includes(activeVariant) ? activeVariant : page.variants[0];
  return `
    <main class="page page--component">
      <section class="component-stage" aria-label="${pageId}">
        ${page.render(safeVariant)}
      </section>
      ${renderVariantControls(page, safeVariant)}
    </main>
  `;
}

function getCurrentRoute() {
  return window.location.hash.replace("#/", "").split("/")[0].split("?")[0];
}

function getCurrentRouteParam() {
  return decodeURIComponent((window.location.hash.replace("#/", "").split("/")[1] || "").split("?")[0]);
}

function syncEmptyViewportLock() {
  document.documentElement.classList.toggle("cg-empty-lock", Boolean(app.querySelector(".cg-app--empty")));
}

function render() {
  const route = getCurrentRoute();
  const routeParam = getCurrentRouteParam();

  if (appRoutes.includes(route)) {
    app.innerHTML =
      route === "task"
        ? renderTaskDetailApp(routeParam)
        : route === "new-task"
          ? renderNewTaskApp(routeParam)
          : route === "new-client"
            ? renderNewClientApp()
            : route === "edit-client"
              ? renderEditClientApp(routeParam)
              : route === "edit-task"
                ? renderEditTaskApp(routeParam)
              : route === "touches"
                ? renderTouchesApp(routeParam)
                : route === "call-results"
                  ? renderCallResultsApp()
                  : route === "settings"
                    ? renderSettingsApp()
                  : route === "clients"
                    ? routeParam
                      ? renderClientDetailApp(routeParam)
                      : renderClientsApp()
                    : renderTasksApp();
    syncEmptyViewportLock();
    bindAppEvents(route, routeParam);
    return;
  }

  const currentPage = getCurrentPage();
  const content =
    currentPage === "colors"
      ? renderColors()
      : currentPage === "typography"
        ? renderTypography()
        : currentPage === "icons"
          ? renderIcons()
          : renderComponent(currentPage);

  app.innerHTML = `
    <div class="storybook-shell">
      ${renderNav(currentPage)}
      ${content}
    </div>
  `;
  syncEmptyViewportLock();

  document.querySelectorAll(".variant-control").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.dataset.variant) {
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set("variant", button.dataset.variant);
      window.history.replaceState({}, "", url);
      render();
    });
  });

  if (currentPage === "segmented-control") {
    bindSegmentedControlStorybook();
  }

  if (currentPage === "button") {
    bindButtonStorybook();
  }

  if (currentPage === "textfield") {
    bindTextfieldStorybook();
  }

  if (currentPage === "select") {
    bindSelectStorybook();
  }

  if (currentPage === "date-picker") {
    bindDatePickerStorybook();
  }

  if (currentPage === "time-picker") {
    bindTimeWheelPicker(document.querySelector(".cg-time-wheel-story"));
  }

  if (currentPage === "wheel-picker") {
    bindWheelPickerStorybook();
  }

  if (currentPage === "row") {
    bindRowStorybook();
  }

  if (currentPage === "icons") {
    bindIconPreviews();
  }
}

function bindIconPreviews() {
  document.querySelectorAll("[data-icon-src]").forEach(async (preview) => {
    try {
      const response = await fetch(preview.dataset.iconSrc);

      if (!response.ok) {
        return;
      }

      preview.innerHTML = await response.text();
      preview.querySelector("svg")?.setAttribute("aria-hidden", "true");
    } catch {
      // The fallback <img> remains visible if inline loading is unavailable.
    }
  });
}

function bindButtonStorybook() {
  document.querySelectorAll("[data-button-control]").forEach((control) => {
    control.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const key = control.dataset.buttonControl;
      const value = control.dataset.buttonValue;

      url.searchParams.delete("variant");

      if (key && value) {
        url.searchParams.set(key, value);
      }

      if (key === "content") {
        url.searchParams.delete("selected");
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function getCurrentStorybookTextfieldValue() {
  const field = document.querySelector(".cg-live-textfield");
  const editor = field?.querySelector("[data-textfield-editor]");

  if (editor) {
    return getTextfieldEditorValue(editor);
  }

  return field?.querySelector(".cg-live-textfield-input")?.value || "";
}

function getTextfieldEditorValue(editor) {
  const blocks = Array.from(editor.children).filter((node) => ["DIV", "P"].includes(node.tagName));

  if (!blocks.length) {
    return editor.textContent.trim();
  }

  return blocks
    .map((block) => block.innerText.trim())
    .filter(Boolean)
    .join("\n\n");
}

function bindLiveTextfieldEditors(root = document) {
  root.querySelectorAll(".cg-live-textfield").forEach((field) => {
    const editor = field.querySelector("[data-textfield-editor]");
    const hidden = field.querySelector(".cg-live-textfield-hidden");
    const clear = field.querySelector("[data-textfield-clear]");

    if (!editor || !hidden) {
      return;
    }

    const sync = () => {
      hidden.value = getTextfieldEditorValue(editor);
      field.classList.toggle("is-empty", !hidden.value);
      hidden.dispatchEvent(new Event("input", { bubbles: true }));
      hidden.dispatchEvent(new Event("change", { bubbles: true }));
    };

    editor.addEventListener("input", sync);
    editor.addEventListener("blur", sync);
    clear?.addEventListener("click", () => {
      editor.replaceChildren();
      editor.focus();
      sync();
    });

    sync();
  });
}

function bindTextfieldStorybook() {
  bindLiveTextfieldEditors(document);

  const bindField = (field) => {
    const input = field.querySelector(".cg-live-textfield-input");
    const clear = field.querySelector("[data-textfield-clear]");

    if (!input || input.hasAttribute("data-textfield-editor")) {
      return;
    }

    const resize = () => {
    if (!input.hasAttribute("data-textfield-autogrow")) {
      return;
    }

    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    };

    const sync = () => {
      field.classList.toggle("is-empty", !input.value);
      resize();
    };

    input.addEventListener("input", sync);
    clear?.addEventListener("click", () => {
      input.value = "";
      input.focus();
      sync();
    });

    sync();
  };

  document.querySelectorAll(".cg-live-textfield").forEach(bindField);

  document.querySelectorAll("[data-textfield-control]").forEach((control) => {
    control.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const key = control.dataset.textfieldControl;
      const value = control.dataset.textfieldValue;
      const inputValue = getCurrentStorybookTextfieldValue();

      url.searchParams.delete("variant");

      if (key && value) {
        url.searchParams.set(key, value);
      }

      if (inputValue) {
        url.searchParams.set("value", inputValue);
      } else {
        url.searchParams.delete("value");
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function bindSelectStorybook() {
  const root = document.querySelector(".page--component");

  if (!root) {
    return;
  }

  bindGlassSelects(root);

  root.querySelectorAll("[data-glass-select] input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const url = new URL(window.location.href);
      url.searchParams.delete("variant");

      if (event.target.name === "storybook-select") {
        if (event.target.value) {
          url.searchParams.set("selected", event.target.value);
        } else {
          url.searchParams.delete("selected");
        }

        window.history.replaceState({}, "", url);
      }
    });
  });

  document.querySelectorAll("[data-select-control]").forEach((control) => {
    control.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const key = control.dataset.selectControl;
      const value = control.dataset.selectValue;

      url.searchParams.delete("variant");

      if (key && value) {
        url.searchParams.set(key, value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function bindDatePickerStorybook() {
  const root = document.querySelector(".cg-date-picker-story");

  if (root) {
    bindDateTimePicker(root);
  }
}

function bindWheelPickerStorybook() {
  const root = document.querySelector(".cg-wheel-picker-story");

  if (root) {
    bindTimeWheelPicker(root);
  }
}

function bindSegmentedControlStorybook() {
  document.querySelectorAll(".page--component .cg-segment[data-segment-value]").forEach((segment) => {
    segment.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("variant");
      url.searchParams.set("selected", segment.dataset.segmentValue || "1");
      window.history.replaceState({}, "", url);
      render();
    });
  });

  document.querySelectorAll("[data-story-control]").forEach((control) => {
    control.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const key = control.dataset.storyControl;
      const value = control.dataset.storyValue;

      url.searchParams.delete("variant");

      if (key === "segments") {
        const nextSegments = Number(value) || 2;
        const selected = Number(url.searchParams.get("selected")) || 1;

        url.searchParams.set("segments", String(nextSegments));

        if (selected > nextSegments) {
          url.searchParams.set("selected", String(nextSegments));
        }
      }

      if (key === "badges") {
        url.searchParams.set("badges", value || "true");
      }

      if (key === "layout") {
        url.searchParams.set("layout", value || "fit");

        if (value === "scroll" && !url.searchParams.get("segments")) {
          url.searchParams.set("segments", "5");
        }
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });

  bindSegmentedControlSwipe(document.querySelector(".page--component"));
}

function bindRowStorybook() {
  const root = document.querySelector(".page--component");

  if (root) {
    bindGlassSelects(root);
  }

  document.querySelectorAll("[data-row-control]").forEach((control) => {
    control.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const key = control.dataset.rowControl;
      const value = control.dataset.rowValue;

      url.searchParams.delete("variant");

      if (key && value) {
        url.searchParams.set(key, value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

let previousAppHash = "";
let currentAppHash = window.location.hash || "#/clients";

function bindHistoryBackButtons(root = document) {
  root.querySelectorAll("[data-history-back]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const fallback = button.dataset.historyFallback || button.getAttribute("href") || "#/tasks";

      if (previousAppHash && previousAppHash !== window.location.hash) {
        window.history.back();
        return;
      }

      window.location.hash = fallback;
    });
  });
}

function bindAppEvents(route, routeParam = "") {
  bindHistoryBackButtons();

  if (route === "call-results") {
    const root = document.querySelector(".cg-app--call-results");
    bindLiveTextfieldEditors(root);
    bindGlassSelects(root);
    bindCallResultUpdateSheets();
    return;
  }

  if (route === "touches") {
    bindTouchFilterMenu(routeParam);
    return;
  }

  if (route === "clients" && !routeParam) {
    bindClientsSegments();
    bindClientsSortMenu();
    bindClientsAddMenu();
    return;
  }

  if (route === "clients" && routeParam) {
    bindClientDetailActions(routeParam);
    return;
  }

  if (route === "tasks") {
    bindTaskPeriodSegments();
    bindTasksSortMenu();
    return;
  }

  if (route === "settings") {
    bindSettingsApp();
    return;
  }

  if (route === "task") {
    bindTaskDetailActions(routeParam || "hot-overdue");
    return;
  }

  if (route === "new-client" || route === "edit-client") {
    bindClientForm(route, routeParam);
    return;
  }

  if (route !== "new-task" && route !== "edit-task") {
    return;
  }

  const form = document.querySelector(route === "edit-task" ? "#edit-task-form" : "#new-task-form");
  if (!form) {
    return;
  }

  bindAutoGrowTextareas(form);
  bindLiveTextfieldEditors(form);
  bindGlassSelects(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = getFormFieldValue(form, "title");
    const client = getFormFieldValue(form, "client");
    const type = getFormFieldValue(form, "type");

    if (!title) {
      form.querySelector('[name="title"]').focus();
      return;
    }

    if (route === "edit-task") {
      const taskId = routeParam || form.dataset.taskId || "hot-overdue";
      const currentTask = getTaskEditModel(taskId);
      const updatedTask = {
        title,
        client: getFormFieldValue(form, "client") || currentTask.client,
        type: getFormFieldValue(form, "type") || currentTask.type || "call",
        time: getFormFieldValue(form, "time") || currentTask.time || "Сегодня, 14:00",
        description: getFormFieldValue(form, "description"),
      };

      if (currentTask.isCreated) {
        saveCreatedTasks(
          getCreatedTasks().map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  ...updatedTask,
                }
              : task,
          ),
        );
      } else {
        const overrides = getTaskOverrides();

        if (isTaskOverrideMeaningful(taskId, updatedTask)) {
          saveTaskOverrides({
            ...overrides,
            [taskId]: updatedTask,
          });
        } else {
          delete overrides[taskId];
          saveTaskOverrides(overrides);
        }
      }

      window.location.hash = getHashSearchParams().get("back") || `#/task/${taskId}`;
      return;
    }

    if (!client) {
      form.querySelector('[name="client"]')?.closest("[data-glass-select]")?.querySelector("[data-glass-select-trigger]")?.focus();
      return;
    }

    if (!type) {
      form.querySelector('[name="type"]')?.closest("[data-glass-select]")?.querySelector("[data-glass-select-trigger]")?.focus();
      return;
    }

    const task = {
      id: `created-${Date.now()}`,
      title,
      client,
      type,
      time: getFormFieldValue(form, "time") || "Сегодня, 14:00",
      description: getFormFieldValue(form, "description"),
    };

    saveCreatedTasks([...getCreatedTasks(), task]);
    window.location.hash = getHashSearchParams().get("back") || `#/task/${task.id}`;
  });

  const updateSubmitState = () => {
    const title = getFormFieldValue(form, "title");
    const client = getFormFieldValue(form, "client");
    const type = getFormFieldValue(form, "type");
    const button = form.querySelector(".cg-new-task-save, .cg-new-task-submit");
    const isReady = route === "edit-task" ? Boolean(title) : Boolean(title && client && type);

    if (!button) {
      return;
    }

    button.disabled = !isReady;
    button.classList.toggle("is-ready", isReady);
    button.classList.toggle("is-disabled", !isReady);
  };

  form.addEventListener("input", updateSubmitState);
  form.addEventListener("change", updateSubmitState);
  updateSubmitState();

  bindDateTimePicker(form);
}

function bindSettingsApp() {
  const root = document.querySelector(".cg-app--settings");

  if (!root) {
    return;
  }

  root.querySelectorAll("[data-settings-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.settingsToggle;

      if (!key) {
        return;
      }

      const state = getSettingsState();
      saveSettingsState({ [key]: !state[key] });
      render();
    });
  });

  bindTimeWheelPicker(root);
}

function bindClientForm(route, routeParam = "") {
  const form = document.querySelector(route === "edit-client" ? "#edit-client-form" : "#new-client-form");

  if (!form) {
    return;
  }

  bindAutoGrowTextareas(form);

  const updateSubmitState = () => {
    const name = getClientFormName(form);
    const button = form.querySelector(".cg-new-task-save, .cg-client-create-submit");
    const isReady = Boolean(name);

    button.disabled = !isReady;
    button.classList.toggle("is-ready", isReady);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = getClientFormName(form);
    const company = getFormFieldValue(form, "company");
    const status = getFormFieldValue(form, "status") || "ordinary";

    if (!name) {
      form.querySelector('[name="name"], [name="firstName"]')?.focus();
      return;
    }

    const clientId = routeParam || form.dataset.clientId || "";
    const currentClient = route === "edit-client" ? getClientById(clientId) : null;
    const payload = {
      badgeLabel: status === "ordinary" ? "" : clientStatusOptions[status],
      company,
      description: getFormFieldValue(form, "description"),
      email: getFormFieldValue(form, "email"),
      initials: getInitials(name),
      name,
      phone: getFormFieldValue(form, "phone"),
      position: getFormFieldValue(form, "position"),
      price: formatClientPriceValue(getFormFieldValue(form, "price")),
      status,
    };

    if (route === "edit-client" && currentClient) {
      const createdClients = getCreatedClients();

      if (createdClients.some((client) => client.id === clientId)) {
        saveCreatedClients(
          createdClients.map((client) =>
            client.id === clientId
              ? {
                  ...client,
                  ...payload,
                  photo: client.photo || "",
                }
              : client,
          ),
        );
      } else {
        saveClientOverrides({
          ...getClientOverrides(),
          [clientId]: {
            ...payload,
            photo: currentClient.photo || "",
          },
        });
      }

      window.location.hash = `#/clients/${clientId}`;
      return;
    }

    const id = `client-${Date.now()}`;
    saveCreatedClients([
      ...getCreatedClients(),
      {
        ...payload,
        id,
        photo: "",
      },
    ]);
    window.location.hash = `#/clients/${id}`;
  });

  form.addEventListener("input", updateSubmitState);
  form.addEventListener("change", updateSubmitState);
  bindClientFieldFormatters(form);
  bindGlassSelects(form);
  updateSubmitState();
}

function bindClientFieldFormatters(form) {
  form.querySelectorAll("[data-format]").forEach((input) => {
    const format = input.dataset.format;
    const formatValue = () => {
      const current = input.value;
      let next = current;

      if (format === "phone") {
        next = current.replace(/[^\d+() -]/g, "").replace(/(?!^)\+/g, "");
      }

      if (format === "money") {
        const digits = current.replace(/\D/g, "");
        next = digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
      }

      if (format === "email") {
        next = current.replace(/[^a-zA-Z0-9@._%+-]/g, "").toLowerCase();
      }

      if (next !== current) {
        input.value = next;
      }
    };

    input.addEventListener("input", formatValue);
    input.addEventListener("blur", formatValue);
  });
}

function formatClientPriceValue(value) {
  if (!value) {
    return "Без бюджета";
  }

  return value.includes("₽") ? value : `${value} ₽`;
}

function getFormFieldValue(form, name) {
  return String(form.querySelector(`[name="${name}"]`)?.value || "").trim();
}

function getClientFormName(form) {
  const directName = getFormFieldValue(form, "name");

  if (directName) {
    return directName;
  }

  return [getFormFieldValue(form, "firstName"), getFormFieldValue(form, "lastName")].filter(Boolean).join(" ");
}

function bindTaskPeriodSegments() {
  document.querySelectorAll('[data-segment-scope="tasks"][data-segment-value]').forEach((segment) => {
    segment.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const value = segment.dataset.segmentValue || "today";

      if (value === "today") {
        url.searchParams.delete("taskPeriod");
      } else {
        url.searchParams.set("taskPeriod", value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });

  bindSegmentedControlSwipe(document.querySelector(".cg-app--tasks"));
}

function bindClientsSegments() {
  document.querySelectorAll('[data-segment-scope="clients"][data-segment-value]').forEach((segment) => {
    segment.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const value = segment.dataset.segmentValue || "all";

      if (value === "all") {
        url.searchParams.delete("clientsFilter");
      } else {
        url.searchParams.set("clientsFilter", value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });

  bindSegmentedControlSwipe(document.querySelector(".cg-app--clients"));
}

function bindSegmentedControlSwipe(root = document) {
  if (!root) {
    return;
  }

  const control = root.querySelector(".cg-segmented-control");

  if (!control || control.dataset.segmentSwipeBound === "true") {
    return;
  }

  control.dataset.segmentSwipeBound = "true";
  let startX = 0;
  let startY = 0;
  let pointerId = null;
  let startTarget = null;
  let suppressNextClick = false;

  const shouldIgnoreSwipe = (target) =>
    Boolean(target?.closest("input, textarea, select, [data-glass-select], [data-picker-modal], .cg-select-sheet, .cg-glass-menu"));

  const switchSegment = (direction) => {
    const segments = Array.from(control.querySelectorAll(".cg-segment"));
    const activeIndex = segments.findIndex((segment) => segment.classList.contains("is-active"));
    const nextIndex = activeIndex + direction;

    if (activeIndex < 0 || nextIndex < 0 || nextIndex >= segments.length) {
      return;
    }

    segments[nextIndex].click();
    segments[nextIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  root.addEventListener(
    "pointerdown",
    (event) => {
      if (!event.isPrimary || shouldIgnoreSwipe(event.target)) {
        startTarget = null;
        pointerId = null;
        return;
      }

      startX = event.clientX;
      startY = event.clientY;
      pointerId = event.pointerId;
      startTarget = event.target;
    },
  );

  root.addEventListener(
    "pointerup",
    (event) => {
      if (!startTarget || event.pointerId !== pointerId) {
        return;
      }

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      startTarget = null;
      pointerId = null;

      if (absX < 56 || absX < absY * 1.35) {
        return;
      }

      event.preventDefault();
      suppressNextClick = true;
      switchSegment(deltaX < 0 ? 1 : -1);
    },
  );

  root.addEventListener(
    "click",
    (event) => {
      if (!suppressNextClick) {
        return;
      }

      suppressNextClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  root.addEventListener("pointercancel", () => {
    startTarget = null;
    pointerId = null;
  });
}

function bindClientsSortMenu() {
  const wrap = document.querySelector(".cg-clients-header-wrap");
  const trigger = wrap?.querySelector('.cg-app-header .cg-icon-button[aria-label="Сортировка"]');
  const menu = wrap?.querySelector(".cg-clients-sort-menu");

  if (!wrap || !trigger || !menu) {
    return;
  }

  const closeOnOutsideClick = (event) => {
    if (!wrap.contains(event.target)) {
      setOpen(false);
    }
  };

  const setOpen = (isOpen) => {
    wrap.classList.toggle("is-sort-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.addEventListener("click", closeOnOutsideClick);
    } else {
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!wrap.classList.contains("is-sort-open"));
  });

  menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const value = item.dataset.menuValue || "hot";

      if (value === "hot") {
        url.searchParams.delete("clientsSort");
      } else {
        url.searchParams.set("clientsSort", value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function bindClientsAddMenu() {
  const bindInstance = (wrap, trigger, menu) => {
    if (!wrap || !trigger || !menu) {
      return;
    }

    const modal = document.querySelector("[data-crm-import-modal]");
    let importTimer = null;

    const closeOnOutsideClick = (event) => {
      if (!wrap.contains(event.target)) {
        setOpen(false);
      }
    };

    const setOpen = (isOpen) => {
      wrap.classList.toggle("is-add-open", isOpen);
      trigger.setAttribute("aria-expanded", String(isOpen));

      if (isOpen) {
        document.addEventListener("click", closeOnOutsideClick);
      } else {
        document.removeEventListener("click", closeOnOutsideClick);
      }
    };

    const setImportOpen = (isOpen) => {
      if (!modal) {
        return;
      }

      modal.hidden = !isOpen;
    };

    const startCrmImport = () => {
      setImportOpen(true);
      window.clearTimeout(importTimer);

      importTimer = window.setTimeout(() => {
        importClientsFromCrm();
        setImportOpen(false);

        const url = new URL(window.location.href);
        url.hash = "#/clients";
        url.searchParams.delete("clientsState");
        window.history.replaceState({}, "", url);
        render();
      }, 2000);
    };

    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!wrap.classList.contains("is-add-open"));
    });

    menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.dataset.menuValue || "manual";

        setOpen(false);

        if (value === "crm") {
          startCrmImport();
          return;
        }

        window.location.hash = "#/new-client";
      });
    });
  };

  bindInstance(
    document.querySelector(".cg-clients-header-wrap"),
    document.querySelector('.cg-clients-header-wrap .cg-app-header .cg-icon-button[aria-label="Добавить клиента"]'),
    document.querySelector(".cg-clients-header-wrap .cg-clients-add-menu"),
  );

  bindInstance(
    document.querySelector(".cg-clients-empty-add-wrap"),
    document.querySelector(".cg-clients-empty-add-wrap .cg-clients-empty-button"),
    document.querySelector(".cg-clients-empty-add-wrap .cg-clients-empty-add-menu"),
  );
}

function bindTasksSortMenu() {
  const wrap = document.querySelector(".cg-tasks-header-wrap");
  const trigger = wrap?.querySelector('.cg-app-header .cg-icon-button[aria-label="Сортировка"]');
  const menu = wrap?.querySelector(".cg-tasks-sort-menu");

  if (!wrap || !trigger || !menu) {
    return;
  }

  const closeOnOutsideClick = (event) => {
    if (!wrap.contains(event.target)) {
      setOpen(false);
    }
  };

  const setOpen = (isOpen) => {
    wrap.classList.toggle("is-sort-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.addEventListener("click", closeOnOutsideClick);
    } else {
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!wrap.classList.contains("is-sort-open"));
  });

  menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const value = item.dataset.menuValue || "time";

      if (value === "time") {
        url.searchParams.delete("tasksSort");
      } else {
        url.searchParams.set("tasksSort", value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function setTaskListRoute(period = "today") {
  const url = new URL(window.location.href);
  url.hash = "#/tasks";

  if (period === "completed") {
    url.searchParams.set("taskPeriod", "completed");
  } else {
    url.searchParams.delete("taskPeriod");
  }

  window.history.replaceState({}, "", url);
  render();
}

function bindCallProgressModal(root = document) {
  const trigger = root.querySelector('[data-action="call"]');
  const messageTrigger = root.querySelector('[data-action="message"]');
  const modal = root.querySelector("[data-call-progress-modal]");
  const chatModal = root.querySelector("[data-chat-progress-modal]");
  const analysisModal = root.querySelector("[data-call-analysis-modal]");
  const cancelButton = modal?.querySelector("[data-call-cancel]");
  const finishButton = modal?.querySelector("[data-call-finish]");
  const chatCancelButton = chatModal?.querySelector("[data-chat-cancel]");
  const chatFinishButton = chatModal?.querySelector("[data-chat-finish]");
  const analysisClose = analysisModal?.querySelector("[data-call-analysis-close]");
  const analysisStart = analysisModal?.querySelector("[data-call-analysis-start]");
  const analysisProgress = analysisModal?.querySelector("[data-analysis-progress-modal]");
  const analysisTime = analysisModal?.querySelector("[data-call-analysis-time]");
  const pendingTouchTriggers = root.querySelectorAll("[data-open-pending-touch]");
  const resultHref = analysisStart?.dataset.callResultHref || finishButton?.dataset.callResultHref || "";
  const clientId = getClientIdFromCallResultHref(resultHref);

  if (!analysisModal) {
    return;
  }

  const setModalOpen = (isOpen) => {
    if (!modal) {
      return;
    }

    modal.hidden = !isOpen;

    if (isOpen) {
      finishButton?.focus();
    } else if (trigger) {
      trigger.focus();
    }
  };

  const setChatModalOpen = (isOpen) => {
    if (!chatModal) {
      return;
    }

    chatModal.hidden = !isOpen;

    if (isOpen) {
      chatFinishButton?.focus();
    } else if (messageTrigger) {
      messageTrigger.focus();
    }
  };

  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    setModalOpen(true);
  });

  messageTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    setChatModalOpen(true);
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      setModalOpen(false);
    }
  });

  chatModal?.addEventListener("click", (event) => {
    if (event.target === chatModal) {
      setChatModalOpen(false);
    }
  });

  const setAnalysisOpen = (isOpen) => {
    analysisModal.hidden = !isOpen;
  };

  analysisModal.addEventListener("click", (event) => {
    if (event.target === analysisModal || event.target === analysisClose) {
      let didSavePendingTouch = false;

      if (clientId && analysisProgress?.hidden !== false) {
        setPendingClientTouch(clientId, {
          time: analysisModal.dataset.pendingTouchTime || analysisTime?.textContent.trim() || formatCallTouchTime(),
        });
        didSavePendingTouch = true;
      }

      setAnalysisOpen(false);

      if (didSavePendingTouch) {
        render();
      }
    }
  });

  pendingTouchTriggers.forEach((button) => {
    button.addEventListener("click", () => setAnalysisOpen(true));
  });

  cancelButton?.addEventListener("click", () => setModalOpen(false));
  chatCancelButton?.addEventListener("click", () => setChatModalOpen(false));
  finishButton?.addEventListener("click", () => {
    const currentTouchTime = formatCallTouchTime();

    analysisModal.dataset.pendingTouchTime = currentTouchTime;
    addClientCallTouch(clientId, currentTouchTime);

    if (analysisTime) {
      analysisTime.textContent = currentTouchTime;
    }

    setModalOpen(false);
    setAnalysisOpen(true);
  });

  chatFinishButton?.addEventListener("click", () => {
    const currentTouchTime = formatCallTouchTime();

    addClientChatTouch(clientId, currentTouchTime);
    setPendingClientTouch(clientId, {
      type: "chat",
      title: "Чат в WhatsApp",
      time: currentTouchTime,
    });
    setChatModalOpen(false);
    render();
  });

  analysisStart?.addEventListener("click", () => {
    const href = analysisStart.dataset.callResultHref || "#/call-results";
    const hrefClientId = getClientIdFromCallResultHref(href);

    if (hrefClientId) {
      clearPendingClientTouch(hrefClientId);
    }

    if (analysisProgress) {
      analysisProgress.hidden = false;
    }

    window.setTimeout(() => {
      window.location.hash = href.replace(/^#/, "");
    }, 2000);
  });
}

function bindCallResultUpdateSheets() {
  const root = document.querySelector(".cg-app--call-results");

  if (!root) {
    return;
  }

  const setSheetOpen = (id, isOpen) => {
    const modal = root.querySelector(`[data-call-result-update-modal="${CSS.escape(id)}"]`);

    if (modal) {
      modal.hidden = !isOpen;
    }
  };

  root.querySelectorAll("[data-call-result-update]").forEach((button) => {
    button.addEventListener("click", () => setSheetOpen(button.dataset.callResultUpdate || "", true));
  });

  root.querySelectorAll("[data-call-result-update-modal]").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target?.hasAttribute("data-call-result-update-close")) {
        modal.hidden = true;
      }
    });
  });

  root.querySelectorAll("[data-call-result-update-dismiss]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.callResultUpdateDismiss;

      if (!id) {
        return;
      }

      saveDismissedCallResultUpdates([...getDismissedCallResultUpdates(), id]);
      render();
    });
  });
}

function bindTaskDetailActions(taskId = "hot-overdue") {
  const wrap = document.querySelector(".cg-task-actions-wrap");
  const appRoot = document.querySelector(".cg-app--task-detail");
  const trigger = wrap?.querySelector('[data-action="task-more"]');
  const menu = wrap?.querySelector(".cg-task-more-menu");
  const completeModal = document.querySelector("[data-task-complete-modal]");
  const deleteModal = document.querySelector("[data-task-delete-modal]");
  const completeCancelButton = completeModal?.querySelector("[data-task-complete-cancel]");
  const completeConfirmButton = completeModal?.querySelector("[data-task-complete-confirm]");
  const deleteCancelButton = deleteModal?.querySelector("[data-task-delete-cancel]");
  const deleteConfirmButton = deleteModal?.querySelector("[data-task-delete-confirm]");

  if (appRoot || wrap) {
    bindCallProgressModal(appRoot || wrap);
  }

  if (
    !wrap ||
    !trigger ||
    !menu ||
    !completeModal ||
    !deleteModal ||
    !completeCancelButton ||
    !completeConfirmButton ||
    !deleteCancelButton ||
    !deleteConfirmButton
  ) {
    return;
  }

  const closeMenuOnOutsideClick = (event) => {
    if (!wrap.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const setMenuOpen = (isOpen) => {
    wrap.classList.toggle("is-more-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.addEventListener("click", closeMenuOnOutsideClick);
    } else {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    }
  };

  const setModalOpen = (modal, fallbackButton, isOpen) => {
    modal.hidden = !isOpen;

    if (isOpen) {
      modal.querySelector(".cg-alert-action")?.focus();
    } else {
      fallbackButton.focus();
    }
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuOpen(!wrap.classList.contains("is-more-open"));
  });

  menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = item.dataset.menuValue || "";
      setMenuOpen(false);

      if (action === "complete") {
        setModalOpen(completeModal, trigger, true);
      }

      if (action === "delete") {
        setModalOpen(deleteModal, trigger, true);
      }
    });
  });

  completeCancelButton.addEventListener("click", () => setModalOpen(completeModal, trigger, false));
  deleteCancelButton.addEventListener("click", () => setModalOpen(deleteModal, trigger, false));

  completeConfirmButton.addEventListener("click", () => {
    completeTask(taskId);
    setTaskListRoute("completed");
  });

  deleteConfirmButton.addEventListener("click", () => {
    deleteTask(taskId);
    setTaskListRoute("today");
  });
}

function bindClientDetailActions(clientId = "omar") {
  const wrap = document.querySelector(".cg-client-actions-wrap");
  const appRoot = document.querySelector(".cg-app--client-detail");
  const trigger = wrap?.querySelector('[data-action="client-more"]');
  const menu = wrap?.querySelector(".cg-client-more-menu");
  const modal = document.querySelector("[data-client-delete-modal]");
  const cancelButton = modal?.querySelector("[data-client-delete-cancel]");
  const confirmButton = modal?.querySelector("[data-client-delete-confirm]");

  if (appRoot || wrap) {
    bindCallProgressModal(appRoot || wrap);
  }

  if (!wrap || !trigger || !menu || !modal || !cancelButton || !confirmButton) {
    return;
  }

  const closeMenuOnOutsideClick = (event) => {
    if (!wrap.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const setMenuOpen = (isOpen) => {
    wrap.classList.toggle("is-more-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.addEventListener("click", closeMenuOnOutsideClick);
    } else {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    }
  };

  const setModalOpen = (isOpen) => {
    modal.hidden = !isOpen;

    if (isOpen) {
      cancelButton.focus();
    } else {
      trigger.focus();
    }
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuOpen(!wrap.classList.contains("is-more-open"));
  });

  menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      const action = item.dataset.menuValue || "";
      setMenuOpen(false);

      if (action === "analyze") {
        window.location.hash = `#/touches/${clientId}`;
        return;
      }

      if (action === "delete") {
        setModalOpen(true);
      }
    });
  });

  cancelButton.addEventListener("click", () => setModalOpen(false));
  confirmButton.addEventListener("click", () => {
    deleteClient(clientId);
    window.location.hash = "#/clients";
  });
}

function bindTouchFilterMenu(clientId = "omar") {
  const wrap = document.querySelector(".cg-touches-header-wrap");
  const trigger = wrap?.querySelector('.cg-app-header .cg-icon-button[aria-label="Фильтр"]');
  const menu = wrap?.querySelector(".cg-touches-filter-menu");

  if (!wrap || !trigger || !menu) {
    return;
  }

  const closeOnOutsideClick = (event) => {
    if (!wrap.contains(event.target)) {
      setOpen(false);
    }
  };

  const setOpen = (isOpen) => {
    wrap.classList.toggle("is-filter-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.addEventListener("click", closeOnOutsideClick);
    } else {
      document.removeEventListener("click", closeOnOutsideClick);
    }
  };

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!wrap.classList.contains("is-filter-open"));
  });

  menu.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const url = new URL(window.location.href);
      const value = item.dataset.menuValue || "all";

      if (value === "all") {
        url.searchParams.delete("touchFilter");
      } else {
        url.searchParams.set("touchFilter", value);
      }

      window.history.replaceState({}, "", url);
      render();
    });
  });
}

function bindAutoGrowTextareas(form) {
  form.querySelectorAll("textarea.cg-form-input, textarea.cg-client-create-textarea, textarea.cg-live-textfield-input[data-textfield-autogrow]").forEach((textarea) => {
    const resize = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    resize();
    textarea.addEventListener("input", resize);
  });
}

function bindGlassSelects(form) {
  const closeInlineMenus = () => {
    form.querySelectorAll("[data-glass-select].is-open").forEach((select) => {
      select.classList.remove("is-open");
      select.querySelector("[data-glass-select-trigger]")?.setAttribute("aria-expanded", "false");
    });
  };

  form.querySelectorAll("[data-glass-select]").forEach((select) => {
    const trigger = select.querySelector("[data-glass-select-trigger]");
    const input = select.querySelector('input[type="hidden"]');

    trigger?.addEventListener("click", (event) => {
      event.stopPropagation();
      closeInlineMenus();
      trigger.setAttribute("aria-expanded", "true");
      openSelectSheet(select);
    });

    select.querySelectorAll(".cg-glass-menu-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.stopPropagation();
        const value = item.dataset.menuValue || "";
        const label = item.dataset.menuLabel || "";

        applySelectValue(select, value, label);
        closeInlineMenus();
      });
    });
  });

  form.addEventListener("click", closeInlineMenus);
}

function getSelectValueLabel(select) {
  return select.querySelector(".cg-form-select-value, .cg-client-create-select-value, .cg-client-create-select-badge, .cg-live-select-value, .cg-live-select-badge, .cg-picker-reminder-value");
}

function applySelectValue(select, value, label) {
  const input = select.querySelector('input[type="hidden"]');
  const valueLabel = getSelectValueLabel(select);
  const trigger = select.querySelector("[data-glass-select-trigger]");

  if (input) {
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  if (valueLabel) {
    valueLabel.textContent = label;
    valueLabel.classList.remove("is-placeholder");

    if (select.dataset.selectContent === "badge") {
      const badgeScopeClass = valueLabel.classList.contains("cg-client-create-select-value") || valueLabel.classList.contains("cg-client-create-select-badge")
        ? "cg-client-create-select-badge"
        : "cg-live-select-badge";
      valueLabel.className = `cg-badge cg-badge--status-${value} ${badgeScopeClass}`;
    }
  }

  select.querySelectorAll(".cg-glass-menu-item").forEach((option) => {
    const isSelected = option.dataset.menuValue === value;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });

  trigger?.setAttribute("aria-expanded", "false");
}

function getSelectSheetTitle(select) {
  const inputName = select.querySelector('input[type="hidden"]')?.name || "";
  const titleByName = {
    client: "Клиент",
    "call-result-status": "Статус",
    reminder: "Напомнить",
    status: "Тип клиента",
    type: "Тип задачи",
  };

  if (titleByName[inputName]) {
    return titleByName[inputName];
  }

  return (
    select.closest(".cg-live-select")?.querySelector(".cg-live-select-label")?.textContent.trim() ||
    select.closest(".cg-row--actionable, .cg-row--form")?.querySelector(".cg-form-row-label")?.textContent.trim() ||
    select.closest(".cg-client-create-field")?.querySelector(".cg-client-create-label")?.textContent.trim() ||
    "Выбор"
  );
}

function renderSelectSheetRow({ value, label, selected }, index) {
  return `
    <button class="cg-row cg-row--regular cg-select-sheet-option${selected ? " is-selected" : ""}" type="button" data-sheet-value="${escapeHtml(value)}" data-sheet-label="${escapeHtml(label)}" aria-pressed="${selected}">
      <div class="cg-row-main">
        <div class="cg-row-separator" aria-hidden="true"></div>
        <div class="cg-row-content">
          <div class="cg-row-copy">
            <span class="cg-row-title">${escapeHtml(label)}</span>
          </div>
          <div class="cg-row-trailing">
            ${selected ? '<span class="cg-row-check" aria-hidden="true"></span>' : ""}
          </div>
        </div>
      </div>
    </button>
  `;
}

function openSelectSheet(select) {
  document.querySelector(".cg-select-sheet-scrim")?.remove();

  const trigger = select.querySelector("[data-glass-select-trigger]");
  const input = select.querySelector('input[type="hidden"]');
  const items = Array.from(select.querySelectorAll(".cg-glass-menu-item")).map((item) => ({
    value: item.dataset.menuValue || "",
    label: item.dataset.menuLabel || "",
  }));
  const title = getSelectSheetTitle(select);
  const currentValue = input?.value || "";

  const scrim = document.createElement("div");
  scrim.className = "cg-select-sheet-scrim";
  scrim.innerHTML = `
    <section class="cg-select-sheet" role="dialog" aria-modal="true" aria-labelledby="select-sheet-title">
      <div class="cg-select-sheet-toolbar">
        <div class="cg-select-sheet-grabber" aria-hidden="true"><span></span></div>
        <div class="cg-select-sheet-heading">
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
          <h2 class="cg-select-sheet-title" id="select-sheet-title">${escapeHtml(title)}</h2>
          <span class="cg-select-sheet-spacer" aria-hidden="true"></span>
        </div>
      </div>
      <div class="cg-row-card cg-select-sheet-list">
        ${items.map((item, index) => renderSelectSheetRow({ ...item, selected: item.value === currentValue }, index)).join("")}
      </div>
    </section>
  `;

  const closeSheet = () => {
    trigger?.setAttribute("aria-expanded", "false");
    scrim.remove();
  };

  scrim.addEventListener("click", (event) => {
    if (event.target === scrim) {
      closeSheet();
    }
  });

  scrim.querySelectorAll(".cg-select-sheet-option").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.sheetValue || "";
      const label = option.dataset.sheetLabel || "";

      if (value) {
        applySelectValue(select, value, label);
      }

      closeSheet();
    });
  });

  document.body.append(scrim);
}

function bindTimeWheelPicker(root = document) {
  const pickerRoot = root || document;
  const modal = pickerRoot.querySelector("[data-time-wheel-modal]");
  const sheet = pickerRoot.querySelector("[data-time-wheel-sheet]");
  const isInline = sheet?.dataset.timeWheelInline === "true";
  const standaloneDrum = !sheet ? pickerRoot.querySelector("[data-time-wheel-drum]") : null;

  if (!sheet && !standaloneDrum) {
    return;
  }

  const wheelRoot = sheet || standaloneDrum;
  const titleNode = sheet?.querySelector("[data-time-wheel-title]");
  const startField = sheet?.querySelector('[data-time-wheel-field="start"]');
  const endField = sheet?.querySelector('[data-time-wheel-field="end"]');
  const startLabel = sheet?.querySelector("[data-time-wheel-start-label]");
  const startValue = sheet?.querySelector("[data-time-wheel-start-value]");
  const endValue = sheet?.querySelector("[data-time-wheel-end-value]");
  const hourButtons = Array.from(wheelRoot.querySelectorAll("[data-time-wheel-hour]"));
  const minuteButtons = Array.from(wheelRoot.querySelectorAll("[data-time-wheel-minute]"));
  const closeButtons = Array.from(wheelRoot.querySelectorAll(".cg-time-wheel-cancel, [data-time-wheel-close]"));
  const doneButton = wheelRoot.querySelector(".cg-time-wheel-done");
  const initialHour = wheelRoot.querySelector("[data-time-wheel-hour].is-active")?.dataset.timeWheelHour || "07";
  const initialMinute = wheelRoot.querySelector("[data-time-wheel-minute].is-active")?.dataset.timeWheelMinute || "10";
  let activeField = "start";
  let activeStartKey = "";
  let activeEndKey = "";
  let activeMode = sheet?.dataset.timeWheelMode || "single";
  let currentStart = startValue?.textContent.trim() || `${initialHour}:${initialMinute}`;
  let currentEnd = endValue?.textContent.trim() || "07:30";
  let isSyncingWheel = false;
  let wheelScrollTimer = 0;

  const getActiveValue = () => (activeField === "end" ? currentEnd : currentStart);
  const setActiveValue = (value) => {
    if (activeField === "end") {
      currentEnd = value;
    } else {
      currentStart = value;
    }
  };

  const syncFieldValues = () => {
    if (startValue) {
      startValue.textContent = currentStart;
    }

    if (endValue) {
      endValue.textContent = currentEnd;
    }
  };

  const getColumnItemHeight = (column) => column.querySelector(".cg-time-wheel-item")?.offsetHeight || 44;
  const getColumnCycleHeight = (column) => {
    const optionCount = Number(column.dataset.timeWheelOptions) || 1;
    return optionCount * getColumnItemHeight(column);
  };
  const getColumnActiveButton = (column, value) => {
    const kind = column.dataset.timeWheelColumn || "";
    return (
      column.querySelector(`[data-time-wheel-${kind}="${CSS.escape(value)}"][data-time-wheel-cycle="${timeWheelMiddleCycle}"]`) ||
      column.querySelector(`[data-time-wheel-${kind}="${CSS.escape(value)}"]`)
    );
  };
  const keepColumnLooped = (column) => {
    const cycleHeight = getColumnCycleHeight(column);
    const minScroll = cycleHeight;
    const maxScroll = cycleHeight * (timeWheelCycleCount - 2);

    if (!cycleHeight) {
      return;
    }

    if (column.scrollTop < minScroll) {
      isSyncingWheel = true;
      column.scrollTop += cycleHeight * (timeWheelCycleCount - 2);
      isSyncingWheel = false;
    } else if (column.scrollTop > maxScroll) {
      isSyncingWheel = true;
      column.scrollTop -= cycleHeight * (timeWheelCycleCount - 2);
      isSyncingWheel = false;
    }
  };
  const getCenteredWheelButton = (column) => {
    const columnRect = column.getBoundingClientRect();
    const centerY = columnRect.top + columnRect.height / 2;
    let closestButton = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    column.querySelectorAll(".cg-time-wheel-item").forEach((button) => {
      const rect = button.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - centerY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestButton = button;
      }
    });

    return closestButton;
  };
  const selectCenteredWheelValue = (column) => {
    if (isSyncingWheel) {
      return;
    }

    keepColumnLooped(column);
    const button = getCenteredWheelButton(column);
    const kind = column.dataset.timeWheelColumn || "";
    const value = button?.dataset[`timeWheel${kind.charAt(0).toUpperCase()}${kind.slice(1)}`];

    if (!value) {
      return;
    }

    const parsed = parseTimeWheelValue(getActiveValue());
    const next = kind === "hour" ? `${value}:${parsed.minute}` : `${parsed.hour}:${value}`;
    setActiveValue(next);
    syncFieldValues();
    syncActiveField({ scroll: false });
  };
  const bindWheelColumnLoop = (column) => {
    column.addEventListener("scroll", () => {
      if (isSyncingWheel) {
        return;
      }

      keepColumnLooped(column);
      window.clearTimeout(wheelScrollTimer);
      wheelScrollTimer = window.setTimeout(() => selectCenteredWheelValue(column), 80);
    });
  };

  const syncActiveField = ({ scroll = true } = {}) => {
    startField?.classList.toggle("is-active", activeField === "start");
    endField?.classList.toggle("is-active", activeField === "end");

    const parsed = parseTimeWheelValue(getActiveValue());
    hourButtons.forEach((button) => {
      const isActive = button.dataset.timeWheelHour === parsed.hour;
      button.classList.toggle("is-active", isActive);
    });
    minuteButtons.forEach((button) => {
      const isActive = button.dataset.timeWheelMinute === parsed.minute;
      button.classList.toggle("is-active", isActive);
    });

    if (scroll && !sheet?.dataset.timeWheelNoScroll) {
      isSyncingWheel = true;
      wheelRoot.querySelectorAll("[data-time-wheel-column]").forEach((column) => {
        const value = column.dataset.timeWheelColumn === "hour" ? parsed.hour : parsed.minute;
        getColumnActiveButton(column, value)?.scrollIntoView({ block: "center" });
      });
      window.requestAnimationFrame(() => {
        isSyncingWheel = false;
      });
    }
  };

  const setPickerOpen = (isOpen) => {
    if (isInline) {
      return;
    }

    if (modal) {
      modal.hidden = !isOpen;
    }
  };

  const configurePicker = ({ mode = "single", title = "Время", start = "07:10", end = "07:30", startKey = "", endKey = "" } = {}) => {
    const parsedStart = parseTimeWheelValue(start);
    const parsedEnd = parseTimeWheelValue(end);
    activeMode = mode;
    activeStartKey = startKey;
    activeEndKey = endKey;
    activeField = "start";
    currentStart = `${parsedStart.hour}:${parsedStart.minute}`;
    currentEnd = `${parsedEnd.hour}:${parsedEnd.minute}`;
    if (sheet) {
      sheet.dataset.timeWheelMode = mode;
      sheet.classList.toggle("is-range", mode === "range");
    }

    if (titleNode) {
      titleNode.textContent = title;
    }

    if (startLabel) {
      startLabel.textContent = mode === "range" ? "Начало" : "Время";
    }

    if (endField) {
      endField.hidden = mode !== "range";
    }

    syncFieldValues();
    syncActiveField();
    setPickerOpen(true);
  };

  const updateWheelValue = (part, value) => {
    const parsed = parseTimeWheelValue(getActiveValue());
    const next = part === "hour" ? `${value}:${parsed.minute}` : `${parsed.hour}:${value}`;
    setActiveValue(next);
    syncFieldValues();
    syncActiveField();
  };

  startField?.addEventListener("click", () => {
    activeField = "start";
    syncActiveField();
  });

  endField?.addEventListener("click", () => {
    if (activeMode !== "range") {
      return;
    }

    activeField = "end";
    syncActiveField();
  });

  hourButtons.forEach((button) => {
    button.addEventListener("click", () => updateWheelValue("hour", button.dataset.timeWheelHour || "00"));
  });

  minuteButtons.forEach((button) => {
    button.addEventListener("click", () => updateWheelValue("minute", button.dataset.timeWheelMinute || "00"));
  });

  wheelRoot.querySelectorAll("[data-time-wheel-column]").forEach((column) => {
    bindWheelColumnLoop(column);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => setPickerOpen(false));
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal || event.target?.hasAttribute("data-time-wheel-close")) {
      setPickerOpen(false);
    }
  });

  doneButton?.addEventListener("click", () => {
    if (activeStartKey) {
      const nextState = { [activeStartKey]: currentStart };

      if (activeMode === "range" && activeEndKey) {
        nextState[activeEndKey] = currentEnd;
      }

      saveSettingsState(nextState);
      setPickerOpen(false);
      render();
      return;
    }

    setPickerOpen(false);
  });

  pickerRoot.querySelectorAll("[data-settings-time-start]").forEach((button) => {
    button.addEventListener("click", () => {
      const state = getSettingsState();
      const startKey = button.dataset.settingsTimeStart || "";
      const endKey = button.dataset.settingsTimeEnd || "";
      configurePicker({
        mode: button.dataset.settingsTimeMode || "single",
        title: button.dataset.settingsTimeTitle || "Время",
        start: state[startKey] || defaultSettingsState[startKey] || "07:10",
        end: state[endKey] || defaultSettingsState[endKey] || "07:30",
        startKey,
        endKey,
      });
    });
  });

  configurePicker({
    mode: sheet?.dataset.timeWheelMode || "single",
    title: titleNode?.textContent.trim() || "Время",
    start: currentStart,
    end: currentEnd,
  });
  setPickerOpen(false);
}

function bindDateTimePicker(form) {
  const timeInput = form.querySelector(".cg-form-time-input");
  const timeTriggers = Array.from(form.querySelectorAll("[data-time-trigger]"));
  const timeTrigger = timeTriggers[0];
  const timeValue = form.querySelector(".cg-form-time-value");
  const pickerModal = form.querySelector("[data-picker-modal]");
  const picker = form.querySelector(".cg-date-time-picker");
  const pickerBody = form.querySelector(".cg-picker-body");
  const scrim = form.querySelector(".cg-picker-scrim");
  let calendarSlot = form.querySelector("[data-picker-calendar]");
  const clearButton = form.querySelector("[data-picker-clear]");
  const timeToggle = form.querySelector('[data-picker-toggle="time"]');
  const endToggle = form.querySelector('[data-picker-toggle="end"]');
  const startRow = form.querySelector('[data-picker-range="start"]');
  const endRow = form.querySelector("[data-picker-end-row]");
  const startDateField = form.querySelector('[data-picker-field="start-date"]');
  const startTimeField = form.querySelector('[data-picker-field="start-time"]');
  const endDateField = form.querySelector('[data-picker-field="end-date"]');
  const endTimeField = form.querySelector('[data-picker-field="end-time"]');
  const reminderSelect = form.querySelector("[data-picker-reminder-select]");
  const isInline = picker?.dataset.pickerInline === "true";
  const parsedInitialValue = parseTaskTimeValueForPicker(timeInput?.value || "");
  let selectedDate = parsedInitialValue.start.date;
  let endDate = new Date(selectedDate);
  endDate = parsedInitialValue.end.date;
  let currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  let includeTime = parsedInitialValue.includeTime || timeInput?.dataset.pickerIncludeTime === "true";
  let includeEnd = parsedInitialValue.hasEnd || timeInput?.dataset.pickerIncludeEnd === "true";
  let activeEndpoint = "start";
  let isEmpty = timeInput?.dataset.pickerEmpty === "true" && !timeInput.value;
  const taskEndDisplayRow = form.querySelector("[data-task-end-time-row]");
  const taskStartLabel = form.querySelector("[data-task-start-label]");
  let pickerTouchY = 0;

  if (!timeInput || !timeTrigger || !timeValue || !picker || !pickerBody || !scrim || (!isInline && !pickerModal) || !calendarSlot || !clearButton || !timeToggle || !endToggle || !startRow || !endRow || !startDateField || !startTimeField || !endDateField || !endTimeField) {
    return;
  }

  reminderSelect?.querySelector("[data-glass-select-trigger]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openSelectSheet(reminderSelect);
  });

  startDateField.value = formatPickerDate(selectedDate);
  startTimeField.value = parsedInitialValue.start.time || startTimeField.value || "14:00";
  endDateField.value = formatPickerDate(endDate);
  endTimeField.value = parsedInitialValue.end.time || endTimeField.value || "15:00";

  const setPickerOpen = (isOpen) => {
    if (isInline) {
      picker.hidden = false;
      scrim.hidden = true;
      form.classList.remove("is-picker-open");
      picker.setAttribute("aria-hidden", "false");
      return;
    }

    if (pickerModal) {
      pickerModal.hidden = !isOpen;
    }
    form.classList.toggle("is-picker-open", isOpen);
    picker.setAttribute("aria-hidden", String(!isOpen));
  };

  const getStartTime = () => parsePickerTimeText(startTimeField.value || "14:00", "14:00");
  const getEndTime = () => parsePickerTimeText(endTimeField.value || "15:00", "15:00");
  const getActiveDate = () => (includeEnd && activeEndpoint === "end" ? endDate : selectedDate);
  const updateVisibleTimeValue = (nextValue) => {
    const range = getTaskTimeRangeParts(nextValue);
    form.querySelectorAll("[data-time-value='single'], [data-time-value='start']").forEach((node) => {
      node.textContent = range.hasEnd ? range.start : nextValue;
      node.classList.toggle("is-placeholder", isEmpty);
    });
    form.querySelectorAll("[data-time-value='end']").forEach((node) => {
      node.textContent = range.end || "";
      node.classList.toggle("is-placeholder", isEmpty);
    });
  };

  const setActiveEndpoint = (endpoint) => {
    activeEndpoint = includeEnd && endpoint === "end" ? "end" : "start";
    startRow.classList.toggle("is-active", activeEndpoint === "start");
    endRow.classList.toggle("is-active", activeEndpoint === "end");
    currentMonth = new Date(getActiveDate().getFullYear(), getActiveDate().getMonth(), 1);
    renderCalendar();
  };

  const validateEndValue = () => {
    const startDateTime = getPickerDateTimeValue(selectedDate, includeTime ? getStartTime() : "00:00");
    const endDateTime = getPickerDateTimeValue(endDate, includeTime ? getEndTime() : "00:00");

    if (endDateTime < startDateTime) {
      endDate = new Date(selectedDate);
      endDateField.value = formatPickerDate(endDate);
      endTimeField.value = getStartTime();
    }
  };

  const commitValue = ({ syncFields = true } = {}) => {
    validateEndValue();

    const startTime = getStartTime();
    const endTime = getEndTime();
    const startValue = formatPickerValue(selectedDate, {
      includeTime,
      hour: startTime.split(":")[0],
      minute: startTime.split(":")[1],
    });
    const endValue = formatPickerValue(endDate, {
      includeTime,
      hour: endTime.split(":")[0],
      minute: endTime.split(":")[1],
    });
    const nextValue = includeEnd ? `${startValue} — ${endValue}` : startValue;

    if (syncFields) {
      startDateField.value = formatPickerDate(selectedDate);
      startTimeField.value = startTime;
      endDateField.value = formatPickerDate(endDate);
      endTimeField.value = endTime;
    }

    isEmpty = false;
    timeInput.value = nextValue;
    timeInput.dataset.pickerDate = getPickerDateIso(selectedDate);
    timeInput.dataset.pickerIncludeTime = String(includeTime);
    timeInput.dataset.pickerIncludeEnd = String(includeEnd);
    delete timeInput.dataset.pickerEmpty;
    updateVisibleTimeValue(nextValue);
    timeInput.dispatchEvent(new Event("input", { bubbles: true }));
    timeInput.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const bindCalendarButtons = () => {
    calendarSlot.querySelector("[data-picker-prev-month]")?.addEventListener("click", () => {
      currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
      renderCalendar();
    });

    calendarSlot.querySelector("[data-picker-next-month]")?.addEventListener("click", () => {
      currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      renderCalendar();
    });

    calendarSlot.querySelectorAll("[data-picker-day]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextDate = new Date(`${button.dataset.pickerDay}T00:00:00`);

        if (includeEnd && activeEndpoint === "end") {
          endDate = nextDate;
        } else {
          selectedDate = nextDate;
        }

        currentMonth = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
        renderCalendar();
        commitValue();
      });
    });
  };

  function renderCalendar() {
    const renderedCalendar = renderPickerCalendar(currentMonth, getActiveDate());
    const template = document.createElement("template");
    template.innerHTML = renderedCalendar.trim();
    const nextCalendar = template.content.firstElementChild;
    calendarSlot.replaceWith(nextCalendar);
    calendarSlot = nextCalendar;
    bindCalendarButtons();
  }

  const syncToggles = () => {
    timeToggle.classList.toggle("is-on", includeTime);
    timeToggle.setAttribute("aria-pressed", String(includeTime));
    endToggle.classList.toggle("is-on", includeEnd);
    endToggle.setAttribute("aria-pressed", String(includeEnd));
    picker.classList.toggle("has-time", includeTime);
    picker.classList.toggle("has-end", includeEnd);
    endRow.hidden = !includeEnd;
    if (taskEndDisplayRow) {
      taskEndDisplayRow.hidden = !includeEnd;
    }
    if (taskStartLabel) {
      taskStartLabel.textContent = includeEnd ? "Начало" : "Дата";
    }

    if (!includeEnd && activeEndpoint === "end") {
      activeEndpoint = "start";
    }

    startRow.classList.toggle("is-active", activeEndpoint === "start");
    endRow.classList.toggle("is-active", includeEnd && activeEndpoint === "end");
  };

  timeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => setPickerOpen(true));
  });
  picker.addEventListener("wheel", (event) => {
    if (!isInline && pickerModal?.hidden) {
      return;
    }

    if (pickerBody.scrollHeight <= pickerBody.clientHeight) {
      return;
    }

    event.preventDefault();
    pickerBody.scrollTop += event.deltaY;
  }, { passive: false });
  picker.addEventListener("touchstart", (event) => {
    pickerTouchY = event.touches[0]?.clientY || 0;
  }, { passive: true });
  picker.addEventListener("touchmove", (event) => {
    if (!isInline && pickerModal?.hidden) {
      return;
    }

    if (pickerBody.scrollHeight <= pickerBody.clientHeight) {
      return;
    }

    const nextTouchY = event.touches[0]?.clientY || pickerTouchY;
    const deltaY = pickerTouchY - nextTouchY;
    pickerTouchY = nextTouchY;

    if (deltaY === 0) {
      return;
    }

    event.preventDefault();
    pickerBody.scrollTop += deltaY;
  }, { passive: false });
  scrim.addEventListener("click", () => setPickerOpen(false));
  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    isEmpty = true;
    timeInput.value = "";
    timeInput.dataset.pickerEmpty = "true";
    updateVisibleTimeValue(timeInput.dataset.pickerPlaceholder || "Задать время");
    timeInput.dispatchEvent(new Event("input", { bubbles: true }));
    timeInput.dispatchEvent(new Event("change", { bubbles: true }));
    setPickerOpen(false);
  });
  startDateField.addEventListener("input", () => {
    activeEndpoint = "start";
    selectedDate = parsePickerDateText(startDateField.value, selectedDate);
    currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    renderCalendar();
    commitValue({ syncFields: false });
  });
  startTimeField.addEventListener("input", () => {
    activeEndpoint = "start";
    commitValue({ syncFields: false });
  });
  endDateField.addEventListener("input", () => {
    activeEndpoint = "end";
    endDate = parsePickerDateText(endDateField.value, endDate);
    commitValue({ syncFields: false });
  });
  endTimeField.addEventListener("input", () => {
    activeEndpoint = "end";
    commitValue({ syncFields: false });
  });
  [startDateField, startTimeField].forEach((field) => {
    field.addEventListener("focus", () => setActiveEndpoint("start"));
    field.addEventListener("click", () => setActiveEndpoint("start"));
  });
  [endDateField, endTimeField].forEach((field) => {
    field.addEventListener("focus", () => setActiveEndpoint("end"));
    field.addEventListener("click", () => setActiveEndpoint("end"));
  });
  timeToggle.addEventListener("click", () => {
    includeTime = !includeTime;
    syncToggles();
    commitValue();
  });
  endToggle.addEventListener("click", () => {
    includeEnd = !includeEnd;
    activeEndpoint = includeEnd ? "end" : "start";
    syncToggles();
    commitValue();
    renderCalendar();
  });
  bindCalendarButtons();
  syncToggles();
  if (isEmpty) {
    updateVisibleTimeValue(timeInput.dataset.pickerPlaceholder || timeValue.textContent || "Задать время");
  } else if (!parsedInitialValue.hasUsableValue) {
    updateVisibleTimeValue(timeInput.value);
  } else {
    commitValue();
  }
}

window.addEventListener("hashchange", () => {
  previousAppHash = currentAppHash;
  currentAppHash = window.location.hash || "#/clients";

  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, "", url);
  window.scrollTo(0, 0);
  render();
});

render();
