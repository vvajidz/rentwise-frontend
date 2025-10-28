import { MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  from: string;
  message: string;
  time: string;
  unread: boolean;
}

interface MessagesSectionProps {
  messages: Message[];
}

const MessagesSection = ({ messages }: MessagesSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="divide-y divide-gray-100">
          {messages.map(message => (
            <div key={message.id} className={`p-6 hover:bg-gray-50 transition-colors ${message.unread ? 'bg-amber-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{message.from}</h3>
                    {message.unread && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                  </div>
                  <p className="text-gray-700 mb-2">{message.message}</p>
                  <p className="text-sm text-gray-500">{message.time}</p>
                </div>
                <button className="text-amber-600 hover:text-amber-700">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;