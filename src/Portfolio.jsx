import { useState } from 'react';
import { projects } from './content/projects.js';
import './styles/portfolio.css';

export function Portfolio() {
  const [dismissed, setDismissed] = useState(null);
  const contact = window.location.pathname.replace(/\/$/, '') === '/contact';
  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <a href={contact ? '/' : '/contact'}>{contact ? 'back to projects' : 'contact ellie'}</a>
      </header>
      <main className={contact ? 'portfolio-contact' : 'portfolio-main'}>
        {contact ? <section>
          <h1>contact ellie</h1>
          <p>Contact details coming soon.</p>
        </section> : <>
          <h1 className="portfolio-sr-only">Ellie Joan — projects</h1>
          <ul className="project-grid" aria-label="Projects">
            {projects.map((project) => {
              const Tag = project.href ? 'a' : 'button';
              return <li className="project-tile" key={project.id}
                onMouseEnter={() => setDismissed(null)} onFocus={() => setDismissed(null)}
                onKeyDown={(event) => { if (event.key === 'Escape') setDismissed(project.id); }}>
                <Tag className="project-link" href={project.href || undefined}
                  type={project.href ? undefined : 'button'}
                  aria-label={project.name} aria-describedby={`${project.id}-description`}>
                  <img src={project.image} alt={project.name} width="921" height="921" />
                </Tag>
                <div id={`${project.id}-description`} role="tooltip"
                  className={`project-description${dismissed === project.id ? ' is-dismissed' : ''}`}>
                  {project.description}
                  {!project.href && <span>Project link coming soon.</span>}
                </div>
              </li>;
            })}
          </ul>
        </>}
      </main>
    </div>
  );
}
