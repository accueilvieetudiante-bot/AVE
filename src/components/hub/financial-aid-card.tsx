import { Linking } from 'react-native';
import { Clock, FileText } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { ExpandableCard } from '@/components/hub/expandable-card';
import { InfoRow } from '@/components/hub/info-row';
import { GradientButton } from '@/components/ui/gradient-button';
import type { FinancialAid } from '@/data/types';

export function FinancialAidCard({ aid }: { aid: FinancialAid }) {
  return (
    <ExpandableCard title={aid.name} subtitle={aid.whatIsIt}>
      <ThemedText type="small" themeColor="textSecondary">
        Pour qui : {aid.forWho}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Comment faire : {aid.howTo}
      </ThemedText>
      <InfoRow icon={Clock} label={`Temps estimé : ${aid.estimatedTime}`} />
      {aid.documents.length > 0 && (
        <InfoRow icon={FileText} label={`Documents : ${aid.documents.join(', ')}`} />
      )}
      {aid.officialUrl && (
        <GradientButton
          label="Lien officiel"
          onPress={() => Linking.openURL(aid.officialUrl!)}
        />
      )}
    </ExpandableCard>
  );
}
