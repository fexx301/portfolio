import { Mail } from 'lucide-react'
import { personalData } from '../data/data'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'

const links = [
  { label: 'GitHub', href: personalData.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: personalData.linkedin, Icon: LinkedinIcon },
  { label: 'X / Twitter', href: personalData.twitter, Icon: TwitterIcon },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-accent/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-grey text-sm">
          &copy; {currentYear} {personalData.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${personalData.email}`}
            className="flex items-center gap-2 text-sm text-grey hover:text-white transition-colors"
          >
            <Mail size={16} className="text-accent-light" />
            {personalData.email}
          </a>
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-grey hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
