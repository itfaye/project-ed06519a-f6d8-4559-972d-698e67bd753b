import { useState, useEffect } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import InvitationForm from '@/components/InvitationForm';
import InvitationCard from '@/components/InvitationCard';

const STORAGE_KEY = 'invitation_data';

interface InvitationData {
  firstName: string;
  lastName: string;
}

const Index = () => {
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved) as InvitationData;
        if (data.firstName && data.lastName) {
          setInvitationData(data);
          setShowForm(false);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleSubmit = (firstName: string, lastName: string) => {
    const data = { firstName, lastName };
    setInvitationData(data);
    setShowForm(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  return (
    <div className="romantic-bg flex items-center justify-center p-4 md:p-8">
      <FloatingHearts />
      
      <main className="relative z-10 w-full flex items-center justify-center min-h-screen py-8">
        {showForm ? (
          <InvitationForm
            onSubmit={handleSubmit}
            initialFirstName={invitationData?.firstName}
            initialLastName={invitationData?.lastName}
          />
        ) : (
          invitationData && (
            <InvitationCard
              firstName={invitationData.firstName}
              lastName={invitationData.lastName}
              onEdit={handleEdit}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Index;
