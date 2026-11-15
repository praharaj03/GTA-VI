import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Keep cinematic scroll scrubbing on desktop and natural playback on mobile.
export const useScrollVideo = (videoRef, createTimeline) => {
  useGSAP(() => {
    const media = gsap.matchMedia();
    const video = videoRef.current;

    media.add('(min-width: 1024px)', () => {
      video.pause();
      video.loop = false;
      const timeline = createTimeline();
      const scrub = () => {
        timeline.to(video, {
          currentTime: video.duration,
          duration: 3,
          ease: 'power1.inOut',
        }, '<');
      };

      if (video.readyState >= 1) scrub();
      else video.addEventListener('loadedmetadata', scrub, { once: true });

      return () => video.removeEventListener('loadedmetadata', scrub);
    });

    media.add('(max-width: 1023px)', () => {
      video.loop = true;
      video.play().catch(() => {});
      return () => video.pause();
    });

    return () => media.revert();
  }, []);
};
