// Twitter's card uses the same art as Open Graph — see `opengraph-image.tsx`.
// (X falls back to og:image, but declaring twitter:image explicitly avoids
// relying on that fallback.)
export { alt, size, contentType, default } from './opengraph-image'
