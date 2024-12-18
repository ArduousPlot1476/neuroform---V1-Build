import { 
  Brain, 
  Target, 
  BookOpen, 
  Heart, 
  Users, 
  Trophy,
  LucideIcon 
} from 'lucide-react';
import type { Achievement, AchievementType } from './types';

export const getAchievementIcon = (type: AchievementType): LucideIcon => {
  const icons: Record<AchievementType, LucideIcon> = {
    productivity: Target,
    learning: BookOpen,
    health: Heart,
    focus: Brain,
    social: Users,
    milestone: Trophy
  };
  return icons[type];
};

export const getAchievementColor = (type: AchievementType): string => {
  const colors: Record<AchievementType, string> = {
    productivity: 'bg-blue-50 text-blue-700',
    learning: 'bg-purple-50 text-purple-700',
    health: 'bg-green-50 text-green-700',
    focus: 'bg-indigo-50 text-indigo-700',
    social: 'bg-pink-50 text-pink-700',
    milestone: 'bg-yellow-50 text-yellow-700'
  };
  return colors[type];
};

export const categorizeAchievements = (achievements: Achievement[]): Record<string, Achievement[]> => {
  const categories: Record<string, Achievement[]> = {};
  
  achievements.forEach(achievement => {
    const category = achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1);
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(achievement);
  });
  
  return categories;
};