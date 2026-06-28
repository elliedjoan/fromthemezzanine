import { useCallback, useEffect, useMemo, useState } from 'react';
import { blocks, contents, cover } from './content/blocks.js';
import { CoverBlock } from './components/CoverBlock.jsx';
import { TableOfContentsBlock } from './components/TableOfContentsBlock.jsx';
import { FlipbookBlock } from './components/FlipbookBlock.jsx';
import { PageLightbox } from './components/PageLightbox.jsx';
import { SiteHeader } from './components/SiteHeader.jsx';
import { AboutSection } from './components/AboutPage.jsx';

const showDevTileNumbers = false;

export default function App() {
  const [activePage, setActivePage] = useState(null);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

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
    const nextUrl = `${window.location.pathname}?section=${targetId}#reader`;
    const method = mode === 'push' ? 'pushState' : 'replaceState';
    window.history[method](null, '', nextUrl);
  }, []);

  const selectSpreadById = useCallback(
    (targetId, { historyMode = 'push', scroll = true } = {}) => {
      const nextIndex = getSpreadIndexById(targetId);

      if (nextIndex < 0) return false;

      setActiveSpreadIndex(nextIndex);
      setReaderUrl(targetId, historyMode);

      if (scroll) {
        scrollToTarget('reader');
      }

      return true;
    },
    [getSpreadIndexById, scrollToTarget, setReaderUrl],
  );

  useEffect(() => {
    const scrollToHashTarget = () => {
      const section = new URLSearchParams(window.location.search).get('section');
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

  const goToSpreadIndex = useCallback(
    (nextIndex) => {
      const boundedIndex = Math.min(Math.max(nextIndex, 0), spreadEntries.length - 1);
      const targetEntry = spreadEntries[boundedIndex];

      if (!targetEntry) return;

      setActiveSpreadIndex(boundedIndex);
      setReaderUrl(targetEntry.block.id);
    },
    [setReaderUrl, spreadEntries],
  );

  const showPreviousSpread = () => {
    goToSpreadIndex(activeSpreadIndex - 1);
  };

  const showNextSpread = () => {
    goToSpreadIndex(activeSpreadIndex + 1);
  };

  const activeSpreadEntry = spreadEntries[activeSpreadIndex] ?? spreadEntries[0];

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
        <FlipbookBlock
          entry={activeSpreadEntry}
          activeIndex={activeSpreadIndex}
          total={spreadEntries.length}
          onPrevious={showPreviousSpread}
          onNext={showNextSpread}
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
