import { HomeHeader } from "@/components/home/header";
import { FeaturedEvent } from "@/components/home/featured-event";
import { EventRail } from "@/components/home/event-rail";
import { NewsSection } from "@/components/home/news-section";
import { GoodDealsSection } from "@/components/home/good-deals-section";
import { StudentLifeSection } from "@/components/home/student-life-section";
import { getUpcomingEvents } from "@/lib/queries/events";
import { getLatestNews, getPartners } from "@/lib/queries/news";

export default async function HomePage() {
  const [events, news, partners] = await Promise.all([
    getUpcomingEvents(),
    getLatestNews(),
    getPartners(),
  ]);

  const [featured, ...rest] = events;

  return (
    <div>
      <HomeHeader />
      {featured && <FeaturedEvent event={featured} />}
      {rest.length > 0 && <EventRail events={rest} />}
      <NewsSection news={news} />
      <GoodDealsSection partners={partners} />
      <StudentLifeSection />
    </div>
  );
}
