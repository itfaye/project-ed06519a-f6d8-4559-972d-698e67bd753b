import { useState } from 'react';
import { Check, Copy, Edit3 } from 'lucide-react';

interface InvitationCardProps {
  firstName: string;
  lastName: string;
  onEdit: () => void;
}

const InvitationCard = ({ firstName, lastName, onEdit }: InvitationCardProps) => {
  const [copied, setCopied] = useState(false);

  const invitationText = `${firstName} ${lastName}, приглашаю тебя на свидание 💖
14.02.2026
Место: Атакент, Kinopark`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать текст');
    }
  };

  return (
    <div className="romantic-card p-8 md:p-12 w-full max-w-lg animate-scale-in shadow-elevated">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-5xl md:text-6xl animate-pulse-soft inline-block">💖</span>
        </div>
        
        <h2 className="text-lg md:text-xl text-muted-foreground mb-6 tracking-wide uppercase">
          Персональное приглашение
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
            {firstName} {lastName},
          </p>
          <p className="text-xl md:text-2xl text-foreground">
            приглашаю тебя на свидание 💖
          </p>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-foreground">
            <span className="text-xl">📅</span>
            <span className="text-lg font-medium">14.02.2026</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-foreground">
            <span className="text-xl">📍</span>
            <span className="text-lg">Атакент, Kinopark</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleCopy}
            className="romantic-button-secondary inline-flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check size={18} />
                Скопировано!
              </>
            ) : (
              <>
                <Copy size={18} />
                Скопировать текст
              </>
            )}
          </button>
          
          <button
            onClick={onEdit}
            className="romantic-button-secondary inline-flex items-center justify-center gap-2"
          >
            <Edit3 size={18} />
            Изменить имя
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
