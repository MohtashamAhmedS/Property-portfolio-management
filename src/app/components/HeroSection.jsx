import Image from 'next/image'
import Button from './Button'

export default function HeroSection() {
  return (
    <main
      className="flex-1 flex flex-col items-center px-4 text-center"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #C0DFFF 100%)',
      }}
    >
      <div className="flex flex-col items-center pt-12 gap-[20px] shrink-0">
        <h1 className="text-4xl md:text-5xl font-semibold">
          <span className="text-[#002C83]">One Place for All</span> <br />
          <span className="text-black">Your Rent & Bills</span>
        </h1>

        <p className="max-w-2xl text-lg text-gray-700">
          Whether you're a landlord tracking rent or a tenant managing your
          monthly bills, stay organized and never miss a due date again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary">Learn More</Button>
          <Button variant="primary">Start Managing Bills</Button>
        </div>
      </div>

      {/* Mobile image - phone mockup */}
      <div className="relative w-full max-w-[460px] mt-4 mb-8 h-[400px] md:hidden animate-rise-in z-10">
        <Image
          src="/phone-mockup.png"
          alt="App preview on mobile"
          fill
          sizes="(max-width: 767px) 100vw, 460px"
          className="object-contain object-bottom"
          quality={100}
          priority
        />
      </div>

      {/* Desktop image - monitor mockup */}
      <div className="relative w-full max-w-4xl mt-8 mb-0 hidden md:block h-[550px] animate-rise-in">
        <Image
          src="/hero-image.png"
          alt="Dashboard preview"
          fill
          sizes="(min-width: 768px) 896px, 100vw"
          className="object-contain object-bottom"
          quality={100}
          priority
        />
      </div>
    </main>
  )
}
