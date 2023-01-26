import { Video } from "@/components/video";
import { forwardRef, useCallback, useEffect, useState } from "react";
import styles from "../styles/Daddy.module.scss";

export const Daddy = forwardRef(function Daddy(_, ref: any) {
  const [canActive, setCanActive] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);

  const playHandler = useCallback(
    (e: any) => {
      if (canActive) {
        setActive(true);
      }
    },
    [canActive]
  );
  const canPlayHandler = useCallback((e: any) => {
    setCanActive(true);
  }, []);
  const videoEndedHandler = useCallback((e: any) => {
    setActive(false);
  }, []);

  useEffect(() => {
    if (!ref?.current) return;
    (ref?.current as any)?.addEventListener("canplay", canPlayHandler);
    (ref?.current as any)?.addEventListener("loadedmetadata", canPlayHandler);
    (ref?.current as any)?.addEventListener("ended", videoEndedHandler);
    (ref?.current as any)?.addEventListener("play", playHandler);

    return () => {
      (ref?.current as any)?.removeEventListener(
        "loadedmetadata",
        canPlayHandler
      );
      (ref?.current as any)?.removeEventListener("canplay", canPlayHandler);
      (ref?.current as any)?.removeEventListener("play", playHandler);
      (ref?.current as any)?.removeEventListener("ended", videoEndedHandler);
    };
  }, [canPlayHandler, playHandler, ref, videoEndedHandler]);

  const sources = [
    {
      type: "video/mp4",
      src: "https://github.com/luyi985/kids-study/raw/main/statics/video/daddy-1080.mov",
    },
  ];
  return (
    <div className={`${styles.daddy} ${isActive ? "active" : ""}`}>
      <Video sources={sources} ref={ref}></Video>
    </div>
  );
});
