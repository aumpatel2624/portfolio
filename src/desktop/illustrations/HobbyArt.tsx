import { ArtImage } from './ArtImage';

/** Photographic illustrations for Running, AI use cases and Sports and esports. Shared by the desktop and phone Hobbies views. */

interface Props {
  className?: string;
}

/** A pair of running shoes on a road. */
export function RunningArt({ className }: Props) {
  return (
    <div className={className}>
      <ArtImage name="running" alt="A pair of running shoes on a road" />
    </div>
  );
}

/** A chip with connected nodes, for AI beyond code. */
export function AiArt({ className }: Props) {
  return (
    <div className={className}>
      <ArtImage name="ai" alt="A glowing AI chip connected to a network of nodes" />
    </div>
  );
}

/** A football and a gaming setup, for watching sports and esports. */
export function SportsArt({ className }: Props) {
  return (
    <div className={className}>
      <ArtImage name="sports" alt="A football and a gaming setup for sports and esports" />
    </div>
  );
}
