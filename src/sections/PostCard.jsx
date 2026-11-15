import gsap from "gsap";
import { useScrollVideo } from '../hooks/useScrollVideo';
import { useRef } from "react"

const PostCard = () => {
  const videoRef = useRef(null);

  useScrollVideo(videoRef, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.post-card',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    })

    return tl;
  })

  return (
    <section className="post-card">
      <div className="animated-gradient-bg" />

      <div className="post-card-wrapper group hover:rotate-1 hover:-[1.02] transition duration-700">
        <img src="/images/overlay.webp" alt="Welcome to the Leonida Keys" />

        <video 
          ref={videoRef}
          muted
          playsInline
          autoPlay
          preload="auto"
          src="/videos/postcard-vd.mp4"
        />

      </div>

      <button className="post-card-button">
        Explore Leonida Keys
      </button>
    </section>
  )
}

export default PostCard
