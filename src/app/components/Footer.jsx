import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="w-full px-6 md:px-16 py-12 md:py-16"
      style={{
        background: 'linear-gradient(to right, #0181D6 0%, #002B82 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        {/* Logo + About */}
        <div className="flex flex-col gap-4 md:pr-10">
          <div className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="Portfolio logo"
              width={220}
              height={66}
            />
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            <span className="font-semibold text-white">About:</span> Whether
            you're a landlord tracking rent or a tenant managing your monthly
            bills, stay organized and never miss a due date again.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Quick Links</h3>
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/features"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Features
          </Link>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Social</h3>
          <Link
            href="#"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="#"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Facebook
          </Link>
          <Link
            href="#"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Linkedin
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Contact</h3>
          <p className="text-sm text-white/80">+1234567867</p>
          <p className="text-sm text-white/80">abcds@gmail.com</p>
          <p className="text-sm text-white/80">abc street, abv, abx</p>
        </div>
      </div>
    </footer>
  )
}
