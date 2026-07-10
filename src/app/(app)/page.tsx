import { HomeHeader } from "@/components/home/header";
import { FeaturedEvent } from "@/components/home/featured-event";
import { EventRail } from "@/components/home/event-rail";
import { NewsSection } from "@/components/home/news-section";
import { GoodDealsSection } from "@/components/home/good-deals-section";
import { StudentLifeSection } from "@/components/home/student-life-section";
import { getUpcomingEvents } from "@/lib/queries/events";
import { getLatestNews, getPartners } from "@/lib/queries/news";
import { getCurrentProfile } from "@/lib/queries/profile";

export default async function HomePage() {
  const [events, news, partners, profile] = await Promise.all([
    getUpcomingEvents(),
    getLatestNews(),
    getPartners(),
    getCurrentProfile(),
  ]);

  const [featured, ...rest] = events;

  return (
    <div>
      <HomeHeader
        name={profile?.full_name?.split(" ")[0] ?? undefined}
        city={profile?.city}
        avatarUrl={profile?.avatar_url}
      />
      {featured && <FeaturedEvent event={featured} />}
      {rest.length > 0 && <EventRail events={rest} />}
      <NewsSection news={news} />
      <GoodDealsSection partners={partners} />
      <StudentLifeSection />
    </div>
  );
}
