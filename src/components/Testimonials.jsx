import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    text: "Before Sriizan, I had no idea what was happening with my under-construction flat. Now I get regular drone video surveys and stage completion alerts. Completely stress-free experience!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    location: "Ahmedabad",
    text: "The investment dashboard is amazing. Seeing the market appreciation (+₹35 Lakhs) and builder price hikes directly in my dashboard gives immense confidence in my purchase.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    location: "Delhi NCR",
    text: "Accessing all my BBA agreements, floor plans, and demand receipts in one encrypted vault is a game-changer for homebuyers in India.",
    rating: 5,
  }
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            REAL HOMEBUYER REVIEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-4">
            Trusted by Homebuyers Across Bharat
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
            See how Sriizan is bringing complete peace of mind to real estate owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-emerald-600 gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
