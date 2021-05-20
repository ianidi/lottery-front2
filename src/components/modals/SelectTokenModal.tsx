import { TokenSelectorModal } from '../../components/modals/TokenSelectorModal';
import { CustomTokenModal } from '../../components/modals/CustomTokenModal';
import React, { useState } from 'react';

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const SelectTokenModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [custom, setCustom] = useState(false);

  return (
    <>
      {!custom && (
        <TokenSelectorModal
          isOpen={isOpen}
          onClose={onClose}
          onCustom={() => setCustom(true)}
        />
      )}
      {custom && (
        <CustomTokenModal
          isOpen={isOpen}
          onClose={() => {
            setCustom(false);
            onClose();
          }}
          onBack={() => setCustom(false)}
        />
      )}
    </>
  );
};
