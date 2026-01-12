import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Mic, Image, Upload, Loader2 } from 'lucide-react';
import { SpeechRecognitionService } from '../utils/speechRecognition';
import type { InputType } from '../constants';

interface CaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, tags: string[], inputType: InputType, imageData?: string) => void;
}

type TabType = 'text' | 'voice' | 'image';

const speechService = new SpeechRecognitionService();

export function CaptureModal({ isOpen, onClose, onSubmit }: CaptureModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageData, setImageData] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [voiceError, setVoiceError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isListening) {
        speechService.stop();
      }
    };
  }, [isListening]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    onSubmit(
      title,
      description,
      tagArray.length > 0 ? tagArray : ['#Uncategorized'],
      activeTab,
      imageData || undefined
    );
    
    // Reset form
    setTitle('');
    setDescription('');
    setTags('');
    setImageData('');
    setImagePreview('');
    setIsSubmitting(false);
  };

  const handleVoiceRecording = () => {
    if (!speechService.isSupported()) {
      setVoiceError('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      speechService.stop();
      setIsListening(false);
    } else {
      setVoiceError('');
      setIsListening(true);
      
      speechService.start(
        (transcript: string, isFinal: boolean) => {
          setDescription(transcript);
          if (isFinal) {
            setIsListening(false);
          }
        },
        (error: string) => {
          setVoiceError(`Error: ${error}. Please check microphone permissions.`);
          setIsListening(false);
        }
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageData(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageData(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Add New Idea</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-700">
                <TabButton
                  active={activeTab === 'text'}
                  onClick={() => setActiveTab('text')}
                  icon={<FileText className="w-5 h-5" />}
                  label="Text"
                />
                <TabButton
                  active={activeTab === 'voice'}
                  onClick={() => setActiveTab('voice')}
                  icon={<Mic className="w-5 h-5" />}
                  label="Voice"
                />
                <TabButton
                  active={activeTab === 'image'}
                  onClick={() => setActiveTab('image')}
                  icon={<Image className="w-5 h-5" />}
                  label="Image"
                />
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'text' && (
                    <div className="space-y-4">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                        placeholder="Type your idea here..."
                        required
                      />
                    </div>
                  )}

                  {activeTab === 'voice' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center p-8 bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl">
                        <button
                          type="button"
                          onClick={handleVoiceRecording}
                          disabled={isListening}
                          className={`flex flex-col items-center gap-3 ${
                            isListening ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-400'
                          } transition-colors`}
                        >
                          {isListening ? (
                            <>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="p-4 bg-indigo-500/20 rounded-full"
                              >
                                <Mic className="w-8 h-8" />
                              </motion.div>
                              <span className="text-sm font-medium">Listening... Click to stop</span>
                            </>
                          ) : (
                            <>
                              <div className="p-4 bg-slate-700/50 rounded-full hover:bg-indigo-500/20 transition-colors">
                                <Mic className="w-8 h-8" />
                              </div>
                              <span className="text-sm font-medium">
                                {speechService.isSupported() 
                                  ? 'Click to start recording' 
                                  : 'Speech recognition not supported'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                      {voiceError && (
                        <p className="text-red-400 text-sm">{voiceError}</p>
                      )}
                      {description && (
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                          placeholder="Your transcribed voice note will appear here..."
                        />
                      )}
                    </div>
                  )}

                  {activeTab === 'image' && (
                    <div className="space-y-4">
                      <div 
                        className="flex items-center justify-center p-12 bg-slate-800 border-2 border-dashed border-slate-700 rounded-xl hover:border-indigo-500/50 transition-colors cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="max-h-64 rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImageData('');
                                setImagePreview('');
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-slate-400">
                            <Upload className="w-12 h-12" />
                            <p className="text-sm font-medium">Click or drag to upload an image</p>
                            <p className="text-xs text-slate-500">Max size: 5MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                        placeholder="Add context about your idea from the image..."
                      />
                    </div>
                  )}
                </div>

                {/* Common Fields */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="Give your idea a catchy title..."
                    required
                  />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="Add tags (comma separated)..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !description.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending to Vault...
                      </>
                    ) : (
                      'Send to Vault'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all relative ${
        active
          ? 'text-indigo-400'
          : 'text-slate-400 hover:text-slate-300'
      }`}
    >
      {icon}
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
        />
      )}
    </button>
  );
}
