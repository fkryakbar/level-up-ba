import {
  AlertTriangle,
  Award,
  Calendar,
  Coffee,
  Crown,
  Dumbbell,
  Flame,
  Gift,
  Handshake,
  Medal,
  Package,
  Rocket,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Target,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  alert: AlertTriangle,
  award: Award,
  calendar: Calendar,
  coffee: Coffee,
  crown: Crown,
  dumbbell: Dumbbell,
  flame: Flame,
  gift: Gift,
  handshake: Handshake,
  medal: Medal,
  package: Package,
  rocket: Rocket,
  shield: Shield,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  sparkles: Sparkles,
  sprout: Sprout,
  star: Star,
  sun: Sun,
  target: Target,
  ticket: Ticket,
  "trending-up": TrendingUp,
  trophy: Trophy,
  users: Users,
  utensils: UtensilsCrossed,
  zap: Zap,
};

export default function Icon({
  name,
  size = 18,
  className,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}