import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // currentUser
  const [loading, setLoading] = useState(false);

  // Authentication placeholders
  const login = async (email, password) => {
    setLoading(true);
    // REST Login logic goes here...
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
  };

  // Multi-tenant check: verifies user role in a specific project context
  const getProjectRole = (projectId) => {
    if (!user || !user.memberships) return null;
    const membership = user.memberships.find(m => m.projectId === projectId);
    return membership ? membership.role : null;
  };

  const isRole = (projectId, roles) => {
    const userRole = getProjectRole(projectId);
    if (!userRole) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(userRole);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getProjectRole,
    isRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
