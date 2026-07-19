const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');
const files = fs.readdirSync(dir).filter(f => f.startsWith('labels-') && f.endsWith('.ts'));

const translations = {
  'en': {
    THINKING: 'Thinking...',
    DEFAULT_USER_MSG: 'Suggest a nice cafe nearby',
    DEFAULT_AI_MSG: 'Here are some of the best cafés near you',
    MOCK_RESPONSE: 'That sounds like a great plan! The backend integration will handle this soon.'
  },
  'hi': {
    THINKING: 'सोच रहा हूँ...',
    DEFAULT_USER_MSG: 'आसपास एक अच्छा कैफ़े सुझाएं',
    DEFAULT_AI_MSG: 'यहाँ आपके आस-पास के कुछ बेहतरीन कैफ़े हैं',
    MOCK_RESPONSE: 'यह एक बेहतरीन योजना लग रही है! बैकएंड एकीकरण इसे जल्द ही संभालेगा।'
  },
  'bn': {
    THINKING: 'ভাবছি...',
    DEFAULT_USER_MSG: 'কাছাকাছি একটি ভালো ক্যাফে সাজেস্ট করুন',
    DEFAULT_AI_MSG: 'এখানে আপনার কাছাকাছি কিছু সেরা ক্যাফে রয়েছে',
    MOCK_RESPONSE: 'এটি একটি দুর্দান্ত পরিকল্পনা বলে মনে হচ্ছে! ব্যাকএন্ড ইন্টিগ্রেশন এটি শীঘ্রই পরিচালনা করবে।'
  },
  'ta': {
    THINKING: 'யோசிக்கிறது...',
    DEFAULT_USER_MSG: 'அருகில் உள்ள ஒரு நல்ல ஓட்டலை பரிந்துரைக்கவும்',
    DEFAULT_AI_MSG: 'உங்களுக்கு அருகிலுள்ள சில சிறந்த கஃபேக்கள் இங்கே',
    MOCK_RESPONSE: 'இது ஒரு சிறந்த திட்டம் போல் தெரிகிறது! பின்தள ஒருங்கிணைப்பு விரைவில் இதை கையாளும்.'
  },
  'te': {
    THINKING: 'ఆలోచిస్తున్నాను...',
    DEFAULT_USER_MSG: 'దగ్గరలో ఒక మంచి కేఫ్‌ని సూచించండి',
    DEFAULT_AI_MSG: 'మీకు సమీపంలో ఉన్న కొన్ని ఉత్తమ కేఫ్‌లు ఇక్కడ ఉన్నాయి',
    MOCK_RESPONSE: 'ఇది గొప్ప ప్రణాళికలా ఉంది! బ్యాకెండ్ ఏకీకరణ త్వరలో దీనిని నిర్వహిస్తుంది.'
  },
  'gj': {
    THINKING: 'વિચારી રહ્યું છે...',
    DEFAULT_USER_MSG: 'નજીકમાં એક સારો કાફે સૂચવો',
    DEFAULT_AI_MSG: 'અહીં તમારી નજીકના કેટલાક શ્રેષ્ઠ કાફે છે',
    MOCK_RESPONSE: 'આ એક મહાન યોજના જેવું લાગે છે! બેકએન્ડ એકીકરણ ટૂંક સમયમાં આને સંભાળશે.'
  },
  'od': {
    THINKING: 'ଭାବୁଛି...',
    DEFAULT_USER_MSG: 'ପାଖରେ ଗୋଟିଏ ଭଲ କାଫେ ପରାମର୍ଶ ଦିଅନ୍ତୁ',
    DEFAULT_AI_MSG: 'ଏଠାରେ ଆପଣଙ୍କ ପାଖରେ ଥିବା କିଛି ଶ୍ରେଷ୍ଠ କାଫେ ଅଛି',
    MOCK_RESPONSE: 'ଏହା ଏକ ଭଲ ଯୋଜନା ପରି ଲାଗୁଛି! ବ୍ୟାକଏଣ୍ଡ ଇଣ୍ଟିଗ୍ରେସନ୍ ଶୀଘ୍ର ଏହାକୁ ପରିଚାଳନା କରିବ।'
  }
};

files.forEach(f => {
  const lang = f.split('-')[1].split('.')[0];
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const trans = translations[lang] || translations['en'];
  
  // Find the AI_CHAT object and insert new keys
  const newKeys = `
    THINKING: '${trans.THINKING}',
    DEFAULT_USER_MSG: '${trans.DEFAULT_USER_MSG}',
    DEFAULT_AI_MSG: '${trans.DEFAULT_AI_MSG}',
    MOCK_RESPONSE: '${trans.MOCK_RESPONSE}',`;
    
  if (!content.includes('THINKING:')) {
    content = content.replace(/(AI_CHAT:\s*{)/, `$1${newKeys}`);
    fs.writeFileSync(fp, content);
    console.log(`Updated ${f}`);
  }
});
