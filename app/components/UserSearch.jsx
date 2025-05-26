"use client";

import { useState, useEffect } from "react";
import { searchUsersByEmailPrefix } from "../firebase";
import React from "react";

export default function UserSearch({ currentUser, selectedUsers, onAdd }) {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch suggestions whenever something is written
  useEffect(() => {
    let isCanceled = false;
    async function fetch() {
      if (!term) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      const matches = await searchUsersByEmailPrefix(term.toLowerCase());
      if (isCanceled) return;
      //don't display currentUser or already selected users
      setSuggestions(
        matches.filter(
          (u) =>
            u.uid !== currentUser.uid &&
            !selectedUsers.some((sel) => sel.uid === u.uid)
        )
      );
      setLoading(false);
    }
    fetch();
    return () => {
      isCanceled = true;
    };
  }, [term, currentUser.uid, selectedUsers]);

  return (
    <div className="relative w-full">
      {/* search input field */}
      <input
        type="text"
        placeholder="Søg efter brugermails"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="input w-full !bg-[var(--blue)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-[var(--blue)]"
      />

      {/* search results */}
      {!loading && suggestions.length > 0 && (
        <ul
          className="
            absolute top-full  w-75 left-1 mt-1
            bg-[var(--bg)] rounded shadow-lg z-10
            max-h-60 overflow-y-auto
          "
        >
          <div className="bg-[var(--blue)]/20">
            {suggestions.map((user, i) => (
              <React.Fragment>
                <li
                  key={user.uid}
                  className="flex justify-between items-center px-3 py-2"
                >
                  <div className="flex-col">
                    <p className="text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500 -mt-1">{user.email}</p>
                  </div>

                  {/* add btn */}
                  <button
                    className="cta text-xs !w-fit"
                    onClick={() => {
                      onAdd(user);
                      setTerm("");
                      setSuggestions([]);
                    }}
                  >
                    TILFØJ
                  </button>
                </li>

                {/* divider */}
                {i < suggestions.length - 1 && (
                  <div className="w-full">
                    <hr className="w-[80%] mx-auto border-t border-gray-300 my-0.5" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}
