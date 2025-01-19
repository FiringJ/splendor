import { useGameStore } from '../../store/gameStore';
import type { GameAction, GemType } from '../../types/game';

const gemColors: Record<GemType, string> = {
  diamond: 'bg-white border-2 border-gray-300',
  sapphire: 'bg-blue-500',
  emerald: 'bg-green-500',
  ruby: 'bg-red-500',
  onyx: 'bg-gray-800',
  gold: 'bg-yellow-400'
};

const GemCircle = ({ type, count }: { type: GemType; count?: number }) => (
  <div className="inline-flex items-center gap-1">
    <div className={`w-6 h-6 rounded-full ${gemColors[type]} inline-flex items-center justify-center text-sm font-bold shadow-md ${type === 'onyx' ? 'text-white' : ''}`}>
      {count}
    </div>
  </div>
);

const CardSquare = ({ type, points }: { type: GemType; points?: number }) => (
  <div className="inline-flex items-center gap-1">
    <div className={`w-6 h-6 ${gemColors[type]} inline-flex items-center justify-center text-sm font-bold shadow-md ${type === 'onyx' ? 'text-white' : ''} relative`}>
      {points !== undefined && points > 0 && (
        <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {points}
        </span>
      )}
    </div>
  </div>
);

export const ActionHistory = () => {
  const gameState = useGameStore(state => state.gameState);

  if (!gameState) return null;

  const formatAction = (action: GameAction) => {
    switch (action.type) {
      case 'takeGems':
        return (
          <div className="flex items-center gap-2">
            <span>{action.playerName} 获取了:</span>
            <div className="flex gap-2">
              {Object.entries(action.details.gems || {}).map(([gem, count]) => (
                <GemCircle key={gem} type={gem as GemType} count={count} />
              ))}
            </div>
          </div>
        );
      case 'purchaseCard':
        return (
          <div className="flex items-center gap-2">
            <span>{action.playerName} 购买了</span>
            <div className="flex items-center gap-1">
              <CardSquare type={action.details.card?.gem as GemType} points={action.details.card?.points} />
            </div>
          </div>
        );
      case 'reserveCard':
        return (
          <div className="flex items-center gap-2">
            <span>{action.playerName} 预留了</span>
            <div className="flex items-center gap-1">
              <CardSquare type={action.details.card?.gem as GemType} points={action.details.card?.points} />
            </div>
            {action.details.gems?.gold && (
              <div className="flex items-center gap-1">
                <span>并获得了</span>
                <GemCircle type="gold" count={1} />
              </div>
            )}
          </div>
        );
      case 'acquireNoble':
        return (
          <div className="flex items-center gap-2">
            <span>{action.playerName} 获得了一位贵族</span>
            <div className="w-6 h-6 rounded-full bg-purple-300 border-2 border-purple-400 inline-flex items-center justify-center text-sm shadow-md">
              👑
            </div>
          </div>
        );
      default:
        return '未知操作';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-2 space-y-1">
        {[...gameState.actions].reverse().map((action, index) => (
          <div key={index} className="text-sm text-gray-600 border-b last:border-b-0">
            {formatAction(action)}
          </div>
        ))}
        {gameState.actions.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-2">
            暂无操作记录
          </div>
        )}
      </div>
    </div>
  );
}; 