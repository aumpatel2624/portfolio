import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Desktop } from './desktop/Desktop';
import { NotFound } from './NotFound';
import { useMediaQuery } from './lib/useMediaQuery';

const ClassicHome = lazy(() =>
  import('./classic/ClassicHome').then((m) => ({ default: m.ClassicHome })),
);
const CaseStudy = lazy(() => import('./classic/CaseStudy').then((m) => ({ default: m.CaseStudy })));

/**
 * The OS-style desktop is unusable on phones, so narrow screens get the classic layout, unless the
 * build sets VITE_FORCE_DESKTOP=true (desktop-only deployments).
 */
export function DesktopRoute() {
  const narrow = useMediaQuery('(max-width: 767px)');
  const forceDesktop = import.meta.env.VITE_FORCE_DESKTOP === 'true';
  return narrow && !forceDesktop ? <Navigate to="/classic" replace /> : <Desktop />;
}

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<DesktopRoute />} />
        <Route path="/classic" element={<ClassicHome />} />
        <Route path="/work/phonedeck" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
