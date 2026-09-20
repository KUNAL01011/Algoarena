
import React from 'react';

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
}

const LoadingButton = ({ 
  children, 
  loading, 
  disabled, 
  onClick, 
  type = 'button',
  variant = 'primary' 
}: LoadingButtonProps) => {
  const baseClasses = "w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 disabled:opacity-50"
    : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 disabled:opacity-50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses}`}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
