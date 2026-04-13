"use client";

interface BoardDetailImageProps {
  frontImage?: string;
  backImage?: string;
  name: string;
}

export function BoardDetailImage({ frontImage, backImage, name }: BoardDetailImageProps) {
  const hasFlip = !!(frontImage && backImage);

  return (
    <div className="flex justify-center">
      <div
        className="group relative w-full max-w-[350px] aspect-[3/4] rounded-2xl bg-secondary"
        style={{ perspective: "1100px" }}
      >
        <style>{`
          .detail-flip-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: inherit;
          }
          .group:hover .detail-flip-inner {
            transform: rotateY(180deg);
          }
          .detail-flip-front,
          .detail-flip-back {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: inherit;
            overflow: hidden;
          }
          .detail-flip-back {
            transform: rotateY(180deg);
          }
        `}</style>

        <div className="detail-flip-inner">
          {/* Front */}
          <div className="detail-flip-front">
            {frontImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={frontImage}
                alt={name}
                className="h-full w-full object-contain p-5"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl opacity-20">
                🏄
              </div>
            )}
          </div>

          {/* Back */}
          {hasFlip && (
            <div className="detail-flip-back">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backImage}
                alt={`${name} — verso`}
                className="h-full w-full object-contain p-5"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
