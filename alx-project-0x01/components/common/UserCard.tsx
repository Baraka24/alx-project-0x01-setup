import React from "react";
import { UserProps } from "@/interfaces";

export type UserCardProps = UserProps & {
  onMessage?: (user: UserProps) => void;
  onFollow?: (user: UserProps) => void;
  compact?: boolean;
  className?: string;
};

function colorFromId(id: number) {
  const palette = [
    "from-indigo-500 to-blue-500",
    "from-fuchsia-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-sky-500 to-cyan-500",
    "from-rose-500 to-red-500",
  ];
  return palette[id % palette.length];
}

function initials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

const UserCard: React.FC<UserProps & { onMessage?: (user: UserProps) => void; onFollow?: (user: UserProps) => void; compact?: boolean; className?: string }> = ({
  id,
  name,
  username,
  email,
  onMessage,
  onFollow,
  compact = false,
  className,
}) => {
  const gradient = colorFromId(id);

  return (
    <div
      className={[
        "w-full max-w-xl mx-auto",
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        "hover:shadow-md transition-shadow",
        compact ? "p-4" : "p-6",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            "relative shrink-0",
            compact ? "w-12 h-12" : "w-14 h-14",
            "rounded-full",
            "bg-gradient-to-br",
            gradient,
            "text-white grid place-items-center font-semibold",
          ].join(" ")}
          aria-hidden
        >
          <span>{initials(name)}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className={"text-gray-900 font-semibold truncate " + (compact ? "text-base" : "text-lg")}>{name}</h3>
              <p className="text-gray-500 text-sm truncate">@{username}</p>
            </div>

            {!compact && (
              <span className="hidden sm:inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                ID: {id}
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-700 truncate">
            <a className="hover:underline text-blue-600" href={`mailto:${email}`}>{email}</a>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {onMessage && (
              <button
                onClick={() => onMessage({ id, name, username, email })}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.508.75 7.14 5.355a.75.75 0 0 0 .904 0l7.14-5.355H4.008Z" />
                </svg>
                Message
              </button>
            )}
            {onFollow && (
              <button
                onClick={() => onFollow({ id, name, username, email })}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75V9h6a.75.75 0 0 1 0 1.5h-6v6a.75.75 0 0 1-1.5 0v-6H4.5a.75.75 0 0 1 0-1.5h6V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
