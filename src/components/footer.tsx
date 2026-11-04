import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const year = new Date().getFullYear();

const socials = [
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Twitter", href: "https://www.twitter.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://www.github.com" },
];

const contactInfo = [
  { icon: Mail, value: "info@booknook.com" },
  { icon: Phone, value: "+1 (555) 012-3456" },
  { icon: MapPin, value: "123 Library Street, Booktown" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto grid gap-10 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-red-600 text-white">
              <BookOpen className="size-5" />
            </span>
            <span className="font-heading text-lg font-bold">
              Book<span className="text-orange-600">Nook</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            BookNook is your online library for discovering, borrowing, and
            sharing books with a community of readers.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-semibold">Contact Info</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {contactInfo.map(({ icon: Icon, value }) => (
              <li key={value} className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-orange-500" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold">Follow Us</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-orange-500/40 hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="container mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          © {year} BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
