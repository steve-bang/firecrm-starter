import { Card, CardHeader } from "@/components/ui/card";

const featureCards = [
  {
    title: "Production-shaped auth",
    description:
      "NextAuth session management, Firebase email/password, optional Google sign-in, and route protection.",
  },
  {
    title: "Feature-based architecture",
    description:
      "Clear boundaries between UI, business logic, hooks, and Firebase services keep the starter maintainable.",
  },
  {
    title: "Modern dashboard UI",
    description:
      "Responsive layout, stats cards, searchable staff table, notification center, and theme customization.",
  },
  {
    title: "Firebase ready",
    description:
      "Firestore profile persistence, Storage upload helpers, and admin sync points are already wired for extension.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-2 lg:px-8">
      {featureCards.map((card) => (
        <Card key={card.title}>
          <CardHeader title={card.title} description={card.description} />
        </Card>
      ))}
    </section>
  );
}
