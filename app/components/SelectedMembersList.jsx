"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SelectedMembersList({ selectedUsers, onRemove }) {
  return (
    <div className="pt-20">
      <h2>Din gruppe</h2>

      {selectedUsers.length > 0 ? (
        <ul>
          <AnimatePresence>
            {selectedUsers.map((user, index) => (
              <React.Fragment key={user.uid}>
                <motion.li
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="flex justify-between w-80 mx-auto p-2 bg-[var(--blue)]/40"
                >
                  <div className="flex flex-col">
                    <p>{user.username}</p>
                    <p className="!text-[11px] text-gray-600 -mt-1">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemove(user.uid)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`Fjern ${user.username}`}
                  >
                    X
                  </button>
                </motion.li>

                {index < selectedUsers.length - 1 && (
                  <div className="bg-[var(--blue)]/40 w-full">
                    <hr className="w-[80%] mx-auto border-t border-gray-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <p className="text-gray-500 italic pt-2">
          Du har ikke tilføjet nogle medlemmer endnu.
        </p>
      )}
    </div>
  );
}
