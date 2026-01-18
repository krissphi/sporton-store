import Image from "next/image";
import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";

const HeroSection = () => {
  return (
    <section id="hero-section" className="container mx-auto h-screen flex">
      <div className="relative self-center">
        <Image
          src="/images/img-basketball.png"
          alt="shape decor"
          width={432}
          height={423}
          className="grayscale absolute left-0 -top-20"
        />
        <div className="relative ml-40 w-full">
          <div className="text-primary italic">Friday Sale, 50%</div>
          <h1 className="font-extrabold text-[95px] italic bg-linear-to-b from-black to-[#979797] bg-clip-text text-transparent leading-tight">
            WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
          </h1>
          <p className="w-1/2 mt-10 leading-loose">
            Engineered for endurance and designed for speed. Experience gear
            that moves as fast as you do. Premium fabrics. Unmatched comfort.
            Limitless motion.
          </p>
          <div className="flex gap-5 mt-14">
            <Button>
              Explore More <FiFastForward />
            </Button>
            <Button variant="ghost">
              Watch Video{" "}
              <Image
                src="/images/icon-play-video.svg"
                alt="icon play video"
                width={29}
                height={29}
              />
            </Button>
          </div>
        </div>
        <Image
          src="/images/img-hero.png"
          alt="img sporton hero"
          width={700}
          height={950}
          className="absolute -right-5 top-1/2 -translate-y-1/2"
        />
      </div>
      <Image
        src="/images/img-ornament-hero.svg"
        alt="shape decor"
        width={210}
        height={210}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      />
    </section>
  );
};

export default HeroSection;
