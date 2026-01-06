import { GraphView } from './components/GraphView';
import { VoiceRecorder } from './components/VoiceRecorder';
import { NoteEditor } from './components/NoteEditor';
import { ApiKeyModal } from './components/ApiKeyModal';
import { useStore } from './store';

function App() {
  const selectedNoteId = useStore((state) => state.selectedNoteId);

  return (
    <div className="w-screen h-screen bg-slate-900 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-slate-900 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Quack</h1>
            <p className="text-gray-400">Voice notes, visualized by theme</p>
          </div>
        </div>
      </header>

      {/* Graph View */}
      <div className={`w-full h-full ${selectedNoteId ? 'pr-96' : ''} transition-all duration-300`}>
        <GraphView />
      </div>

      {/* Voice Recorder Button */}
      <VoiceRecorder />

      {/* Settings Button */}
      <ApiKeyModal />

      {/* Note Editor Sidebar */}
      {selectedNoteId && <NoteEditor />}
    </div>
  );
}

export default App;
