function getTodayLabel() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export function CustomerHomeWelcome() {
  return (
    <section className="grid gap-1">
      <h1 className="h6-medium m-0 primary-text-500">Welcome Mr.X !</h1>
      <p className="body-am-regular m-0 subtext-500">Everything you need to manage your Meta advertising workflow in one dashboard.</p>
    </section>
  );
}

export function CustomerHomeOverviewHeader() {
  const todayLabel = getTodayLabel();

  return (
    <div className="grid gap-1">
      <h2 className="h6-medium m-0 primary-text">Overview</h2>
      <p className="body-sm-regular m-0 subtext">
        Today is <span className="adsfixter-primary-text">{todayLabel}</span>
      </p>
    </div>
  );
}
