import React from 'react';
import { Circle, Square, Heart, Layers } from 'lucide-react';
import { CorpusType, FillingType, CakeShape } from './types';

// Using high-quality Unsplash images for realistic textures and ingredients
export const CORPUS_IMAGES: Record<CorpusType, string> = {
  [CorpusType.TMAVY]: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80', // Dark Chocolate Cake
  [CorpusType.SVETLY]: 'https://images.unsplash.com/photo-1619982266616-a933db5b55a7?auto=format&fit=crop&w=300&q=80', // Vanilla/Sponge
  [CorpusType.MECHOVY]: 'https://images.unsplash.com/photo-1626264698806-236884563f0c?auto=format&fit=crop&w=300&q=80', // Green Moss/Matcha style
  [CorpusType.RED_VELVET]: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=300&q=80', // Red Velvet
  [CorpusType.ORECHOVY]: 'https://images.unsplash.com/photo-1558323748-934b049b03f8?auto=format&fit=crop&w=300&q=80', // Walnut Cake
  [CorpusType.KOKOSOVY]: 'https://images.unsplash.com/photo-1567125619713-501878705d4d?auto=format&fit=crop&w=300&q=80', // Coconut Cake
};

export const FILLING_IMAGES: Record<FillingType, string> = {
  [FillingType.MALINA]: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&w=150&q=80', // Raspberries
  [FillingType.BORUVKA]: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=150&q=80', // Blueberries
  [FillingType.PISTACIE]: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=150&q=80', // Pistachio cream/nuts
  [FillingType.ORISEK]: 'https://images.unsplash.com/photo-1528750997573-59b8b6ee58cd?auto=format&fit=crop&w=150&q=80', // Hazelnuts
  [FillingType.VISEN]: 'https://images.unsplash.com/photo-1528821128474-27f963b0bd85?auto=format&fit=crop&w=150&q=80', // Cherries
  [FillingType.JAHODA]: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=150&q=80', // Strawberries
  [FillingType.COKOLADA]: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=150&q=80', // Chocolate
  [FillingType.MANGO_MARACUJA]: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=150&q=80', // Mango
};

export const SHAPE_IMAGES: Record<CakeShape, string> = {
  [CakeShape.KULATY]: 'https://images.unsplash.com/photo-1563729784474-d77ddb93240b?auto=format&fit=crop&w=300&q=80',
  [CakeShape.OBDELNIK_A4]: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=300&q=80',
  [CakeShape.OBDELNIK_A5]: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=300&q=80',
  [CakeShape.SRDCE]: 'https://images.unsplash.com/photo-1516919549054-e08258825f80?auto=format&fit=crop&w=300&q=80',
};

export const SHAPE_ICONS: Record<CakeShape, React.ReactNode> = {
  [CakeShape.KULATY]: <Circle className="w-8 h-8" />,
  [CakeShape.OBDELNIK_A4]: <Square className="w-8 h-8 scale-x-150" />,
  [CakeShape.OBDELNIK_A5]: <Square className="w-8 h-8" />,
  [CakeShape.SRDCE]: <Heart className="w-8 h-8" />,
};