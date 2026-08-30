import { useCallback, useEffect, useMemo, useState } from 'react';
import { blocks, contents, cover } from './content/blocks.js';
import { CoverBlock } from './components/CoverBlock.jsx';
import { TableOfContentsBlock } from './components/TableOfContentsBlock.jsx';
import { ReaderBlock } from './components/ReaderBlock.jsx';
import { PageLightbox } from './components/PageLightbox.jsx';
import { SiteHeader } from './components/SiteHeader.jsx';
import { AboutSection } from './components/AboutPage.jsx';

const showDevTileNumbers = false;

export default function App() {
  const [activePage, setActivePage] = useState(null);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [readerMode, setReaderMode] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('view') === 'reader' || searchParams.has('section')
      ? 'reader'
      : 'overview';
  });

  const spreadEntries = useMemo(() => {
    let nextTileNumber = (contents.pageCount ?? contents.pages?.length ?? 0) + 1;

    return blocks.flatMap((block) => {
      if (block.type !== 'spread') return [];

      const entry = { block, tileStartNumber: nextTileNumber };
      nextTileNumber += 2;

      return [entry];
    });
  }, []);

  const scrollToTarget = useCallback((targetId) => {
    const scroll = () => {
      const target = document.getElementById(targetId);

      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(targetTop, 0), left: 0, behavior: 'auto' });
    };

    window.requestAnimationFrame(scroll);
    window.setTimeout(scroll, 120);
    window.setTimeout(scroll, 600);
    window.setTimeout(scroll, 1200);
  }, []);

  const getSpreadIndexById = useCallback(
    (targetId) => spreadEntries.findIndex(({ block }) => block.id === targetId),
    [spreadEntries],
  );

  const setReaderUrl = useCallback((targetId, mode = 'replace') => {
    const nextUrl = new URL(window.location.href);
    nextUrl.search = '';
    nextUrl.searchParams.set('view', 'reader');
    nextUrl.searchParams.set('section', targetId);
    nextUrl.hash = 'reader';
    const method = mode === 'push' ? 'pushState' : 'replaceState';
    window.history[method](null, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }, []);

  const selectSpreadById = useCallback(
    (targetId, { historyMode = 'push', scroll = true } = {}) => {
      const nextIndex = getSpreadIndexById(targetId);

      if (nextIndex < 0) return false;

      setReaderMode('reader');
      setActiveSpreadIndex(nextIndex);
      setReaderUrl(targetId, historyMode);

      if (scroll) {
        scrollToTarget(targetId);
      }

      return true;
    },
    [getSpreadIndexById, scrollToTarget, setReaderUrl],
  );

  useEffect(() => {
    const scrollToHashTarget = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const section = searchParams.get('section');
      const hashTargetId = window.location.hash.slice(1);
      const spreadTargetId = section || hashTargetId;

      if (spreadTargetId && getSpreadIndexById(spreadTargetId) >= 0) {
        selectSpreadById(spreadTargetId, { historyMode: 'replace' });
        return;
      }

      if (!hashTargetId) return;

      const cleanSectionQuery = () => {
        const section = new URLSearchParams(window.location.search).get('section');

        if (section === hashTargetId) {
          window.history.replaceState(null, '', `#${hashTargetId}`);
        }
      };

      scrollToTarget(hashTargetId);
      window.setTimeout(cleanSectionQuery, 180);
    };

    scrollToHashTarget();
    window.addEventListener('hashchange', scrollToHashTarget);
    window.addEventListener('popstate', scrollToHashTarget);

    return () => {
      window.removeEventListener('hashchange', scrollToHashTarget);
      window.removeEventListener('popstate', scrollToHashTarget);
    };
  }, [getSpreadIndexById, scrollToTarget, selectSpreadById]);

  useEffect(() => {
    if (readerMode !== 'reader') return undefined;

    const spreadElements = spreadEntries
      .map(({ block }) => document.getElementById(block.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const nextIndex = Number(visibleEntry.target.dataset.spreadIndex);
        if (Number.isInteger(nextIndex)) setActiveSpreadIndex(nextIndex);
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    );

    spreadElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [readerMode, spreadEntries]);

  const openPage = (page) => {
    setActivePage(page);
  };

  const lightboxPages = useMemo(() => {
    const pages = [];

    spreadEntries.forEach(({ block, tileStartNumber }) => {
      const spreadPages = [
        { page: block.leftPage, side: 'left', tileNumber: tileStartNumber },
        { page: block.rightPage, side: 'right', tileNumber: tileStartNumber + 1 },
      ];

      spreadPages.forEach(({ page, side, tileNumber }) => {
        if (!page?.image) return;

        const pageLabel = page.imageAlt || `${block.title} ${side} page`;
        pages.push({
          image: page.image,
          alt: pageLabel,
          tileNumber,
          blockId: block.id,
          side,
        });
      });
    });

    return pages;
  }, [spreadEntries]);

  const activePageIndex = activePage
    ? lightboxPages.findIndex((page) => page.image === activePage.image)
    : -1;

  const showPreviousPage = () => {
    if (activePageIndex <= 0) return;

    setActivePage(lightboxPages[activePageIndex - 1]);
  };

  const showNextPage = () => {
    if (activePageIndex < 0 || activePageIndex >= lightboxPages.length - 1) return;

    setActivePage(lightboxPages[activePageIndex + 1]);
  };

  const changeReaderMode = useCallback(
    (nextMode) => {
      setReaderMode(nextMode);

      const nextUrl = new URL(window.location.href);
      if (nextMode === 'overview') {
        nextUrl.searchParams.delete('view');
        nextUrl.searchParams.delete('section');
      } else {
        nextUrl.searchParams.set('view', 'reader');
      }
      nextUrl.hash = 'reader';
      window.history.replaceState(null, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);

      scrollToTarget('reader');
    },
    [scrollToTarget],
  );

  return (
    <>
      <SiteHeader />
      <main className="art-book-shell">
        <CoverBlock cover={cover} />
        <AboutSection id="about" className="about-shell-home" />
        <TableOfContentsBlock
          contents={contents}
          onSelectTarget={selectSpreadById}
        />
        <ReaderBlock
          entries={spreadEntries}
          pages={lightboxPages}
          mode={readerMode}
          activeIndex={activeSpreadIndex}
          onModeChange={changeReaderMode}
          onOpenPage={openPage}
          showTileNumbers={showDevTileNumbers}
        />
        <PageLightbox
          page={activePage}
          onClose={() => setActivePage(null)}
          onPrevious={showPreviousPage}
          onNext={showNextPage}
          hasPrevious={activePageIndex > 0}
          hasNext={activePageIndex >= 0 && activePageIndex < lightboxPages.length - 1}
        />
      </main>
      <footer className="site-footer" aria-label="Copyright">
        &copy; Ellie Joan 2026
      </footer>
    </>
  );
}
