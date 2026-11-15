export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-accent/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-orbitron text-white font-bold tracking-wider">
          FO<span className="text-accent">.</span>
        </p>
        <p className="text-grey text-sm">
          &copy; {currentYear} Femi Ogunsanya
        </p>
        <p className="text-grey text-sm">
          Designed & developed on earth
        </p>
      </div>
    </footer>
  )
}
