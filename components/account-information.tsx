// components/AccountInformation.tsx
"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import type { Profile } from "../types"; // Adjust path if needed

// Prop Types
interface AccountInformationProps {
  userData: Profile;
  onUpdate: (update: { field: keyof Profile; value: any; file?: File | null }) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

// Helper Functions
const getInitials = (firstName?: string, lastName?: string): string => {
    return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
};

const getBackgroundColorForInitials = (name?: string): string => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500"];
    if (!name) return colors[0];
    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
};

const AccountInformation: React.FC<AccountInformationProps> = ({
  userData,
  onUpdate,
  onSave,
  onCancel,
  isSaving,
  hasChanges,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = getInitials(userData.firstName, userData.lastName);
  const initialsBgColor = useMemo(() => getBackgroundColorForInitials(`${userData.firstName} ${userData.lastName}`), [userData.firstName, userData.lastName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
    setIsModalOpen(false);
  };

  const handleRemovePhotoClick = () => {
    onUpdate({ field: 'profileImage', value: null, file: null });
    setIsModalOpen(false);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({
          field: 'profileImage',
          value: event.target?.result as string,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (field: keyof Profile, value: string) => {
    onUpdate({ field, value });
  };
  
  return (
    <div className="space-y-6">
      {/* Photo Profile Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photo Profile</label>
        <div className="relative w-24 h-24">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold ${initialsBgColor}`}>{initials}</div>
          )}
          <button onClick={() => setIsModalOpen(prev => !prev)} className="absolute bottom-0 right-0 bg-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 shadow-md hover:bg-gray-100 transition-colors" aria-label="Edit profile photo">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
          </button>
          <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/gif" onChange={handleFileInputChange} className="hidden" />
          {isModalOpen && (
            <div ref={modalRef} className="absolute top-full mt-2 left-0 z-10 bg-white rounded-lg shadow-xl w-48 p-2 border border-gray-200">
              <button onClick={handleChangePhotoClick} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Change Photo</button>
              <button onClick={handleRemovePhotoClick} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md">Remove Photo</button>
            </div>
          )}
        </div>
      </div>

      {/* Form Fields */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input type="text" value={userData.firstName || ''} onChange={(e) => handleFieldChange("firstName", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input type="text" value={userData.lastName || ''} onChange={(e) => handleFieldChange("lastName", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={userData.username || ''} onChange={(e) => handleFieldChange("username", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" value={userData.phoneNumber || ''} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
            <textarea value={userData.biography || ''} onChange={(e) => handleFieldChange("biography", e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" />
        </div>

      {/* Action Buttons */}
      {hasChanges && (
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={onSave} disabled={isSaving} className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:bg-green-300">
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;