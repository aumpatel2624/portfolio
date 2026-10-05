import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { isPlaceholder } from '../data/links';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** A URL, a `mailto:` or a `[placeholder]` that has not been filled in yet. */
  href: string | undefined;
  children: ReactNode;
}

/**
 * Anchor that stays visible but inert while its target is a placeholder, so unfinished content
 * never navigates anywhere. External http(s) links open in a new tab.
 */
export function PlaceholderLink({ href, children, ...rest }: Props) {
  if (!href || isPlaceholder(href)) {
    return (
      <a
        {...rest}
        href="#"
        aria-disabled="true"
        onClick={(e) => {
          e.preventDefault();
          rest.onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      {...rest}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
