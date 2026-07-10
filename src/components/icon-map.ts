import {
  GraduationCap,
  Sun,
  Trophy,
  Smartphone,
  HeartPulse,
  PhoneCall,
  Wallet,
  UtensilsCrossed,
  Lightbulb,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react-native';

export const IconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Sun,
  Trophy,
  Smartphone,
  HeartPulse,
  PhoneCall,
  Wallet,
  UtensilsCrossed,
  Lightbulb,
};

export function getIcon(name: string | undefined): LucideIcon {
  if (!name) return LifeBuoy;
  return IconMap[name] ?? LifeBuoy;
}
