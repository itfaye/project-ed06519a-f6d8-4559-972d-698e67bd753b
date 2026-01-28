import { useState } from 'react';

interface InvitationFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
  initialFirstName?: string;
  initialLastName?: string;
}

const InvitationForm = ({ onSubmit, initialFirstName = '', initialLastName = '' }: InvitationFormProps) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const validate = () => {
    const newErrors: { firstName?: string; lastName?: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(firstName.trim(), lastName.trim());
    }
  };

  return (
    <div className="romantic-card p-8 md:p-10 w-full max-w-md animate-scale-in">
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">💌</span>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          Персональное приглашение
        </h1>
        <p className="text-muted-foreground">
          Введите ваши данные, чтобы получить приглашение
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            Имя
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors({ ...errors, firstName: undefined });
            }}
            className={`romantic-input ${errors.firstName ? 'border-destructive focus:ring-destructive/50' : ''}`}
            placeholder="Введите имя"
          />
          {errors.firstName && (
            <p className="mt-1.5 text-sm text-destructive animate-fade-in">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
            Фамилия
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors({ ...errors, lastName: undefined });
            }}
            className={`romantic-input ${errors.lastName ? 'border-destructive focus:ring-destructive/50' : ''}`}
            placeholder="Введите фамилию"
          />
          {errors.lastName && (
            <p className="mt-1.5 text-sm text-destructive animate-fade-in">{errors.lastName}</p>
          )}
        </div>

        <button type="submit" className="romantic-button w-full mt-6">
          Показать приглашение ✨
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;
