import React from 'react';

interface NavigationViewProps {
  onNavigate: (action: 'back' | 'next') => void;
}

const NavigationView: React.FC<NavigationViewProps> = ({ onNavigate }) => {
  const handleBack = () => {
    onNavigate('back');
  };

  const handleNext = () => {
    onNavigate('next');
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default NavigationView;
