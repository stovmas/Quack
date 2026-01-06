import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, Theme, GraphData } from './types';
import { extractThemes } from './services/ai';
import { generateColor } from './utils/colors';

interface AppState {
  notes: Note[];
  themes: Theme[];
  selectedNoteId: string | null;
  isRecording: boolean;
  apiKey: string | null;

  // Actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'themes'>) => Promise<void>;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  selectNote: (id: string | null) => void;
  setRecording: (isRecording: boolean) => void;
  setApiKey: (key: string) => void;
  getGraphData: () => GraphData;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      notes: [],
      themes: [],
      selectedNoteId: null,
      isRecording: false,
      apiKey: null,

      addNote: async (noteData) => {
        const newNote: Note = {
          ...noteData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          themes: [],
        };

        // Extract themes using AI
        const apiKey = get().apiKey;
        if (apiKey) {
          try {
            const extractedThemes = await extractThemes(noteData.transcription, apiKey);
            newNote.themes = extractedThemes;

            // Update or create themes
            const currentThemes = get().themes;
            const updatedThemes = [...currentThemes];

            extractedThemes.forEach(themeName => {
              const existingTheme = updatedThemes.find(t => t.name.toLowerCase() === themeName.toLowerCase());

              if (existingTheme) {
                existingTheme.noteIds.push(newNote.id);
              } else {
                updatedThemes.push({
                  id: crypto.randomUUID(),
                  name: themeName,
                  color: generateColor(themeName),
                  noteIds: [newNote.id],
                });
              }
            });

            set({ themes: updatedThemes });
          } catch (error) {
            console.error('Failed to extract themes:', error);
          }
        }

        set((state) => ({ notes: [...state.notes, newNote] }));
      },

      updateNote: (id, content) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, content, updatedAt: new Date() }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => {
          // Remove note from themes
          const updatedThemes = state.themes.map(theme => ({
            ...theme,
            noteIds: theme.noteIds.filter(noteId => noteId !== id),
          })).filter(theme => theme.noteIds.length > 0);

          return {
            notes: state.notes.filter((note) => note.id !== id),
            themes: updatedThemes,
            selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
          };
        });
      },

      selectNote: (id) => set({ selectedNoteId: id }),

      setRecording: (isRecording) => set({ isRecording }),

      setApiKey: (key) => set({ apiKey: key }),

      getGraphData: () => {
        const state = get();
        const nodes: GraphData['nodes'] = [];
        const links: GraphData['links'] = [];

        // Add theme nodes
        state.themes.forEach((theme) => {
          nodes.push({
            id: `theme-${theme.id}`,
            label: theme.name,
            type: 'theme',
            color: theme.color,
            val: 15,
          });
        });

        // Add note nodes and links
        state.notes.forEach((note) => {
          const preview = note.transcription.substring(0, 30) + (note.transcription.length > 30 ? '...' : '');

          // Get the color from the first theme
          const firstTheme = state.themes.find(t => note.themes.includes(t.name));
          const color = firstTheme?.color || '#94a3b8';

          nodes.push({
            id: `note-${note.id}`,
            label: preview,
            type: 'note',
            color,
            val: 8,
          });

          // Create links to themes
          note.themes.forEach((themeName) => {
            const theme = state.themes.find(t => t.name === themeName);
            if (theme) {
              links.push({
                source: `note-${note.id}`,
                target: `theme-${theme.id}`,
              });
            }
          });
        });

        return { nodes, links };
      },
    }),
    {
      name: 'quack-storage',
      partialize: (state) => ({
        notes: state.notes.map(note => ({ ...note, audioBlob: undefined })),
        themes: state.themes,
        apiKey: state.apiKey,
      }),
    }
  )
);
