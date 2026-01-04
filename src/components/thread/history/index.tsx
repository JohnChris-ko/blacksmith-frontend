import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQueryState, parseAsBoolean } from "nuqs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { PanelRightOpen, PanelRightClose, SquarePen, Pencil, Trash2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getUserConversations, updateConversationTitle, deleteConversation } from "@/actions/conversations";
import type { Conversation } from "@/types/database";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

function ConversationItem({ conversation, isActive, onClick, onRename, onDelete }: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(conversation.title);

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== conversation.title) {
      onRename(conversation.id, trimmedTitle);
    } else {
      setEditedTitle(conversation.title); // Reset if unchanged or empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(conversation.title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Delete this conversation?')) {
      onDelete(conversation.id);
    }
  };

  return (
    <div className="group relative w-full px-2">
      <div className="flex items-center gap-1">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="h-9 text-sm bg-gray-800 border-gray-700 text-white"
            autoFocus
          />
        ) : (
          <Button
            variant="ghost"
            className={`flex-1 items-start justify-start text-left font-normal h-auto py-3 px-3 rounded-lg transition-colors ${
              isActive
                ? "bg-gray-800 text-white hover:bg-gray-800"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => onClick(conversation.id)}
          >
            <p className="truncate text-ellipsis w-full text-sm">{conversation.title}</p>
          </Button>
        )}

        {!isEditing && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-gray-800"
              onClick={handleDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadList({
  conversations,
  activeThreadId,
  onThreadClick,
  onRename,
  onDelete,
}: {
  conversations: Conversation[];
  activeThreadId: string | null;
  onThreadClick?: (threadId: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-1 overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeThreadId}
          onClick={(id) => {
            onThreadClick?.(id);
          }}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
      {conversations.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-gray-400">
          No conversations yet.<br />Start a new chat!
        </div>
      )}
    </div>
  );
}

function ThreadHistoryLoading() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2 overflow-y-scroll px-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          className="h-11 w-full bg-gray-800"
        />
      ))}
    </div>
  );
}

export default function ThreadHistory() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );
  const [threadId, setThreadId] = useQueryState("threadId");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadConversations = async () => {
      setIsLoading(true);
      try {
        const userConversations = await getUserConversations();
        setConversations(userConversations);
      } catch (error) {
        console.error('Failed to load conversations:', error);
        toast.error('Failed to load conversations');
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const handleNewChat = () => {
    setThreadId(null);
  };

  const handleRename = async (id: string, newTitle: string) => {
    const result = await updateConversationTitle(id, newTitle);

    if (result.success) {
      // Update local state
      setConversations(prev =>
        prev.map(conv =>
          conv.id === id ? { ...conv, title: newTitle } : conv
        )
      );
    } else {
      toast.error(result.error || 'Failed to update title');
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteConversation(id);

    if (result.success) {
      // Remove from local state
      setConversations(prev => prev.filter(conv => conv.id !== id));

      // If deleted conversation was active, clear threadId
      if (id === threadId) {
        setThreadId(null);
      }

      toast.success('Conversation deleted');
    } else {
      toast.error(result.error || 'Failed to delete conversation');
    }
  };

  return (
    <>
      <div className="hidden h-screen w-[280px] shrink-0 flex-col items-start justify-start gap-3 bg-gray-900 lg:flex">
        <div className="flex w-full items-center justify-between px-3 pt-4 pb-2">
          <h1 className="text-lg font-bold text-white tracking-tight">
            Conversations
          </h1>
          <Button
            className="hover:bg-gray-800 text-white"
            variant="ghost"
            size="icon"
            onClick={() => setChatHistoryOpen((p) => !p)}
          >
            {chatHistoryOpen ? (
              <PanelRightOpen className="h-4 w-4" />
            ) : (
              <PanelRightClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="w-full px-3">
          <Button
            className="w-full justify-start gap-2 bg-white text-gray-900 hover:bg-gray-100 font-medium"
            onClick={handleNewChat}
          >
            <SquarePen className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {isLoading ? (
          <ThreadHistoryLoading />
        ) : (
          <ThreadList
            conversations={conversations}
            activeThreadId={threadId}
            onThreadClick={(id) => setThreadId(id)}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        )}
      </div>
      <div className="lg:hidden">
        <Sheet
          open={!!chatHistoryOpen && !isLargeScreen}
          onOpenChange={(open) => {
            if (isLargeScreen) return;
            setChatHistoryOpen(open);
          }}
        >
          <SheetContent
            side="left"
            className="flex lg:hidden"
          >
            <SheetHeader>
              <SheetTitle>Thread History</SheetTitle>
            </SheetHeader>
            <div className="mb-4">
              <Button
                variant="default"
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleNewChat();
                  setChatHistoryOpen(false);
                }}
              >
                <SquarePen className="h-4 w-4" />
                New Chat
              </Button>
            </div>
            <ThreadList
              conversations={conversations}
              activeThreadId={threadId}
              onThreadClick={(id) => {
                setThreadId(id);
                setChatHistoryOpen(false);
              }}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
