import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

/** Sets the document title (and meta description) for the current route. */
export function usePageMeta({ title, description }: PageMeta): void {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
