import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Sawari. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Developed by{" "}
          <Link
            href="https://mahabub.me"
            className="font-medium hover:text-primary transition-colors"
          >
            Mahabub Hossain
          </Link>
        </p>
      </div>
    </footer>
  );
}
