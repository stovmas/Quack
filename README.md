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

## Complete Beginner's Guide

Never used GitHub or run code before? No problem! Follow these step-by-step instructions:

### Step 1: Install Required Software

**Install Node.js:**
1. Go to https://nodejs.org/
2. Download the "LTS" (Long Term Support) version for your operating system
3. Run the installer and follow the prompts (keep all default settings)
4. Restart your computer after installation

**Verify Installation:**
1. Open a terminal/command prompt:
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `terminal`, press Enter
   - **Linux**: Press `Ctrl + Alt + T`
2. Type `node --version` and press Enter (should show something like `v20.10.0`)
3. Type `npm --version` and press Enter (should show something like `10.2.3`)

### Step 2: Get an OpenAI API Key

1. Go to https://platform.openai.com/signup
2. Create an account (you'll need to verify your email)
3. Add payment method: https://platform.openai.com/account/billing
   - **Cost**: About $0.01 per voice note (very cheap!)
   - Example: 100 notes = ~$1.00
4. Get your API key: https://platform.openai.com/api-keys
5. Click "Create new secret key"
6. **IMPORTANT**: Copy the key and save it somewhere safe (like a password manager)
   - It starts with `sk-`
   - You'll only see it once!

### Step 3: Download This Project

**Option A: Using Git (Recommended)**
1. Install Git: https://git-scm.com/downloads
2. Open terminal/command prompt
3. Navigate to where you want the project:
   ```bash
   cd Desktop
   ```
4. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Quack.git
   cd Quack
   ```

**Option B: Download as ZIP**
1. On this GitHub page, click the green "Code" button
2. Click "Download ZIP"
3. Extract the ZIP file to your Desktop
4. Open terminal and navigate to the folder:
   ```bash
   cd Desktop/Quack-main
   ```

### Step 4: Install Project Dependencies

In your terminal (make sure you're in the Quack folder):

```bash
npm install
```

This will take 1-2 minutes. You'll see lots of text - that's normal! Wait for it to finish.

### Step 5: Start the Application

```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 542 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Step 6: Open in Your Browser

1. Open **Google Chrome** or **Microsoft Edge** (required for voice recording!)
2. Go to: http://localhost:3000
3. You should see the Quack app with a dark background!

### Step 7: Set Up Your API Key

1. Click the **gear icon** (⚙️) in the top-right corner
2. Paste your OpenAI API key (the one starting with `sk-`)
3. Click **Save**

### Step 8: Record Your First Note!

1. Click the **blue microphone button** in the bottom-right corner
2. **Allow microphone access** when your browser asks
3. Speak clearly: "This is my first voice note about testing the app"
4. Click the **red square button** to stop
5. Wait 5-10 seconds while it processes
6. Your note will appear as a colored bubble in the graph! 🎉

### Step 9: Explore Your Notes

- **Zoom**: Scroll your mouse wheel
- **Pan**: Click and drag the background
- **View Note**: Click any note bubble to read/edit it
- **Delete**: Click a note, then click the trash icon
- **Add More**: Click the microphone and keep adding notes!

### Troubleshooting

**"npm: command not found"**
- Node.js isn't installed properly. Go back to Step 1

**"Port 3000 is already in use"**
- Something else is using port 3000. Change it in `vite.config.ts` to port 3001

**Microphone doesn't work**
- Make sure you're using Chrome or Edge (Firefox/Safari won't work)
- Check browser permissions: Settings → Privacy → Microphone
- Try refreshing the page

**"Failed to extract themes"**
- Check your API key is correct
- Make sure you have credits on your OpenAI account
- Check your internet connection

**No sound/transcription doesn't work**
- Speak louder and clearer
- Make sure microphone is working (test in other apps)
- Try recording again

**Notes disappear after closing browser**
- This shouldn't happen! Notes are saved automatically
- Check browser settings - make sure cookies/localStorage aren't being cleared

### Stopping the App

When you're done:
1. Go back to the terminal
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. Type `y` if asked to confirm

The app will stop running. Run `npm run dev` again to restart it!

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
