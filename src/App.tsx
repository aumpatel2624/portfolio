import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Desktop } from './desktop/Desktop';
import { NotFound } from './NotFound';
import { useMediaQuery } from './lib/useMediaQuery';

const ClassicHome = lazy(() =>
  import('./classic/ClassicHome').then((m) => ({ default: m.ClassicHome })),
);
const CaseStudy = lazy(() => import('./classic/CaseStudy').then((m) => ({ default: m.CaseStudy })));
// Only phones download the phone view.
const PhoneOS = lazy(() => import('./phone/PhoneOS').then((m) => ({ default: m.PhoneOS })));

/**
 * Wide screens get the OS-style desktop and narrow ones (under 768px) the phone OS, unless the
 * build sets VITE_FORCE_DESKTOP=true (desktop-only deployments). Resize a desktop window below
 * 768px to preview the phone view.
 */
export function HomeRoute() {
  const narrow = useMediaQuery('(max-width: 767px)');
  const forceDesktop = import.meta.env.VITE_FORCE_DESKTOP === 'true';
  return narrow && !forceDesktop ? <PhoneOS /> : <Desktop />;
}

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/classic" element={<ClassicHome />} />
        <Route path="/work/phonedeck" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
