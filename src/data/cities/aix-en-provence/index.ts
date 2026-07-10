import type { CityContent } from '@/data/types';
import { meta } from './meta';
import { apps } from './apps';
import { health } from './health';
import { emergency } from './emergency';
import { financialAid } from './financial-aid';
import { foodAid } from './food-aid';
import { tips, upcomingTasks } from './tips';

export const aixEnProvence: CityContent = {
  meta,
  apps,
  health,
  emergency,
  financialAid,
  foodAid,
  tips,
  upcomingTasks,
};
