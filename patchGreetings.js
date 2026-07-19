const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');
const files = fs.readdirSync(dir).filter(f => f.startsWith('labels-') && f.endsWith('.ts'));

const translations = {
  'en': { M: 'Good morning,', A: 'Good afternoon,', E: 'Good evening,' },
  'hi': { M: 'सुप्रभात,', A: 'शुभ दोपहर,', E: 'शुभ संध्या,' },
  'bn': { M: 'শুভ সকাল,', A: 'শুভ বিকাল,', E: 'শুভ সন্ধ্যা,' },
  'ta': { M: 'காலை வணக்கம்,', A: 'மதிய வணக்கம்,', E: 'மாலை வணக்கம்,' },
  'te': { M: 'శుభోదయం,', A: 'శుభ మధ్యాహ్నం,', E: 'శుభ సాయంత్రం,' },
  'gj': { M: 'શુભ સવાર,', A: 'શુભ બપોર,', E: 'શુભ સાંજ,' },
  'od': { M: 'ଶୁଭ ସକାଳ,', A: 'ଶୁଭ ଅପରାହ୍ନ,', E: 'ଶୁଭ ସନ୍ଧ୍ୟା,' }
};

files.forEach(f => {
  const lang = f.split('-')[1].split('.')[0];
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const trans = translations[lang];
  if (trans && !content.includes('GREETING_MORNING')) {
    // Insert after GREETING:
    content = content.replace(/GREETING:\s*'[^']*',?/, `GREETING: '${trans.M}',\n    GREETING_MORNING: '${trans.M}',\n    GREETING_AFTERNOON: '${trans.A}',\n    GREETING_EVENING: '${trans.E}',`);
    fs.writeFileSync(fp, content);
    console.log(`Updated greetings in ${f}`);
  }
});
