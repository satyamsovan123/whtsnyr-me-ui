const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');
const files = fs.readdirSync(dir).filter(f => f.startsWith('labels-') && f.endsWith('.ts'));

const translations = {
  'en': {
    LOCATION_SUCCESS: 'Location updated successfully!',
    LOCATION_ERROR: 'Unable to retrieve location. Check permissions.'
  },
  'hi': {
    LOCATION_SUCCESS: 'स्थान सफलतापूर्वक अपडेट किया गया!',
    LOCATION_ERROR: 'स्थान प्राप्त करने में असमर्थ। अनुमतियों की जांच करें।'
  },
  'bn': {
    LOCATION_SUCCESS: 'অবস্থান সফলভাবে আপডেট করা হয়েছে!',
    LOCATION_ERROR: 'অবস্থান পুনরুদ্ধার করতে অক্ষম। অনুমতি চেক করুন।'
  },
  'ta': {
    LOCATION_SUCCESS: 'இருப்பிடம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
    LOCATION_ERROR: 'இருப்பிடத்தை மீட்டெடுக்க முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்.'
  },
  'te': {
    LOCATION_SUCCESS: 'స్థానం విజయవంతంగా నవీకరించబడింది!',
    LOCATION_ERROR: 'స్థానాన్ని తిరిగి పొందడం సాధ్యం కాలేదు. అనుమతులను తనిఖీ చేయండి.'
  },
  'gj': {
    LOCATION_SUCCESS: 'સ્થાન સફળતાપૂર્વક અપડેટ થયું!',
    LOCATION_ERROR: 'સ્થાન પુનઃપ્રાપ્ત કરવામાં અસમર્થ. પરવાનગીઓ તપાસો.'
  },
  'od': {
    LOCATION_SUCCESS: 'ଅବସ୍ଥାନ ସଫଳତାପୂର୍ବକ ଅପଡେଟ୍ ହେଲା!',
    LOCATION_ERROR: 'ଅବସ୍ଥାନ ପୁନରୁଦ୍ଧାର କରିବାରେ ଅସମର୍ଥ | ଅନୁମତିଗୁଡିକ ଯାଞ୍ଚ କରନ୍ତୁ |'
  }
};

files.forEach(f => {
  const lang = f.split('-')[1].split('.')[0];
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const trans = translations[lang] || translations['en'];
  
  const newKeys = `
    LOCATION_SUCCESS: '${trans.LOCATION_SUCCESS}',
    LOCATION_ERROR: '${trans.LOCATION_ERROR}',`;
    
  if (!content.includes('LOCATION_SUCCESS:')) {
    content = content.replace(/(TOAST:\s*{)/, `$1${newKeys}`);
    fs.writeFileSync(fp, content);
    console.log(`Updated ${f}`);
  }
});
