import { forwardRef } from "react";

type VideoProps = {
  sources: Array<{ type: string; src: string }>;
  ref?: any;
};

export const Video = forwardRef(function Video(props: VideoProps, ref: any) {
  return (
    <video width="320" height="320" ref={ref} muted playsInline>
      {props.sources.map((s) => (
        <source key={s.src} {...s} />
      ))}
    </video>
  );
});
