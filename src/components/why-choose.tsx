import { Library, RefreshCw, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Vast Collection",
    text: "Thousands of titles across fiction, science, history, and kids' favorites — all in one place.",
  },
  {
    icon: RefreshCw,
    title: "Borrow in a Click",
    text: "Request a book instantly and keep track of your borrows and due dates without the hassle.",
  },
  {
    icon: Users,
    title: "Community Driven",
    text: "Add the books you own and let fellow readers discover them — your shelf, shared with everyone.",
  },
  {
    icon: Sparkles,
    title: "Always Fresh",
    text: "New arrivals added by readers like you, so there is always something new to pick up.",
  },
];

export default function WhyChoose() {
  return (
    <section className="container mx-auto mt-16">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">
          Why Choose Our Library
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-linear-to-br from-orange-500 to-red-600" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:border-orange-500/40 hover:shadow-md"
          >
            <span className="inline-flex rounded-lg bg-muted p-2.5 text-muted-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="font-heading mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
