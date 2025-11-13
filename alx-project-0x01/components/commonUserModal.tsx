import React, { useEffect, useRef } from "react";
import { UserProps } from "@/interfaces"; // <UserProps>

export interface UserModalProps {
  user: UserProps | null;
  isOpen: boolean;
  onClose: () => void;
  onMessage?: (user: UserProps) => void;
  onFollow?: (user: UserProps) => void;
}

// Accessible focus trapping helper (minimal)
function useFocusTrap(active: boolean, ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const focusable = node.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        // close on ESC
        (document.activeElement as HTMLElement)?.blur();
        return;
      }
      if (e.key === "Tab") {
        if (focusable.length === 0) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    node.addEventListener("keydown", handleKey);
    return () => node.removeEventListener("keydown", handleKey);
  }, [active, ref]);
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose, onMessage, onFollow }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, dialogRef);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-desc"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close user details"
          className="absolute top-2 right-2 p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white grid place-items-center font-semibold text-lg">
            {user.name.split(/\s+/).slice(0,2).map(p=>p[0].toUpperCase()).join("")}
          </div>
          <div className="min-w-0">
            <h2 id="user-modal-title" className="text-xl font-semibold text-gray-900 truncate">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          </div>
        </div>

        <div id="user-modal-desc" className="text-sm text-gray-700 space-y-1">
          <div>
            <span className="font-medium">Email:</span>{" "}
            <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
          </div>
          {user.address?.street && (
            <div>
              <span className="font-medium">Street:</span> {user.address.street}
            </div>
          )}
          {user.company?.catchPhrase && (
            <div className="italic text-gray-600">“{user.company.catchPhrase}”</div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          {onMessage && (
            <button
              onClick={() => onMessage(user)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.508.75 7.14 5.355a.75.75 0 0 0 .904 0l7.14-5.355H4.008Z" /></svg>
              Message
            </button>
          )}
          {onFollow && (
            <button
              onClick={() => onFollow(user)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75V9h6a.75.75 0 0 1 0 1.5h-6v6a.75.75 0 0 1-1.5 0v-6H4.5a.75.75 0 0 1 0-1.5h6V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>
              Follow
            </button>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
