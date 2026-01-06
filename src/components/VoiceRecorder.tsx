import { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { useStore } from '../store';

export function VoiceRecorder() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isRecording, setRecording, addNote, apiKey } = useStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!apiKey) {
      alert('Please set your OpenAI API key first (click the gear icon)');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());

        setIsProcessing(true);
        await processRecording(audioBlob);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please grant permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const processRecording = async (audioBlob: Blob) => {
    try {
      // Use Web Speech API for transcription
      const transcription = await transcribeAudio(audioBlob);

      if (!transcription) {
        alert('Could not transcribe audio. Please try again.');
        return;
      }

      await addNote({
        content: transcription,
        transcription,
        audioBlob,
      });
    } catch (error) {
      console.error('Error processing recording:', error);
      alert('Error processing recording. Please try again.');
    }
  };

  const transcribeAudio = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;

      let finalTranscript = '';

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
      };

      recognition.onerror = () => {
        reject(new Error('Speech recognition failed'));
      };

      recognition.onend = () => {
        resolve(finalTranscript.trim());
      };

      // Start recognition
      recognition.start();

      // Play the audio to trigger recognition
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play().catch(() => {
        // If autoplay fails, just use the live transcription
        setTimeout(() => {
          recognition.stop();
        }, 3000);
      });

      audio.onended = () => {
        setTimeout(() => {
          recognition.stop();
        }, 500);
      };
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={`
          p-6 rounded-full shadow-lg transition-all transform hover:scale-110
          ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          text-white
        `}
        title={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : isRecording ? (
          <Square className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </button>
    </div>
  );
}
