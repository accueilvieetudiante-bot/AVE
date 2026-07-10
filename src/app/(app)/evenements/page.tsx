import { EventsExplorer } from "@/components/events/events-explorer";
import { getUpcomingEvents, getEventCategories } from "@/lib/queries/events";

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  const categories = getEventCategories();

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Événements</h1>
      <EventsExplorer events={events} categories={categories} />
    </div>
  );
}
