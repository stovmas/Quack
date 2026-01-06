# Quack - Voice Notes Network

A beautiful web application that ingests voice notes and creates an interactive network visualization of your thoughts, automatically connecting notes through AI-detected themes.

## Features

- 🎤 **Voice Recording**: Record voice notes directly in your browser
- 🤖 **AI Theme Extraction**: Automatically categorize notes using GPT-4
- 🕸️ **Network Visualization**: See your notes as an interactive graph with thematic connections
- 🎨 **Color-Coded Groups**: Each theme gets a unique color for easy visual distinction
- 🔍 **Zoom & Pan**: Navigate your knowledge network with smooth zooming and panning
- ✏️ **Rich Text Editing**: Edit and refine your notes with a built-in document editor
- 💾 **Persistent Storage**: All notes are saved locally in your browser

## How It Works

1. **Record**: Click the microphone button and speak your thought
2. **Transcribe**: The app transcribes your voice to text using Web Speech API
3. **Analyze**: GPT-4 analyzes the content and extracts relevant themes
4. **Visualize**: Your note appears as a node in the graph, connected to its themes
5. **Explore**: Zoom out to see the big picture, zoom in to read and edit notes

### Example

Say you record: "I thought of a funny joke about how exhausting it is being a mom"

The AI might extract themes: `["stand up", "motherhood"]`

Your note will appear as a node connected to both "stand up" and "motherhood" theme nodes. If you have other notes about motherhood or stand-up comedy, you'll see the thematic connections.

## Setup

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Quack
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

5. Click the settings gear icon and enter your OpenAI API key

## Usage

### Recording a Voice Note

1. Click the blue microphone button in the bottom-right corner
2. Speak your thought clearly
3. Click the red square button to stop recording
4. Wait a moment while the app transcribes and analyzes your note
5. Your note will appear in the graph!

### Navigating the Graph

- **Zoom**: Scroll to zoom in/out
- **Pan**: Click and drag the background
- **Select Note**: Click any note node to open the editor
- **Theme Nodes**: Larger nodes with white borders are themes

### Editing Notes

- Click any note node to open the editor sidebar
- Edit the content using the rich text editor
- Your changes are automatically saved
- Original transcription is preserved for reference
- Delete notes using the trash icon

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **react-force-graph** - Graph visualization
- **TipTap** - Rich text editor
- **Tailwind CSS** - Styling
- **OpenAI GPT-4** - Theme extraction
- **Web Speech API** - Voice transcription

## Privacy & Security

- Your API key is stored locally in your browser (localStorage)
- Voice recordings are processed locally and not uploaded
- Only transcribed text is sent to OpenAI for theme analysis
- All notes are stored in your browser's localStorage

## Limitations

- Web Speech API requires Chrome/Edge browser
- Voice transcription requires internet connection
- Theme extraction requires OpenAI API (costs ~$0.01 per note)
- Storage is limited to browser localStorage (~5-10MB)

## Future Enhancements

- Export/import notes as JSON
- Search functionality
- Custom theme editing
- Multiple workspace support
- Backend storage option
- Collaborative features
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project however you'd like!

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Claude Code
