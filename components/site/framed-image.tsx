"use client";

export function FramedImage({
  src,
  alt,
  className = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  return (
    <span className={`img-frame ${className}`}>
      <span className="img-frame-tr" aria-hidden="true" />
      <span className="img-frame-bl" aria-hidden="true" />
      <img src={src} alt={alt} className="w-full h-full object-cover" {...props} />
    </span>
  );
}
