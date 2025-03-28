import {
  Bike,
  FileText,
  Github,
  Linkedin,
  LinkedinIcon,
  Mail,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Features Section */}
        <section
          aria-labelledby="footer-features"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <h2 id="footer-features" className="sr-only">
            Key Features
          </h2>
          <div className="flex flex-col items-center text-center">
            <Bike className="h-6 w-6 mb-2 text-primary" />
            <p className="text-sm font-medium">Bike Inventory</p>
            <p className="text-xs text-muted-foreground mt-1">
              Manage your fleet efficiently
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FileText className="h-6 w-6 mb-2 text-primary" />
            <p className="text-sm font-medium">Document Management</p>
            <p className="text-xs text-muted-foreground mt-1">
              Organize all paperwork
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Mail className="h-6 w-6 mb-2 text-primary" />
            <p className="text-sm font-medium">Contact Support</p>
            <p className="text-xs text-muted-foreground mt-1">
              Get help when needed
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Linkedin className="h-6 w-6 mb-2 text-primary" />
            <p className="text-sm font-medium">Social Integration</p>
            <p className="text-xs text-muted-foreground mt-1">
              Stay connected with us
            </p>
          </div>
        </section>

        {/* About Section */}
        <section
          aria-labelledby="footer-about"
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="footer-about" className="sr-only">
            About Sawari
          </h2>
          <p className="text-sm text-muted-foreground">
            A comprehensive bike inventory and document management application
            designed to streamline your operations.
          </p>
        </section>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <Link
            href="https://github.com/mahabub-bd"
            className="text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/mahabubhossainbd/"
            className="text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Link>
          <a
            href="mailto:contact@mahabub.me"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright and Credits */}
        <section
          aria-labelledby="footer-legal"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t"
        >
          <h2 id="footer-legal" className="sr-only">
            Legal information
          </h2>
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            &copy; {currentYear} Sawari. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground order-1 sm:order-2">
            Developed by{" "}
            <Link
              href="https://mahabub.me"
              className="font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mahabub Hossain
            </Link>
          </p>
        </section>
      </div>
    </footer>
  );
}
