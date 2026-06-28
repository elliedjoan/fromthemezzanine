export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Site navigation">
      <a className="site-nav-button site-nav-button-contents" href="/#contents" aria-label="Table of contents">
        <img src="/art/nav-table-of-contents.png" alt="" />
      </a>
      <a className="site-nav-button site-nav-button-about" href="/#about" aria-label="About">
        <img src="/art/nav-about.png" alt="" />
      </a>
    </header>
  );
}
