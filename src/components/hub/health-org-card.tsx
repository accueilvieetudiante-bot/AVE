import { Mail, MapPin, Phone } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { ContactActions } from '@/components/hub/contact-actions';
import { ExpandableCard } from '@/components/hub/expandable-card';
import { InfoRow } from '@/components/hub/info-row';
import type { HealthOrg } from '@/data/types';

export function HealthOrgCard({ org }: { org: HealthOrg }) {
  return (
    <ExpandableCard title={org.name} subtitle={org.description}>
      <InfoRow icon={Phone} label={`Pour qui : ${org.audience}`} />
      <ThemedText type="small" themeColor="textSecondary">
        {org.why}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Comment en bénéficier : {org.how}
      </ThemedText>
      {org.address && <InfoRow icon={MapPin} label={org.address} />}
      {org.email && <InfoRow icon={Mail} label={org.email} />}
      <ContactActions phone={org.phone} email={org.email} website={org.website} address={org.address} />
    </ExpandableCard>
  );
}
