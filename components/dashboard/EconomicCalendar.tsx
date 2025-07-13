export interface KeyEvent {
  time: string;
  currency: string;
  title: string;
  forecast?: string;
  previous?: string;
  impact?: 'low' | 'medium' | 'high';
  isTomorrow?: boolean;
}

export function EconomicCalendar({ events }: { events: KeyEvent[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-yellow-400">&#128197;</span> Economic Calendar
      </h2>
      <div className="bg-[#181A20] border border-gray-700 rounded-xl p-6 text-white shadow-md">
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${event.impact === 'high' ? 'bg-red-500' : event.impact === 'medium' ? 'bg-yellow-400' : 'bg-gray-400'}`}></span>
                <span className="font-semibold text-white">{event.time}</span>
                <span className="text-gray-400">{event.currency}</span>
                <span className="font-medium text-white ml-2">{event.title}</span>
              </div>
              <div className="flex items-center gap-4">
                {event.forecast && <span className="text-gray-400">F: {event.forecast}</span>}
                {event.previous && <span className="text-gray-400">P: {event.previous}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 