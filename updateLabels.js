const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');

const updates = {
  'labels-en.ts': {
    SIGN_IN: "'Sign In'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'Welcome Back',
    CREATE_ACCOUNT: 'Create An Account',
    SIGN_IN_SUBTITLE: 'Enter Your Details To Sign In',
    SIGN_UP_SUBTITLE: 'Join Us To Discover Hidden Gems',
    FULL_NAME: 'Full Name',
    EMAIL_ADDRESS: 'Email Address',
    PASSWORD: 'Password',
    SIGN_IN: 'Sign In',
    SIGN_UP: 'Sign Up',
    DONT_HAVE_ACCOUNT: "Don't Have An Account?",
    ALREADY_HAVE_ACCOUNT: 'Already Have An Account?'
  },`
  },
  'labels-hi.ts': {
    SIGN_IN: "'साइन इन करें'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'वापसी पर स्वागत है',
    CREATE_ACCOUNT: 'एक खाता बनाएं',
    SIGN_IN_SUBTITLE: 'साइन इन करने के लिए अपना विवरण दर्ज करें',
    SIGN_UP_SUBTITLE: 'छिपे हुए रत्नों की खोज के लिए हमसे जुड़ें',
    FULL_NAME: 'पूरा नाम',
    EMAIL_ADDRESS: 'ईमेल पता',
    PASSWORD: 'पासवर्ड',
    SIGN_IN: 'साइन इन करें',
    SIGN_UP: 'साइन अप करें',
    DONT_HAVE_ACCOUNT: 'क्या आपके पास खाता नहीं है?',
    ALREADY_HAVE_ACCOUNT: 'क्या आपके पास पहले से खाता है?'
  },`
  },
  'labels-bn.ts': {
    SIGN_IN: "'সাইন ইন'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'ফিরে আসার জন্য স্বাগতম',
    CREATE_ACCOUNT: 'একটি অ্যাকাউন্ট তৈরি করুন',
    SIGN_IN_SUBTITLE: 'সাইন ইন করতে আপনার বিবরণ লিখুন',
    SIGN_UP_SUBTITLE: 'লুকানো রত্ন আবিষ্কার করতে আমাদের সাথে যোগ দিন',
    FULL_NAME: 'পুরো নাম',
    EMAIL_ADDRESS: 'ইমেল ঠিকানা',
    PASSWORD: 'পাসওয়ার্ড',
    SIGN_IN: 'সাইন ইন',
    SIGN_UP: 'সাইন আপ',
    DONT_HAVE_ACCOUNT: 'কোনো অ্যাকাউন্ট নেই?',
    ALREADY_HAVE_ACCOUNT: 'ইতিমধ্যেই একটি অ্যাকাউন্ট আছে?'
  },`
  },
  'labels-ta.ts': {
    SIGN_IN: "'உள்நுழைக'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'மீண்டும் நல்வரவு',
    CREATE_ACCOUNT: 'ஒரு கணக்கை உருவாக்கவும்',
    SIGN_IN_SUBTITLE: 'உள்நுழைய உங்கள் விவரங்களை உள்ளிடவும்',
    SIGN_UP_SUBTITLE: 'மறைக்கப்பட்ட பொக்கிஷங்களை கண்டறிய எங்களுடன் சேருங்கள்',
    FULL_NAME: 'முழு பெயர்',
    EMAIL_ADDRESS: 'மின்னஞ்சல் முகவரி',
    PASSWORD: 'கடவுச்சொல்',
    SIGN_IN: 'உள்நுழைக',
    SIGN_UP: 'பதிவு செய்க',
    DONT_HAVE_ACCOUNT: 'கணக்கு இல்லையா?',
    ALREADY_HAVE_ACCOUNT: 'ஏற்கனவே கணக்கு உள்ளதா?'
  },`
  },
  'labels-te.ts': {
    SIGN_IN: "'సైన్ ఇన్'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'తిరిగి స్వాగతం',
    CREATE_ACCOUNT: 'ఖాతాను సృష్టించండి',
    SIGN_IN_SUBTITLE: 'సైన్ ఇన్ చేయడానికి మీ వివరాలను నమోదు చేయండి',
    SIGN_UP_SUBTITLE: 'దాచిన రత్నాలను కనుగొనడానికి మాతో చేరండి',
    FULL_NAME: 'పూర్తి పేరు',
    EMAIL_ADDRESS: 'ఇమెయిల్ చిరునామా',
    PASSWORD: 'పాస్‌వర్డ్',
    SIGN_IN: 'సైన్ ఇన్',
    SIGN_UP: 'సైన్ అప్',
    DONT_HAVE_ACCOUNT: 'ఖాతా లేదా?',
    ALREADY_HAVE_ACCOUNT: 'ఇప్పటికే ఖాతా ఉందా?'
  },`
  },
  'labels-gj.ts': {
    SIGN_IN: "'સાઇન ઇન'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'પાછા આવવા બદલ સ્વાગત છે',
    CREATE_ACCOUNT: 'એક એકાઉન્ટ બનાવો',
    SIGN_IN_SUBTITLE: 'સાઇન ઇન કરવા માટે તમારી વિગતો દાખલ કરો',
    SIGN_UP_SUBTITLE: 'છુપાયેલા રત્નો શોધવા માટે અમારી સાથે જોડાઓ',
    FULL_NAME: 'પૂરું નામ',
    EMAIL_ADDRESS: 'ઇમેઇલ સરનામું',
    PASSWORD: 'પાસવર્ડ',
    SIGN_IN: 'સાઇન ઇન',
    SIGN_UP: 'સાઇન અપ',
    DONT_HAVE_ACCOUNT: 'શું તમારી પાસે એકાઉન્ટ નથી?',
    ALREADY_HAVE_ACCOUNT: 'શું પહેલેથી જ એકાઉન્ટ છે?'
  },`
  },
  'labels-od.ts': {
    SIGN_IN: "'ସାଇନ୍ ଇନ୍'",
    AUTH: `
  AUTH: {
    WELCOME_BACK: 'ପୁନର୍ବାର ସ୍ୱାଗତ',
    CREATE_ACCOUNT: 'ଏକ ଆକାଉଣ୍ଟ୍ ସୃଷ୍ଟି କରନ୍ତୁ',
    SIGN_IN_SUBTITLE: 'ସାଇନ୍ ଇନ୍ କରିବାକୁ ଆପଣଙ୍କର ବିବରଣୀ ଦିଅନ୍ତୁ',
    SIGN_UP_SUBTITLE: 'ଲୁକ୍କାୟିତ ରତ୍ନଗୁଡିକ ଆବିଷ୍କାର କରିବାକୁ ଆମ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ',
    FULL_NAME: 'ପୂରା ନାମ',
    EMAIL_ADDRESS: 'ଇମେଲ୍ ଠିକଣା',
    PASSWORD: 'ପାସୱାର୍ଡ୍',
    SIGN_IN: 'ସାଇନ୍ ଇନ୍',
    SIGN_UP: 'ସାଇନ୍ ଅପ୍',
    DONT_HAVE_ACCOUNT: 'ଆକାଉଣ୍ଟ୍ ନାହିଁ କି?',
    ALREADY_HAVE_ACCOUNT: 'ପୂର୍ବରୁ ଏକ ଆକାଉଣ୍ଟ୍ ଅଛି କି?'
  },`
  }
};

Object.keys(updates).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add NAVBAR.SIGN_IN
    if (!content.includes('SIGN_IN:')) {
      content = content.replace(/SETTINGS: [^\n]+,/, `SETTINGS: ${content.match(/SETTINGS: [^\n]+,/)[0].split(': ')[1]}\n    SIGN_IN: ${updates[filename].SIGN_IN},`);
    }

    // Add AUTH section before ABOUT
    if (!content.includes('AUTH: {')) {
      content = content.replace(/  ABOUT: \{/, `${updates[filename].AUTH}\n  ABOUT: {`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filename}`);
  }
});
