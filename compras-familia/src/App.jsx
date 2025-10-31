import { useState, useEffect } from 'react';
import ProfileSelector from './components/ProfileSelector';
import Dashboard from './pages/Dashboard';
import './App.css';

const STORAGE_KEY = 'compras-familia-expenses';

function App() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // Carregar despesas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
        setExpenses([]);
      }
    }
  }, []);

  // Salvar despesas no localStorage
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses]);

  // Função global para adicionar despesa (chamada do PendingExpenses)
  useEffect(() => {
    window.addExpense = (expense) => {
      setExpenses(prev => [...prev, expense]);
    };

    return () => {
      delete window.addExpense;
    };
  }, []);

  const handleSelectProfile = (profile) => {
    setCurrentProfile(profile);
  };

  const handleApprove = (expenseId) => {
    if (window.confirm('Aprovar esta despesa?')) {
      setExpenses(prev =>
        prev.map(exp =>
          exp.id === expenseId
            ? { ...exp, status: 'approved', approvedAt: new Date().toISOString() }
            : exp
        )
      );
    }
  };

  const handleReject = (expenseId) => {
    if (window.confirm('Rejeitar esta despesa? Ela será removida.')) {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    }
  };

  const handleLogout = () => {
    setCurrentProfile(null);
  };

  return (
    <div className="app">
      {!currentProfile ? (
        <ProfileSelector onSelectProfile={handleSelectProfile} />
      ) : (
        <Dashboard
          profile={currentProfile}
          expenses={expenses}
          onApprove={handleApprove}
          onReject={handleReject}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
