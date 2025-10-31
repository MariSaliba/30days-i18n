import React from 'react';
import { PROFILES } from '../config/familyConfig';

function ProfileSelector({ onSelectProfile }) {
  return (
    <div className="profile-selector">
      <div className="profile-container">
        <h1 className="app-title">🛒 Compras da Família</h1>
        <p className="app-subtitle">Quem está usando o app?</p>

        <div className="profile-buttons">
          <button
            className="profile-btn family-btn"
            onClick={() => onSelectProfile(PROFILES.FAMILY)}
          >
            <span className="profile-icon">👨‍👩‍👧‍👦</span>
            <span className="profile-name">Família</span>
            <span className="profile-desc">Aprovar contas e ver relatórios</span>
          </button>

          <button
            className="profile-btn caregiver-btn"
            onClick={() => onSelectProfile(PROFILES.CAREGIVER)}
          >
            <span className="profile-icon">💼</span>
            <span className="profile-name">Cuidadora</span>
            <span className="profile-desc">Cadastrar despesas</span>
          </button>
        </div>

        <p className="profile-footer">Feito com carinho para quem cuida 💛</p>
      </div>
    </div>
  );
}

export default ProfileSelector;
