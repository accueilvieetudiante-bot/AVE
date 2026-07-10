import { Clock, MapPin } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { ContactActions } from '@/components/hub/contact-actions';
import { ExpandableCard } from '@/components/hub/expandable-card';
import { InfoRow } from '@/components/hub/info-row';
import type { FoodAidOrg } from '@/data/types';

export function FoodAidCard({ org }: { org: FoodAidOrg }) {
  return (
    <ExpandableCard title={org.name} subtitle={org.description}>
      <ThemedText type="small" themeColor="textSecondary">
        Conditions : {org.conditions}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Comment en bénéficier : {org.how}
      </ThemedText>
      {org.hours && <InfoRow icon={Clock} label={org.hours} />}
      {org.address && <InfoRow icon={MapPin} label={org.address} />}
      <ContactActions
        phone={org.phone}
        email={org.email}
        instagram={org.instagram}
        address={org.address}
      />
    </ExpandableCard>
  );
}
