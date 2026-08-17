import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, X, Building2, TrendingUp, Video, FileText } from 'lucide-react';

const NotificationsModal = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [filter, setFilter] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Milestone', 'Price Update', 'Media', 'Document'];

  const filteredNotifs = filter === 'All'
    ? notifications
    : notifications.filter(n => n.category === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (category) => {
    switch (category) {
      case 'Milestone': return <Building2 size={16} className="text-amber-600" />;
      case 'Price Update': return <TrendingUp size={16} className="text-emerald-600" />;
      case 'Media': return <Video size={16} className="text-blue-600" />;
      case 'Document': return <FileText size={16} className="text-purple-600" />;
      default: return <Bell size={16} className="text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideLeft">
        {/* Header */}
        <div>
          <div className="p-5 bg-white text-slate-900 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="text-amber-600" size={20} />
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Notifications & Alerts</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {unreadCount > 0 ? `${unreadCount} unread property updates` : 'All notifications read'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </div>

          {/* Action Bar & Filters */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Filter Category:</span>
              <button
                onClick={markAllNotificationsAsRead}
                className="text-amber-600 hover:underline font-bold flex items-center gap-1"
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            </div>

            <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                    filter === cat
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No notifications found in this category.
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-slate-200 opacity-75'
                    : 'bg-amber-50/50 border-amber-200 shadow-sm font-medium'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-100">
                      {getIcon(notif.category)}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs">{notif.title}</h4>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                <div className="text-[10px] text-slate-400 font-semibold mt-2">{notif.timestamp}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
