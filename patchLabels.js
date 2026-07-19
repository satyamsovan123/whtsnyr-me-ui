const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');
const files = fs.readdirSync(dir).filter(f => f.startsWith('labels-') && f.endsWith('.ts'));

const translations = {
  'hi': {
    FIND_LOCAL_FOOD: 'स्थानीय भोजन',
    PLAN_EVENING: 'शाम की योजना',
    HIDDEN_GEMS: 'छिपे हुए रत्न',
    FAMILY_OUTING: 'पारिवारिक सैर',
    BUILD_GROCERY: 'किराने का सामान'
  },
  'bn': {
    FIND_LOCAL_FOOD: 'স্থানীয় খাবার',
    PLAN_EVENING: 'সন্ধ্যার পরিকল্পনা',
    HIDDEN_GEMS: 'লুকানো রত্ন',
    FAMILY_OUTING: 'পারিবারিক ভ্রমণ',
    BUILD_GROCERY: 'মুদিখানা'
  },
  'ta': {
    FIND_LOCAL_FOOD: 'உள்ளூர் உணவு',
    PLAN_EVENING: 'மாலை திட்டம்',
    HIDDEN_GEMS: 'மறைக்கப்பட்ட ரத்தினங்கள்',
    FAMILY_OUTING: 'குடும்ப பயணம்',
    BUILD_GROCERY: 'மளிகை பொருட்கள்'
  },
  'te': {
    FIND_LOCAL_FOOD: 'స్థానిక ఆహారం',
    PLAN_EVENING: 'సాయంత్రం ప్రణాళిక',
    HIDDEN_GEMS: 'దాచిన రత్నాలు',
    FAMILY_OUTING: 'కుటుంబ విహారయాత్ర',
    BUILD_GROCERY: 'కిరాణా సరుకులు'
  },
  'gj': {
    FIND_LOCAL_FOOD: 'સ્થાનિક ખોરાક',
    PLAN_EVENING: 'સાંજની યોજના',
    HIDDEN_GEMS: 'છુપાયેલા રત્નો',
    FAMILY_OUTING: 'પારિવારિક સહેલગાહ',
    BUILD_GROCERY: 'કરિયાણા'
  },
  'od': {
    FIND_LOCAL_FOOD: 'ସ୍ଥାନୀୟ ଖାଦ୍ୟ',
    PLAN_EVENING: 'ସନ୍ଧ୍ୟା ଯୋଜନା',
    HIDDEN_GEMS: 'ଲୁକ୍କାୟିତ ରତ୍ନ',
    FAMILY_OUTING: 'ପାରିବାରିକ ଭ୍ରମଣ',
    BUILD_GROCERY: 'ତେଜରାତି ଜିନିଷ'
  }
};

files.forEach(f => {
  const lang = f.split('-')[1].split('.')[0];
  if (lang === 'en') return;
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const trans = translations[lang];
  if (trans) {
    // Replace FIND_LOCAL_FOOD
    content = content.replace(/FIND_LOCAL_FOOD:\s*'[^']*'/, `FIND_LOCAL_FOOD: '${trans.FIND_LOCAL_FOOD}'`);
    content = content.replace(/PLAN_EVENING:\s*'[^']*'/, `PLAN_EVENING: '${trans.PLAN_EVENING}'`);
    content = content.replace(/HIDDEN_GEMS:\s*'[^']*'/, `HIDDEN_GEMS: '${trans.HIDDEN_GEMS}'`);
    content = content.replace(/FAMILY_OUTING:\s*'[^']*'/, `FAMILY_OUTING: '${trans.FAMILY_OUTING}'`);
    content = content.replace(/BUILD_GROCERY:\s*'[^']*'/, `BUILD_GROCERY: '${trans.BUILD_GROCERY}'`);
    fs.writeFileSync(fp, content);
    console.log(`Updated ${f}`);
  }
});
