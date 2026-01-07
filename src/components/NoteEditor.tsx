import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { X, Trash2 } from 'lucide-react';
import { useStore } from '../store';

export function NoteEditor() {
  const { selectedNoteId, notes, selectNote, updateNote, deleteNote } = useStore();

  const note = notes.find((n) => n.id === selectedNoteId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      if (selectedNoteId) {
        updateNote(selectedNoteId, editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note]);

  if (!note) return null;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-slate-800 shadow-2xl border-l border-slate-700 z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-white">{note.title || 'Untitled Note'}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-red-400 hover:text-red-300"
              title="Delete note"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => selectNote(null)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-white"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4 border-b border-slate-700">
        <div className="text-sm text-gray-400 mb-2">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </div>
        {note.themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.themes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1 bg-slate-700 text-sm rounded-full text-gray-200"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Original Transcription */}
      {note.transcription && note.transcription !== note.content && (
        <div className="p-4 border-b border-slate-700 bg-slate-900">
          <div className="text-xs text-gray-500 mb-2">ORIGINAL TRANSCRIPTION</div>
          <div className="text-sm text-gray-300">{note.transcription}</div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-4">
        <EditorContent
          editor={editor}
          className="prose prose-invert prose-slate max-w-none
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:min-h-full
            [&_.ProseMirror]:text-gray-200
            [&_.ProseMirror_p]:my-2
            [&_.ProseMirror_h1]:text-2xl
            [&_.ProseMirror_h1]:font-bold
            [&_.ProseMirror_h1]:mb-4
            [&_.ProseMirror_h2]:text-xl
            [&_.ProseMirror_h2]:font-bold
            [&_.ProseMirror_h2]:mb-3
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pl-6
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pl-6
          "
        />
      </div>
    </div>
  );
}
