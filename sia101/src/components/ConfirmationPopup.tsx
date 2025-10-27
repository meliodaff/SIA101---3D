import React from 'react';

export interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type: 'success' | 'delete' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  showCancelButton = true,
  showConfirmButton = true
}) => {
  if (!isOpen) return null;

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: '/src/assets/icons/success.png',
        };
      case 'delete':
        return {
          icon: '/src/assets/icons/delete.png',
        };
      case 'warning':
        return {
          icon: '/src/assets/icons/warning.png',
        };
      case 'info':
        return {
          icon: '/src/assets/icons/info.png',
        };
      default:
        return {
          icon: '/src/assets/icons/info.png',
        };
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-600 hover:bg-red-700';
      case 'success':
        return 'bg-[#82A33D] hover:bg-[#6d8930]';
      default:
        return 'bg-[#82A33D] hover:bg-[#6d8930]';
    }
  };

  const iconConfig = getIconConfig();

  // For delete type, use the original layout with header
  if (type === 'delete') {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <img src={iconConfig.icon} alt="Delete" className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
          
          <div className="p-6">
            <p className="text-center text-gray-600 mb-6">
              {message}
            </p>
            <div className="flex gap-3">
              {showCancelButton && (
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-semibold"
                >
                  {cancelText}
                </button>
              )}
              {showConfirmButton && (
                <button
                  onClick={onConfirm}
                  className={`flex-1 py-3 text-white rounded-lg transition-colors cursor-pointer font-semibold ${getConfirmButtonClass()}`}
                >
                  {confirmText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For success and other types, use simplified layout
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl relative">
        {/* Close Button - Top Right */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer flex items-center justify-center"
        >
          ×
        </button>
        
        {/* Content */}
        <div className="px-8 py-12 text-center">
          {/* Icon - Center */}
          <img 
            src={iconConfig.icon} 
            alt={type} 
            className="w-16 h-16 mx-auto mb-6"
          />
          {/* Message below icon */}
          <p className="text-gray-600 text-lg font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;