import {
  AbsoluteFill,
  Composition,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";

const fps = 30;
const durationInFrames = 8 * fps;

function BeachHeroAd() {
  const frame = useCurrentFrame();
  const { durationInFrames: total } = useVideoConfig();

  const loop = frame / total;
  const headlineY = interpolate(frame, [0, 24], [34, 0], {
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [0, 18, total - 18, total], [0, 1, 1, 0]);
  const washOpacity = interpolate(loop, [0, 0.5, 1], [0.58, 0.78, 0.58]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#061827", overflow: "hidden" }}>
      <Video
        src={staticFile("video/dist/beach-hero-loop-desktop.webm")}
        muted
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(0.96) brightness(0.92)",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,8,18,.62) 0%, rgba(0,8,18,.34) 34%, rgba(0,8,18,0) 62%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          paddingLeft: 112,
          paddingRight: 112,
          color: "white",
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          textShadow: "0 8px 36px rgba(0,0,0,.45)",
        }}
      >
        <div style={{ fontSize: 104, lineHeight: 0.94, fontWeight: 750, maxWidth: 760 }}>
          Travel,
          <br />
          softened.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, maxWidth: 620 }}>
          Private vacation planning with a calmer path from first idea to final itinerary.
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          top: "auto",
          height: "30%",
          background:
            "linear-gradient(180deg, rgba(246,241,229,0) 0%, rgba(246,241,229,.64) 74%, #f6f1e5 100%)",
          opacity: washOpacity,
        }}
      />
    </AbsoluteFill>
  );
}

export function RemotionRoot() {
  return (
    <Composition
      id="BeachHeroAd"
      component={BeachHeroAd}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1920}
      height={1080}
    />
  );
}
