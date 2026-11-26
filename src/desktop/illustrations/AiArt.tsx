import { ArtImage } from './ArtImage';

/** A chip with connected nodes, for the AI engineering entries. Shared by the desktop and phone. */
export function AiArt({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ArtImage name="ai" />
    </div>
  );
}
