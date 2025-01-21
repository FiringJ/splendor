export type GemType = 'diamond' | 'sapphire' | 'emerald' | 'ruby' | 'onyx' | 'gold';

export interface GameAction {
  type: 'takeGems' | 'purchaseCard' | 'reserveCard' | 'endTurn' | 'acquireNoble';
  playerId: string;
  playerName: string;
  details: {
    gems?: Partial<Record<GemType, number>>;
    card?: {
      id: number;
      gem: GemType;
      points: number;
    };
    noble?: {
      id: number;
      points: number;
    };
  };
  timestamp: number;
}

export interface Card {
  id: number;
  level: 1 | 2 | 3;
  points: number;
  gem: GemType;
  cost: Partial<Record<GemType, number>>;
  image?: string;
  spritePosition: {
    x: number;  // 精灵图中的x坐标（第几列，从0开始）
    y: number;  // 精灵图中的y坐标（第几行，从0开始）
  };
}

export interface Noble {
  id: number;
  points: number;
  name: string;
  requirements: Partial<Record<GemType, number>>;
  image?: string;
}

export interface Player {
  id: string;
  name: string;
  gems: Partial<Record<GemType, number>>;
  cards: Card[];
  reservedCards: Card[];
  nobles: Noble[];
  points: number;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  gems: Record<GemType, number>;
  cards: {
    level1: Card[];
    level2: Card[];
    level3: Card[];
    deck1: Card[];
    deck2: Card[];
    deck3: Card[];
  };
  nobles: Noble[];
  status: 'waiting' | 'playing' | 'finished';
  lastRound: boolean;
  lastRoundStartPlayer: number | null;
  winner: string | null;
  actions: GameAction[];
} 