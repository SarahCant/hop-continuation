"use client";

import ChatCreation from "../components/ChatCreation";
import { useAuth } from "../context/auth";
import RequireAuth from "../components/RequireAuth";
import BottomMenu from "../components/BottomMenu";

export default function CreateChat() {
  const { currentUser } = useAuth();

  return (
    <RequireAuth delay={700}>
      {/* check for auth */}
      <div className="flex flex-col w-80 mx-auto pb-60">
        <h1 className="mt-6">Opret gruppe</h1>
        <p>
          Her kan du oprette chats. Du kan tilføje medlemmer ved at søge efter
          deres e-mails. Husk også at vælge et fedt gruppenavn! Når du er
          færdig, kan du trykke på &quot;Opret&quot;.
        </p>
        <ChatCreation currentUser={currentUser} />
      </div>
      <BottomMenu />
    </RequireAuth>
  );
}
