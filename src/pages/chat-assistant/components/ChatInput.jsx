import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ChatInput = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter" && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        // Simulate voice input
        setMessage("Can you help me analyze my Netflix subscription usage?");
      }, 3000);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef?.current?.scrollHeight}px`;
    }
  }, [message]);

  const suggestedQuestions = [
    "How much am I spending on streaming services?",
    "Which subscriptions should I cancel?",
    "Show me my subscription analytics",
    "Help me find cheaper alternatives",
  ];

  return (
    <div className="space-y-4">
      {/* Suggested Questions */}
      {message === "" && (
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions?.map((question, index) => (
            <button
              key={index}
              onClick={() => setMessage(question)}
              className="px-3 py-2 text-sm rounded-full glass border border-primary/20 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all duration-300 hover-glow-primary"
            >
              {question}
            </button>
          ))}
        </div>
      )}
      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card rounded-2xl border border-primary/20 focus-within:border-primary/40 transition-all duration-300">
          <div className="flex items-end space-x-3 p-4">
            {/* Voice Recording Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleVoiceToggle}
              className={`flex-shrink-0 transition-all duration-300 ${
                isRecording
                  ? "text-error hover:text-error neon-glow-accent"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon name={isRecording ? "MicOff" : "Mic"} size={20} />
            </Button>

            {/* Text Input */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isRecording
                    ? "Listening..."
                    : "Ask me anything about your subscriptions..."
                }
                disabled={isLoading || isRecording}
                className="w-full bg-transparent text-foreground placeholder-muted-foreground resize-none border-none outline-none min-h-[24px] max-h-32 leading-6"
                rows={1}
              />
            </div>

            {/* Attachment Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-muted-foreground hover:text-primary"
            >
              <Icon name="Paperclip" size={20} />
            </Button>

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="icon"
              disabled={!message?.trim() || isLoading}
              className={`flex-shrink-0 transition-all duration-300 ${
                message?.trim() && !isLoading
                  ? "neon-glow-primary hover:scale-105"
                  : "opacity-50"
              }`}
            >
              {isLoading ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Send" size={20} />
              )}
            </Button>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="px-4 pb-4">
              <div className="flex items-center space-x-2 text-error">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  Recording... Tap to stop
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Helper Text */}
        <div className="flex items-center justify-between mt-2 px-2">
          <span className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="text-xs text-muted-foreground">
            {message?.length}/2000
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
