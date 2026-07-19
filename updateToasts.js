const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');

const updates = {
  'labels-en.ts': `
  TOAST: {
    ENABLE_LOCATION: 'Please enable location for the best experience',
    LOCATION_UPDATED: 'Location updated',
    LOCATION_FAILED: 'Failed to get location',
    SELECTED: 'Selected',
    NO_RESTAURANTS: 'No restaurants found nearby via Swiggy MCP',
    FETCH_FAILED: 'Failed to fetch restaurants',
    OPENING_MENU: 'Opening menu for'
  },`,
  'labels-hi.ts': `
  TOAST: {
    ENABLE_LOCATION: 'बेहतरीन अनुभव के लिए कृपया स्थान सक्षम करें',
    LOCATION_UPDATED: 'स्थान अपडेट किया गया',
    LOCATION_FAILED: 'स्थान प्राप्त करने में विफल',
    SELECTED: 'चयनित',
    NO_RESTAURANTS: 'स्विगी एमसीपी के माध्यम से पास में कोई रेस्तरां नहीं मिला',
    FETCH_FAILED: 'रेस्तरां लाने में विफल',
    OPENING_MENU: 'इसके लिए मेनू खोला जा रहा है'
  },`,
  'labels-bn.ts': `
  TOAST: {
    ENABLE_LOCATION: 'সেরা অভিজ্ঞতার জন্য অনুগ্রহ করে অবস্থান সক্ষম করুন',
    LOCATION_UPDATED: 'অবস্থান আপডেট করা হয়েছে',
    LOCATION_FAILED: 'অবস্থান পেতে ব্যর্থ',
    SELECTED: 'নির্বাচিত',
    NO_RESTAURANTS: 'সুইগি এমসিপি এর মাধ্যমে আশেপাশে কোনও রেস্তোরাঁ পাওয়া যায়নি',
    FETCH_FAILED: 'রেস্তোরাঁ আনতে ব্যর্থ',
    OPENING_MENU: 'এর জন্য মেনু খোলা হচ্ছে'
  },`,
  'labels-ta.ts': `
  TOAST: {
    ENABLE_LOCATION: 'சிறந்த அனுபவத்திற்கு இருப்பிடத்தை இயக்கவும்',
    LOCATION_UPDATED: 'இருப்பிடம் புதுப்பிக்கப்பட்டது',
    LOCATION_FAILED: 'இருப்பிடத்தைப் பெற முடியவில்லை',
    SELECTED: 'தேர்ந்தெடுக்கப்பட்டது',
    NO_RESTAURANTS: 'Swiggy MCP மூலம் அருகில் எந்த உணவகங்களும் கிடைக்கவில்லை',
    FETCH_FAILED: 'உணவகங்களைப் பெற முடியவில்லை',
    OPENING_MENU: 'மெனு திறக்கப்படுகிறது'
  },`,
  'labels-te.ts': `
  TOAST: {
    ENABLE_LOCATION: 'ఉత్తమ అనుభవం కోసం దయచేసి స్థానాన్ని ప్రారంభించండి',
    LOCATION_UPDATED: 'స్థానం నవీకరించబడింది',
    LOCATION_FAILED: 'స్థానం పొందడం విఫలమైంది',
    SELECTED: 'ఎంచుకోబడింది',
    NO_RESTAURANTS: 'స్విగ్గీ MCP ద్వారా సమీపంలో రెస్టారెంట్లు కనుగొనబడలేదు',
    FETCH_FAILED: 'రెస్టారెంట్లను పొందడంలో విఫలమైంది',
    OPENING_MENU: 'దీని కోసం మెను తెరవబడుతోంది'
  },`,
  'labels-gj.ts': `
  TOAST: {
    ENABLE_LOCATION: 'શ્રેષ્ઠ અનુભવ માટે કૃપા કરીને સ્થાન સક્ષમ કરો',
    LOCATION_UPDATED: 'સ્થાન અપડેટ કર્યું',
    LOCATION_FAILED: 'સ્થાન મેળવવામાં નિષ્ફળ',
    SELECTED: 'પસંદ કરેલ',
    NO_RESTAURANTS: 'સ્વિગી MCP દ્વારા નજીકમાં કોઈ રેસ્ટોરન્ટ મળી નથી',
    FETCH_FAILED: 'રેસ્ટોરન્ટ્સ લાવવામાં નિષ્ફળ',
    OPENING_MENU: 'આના માટે મેનૂ ખોલવામાં આવી રહ્યું છે'
  },`,
  'labels-od.ts': `
  TOAST: {
    ENABLE_LOCATION: 'ସର୍ବୋତ୍ତମ ଅନୁଭୂତି ପାଇଁ ଦୟାକରି ସ୍ଥାନ ସକ୍ଷମ କରନ୍ତୁ',
    LOCATION_UPDATED: 'ସ୍ଥାନ ଅପଡେଟ୍ ହୋଇଛି',
    LOCATION_FAILED: 'ସ୍ଥାନ ପାଇବାରେ ବିଫଳ',
    SELECTED: 'ମନୋନୀତ',
    NO_RESTAURANTS: 'ସ୍ୱିଗି ଏମସିପି ମାଧ୍ୟମରେ ନିକଟରେ କୌଣସି ରେଷ୍ଟୁରାଣ୍ଟ ମିଳିଲା ନାହିଁ',
    FETCH_FAILED: 'ରେଷ୍ଟୁରାଣ୍ଟ ଆଣିବାରେ ବିଫଳ',
    OPENING_MENU: 'ଏହା ପାଇଁ ମେନୁ ଖୋଲାଯାଉଛି'
  },`
};

Object.keys(updates).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('TOAST: {')) {
      content = content.replace(/  SETTINGS: \{/, `${updates[filename]}\n  SETTINGS: {`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated toasts in ${filename}`);
    }
  }
});
